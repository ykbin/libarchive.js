#define _BSD_SOURCE
#include <nl_types.h>
#include <string.h>
#include <stdint.h>
#include <endian.h>
#include <errno.h>
#include <langinfo.h>
#include <locale.h>
#include <sys/mman.h>
//#include "libc.h"
#include <stdlib.h>

#include <sys/mman.h>
#include <fcntl.h>
#include <sys/stat.h>
#include <unistd.h>
const unsigned char* __map_file(const char *pathname, size_t *size)
{
	struct stat st;
	const unsigned char *map = MAP_FAILED;
	int fd = open(pathname, O_RDONLY|O_CLOEXEC|O_NONBLOCK);
	if (fd < 0) return 0;
	if (!fstat(fd, &st)) {
		map = mmap(0, st.st_size, PROT_READ, MAP_SHARED, fd, 0);
		*size = st.st_size;
	}
	close(fd);
	return map == MAP_FAILED ? 0 : map;
}

#define V(p) be32toh(*(uint32_t *)(p))

static nl_catd do_catopen(const char *name)
{
	size_t size;
	const unsigned char *map = __map_file(name, &size);
	/* Size recorded in the file must match file size; otherwise
	 * the information needed to unmap the file will be lost. */
	if (!map || V(map) != 0xff88ff89 || 20+V(map+8) != size) {
		if(map) munmap((void *)map, size);
		errno = ENOENT;
		return (nl_catd)-1;
	}
	return (nl_catd)map;
}

nl_catd catopen(const char *name, int oflag)
{
	nl_catd catd;

	if (strchr(name, '/')) return do_catopen(name);

	char buf[PATH_MAX];
	size_t i;
	const char *path, *lang, *p, *z;
	if (/*NXDO: libc.secure || */ !(path = getenv("NLSPATH"))) {
		errno = ENOENT;
		return (nl_catd)-1;
	}
	lang = oflag ? nl_langinfo(_NL_LOCALE_NAME(LC_MESSAGES)) : getenv("LANG");
	if (!lang) lang = "";
	for (p=path; *p; p=z) {
		i = 0;
		z = __strchrnul(p, ':');
		for (; p<z; p++) {
			const char *v;
			size_t l;
			if (*p!='%') v=p, l=1;
			else switch (*++p) {
			case 'N': v=name; l=strlen(v); break;
			case 'L': v=lang; l=strlen(v); break;
			case 'l': v=lang; l=strcspn(v,"_.@"); break;
			case 't':
				v=__strchrnul(lang,'_');
				if (*v) v++;
				l=strcspn(v,".@");
				break;
			case 'c': v="UTF-8"; l=5; break;
			case '%': v="%"; l=1; break;
			default: v=0;
			}
			if (!v || l >= sizeof buf - i) {
				break;
			}
			memcpy(buf+i, v, l);
			i += l;
		}
		if (!*z && (p<z || !i)) break;
		if (p<z) continue;
		if (*z) z++;
		buf[i] = 0;
		/* Leading : or :: in NLSPATH is same as %N */
		catd = do_catopen(i ? buf : name);
		if (catd != (nl_catd)-1) return catd;
	}
	errno = ENOENT;
	return (nl_catd)-1;
}

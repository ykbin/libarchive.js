#include <stdlib.h>
#include <string.h>
#include "locale_impl.h"
//#include "libc.h"

struct __locale_struct __global_locale = {};

locale_t __duplocale(locale_t old)
{
	locale_t new = malloc(sizeof *new);
	if (!new) return 0;
	if (old == LC_GLOBAL_LOCALE) old = &__global_locale /*NXDO &libc.global_locale */;
	*new = *old;
	return new;
}

weak_alias(__duplocale, duplocale);

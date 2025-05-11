#include <wctype.h>
#include <ctype.h>

int iswblank(wint_t wc)
{
	return isblank(wc);
}

#ifdef NXDO
int __iswblank_l(wint_t c, locale_t l)
{
	return iswblank(c);
}

weak_alias(__iswblank_l, iswblank_l);
#endif

#include <wctype.h>

int iswlower(wint_t wc)
{
	return towupper(wc) != wc;
}

#ifdef NXDO
int __iswlower_l(wint_t c, locale_t l)
{
	return iswlower(c);
}

weak_alias(__iswlower_l, iswlower_l);
#endif

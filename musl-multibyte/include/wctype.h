/*
 *
 *  Copyright (C) 2024-2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 */

#ifndef _WCTYPE_H
#define _WCTYPE_H

#include <wasmux/widechar.h>
#include <bits/locale_struct.h>

#ifdef __cplusplus
extern "C" {
#endif

int iswctype(wint_t wc, wctype_t charclass);
wctype_t wctype(const char* name);

int iswupper(wint_t wc);
int iswlower(wint_t wc);
int iswalnum(wint_t wc);
int iswprint(wint_t wc);
int iswspace(wint_t wc);
int iswdigit(wint_t wc);
int iswalpha(wint_t wc);
int iswblank(wint_t wc);
int iswcntrl(wint_t wc);
int iswgraph(wint_t wc);
int iswpunct(wint_t wc);
int iswxdigit(wint_t wc);

wint_t towlower(wint_t wc);
wint_t towupper(wint_t wc);

#ifdef __cplusplus
}
#endif

#endif /* _WCTYPE_H */

/*
 *
 *  Copyright (C) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 */

#ifndef _MCSMBS_H
#define _MCSMBS_H

#include <wasmux/types.h>
#include <wasmux/widechar.h>

#ifdef __cplusplus
extern "C" {
#endif

size_t wcslen(const wchar_t* wcs);
int wcscmp(const wchar_t* wcs1, const wchar_t* wcs2);
int wcsncmp(const wchar_t* wcs1, const wchar_t* wcs2, size_t len);
wchar_t* wcscat(wchar_t* dst, const wchar_t* src);
wchar_t* wcscpy(wchar_t* dst, const wchar_t* src);
wchar_t* wcschr(const wchar_t* wcs, wchar_t wch);
wchar_t* wmemcpy(wchar_t* wcs1, const wchar_t* wcs2, size_t len);
wchar_t* wmemchr(const wchar_t* wcs, wchar_t wch, size_t len);

typedef struct __mbstate_t {
  unsigned __opaque1;
  unsigned __opaque2;
} mbstate_t;

wint_t btowc(int wc);
int wctob(wint_t wc);

size_t wcrtomb(char* str, wchar_t wcs, mbstate_t* state);
size_t wcsrtombs(char* dst, const wchar_t** src, size_t dstlen, mbstate_t* state);

int mbsinit(const mbstate_t* state);
size_t mbrlen(const char* str, size_t len, mbstate_t* state);
size_t mbrtowc(wchar_t* wcs, const char* str, size_t len, mbstate_t* state);
size_t mbsrtowcs(wchar_t* dst, const char** src, size_t dstlen, mbstate_t* state);
size_t mbsnrtowcs(wchar_t* dst, const char** src, size_t srclen, size_t dstlen, mbstate_t* state);

#ifdef __cplusplus
}
#endif

#endif /* _MCSMBS_H */

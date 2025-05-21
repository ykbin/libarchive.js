#ifndef _LOCALE_IMPL_H
#define _LOCALE_IMPL_H

#include <wasmux/compiler.h>
#include <bits/thread_data.h>
#include <locale.h>

#define hidden __ATTR_HIDDEN
#define weak_alias(old, new) \
  extern __ATTR_ALIAS(old, new) __ATTR_WEAK

extern hidden struct __locale_struct __global_locale;
#define LOCK(x) (void)(x)
#define UNLOCK(x) (void)(x)

extern hidden volatile int __locale_lock[1];

extern hidden const struct __locale_map __c_dot_utf8;
extern hidden const struct __locale_struct __c_locale;
extern hidden const struct __locale_struct __c_dot_utf8_locale;

hidden const struct __locale_map *__get_locale(int, const char *);
hidden const char *__mo_lookup(const void *, size_t, const char *);
hidden const char *__lctrans(const char *, const struct __locale_map *);
hidden const char *__lctrans_cur(const char *);
hidden const char *__lctrans_impl(const char *, const struct __locale_map *);
hidden int __loc_is_allocated(locale_t);

#define LOC_MAP_FAILED ((const struct __locale_map *)-1)

#define LCTRANS(msg, lc, loc) __lctrans(msg, (loc)->cat[(lc)])
#define LCTRANS_CUR(msg) __lctrans_cur(msg)

#define C_LOCALE ((locale_t)&__c_locale)
#define UTF8_LOCALE ((locale_t)&__c_dot_utf8_locale)

#define CURRENT_LOCALE (*(locale_t*)(&__get_thread_data()->locale_data))

#define CURRENT_UTF8 (!!CURRENT_LOCALE->cat[LC_CTYPE])

hidden const unsigned char *__map_file(const char *, size_t *);

#define a_cas_p a_cas_p
static inline void *a_cas_p(volatile void *p, void *t, void *s)
{
	void* expected = t;
  __atomic_compare_exchange_n((void *volatile *)p, &expected, s, 0, __ATOMIC_SEQ_CST, __ATOMIC_SEQ_CST);
	return t;
}

#define a_store a_store
static inline void a_store(volatile int *p, int x)
{
  __atomic_store_n(p, x, __ATOMIC_SEQ_CST);
}

#endif

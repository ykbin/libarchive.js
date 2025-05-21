#include "locale_impl.h"
//#include "pthread_impl.h"
//#include "libc.h"

locale_t __uselocale(locale_t new)
{
	locale_t old = (locale_t)__get_thread_data()->locale_data;
	locale_t global = &__global_locale;

	if (new) __get_thread_data()->locale_data = new == LC_GLOBAL_LOCALE ? global : new;

	return old == global ? LC_GLOBAL_LOCALE : old;
}

weak_alias(__uselocale, uselocale);

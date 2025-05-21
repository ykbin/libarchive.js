#ifndef	_LOCALE_STRUCT_H
#define	_LOCALE_STRUCT_H

#include <wasmux/types.h>

#define LOCALE_NAME_MAX 23

struct __locale_map {
	const void *map;
	size_t map_size;
	char name[LOCALE_NAME_MAX+1];
	const struct __locale_map *next;
};

struct __locale_struct {
	const struct __locale_map *cat[6];
};

typedef struct __locale_struct * locale_t;

#endif

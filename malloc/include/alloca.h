/*
 *
 *  Copyright (C) 2024-2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 */

#ifndef _ALLOCA_H
#define _ALLOCA_H

#ifdef __cplusplus
extern "C" {
#endif

#define alloca(size) __builtin_alloca(size)

#ifdef __cplusplus
}
#endif

#endif /* _ALLOCA_H */

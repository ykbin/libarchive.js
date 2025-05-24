#include <unistd.h>
#include <malloc.h>

/*
 * This implementation of malloc is based on first-fit style.
 * meta_block is a struct to store the meta information about every chuck of memory being allocated.
 * A doubly-linked list is maintained with all the meta_blocks
 * to maintain the space being allocated and deallocated
 * Size of meta_block is considered to be 20 (4 bytes for each of the  variables).
 */

#define META_BLOCK_SIZE 20

/* The macro align4 is used to set the requested size to multiple of four greater than requested size */
#define align4(x) (((((x)-1) >> 2) << 2) + 4)

/* meta_ptr is a pointer of type meta_block, it is type defined for simplicity and to avoid confusion */
typedef struct meta_block *meta_ptr;

/* base stores the head of the linked list */
static void *base = NULL;

/*
 * The meta_block contains the variables free, size, next, data.
 * free is set to 1 when the respective block is free and vice versa.
 * size is used to store the size of the respective block.
 * The character array data gives the next address after the
 * meta_block as the data variable is defined at last.
 * The data variable is made as a character pointer assuming that the character takes 1 byte,
 * and so it makes the pointer arithmetic simpler
 * The next and prev pointers points to the block in the
 * doubly linked list present next and previous to the curr block.
 */
struct meta_block
{
    int free;
    size_t size;
    meta_ptr next;
    meta_ptr prev;
    void *ptr;
    char data[1];
};

/*
 * The find_suitable_block function traverses through the linked list
 * and find the first block which has space atleast equal to the requested space.
 * It also sets the variable last to the address of the last block in the linked-list.
 * This comes handy in the malloc function
 */
meta_ptr find_suitable_block(meta_ptr *last, size_t size)
{
    meta_ptr b = base;
    while (b && !(b->free && b->size >= size))
    {
        *last = b;
        b = b->next;
    }
    return b;
}

/*
 * The split_space function splits the given block if it contains space greater than the requested space.
 * Creates a new block of the free space and adds it in the linked list
 */
void split_space(meta_ptr block, size_t size)
{
    meta_ptr new_block;
    new_block = block->data + size;
    new_block->size = block->size - size - META_BLOCK_SIZE;
    new_block->next = block->next;
    new_block->free = 1;
    new_block->ptr = new_block->data;
    new_block->prev = block;
    block->next = new_block;
    block->size = size;
    if (new_block->next)
    {
        new_block->next->prev = new_block;
    }
}

/*
 * extend_heap() is invoked when the already available blocks of memory is not sutiable or if no block exist already.
 * This creates a block of memory near the break of heap.
 * The meta_block of the newly created memory block will be added in the last of the linked list.
 */
meta_ptr extend_heap(meta_ptr last, size_t size)
{
    meta_ptr old_break, new_break;
    old_break = sbrk(0);
    new_break = sbrk(META_BLOCK_SIZE + size);
    if (new_break == (void *)-1)
    {
        return NULL;
    }
    old_break->size = size;
    old_break->free = 0;
    old_break->next = NULL;
    old_break->prev = last;
    old_break->ptr = old_break->data;
    if (last)
    {
        last->next = old_break;
    }
    return (old_break);
}

/*
 * malloc is the function which will be invoked by the user to allocate space.
 * The function first checks if there a memory block with space atleast equal to the requested space.
 * If not then it requests a new block to be created from the heap.
 * If there are no elements in the linked-list then it asks the heap to allocate memory block
 * Finally it return the address from where the data can be stored.
 */

void *malloc(size_t size)
{
    meta_ptr block, last;
    size_t s;
    s = align4(size);
    if (base)
    {
        last = base;
        block = find_suitable_block(&last, s);
        if (block)
        {
            if ((block->size - s) >= (META_BLOCK_SIZE + 4))
            {
                split_space(block, s);
            }
            block->free = 0;
        }
        else
        {
            block = extend_heap(last, s);
            if (!block)
            {
                return NULL;
            }
        }
    }
    else
    {
        block = extend_heap(NULL, s);
        if (!block)
        {
            return NULL;
        }
        base = block;
    }

    return block->data;
}

/*
 * This file contains the implementaion of the function free()
 * For the details on few data structs such as meta_block and meta_ptr refer to the file malloc.c
 */

/* The function merge_block() checks if the next block is free and merges it with the block passed as an argument */
meta_ptr merge_blocks(meta_ptr block)
{
    if (block->next && block->next->free)
    {
        block->size += META_BLOCK_SIZE + block->next->size;
        block->next = block->next->next;
    }
    if (block->next)
    {
        block->next->prev = block;
    }
    return block;
}

/* The function get_block_addr() returns the address of the meta_block from taking the addr of data as an argument.
 * Type casing the passed void pointer to char pointer and subtracting the size of the meta_block will give us the required address.
 */
meta_ptr get_block_addr(void *p)
{
    char *tmp = p;
    tmp = tmp - META_BLOCK_SIZE;
    p = tmp;
    return (p);
}

/*
 * This function checks if the given pointer address is indeed created by invoking malloc() or not.
 * We use the field ptr in the meta_block() to check if the passed address is same as the one present in the meta_block()
 */
int is_addr_valid(void *p)
{
    if (base)
    {
        if (p > base && p < sbrk(0))
        {
            return (p == get_block_addr(p)->ptr);
        }
    }
    return 0;
}

/*
 * The pointer is first checked if valid. If it's valid we set the free field value of the block to 1
 * Then if the previous block exists, it is checked if its free and then merged with the current block.
 * Same is done for the next block also.
 * And finally if the freed block is at the end of the linkedlist, it is removed from the linkedlist and the break line
 * of the heap is set to the corresponding last address in the linkedlist using the syscall brk()
 */
void free(void *ptr)
{
    if (is_addr_valid(ptr))
    {
        meta_ptr block = get_block_addr(ptr);
        block->free = 1;
        if (block->prev && block->prev->free)
        {
            block = merge_blocks(block->prev);
        }

        if (block->next)
        {
            block = merge_blocks(block);
        }
        else
        {
            if (block->prev)
            {
                block->prev->next = NULL;
            }
            else
            {
                base = NULL;
            }
            brk(block);
        }
    }
}

/*
 * This file contains the implementation of realloc()
 * To know about meta_ptr, META_BLOCK_SIZE and other similar declarations refer the file malloc.c
 * reallco() can be used to increase or decrease the size of a pre-existing memory block.
 * The values in the pre-existing memory block will be copied in the new-block formed.
 */

/*
 * realloc() takes two arguments: pointer pointing to old memory location
 * and the size of the new memory block to be allocated.
 * If the pointer given as argument is NULL then malloc() is used to create a momory allocation and the new pointer is returned.
 * The function first checks if the the pointer is a valid memory address,
 * then if the old_block has enough memory then it is returned as it is.
 * If the memory is no sufficient in the old_block then the next block is checked if its free and fused if possible.
 * If the memory formed is more than requried after fusing with the next block, then the extra memory is split into a new block.
 * Memory is allocated newly and the data is copied if enough memory is not found even after fusing the next free block(if available).
 * Finally the pointer to the new memory address is returned.
 */

void *realloc(void *p, size_t size)
{
    size_t s;
    meta_ptr new_block, old_block;
    void *new_ptr;

    /* Checking if the passed pointer is NULL */
    if (!p)
    {
        return malloc(size);
    }

    /* Checking if the passed pointer is a valid memory address or not */
    if (is_addr_valid(p))
    {
        /* Aligning the requested size */
        s = align4(size);
        old_block = get_block_addr(p);
        
        /*
         * s is the new alligned space.
         * old_block->size returns the size of the old memory block passes as an argument when realloc() is invoked
         * META_BLOCK_SIZE is the size of the block storing the meta information of that memory block.
         */
        if (old_block->size >= s)
        {
            if ((old_block->size - s) >= (META_BLOCK_SIZE + 4))
            {
                split_space(old_block, s);
            }
        }
        else
        {
            if (old_block->next && old_block->next->free && (old_block->size + old_block->next->size + META_BLOCK_SIZE) >= s)
            {
                merge_blocks(old_block);
                if ((old_block->size - s) >= (META_BLOCK_SIZE + 4))
                {
                    split_space(old_block, s);
                }
            }
            else
            {
                new_ptr = malloc(s);
                if (new_ptr) {
                    __builtin_memcpy(new_ptr, old_block->ptr, old_block->size);
                    free(p);
                }
                return new_ptr;
            }
        }
        return p;
    }
    return NULL;
}

/*
 * This file contains the implementaion of the function calloc()
 * For the details on malloc() and align4() refer the file malloc.c
 * calloc() first creates the required chunk of memory using malloc()
 * then it sets the values of each byte to 0 by iterating through it.
 */

void* calloc(size_t number, size_t size)
{
  size_t sz = number * size;
  void* ptr = malloc(sz);
  if (ptr) {
      __builtin_memset(ptr, 0, sz);
  }

  return ptr;
}

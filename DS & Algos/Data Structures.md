# Data Structures
* * *

## General

- Memory slot --> 1 bit
- 1 integer is stored in 1 byte (8 contiguous bits holding binary values)
- 16, 32 and 64 bit just means that any 1 integer will be stored in 16, 32 and 64 contiguous bits, or memory slots, as opposed to 8!

* * *

## BigO Notation

**Most common functions...** efficiency is measured against these 4 metrics:
- Access
- Search
- Insert
- Delete

**Types of Time/Space Complexity Equations:**
- O(1)
- O(log n)
- O(n) _________________
- O(n log n)
- O(n²), O(n^x), ...
- O(2^n) _______________
- O(n!)

![complexity analysis graph](graph.png)

**NOTE:** if a function that takes in multiple arrays, all input array lengths need to be considered

* * *

## Logarithms

- log base 2 always implied

- log (n) = y === 2^y = n

- **ex:** log(16) = 4

With this we can reason that as our array length (n) doubles, our results only increases by 1.

A working example would be when say, we can throw away half of the input, at each step of some function (binary search).

* * *

## Arrays

- Dynamic arrays will (roughly) allocate double the space needed.
- This allows for insertion to be a constant (both space and time) operation, until the allocation memory has been used.
- At that point, a copy will happen O(n), but the copy will again provide (roughly) double the space needed (for the new larger set).

* * *

## Stacks

**Pros:**

**Cons:**

* * *

## Queues

**Pros:**

**Cons:**

* * *

## Linked Lists

**Pros:**

**Cons:**

* * *

## Hash Tables

**Pros:**

**Cons:**

* * *

## Trees

**Pros:**

**Cons:**

DFS - use stacks

BFS - use queues

* * *

## Graphs

**Pros:**

**Cons:**

* * *
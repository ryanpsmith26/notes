# Execution Context

An **Execution Context** is a record of information when code is executed. Whether your entire program is running, or individual functions inside of your program are invoked, execution contexts are created.

Here is the information stored and created in an Execution Context:

- HOW the function is invoked (as a method?)
- A Lexical Environment
- The context of the this keyword ...and more!

**Global Execution Context** — This is the default or base execution context. The code that is not inside any function is in the global execution context. It performs two things: it creates a global object which is a window object (in the case of browsers) and sets the value of this to equal to the global object. There can only be one global execution context in a program.

**Functional Execution Context** — Every time a function is invoked, a brand new execution context is created for that function. Each function has its own execution context, but it’s created when the function is invoked or called. There can be any number of function execution contexts. Whenever a new execution context is created, it goes through a series of steps in a defined order which I will discuss later in this article.
* * *

## **Scope**

There are three types of scopes in JavaScript:

- Global Scope
- Function Scope
- Block Scope (introduced in ES2015)

**var statements do not create block scope*

* * *

## **Lexical Environment**

Put simply, a **Lexical Environment** has two components:

- Local Scope (the Environment Records, all the identifier bindings defined within the scope)
- Scope Chain (a link to the outer Lexical Environment)
* * *

## **Hoisting**

Hoisting represents that all variable and function declarations are moved to the top of your program before the program executes.

- vars are hoisted and assigned undefined until assigned in the code

- let and const are hoisted, but they enter a space called the **Temporal Dead Zone** aka TDZ. Even though the variables are hoisted, they are not available at all until the line of code they are declared on is executed.

* * *

## **Closure**

A closure describes the ability of a function to "remember" and "access" its lexical environment when it is executed outside of the lexical environment it is defined in.

```js
function sum() {
  const startingValue = Math.floor(Math.random() * 100) + 1;

  return function funcFromSum(num) {
    return num + startingValue;
  }

}

const calculateSum = sum();

calculateSum(22); // executes as desired, accessing starting value
```
In this example, a **Closure** is created, when we invoke calculateSum. That closure contains the startingValue variable. When calculateSum is invoked (which is defined in the global scope), it has access to that closure, and therefore, the startingValue variable.

***IMPORTANT NOTE:*** the sum() function in this code example is only invoked one time.

When calculateSum is invoked, it is NOT invoking the sum function, it is invoking funcFromSum. The value randomly assigned to startingValue when sum was invoked is the value in funcFromSum's lexical environment.

* * *

**Link to Medium article:**

https://blog.bitsrc.io/understanding-execution-context-and-execution-stack-in-javascript-1c9ea8642dd0

**really good execution example detailed in this article*
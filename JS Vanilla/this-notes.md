# This

### **DEFAULT BINDING RULE**
```js
// Function Invocation
function whatIsThis(){
  console.log(this);
}

whatIsThis()

// This => the global object (window in broswer)
```
* * *

### **IMPLICIT/METHOD INVOCATION RULE**

```js
// Method Invocation

const tvRemote = {
    on: function() {
        this.power = "on";
        return this.power;
    },
    off: function() {
        this.power = "off";
        return this.power;
    },
    power: "off"
};

console.log(tvRemote.on());

// This => the object that the method is called on (DIRECTLY to the left of it)
```
* * *

### **EXPLICIT BINGING RULE**

```js
// .call, .apply, .bind

const tvRemote = {
    on: function() {
        return this.power = "on";
    },
    off: function() {
        return this.power = "off";
    },
    power: "off"
};

tvRemote.on.call({power:"off", size:"60-inch"});

// This => the first agrument passed into the call/apply/bind method
```
* * *

### **new BINDING RULE**

```js
// `new` Keyword (Constructor)

function Person(name){
    this.name = name;
}

const patrick = new Person("Patrick");

console.log(patrick);

// This => the object instance
```
* * *

### **ARROW FUNCTIONS**

Arrow functions do not create their own context of **this**. They will look to their lexical environment for this context.

One instance when this may be useful:

To set the context of **this** in a nested function (without arrow functions) you would have to perform the following:

```js
function one() {
  console.log(this);

  function two(){
    console.log(this);
  } 

  two.call(this)
}

let thisRef = {};

one.call(thisRef) // sets the thisRef obj to this for function one, then call function two in function one scope and pass in (function one) this
```

Alternatively:

```js
function one() {
  console.log(this);

  const two = () => {
    console.log(this);
  }
}

let thisRef = {};

one.call(thisRef) // arrow func "two" will look to its lexical environment (function one) for this context and this will print thisRef in both cases
```
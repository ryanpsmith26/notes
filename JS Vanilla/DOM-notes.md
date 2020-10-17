# DOM

**document** is a model of the (usually HTML) web page document that is accessible by javascript and other scripting languages.

**window** is effectively the browser window.

**element** in the context of an HTML doc can just be thought of as the various HTML elements (div, p, ul, etc.)
* * *

## **Selectors**

Selectors will return an Element. The Element (as well as Node) properties/methods are now accessible to that Element that is returned.

```js
document.getElementById('name-of-id')

document.getElementsByTagName('p')

document.getElementsByClassName('my-class')
 
document.querySelector('#myID') // acts like a CSS selector

document.querySelectorAll('.myClass') // returns "Array-like" Object
```

## **Event Handlers**

```js
target.addEventListener(type, listener [, options]);
```

* * *

The **Document** method **getElementById( )** returns an Element object representing the element whose id property matches the specified string.

```js
const someElement = document.getElementById('id');

// fetch specific element in HTML with a defined ID
```
* * *

To access a specific element with no ID attribute (works with ID too, more general selector): 

The **Document** method **querySelector( )** returns the first Element within the document that matches the specified (CSS) selector, or group of selectors.

```js
const someElement = document.querySelector(selectors);

// enter CSS selector with same syntax as in CSS
// can input multiple selectors (comma seperated)
```

*If you need a list of all elements matching the specified selectors, you should use **querySelectorAll( )** instead.*

```js
const someElement = document.querySelectorAll(selectors);
```
* * *

The **getElementsByTagName( )** method of **Document** interface returns an HTMLCollection of elements with the given tag name. The complete document is searched, including the root node.

```js
const elementList = document.getElementsByTagName(name);
```

The **Element.getElementsByTagName( )** method returns a live HTMLCollection of elements with the given tag name. All descendants of the specified element are searched, but not the element itself.

```js
const elementList = element.getElementsByTagName(tagName)


// EXAMPLE: Check the status of each data cell in a table
const table = document.getElementById('forecast-table'); 
const cells = table.getElementsByTagName('td');

for (let cell of cells) {
  let status = cell.getAttribute('data-status');
  if (status === 'open') {
    // Grab the data 
  }
}
```
* * *

In an HTML document, the **document.createElement( )** method creates the HTML element specified by tagName.

```js
const someElement = document.createElement(tagName);
```

**document.createTextNode( )** creates a new Text node.

Combine the two to create an element and give it some text:

```js
const newDiv = document.createElement("div"); 
  // and give it some content 
const newContent = document.createTextNode("Hi there and greetings!");

// NOTE: the code above obviously only declares js variables, which would need to be used to actually add to the Document (with something like .appendChild -- see below!)
```
* * *

The **Node.appendChild( )** method adds a node to the end of the list of children of a specified parent node. If the given child is a reference to an existing node in the document, appendChild() moves it from its current position to the new position (there is no requirement to remove the node from its parent node before appending it to some other node).

```js
// Create a new paragraph element, and append it to the end of the document body:

let p = document.createElement("p");
document.body.appendChild(p);
```

*NOTE: If you wanted to append an existing element somewhere else in the doc, but keep the original in place:*

The **Node.cloneNode( )** method can be used to make a copy of the node before appending it under the new parent.

*NOTE: If you need to remove a child you have **Node.removeChild( )***
* * *

**Element.innerHTML** grabs the html code within that element.

This can be used to either read contents of the HTML (elements) or replace contents:

```js
// EXAMPLE: read content of an HTML element

let contents = myElement.innerHTML;

// EXAMPLE: erase all content in the body:

document.body.innerHTML = "";
```
* * *

**EventTarget** is a DOM interface implemented by objects that can receive events and may have listeners for them.

**Element**, **Document**, and **Window** are the most common event targets, but other objects can be event targets, too.

The **EventTarget** method **addEventListener( )** sets up a function that will be called whenever the specified event is delivered to the target.

*SYNTAX:*

**target.addEventListener(type, listener)**

**type** is the action that will call the listener (function), i.e., click, dblclick, mouseover, etc.

**listener** is (commonly) the js function you want to run.

```js
// EXAMPLE:

// define closeButton variable which is the button with class .close-nav:
const closeButton = document.querySelector('.close-nav');

// define nav variable which is the nav element that we will remove a class from:
const nav = document.querySelector('.nav');

// listen for a click on closeButton (<button class=".close-nav"> and perform function defined below)
closeButton.addEventListener("click", () => {
    nav.classList.remove('navigation-open');
});
```
* * *
**Data Attribute**

data-* attributes allow us to store extra information on standard, semantic HTML elements.

**this can be used to access an html element from js.*

**where a class COULD be used, this will allow you to keep attributes used for css and visual purposes seperate from those used for js.*

**snake-case is converted to camelCase.*

**EXAMPLE 1:**
```html
<article
  id="electric-cars"
  data-columns="3"
  data-index-number="12314"
  data-parent="cars">
</article>
```

```js
const article = document.querySelector('#electric-cars');
 
article.dataset.columns // "3"
article.dataset.indexNumber // "12314"
article.dataset.parent // "cars"
```

**EXAMPLE 2:**
```html
<button data-number>1</button>
<button data-number>2</button>
<button data-number>3</button>
```

```js
const numberButtons = document.querySelectorAll('[data-number]')

// this example is making use of the 'attribute present selector' in CSS.

// "To select an element based on if an attribute is present or not, include the attribute name in square brackets, []."
```
* * *

QUEUE:

    element.style.left
    element.setAttribute()
    element.getAttribute()
    window.content
    window.onload
    window.scrollTo()





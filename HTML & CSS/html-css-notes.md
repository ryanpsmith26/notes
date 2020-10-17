# HTML / CSS

## **TEMPLATES**

#### HTML

```html
<!DOCTYPE html>

<html>

  <head>
    <title>Your Title Here</title>
    <link href="css/styles.css" rel="stylesheet">
    <script src="https://kit.fontawesome.com/2a7568f03f.js" crossorigin="anonymous"></script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="Ryan Smith">
  </head>

  <body>

    <header></header>

    <main></main>

    <footer></footer>

    <script src="script.js"></script>

  </body>

</html>
```

#### CSS

```css
* {box-sizing: border-box;}

body {
    margin: 0;
    font-family: monospace;
    font-size: 1rem;
    color: #404040;
    line-height: 1.6;
}

img {
    max-width: 100%;
    display: block;
}

/* ----------------------
        TYPOGRAPHY
------------------------- */

h1, h2, strong {
    font-weight: 700;
}


```

* * *

## **General Notes**

  * Add space in HTML with &nbsp

  * ID is an indivudal and can only be used one time per page

  * Use CLASSES, always, basically

  * Margin default is approx font-size

  * Typical to set margin for entire body equal to 0 so that sections will touch the edges.

  * Turn off margin-top on typography and just use padding on the parent (for consistency since margins collapse).

  * Margins DO NOT collapse in flexbox and grid, so this is another reason to help stay consistent.

  * Set your widths on div boxes, etc.

  * **Trick:** Use borders to visualize your containers when styling and then remove when unneeded.

  * Specificity with compound selectors:
      * Elements are worth 1 point
      * Classes are worth 10 points
      * IDs are worth 100 points
  
    * * * 

  * **Block Elements**, i.e. header, h1, p, div, etc., by default will create a new line of content with default width of 100% and height 0%. These stack on top of eachother.

  * Counterpart of the Block elements are **Inline Elements**, i.e. links, strong, span.

  * Inline elements can be nested. They can be styled to the right and left but not the top and bottom. 
  
  * *Be careful* because padding-top added to a strong tag, for example, will increase the background above, but not adjust the elements around it, causing weird behaviors.

  * Span tag is an inline element used for styling text, like strong, but it's a blank slate. Usually used with classes.

  * To get the "best of both worlds" use **Inline-Blocks**:

    ```css
    element {
      display: inline-block;
    }
    ```
  * * *

  ## **HTML Entities**

  ```html
  * Copyright Symbol &#169;

  * Hamburger Menu &#9776;
  ```
  * * *

  ## **CSS Selectors**

  ```css

  * {
    /* selects everything */
  }
  
  div p {
    /* styles all p elements inside div elements (unlimited nesting) */
  }

  div > p {
    /* styles all p elements that are direct child of div element */
  }
  
  div + p {
    /* styles all p elements that are directly adjacent to div element (same level) */
  }

  h1 ~ p {
    /* styles every p that follows an h1 element within that family (same level + also sibling) */
  }

  p.intro {
    /* styles p elements with class intro */
  }

  .class1.class2 {
    /* element with both class1 and class2 on it's class attribute will be styled */
  }

  .class1 .class2 {
    /* class2 element that is a child/descendant of a class1 element will be styled */
  }

  ```

  * * *
  ## **Pseudos**
  ```css
  
  /* pseudo-classes are created with one colon: */

  a:hover

  div:first-child


  /* pseudo-elements are created with double colons */

  h1::after {
    content: "";
    display: block;
  }

  p::before {
    content: "";
    display: block;
  }
  
  /* content is placed INSIDE the element (after/before the og content*/  
  ```

  * * *

  ## **Position**

  ```css
  div {
    position: static; /* default */

    /* static elements are not affected by the top, bottom, left, and right properties. */

    position: absolute; /* fixes div box in abs
                           position on PAGE/VIEWPORT 
                           (technically in <html> 
                           element) */
    
    position: fixed;    /* fixes div box in abs
                           position on SCREEN */

    position: relative; /* positions div box relative
                           to its normal position */

    position: initial;  /* revert to what it was */

    left: 1px;
    right: 1px;
    top: 1px;
    bottom: 1px;
  }
  ```
  * * *

  ## **Images / Background Images**

  ```css
  img {
    width: 100%;
    display: block;
    object-fit: cover;
    object-position: right;
                     center;
                     left;
  }

  body{
    background-image: url(images/ribs.jpg);
    background-color: #404040; /* good practice even if not blending */
    background-blend-mode: screen
                           multiply
                           overlay;
    background-size: cover;
    background-position: center;
  }

  /* cool gradient effect on background image */

  body {
    background-image: url(my-image.jpg), linear-gradient(45deg,red, blue);
    background-blend-mode: screen;
  }
  ```
  * * *

  ## **Opaque Boxes**

  ```css
  .text-box {
    background: rgba(0, 0, 0, 0.33);
  }

  .index-quote-box p {
  opacity: 1;
  }
  ```

  * * *

  ## **Styling Links**

  * Target styles of link states with a ' **pseudo-class** ' :
    ```css
    a:link
    a:visited
    a:focus
    a:hover
    a:active
    ```
* Important: focus is for cycling through links with keyboard (power users / accessibility)

* Visited and unvisited links are usually styled the same for internal links. This is best done just in the "a" style.

* Order matters when styling link states (and in general)

* CSS will always choose the last style, when specificity is equal. Therefore, if the actual state is both hover and focus at the same time, then the last style will win out. Therefore, hover should be set last.

* *Another example:* if a:link is styled last, that will win out over any other link states, everytime.
* * *

## **Styling Buttons**

* Always put your class for the button you're styling directly on the anchor tag ("fake button") or the button tag.
* Always use padding to size buttons for flexibility (never set width nor height)
* Good rule of thumbs is to set 1 : 2 ratio of padding top / bottom : right / left
* Remove underline from links with:
  ```css
  .button {
    text-decoration: none;
  }
  ```
  Always set buttons to inline-block (for collapsing purposes):
  ```css
  .button {
    display: inline-block;
  }
  ```

  #### Transforms 

  ```css
    button {
      transition: transform 250ms;
    }

    button:hover {
      transform: scale(1.075)
    }
  ```

  **HTML Button Element**
  ```html
  <button aria-label="" class="close-nav">&times;</button>

  <!-- Always put an aria-label which is like alt text for an <img> -->
  ```
* * *

## **Responsive Design**

Create container class for every section of the page and:
* Set margin to 0 auto to center
* Set width using percentage (of page)
* Set max-width to some set max

  ```css
  .container {
  margin: 0 auto; /* This centers every container */
  width: 80%; /* This sets every container width */
  max-width: 620px;
  }
  ```

General rule of thumb on choosing units:

* Font-size: rem
* Padding and margin: em
* Width: em or percentage

*NOTE*: em unit is relative to the font-size of the element. In the case of using em for font-size, it will look to the font-size of the parent element.
* * *

## **Media Queries**

In it's most complex form:

```css
@media screen and (min-width: 30em) and (orientation: landscape) { ... }
```
Media queries always need to come after the default selector or they will be overwritten by default.
* * *

## **CSS FLEXBOX**

Setting ' **display: flex** ' on an element means that all the children to that element become columns

In it's most basic format:

```html
<div class="columns">
  <div class="column">HTML</div>
  <div class="column">CSS</div>
  <div class="column">JS</div>
</div>
```

  ```css
  .columns {
    display: flex;
    flex-direction: row /* happens under hood by default */
  }

  /* Now you would style the actual columns with the .column class (margin, text-align, etc.) */
  ```

#### Controlling FLEXBOX PARENTS:

You can adjust spacing between elements on the **main-axis** with the justify-content:

```css
.parent {
justify-content: space-between; /* Distribute items evenly
                                   The first item is flush with the start,
                                   the last is flush with the end */
justify-content: space-around;  /* Distribute items evenly
                                   Items have a half-size space
                                   on either end */
justify-content: space-evenly;  /* Distribute items evenly
                                   Items have equal space around them */
justify-content: stretch;       /* Distribute items evenly
                                   Stretch 'auto'-sized items to fit
                                   the container */
}
```

You can align on the **cross-axis** with the align-items prop on the parent:

```css
.parent {
  display: flex;
  align-items: stretch      /* default */
               flex-start   /* align along top */
               center       /* align center */
               flex-end     /* align along bottom */
               baseline     /* lines up the first lines
                               of text in each child */
}
```

Further controlling flexboxs:

```css
.parent {
  flex-direction: row /* default */
                  column;

  flex-wrap: nowrap /* default */
             wrap;

  flex-flow: row nowrap; /* combines above two / also default */
}
```

When, and only when, you have items wrapping, you can control items with **align-content**:

```css
.parent {
  align-content: start         /* Pack items from the start */
                 end           /* Pack items from the end */
                 flex-start    /* Pack flex items from the start */
                 flex-end      /* Pack flex items from the end */
                 space-between /* Distribute items evenly
                                 The first item is flush with the start,
                                 the last is flush with the end */
                 space-around  /* Distribute items evenly
                                 Items have a half-size space
                                 on either end */
                 space-evenly  /* Distribute items evenly
                                 Items have equal space around them */
                 stretch       /* Distribute items evenly
                                 Stretch 'auto'-sized items to fit
                                 the container */
}
```
**The best way to think about the difference between **align-items** and **align-content** is that **align-items** is controlling the individual rows/columns (that are wrapping) while **align-content** is controlling behavior of the group of rows/columns (wrapped).*

**Both are working in the **cross-axis***

#### Controlling FLEXBOX CHILDREN:

```css
.child {
  flex-grow: 1;     /* This child will grow to fill all
                       available empty space. 
                       This number is sort of a ratio 
                       of growth considering
                       all children flex-grow numbers */

  flex-grow: 0;     /* default / will never grow */

  flex-shrink: 1;   /* default */

  flex-shrink: 0;   /* will never shrink */

  flex-basis: auto; /* default / looks to width/height first / 
                       if no width, looks to content / 
                       ACTS ALONG MAIN AXIS */

  flex-basis: 10px;

  /* to fix bug in Chrome when using flex-basis on an img, set min-width and min-height to 0 */
}
```

Shorthand:

```css
.child {
  flex: grow shrink basis;

  flex: 0 1 auto; /* default */

  flex: 1;        /* flex-grow is set to 1 
                     but flex-basis is 0 */

  flex: 10px      /* see unit and just sets 
                     flex-basis to 10px */

  flex: auto === flex: 1 1 auto
}
```
Controlling a **SINGLE CHILD**:

**CROSS AXIS**

```css
.child {
  align-self: stretch; /* align-items but FOR 1 CHILD */
}
```

To control a single child in the **MAIN AXIS** you can **margin / margin auto**.
* * *

## **CSS GRID** 

**SETUP Grid:**
```css
.parent {
  display: grid;
  grid-template-rows: 30px 30px;
  grid-template-columns: 100px 100px 100px;

  /* shorthand */
  grid-template: <rows> / <columns>;
}
```

**PLACE ITEMS in Grid**
```css
.child {

  /* SHORTHAND */
  grid-row: <start> / <end>; /* <auto> by default for 
                                rows / row stretches to 
                                accommodate box with most 
                                content */

  grid-column: <start> / <end>; /* col start 1 by default */

  /* an OPTION: <span X> (starts at 1 and spans X) */
  /* exclude the <end> when only spanning 1 */
  /* items will overlap in the grid IFF explicitly told to do so */

  /* LONG FORM DONT USE */
  grid-row-start: <start>;
  grid-row-end: <end>;
  grid-column-start: <start>;
  grid-column-end: <end>;
}
```

**GRID AREAS**

Alternative to defining row/col numbers.

Grid areas is about giving names to regions and then  assigning items to those regions.

**NOTE:** *Grid areas shine in responsive design. Once you have the mobile finished, you can add a media query and re-define the grid template (columns/area) and leave the children untouched.*

```css
.parent {
  display: grid;
  grid-template-columns: 150px 150px 200px;
  grid-template-areas: 
    "sidebar header header" 
    "sidebar content content"
    "sidebar footer footer";
}

.header {
  grid-area: header;
}

.sidebar {
  grid-area: sidebar;
}

.some-content-class {
  grid-area: content;
}

.footer {
  grid-area: footer;
}

/* You can use a . for any section of the grid to just leave it undefined/empty!!! */
```

**CONTROL Grid**
```css
.parent {
  display: grid;

  justify-items: stretch /* default */
                 start
                 end
                 center;
  /* will justify the content inside the grid boxes in the horizontal direction */              
  
  align-items: stretch /* default */
               start
               end
               center;
  /* will align the content inside the grid boxes in the vertical direction */
}
```

You can control an individual child or grid box in the exact same way with align-self / justify-self:

```css
.child {
  align-self: start;

  jusify-self: end;
}
```
* * *

**GRID GAP**
```css
.parent {
  grid-row-gap: 1em;
  grid-column-gap: 2em;

  /* shorthand */
  grid-gap: 1em 2em;

  /* NOTE that grid gaps do not and cannot be applied to the edges */
}
```

**IMPLICIT Rows/Columns**

If you never **explicitly** define grid rows or cols (or define enough) they will be **implicitly** created (with widths/heights set to auto)

(In other words you dont have to actually define any grid-templates at all.)

```css
.parent {
  display: grid;
  grid-template-rows: 20px 20px;
}

.child {
  grid-row: 4 / 6;
}

/* This rows 3 - 5 are implied  */
```

You can control the size of implied rows/cols like this:
```css
.parent {
  grid-auto-rows: 40px;
}

/* Now we have 5 rows with the first 2 being 20px tall and the remaining 3 (implied) rows being 40px tall */
```

**MINMAX()**

Within your **grid-template-rows/columns** you can set section sizing limits with the minmax() prop:

```css
 .parent {
    grid-template-columns: 2em minmax(200px, 500px) minmax(100px, 200px) 2em;
 }

  /* NOTE this is a CSS Grid only prop */
  ```

  **FRACTION UNIT**

  **FR UNIT** distributes a fraction of the **AVAILABLE SPACE**.
  
  **NOTE:** *FR UNITS do not work for the MINIMUM VALUE in MINMAX( ).*

  ```css
  .parent {
    display: grid;
    grid-template-columns: 1fr 1fr 2fr;
}

/* 3rd column will be twice the size of the first two columns (under certain conditions / when the space is available) */

/* fr unit is a ratio like flex-grow / flex-shrink */

/* takes into consideration the content and the available space */
  ```

**MIN/MAX-CONTENT**

```css
.parent {
    display: grid;
    grid-template-columns: 1fr max-content;

/* 
Min-content will shrink that region to be the smallest it can be (basically if its a column min-content the width will be the width of the largest word)

Max-content (in this situation of using it on a column) will make that region as large as it needs to not wrap the content at all, and lock it into that width.
*/
```

**REPEAT( )**

Use **repeat( #cols, width )** when you have cols of equal width:

```css
.parent {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
} 

/* mix and match: */

.parent {
    display: grid;
    grid-template-columns: 200px repeat(3, 1fr) 200px;
} 
```

**AUTO-FIT** / **AUTO-FILL** 

Properties used inside **repeat( )** instead of selecting hard # of columns.

Usually used in conjunction with a **minmax( )** for the 'repeat width value'.

**AUTO-FIT**

```css
.parent {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

/* What's happenting here is that you have not defined the number of columns. You might have X number of content-boxes. It will look to the minimum value in the minmax() (in this case that's a min column width) and it will try to fit as many of those content-boxes in each row, as possible!!! (i.e., create as many columns as possible, given the min-width) */
```

**AUTO-FILL** Works the same as auto-fit except that it will keep adding new columns, even if they are empty.
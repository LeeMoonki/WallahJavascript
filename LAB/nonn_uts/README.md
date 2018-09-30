## Wallah LAB

### nonn.js

### uts.js

It is a module for "ui test settig(uts)". For example, if we want to use `getComputedStyle()` for testing on vlaues of computed style, we should render a dom element or use already rendered dom element. When we test a function which handle on or access to such values, for example, we create an element and test on it. But the created element is not rendered and can not test the function. So we might need `uts.js`. 

If you want use it, use in `html` context and open it, so the browser engine render the elements for test. Hence, the [`jasmine`][jasmine] is good context for testing.

**Usage**

```
// these two line are necessary.
var UTS = new uts();
UTS.setRootElement();

UTS.createElement('div', {
    id: 'test-div',
    style: {
        width: '100px',
        height: '70px',
        margin: '5px'
    }
});
UTS.createElement('ul', {
    parentEle: document.getElementById('test-div__ul')
})

// test codes

// after test, cleaning the html is recommended.
UTS.cleanUp();
```

[jasmine]: https://jasmine.github.io/index.html
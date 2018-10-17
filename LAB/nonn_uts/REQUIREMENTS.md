## nonn.js

~~1~~. The `getChildrenWith()` methods return `nonn` object. When user need the elements, we have to access like `getChildrenWithTag()._elements`. It is weird. So the methods like `getAll()` or `getAt()` are needed.

~~2~~. `outerHeight()` method is only for passed element. We want to use it on its elements like `getChildrenWithTag()[0].outerHeight()`.

## uts.js

1. When pass `parentEle` option value to `uts.createElement()`, typing whole line like `document.getElementById('id')` is very disturbing. If `uts.createElement()` returns the created element, it can be used like
```
UTS.createElement('li', UTS.createElement('ul'));

// or
var ul_element = UTS.createElement('ul');
UTS.createElement('li', ul_element);
 ```

2. The following thing is not working now.
```
// In this case, the `document.getElementsByTag('ul')` can returns an array of elements.
UTS.createElement('li', document.getElementsByTag('ul'));
```


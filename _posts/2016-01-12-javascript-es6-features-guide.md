---
layout: post
title: "ES6 (ES2015): The JavaScript Features That Change Everything"
date: 2016-01-12 16:20:00 -0800
categories: [javascript, frontend]
tags: [es6, es2015, babel, arrow-functions, promises, modules]
description: "A comprehensive guide to ES6 features that every JavaScript developer should know—and how to start using them today"
---

ECMAScript 6 (ES2015) is officially here, and it's the biggest update to JavaScript since ES5 in 2009. After using ES6 in production for six months with Babel, I can confidently say: **this is the future of JavaScript**. Let's explore the features that will transform how you write JavaScript.

## The Babel Revolution: Using Tomorrow's JavaScript Today

Before diving into features, let's talk about how to actually use ES6 today:

```javascript
// Install Babel
npm install --save-dev babel-core babel-preset-es2015 babel-loader

// .babelrc
{
  "presets": ["es2015"]
}

// Webpack config
module: {
  loaders: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }
  ]
}
```

## Arrow Functions: Concise and Lexical `this`

Arrow functions aren't just shorter syntax—they solve the `this` binding problem:

### Old Way:
```javascript
var self = this;
$('.button').click(function() {
    self.handleClick();
});

// Or with .bind()
$('.button').click(function() {
    this.handleClick();
}.bind(this));
```

### ES6 Way:
```javascript
$('.button').click(() => {
    this.handleClick(); // 'this' is lexically bound!
});

// Even shorter for simple functions
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
```

### When NOT to Use Arrow Functions:
```javascript
// Don't use for object methods
const obj = {
    name: 'Object',
    // Bad: 'this' doesn't refer to obj
    getName: () => this.name,
    
    // Good: regular function
    getName: function() {
        return this.name;
    }
};
```

## Let and Const: Block Scope and Immutability

Finally, proper scoping in JavaScript:

```javascript
// ES5: Function scoped, hoisted
function oldWay() {
    if (true) {
        var x = 1;
    }
    console.log(x); // 1 - accessible outside block
}

// ES6: Block scoped
function newWay() {
    if (true) {
        let x = 1;
        const y = 2;
    }
    console.log(x); // ReferenceError
    console.log(y); // ReferenceError
}
```

### Const Gotchas:
```javascript
// const means binding is immutable, not value
const user = { name: 'John' };
user.name = 'Jane'; // This works!
user.age = 30;      // This works!

const numbers = [1, 2, 3];
numbers.push(4);    // This works!

// But reassignment fails
user = {};          // TypeError
numbers = [];       // TypeError
```

## Template Literals: String Interpolation Done Right

No more string concatenation hell:

```javascript
// ES5
var message = 'Hello ' + name + '!\n' +
              'You have ' + count + ' new messages.\n' +
              'Your last login was ' + lastLogin + '.';

// ES6
const message = `Hello ${name}!
You have ${count} new messages.
Your last login was ${lastLogin}.`;
```

### Tagged Templates (Advanced):
```javascript
function highlight(strings, ...values) {
    return strings.reduce((result, string, i) => {
        const value = values[i] ? `<mark>${values[i]}</mark>` : '';
        return result + string + value;
    }, '');
}

const name = 'JavaScript';
const year = 2015;
const html = highlight`ES6 was released in ${year} and revolutionized ${name}!`;
// "ES6 was released in <mark>2015</mark> and revolutionized <mark>JavaScript</mark>!"
```

## Destructuring: Extract Values Like a Pro

Destructuring transforms how we work with objects and arrays:

### Object Destructuring:
```javascript
// ES5
var user = { name: 'John', age: 30, email: 'john@example.com' };
var name = user.name;
var age = user.age;
var email = user.email;

// ES6
const user = { name: 'John', age: 30, email: 'john@example.com' };
const { name, age, email } = user;

// With different variable names
const { name: userName, age: userAge } = user;

// With default values
const { name, age, phone = 'N/A' } = user;

// Nested destructuring
const user = {
    name: 'John',
    address: {
        city: 'New York',
        country: 'USA'
    }
};
const { address: { city, country } } = user;
```

### Array Destructuring:
```javascript
// ES5
var coordinates = [10, 20];
var x = coordinates[0];
var y = coordinates[1];

// ES6
const coordinates = [10, 20];
const [x, y] = coordinates;

// Skip elements
const [first, , third] = [1, 2, 3];

// Rest elements
const [head, ...tail] = [1, 2, 3, 4, 5];
// head: 1, tail: [2, 3, 4, 5]
```

### Function Parameters:
```javascript
// Old way
function createUser(options) {
    var name = options.name;
    var age = options.age || 18;
    var admin = options.admin || false;
}

// New way
function createUser({ name, age = 18, admin = false }) {
    // Use name, age, admin directly
}

createUser({ name: 'John', admin: true });
```

## Default Parameters: No More `|| defaultValue`

```javascript
// ES5
function greet(name, greeting) {
    name = name || 'World';
    greeting = greeting || 'Hello';
    return greeting + ', ' + name + '!';
}

// ES6
function greet(name = 'World', greeting = 'Hello') {
    return `${greeting}, ${name}!`;
}

// Default parameters can reference other parameters
function createUser(name, role = 'user', permissions = getDefaultPermissions(role)) {
    return { name, role, permissions };
}
```

## Rest and Spread Operators: `...` Changes Everything

### Rest Parameters:
```javascript
// ES5: arguments object
function sum() {
    var args = Array.prototype.slice.call(arguments);
    return args.reduce(function(total, n) {
        return total + n;
    }, 0);
}

// ES6: rest parameters
function sum(...numbers) {
    return numbers.reduce((total, n) => total + n, 0);
}

sum(1, 2, 3, 4); // 10
```

### Spread Operator:
```javascript
// Array spreading
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]

// Function calls
function greet(first, second, third) {
    console.log(`Hello ${first}, ${second}, and ${third}!`);
}
const names = ['Alice', 'Bob', 'Charlie'];
greet(...names);

// Object spreading (ES2018, but works with Babel)
const user = { name: 'John', age: 30 };
const userWithEmail = { ...user, email: 'john@example.com' };
```

## Modules: Finally, Native JavaScript Modules

No more global namespace pollution:

```javascript
// math.js
export const PI = 3.14159;

export function square(x) {
    return x * x;
}

export function cube(x) {
    return x * x * x;
}

// Default export
export default function multiply(x, y) {
    return x * y;
}
```

```javascript
// main.js
import multiply, { PI, square, cube } from './math.js';

// Import everything
import * as math from './math.js';

// Rename imports
import { square as sq } from './math.js';

console.log(multiply(3, 4)); // 12
console.log(square(5));      // 25
console.log(math.PI);        // 3.14159
```

## Classes: Syntactic Sugar for Prototypes

ES6 classes provide cleaner syntax for JavaScript's prototypal inheritance:

```javascript
// ES5
function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.greet = function() {
    return 'Hello, I am ' + this.name;
};

Person.prototype.getAge = function() {
    return this.age;
};

// ES6
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    greet() {
        return `Hello, I am ${this.name}`;
    }
    
    getAge() {
        return this.age;
    }
    
    // Static methods
    static createAnonymous() {
        return new Person('Anonymous', 0);
    }
}

// Inheritance
class Developer extends Person {
    constructor(name, age, language) {
        super(name, age);
        this.language = language;
    }
    
    greet() {
        return `${super.greet()} and I code in ${this.language}`;
    }
}

const dev = new Developer('Alice', 28, 'JavaScript');
console.log(dev.greet()); // "Hello, I am Alice and I code in JavaScript"
```

## Promises: Async Done Right

Goodbye callback hell, hello Promise chains:

```javascript
// ES5: Callback hell
getData(function(a) {
    getMoreData(a, function(b) {
        getEvenMoreData(b, function(c) {
            // Finally have c
            done(c);
        });
    });
});

// ES6: Promise chain
getData()
    .then(getMoreData)
    .then(getEvenMoreData)
    .then(done)
    .catch(handleError);
```

### Creating Promises:
```javascript
function fetchUser(id) {
    return new Promise((resolve, reject) => {
        // Simulate API call
        setTimeout(() => {
            if (id > 0) {
                resolve({ id, name: `User ${id}` });
            } else {
                reject(new Error('Invalid user ID'));
            }
        }, 1000);
    });
}

fetchUser(1)
    .then(user => console.log(user))
    .catch(error => console.error(error));
```

### Promise Utilities:
```javascript
// Wait for all promises
Promise.all([
    fetchUser(1),
    fetchUser(2),
    fetchUser(3)
]).then(users => {
    console.log('All users loaded:', users);
});

// Race condition (first to complete)
Promise.race([
    fetchFromCache(),
    fetchFromNetwork()
]).then(data => {
    console.log('Fastest source:', data);
});
```

## Symbols: Unique Property Keys

Symbols create unique identifiers:

```javascript
// Create symbols
const sym1 = Symbol();
const sym2 = Symbol('description');
const sym3 = Symbol('description');

console.log(sym2 === sym3); // false - symbols are always unique

// Use as object keys
const obj = {};
const mySymbol = Symbol('myKey');
obj[mySymbol] = 'secret value';

// Won't appear in normal iteration
Object.keys(obj);              // []
Object.getOwnPropertyNames(obj); // []
Object.getOwnPropertySymbols(obj); // [Symbol(myKey)]

// Well-known symbols
class MyIterable {
    [Symbol.iterator]() {
        let count = 0;
        return {
            next() {
                return count < 3 
                    ? { value: count++, done: false }
                    : { done: true };
            }
        };
    }
}

for (const value of new MyIterable()) {
    console.log(value); // 0, 1, 2
}
```

## Iterators and Generators: Lazy Evaluation

Generators provide a powerful way to create iterators:

```javascript
// Simple generator
function* numberGenerator() {
    yield 1;
    yield 2;
    yield 3;
}

const gen = numberGenerator();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }

// Infinite generator
function* fibonacci() {
    let a = 0, b = 1;
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}

// Take first 10 fibonacci numbers
const fib = fibonacci();
const first10 = [];
for (let i = 0; i < 10; i++) {
    first10.push(fib.next().value);
}
console.log(first10); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

### Async Generators (with libraries):
```javascript
function* asyncDataProcessor() {
    const data1 = yield fetch('/api/data1');
    const data2 = yield fetch('/api/data2');
    const processed = yield processData(data1, data2);
    return processed;
}
```

## Maps and Sets: Better Data Structures

### Map: Key-Value Pairs with Any Key Type
```javascript
// ES5: Objects as maps
var map = {};
map['key1'] = 'value1';
map[1] = 'number key';

// ES6: Real maps
const map = new Map();
map.set('string key', 'value1');
map.set(1, 'number key');
map.set(true, 'boolean key');
map.set({}, 'object key');

// Map methods
map.has('string key'); // true
map.get(1);           // 'number key'
map.delete(true);     // true
map.size;             // 3

// Iteration
for (const [key, value] of map) {
    console.log(`${key}: ${value}`);
}
```

### Set: Unique Values
```javascript
const set = new Set();
set.add(1);
set.add(2);
set.add(2); // Duplicate, ignored
set.add('2'); // Different type, added

console.log(set.size); // 3
console.log(set.has(2)); // true

// Convert array to unique values
const numbers = [1, 2, 2, 3, 3, 4];
const unique = [...new Set(numbers)]; // [1, 2, 3, 4]
```

## Proxy: Intercept Object Operations

Proxies allow you to intercept and customize operations on objects:

```javascript
const target = {
    name: 'John',
    age: 30
};

const proxy = new Proxy(target, {
    get(target, property) {
        console.log(`Getting ${property}`);
        return target[property];
    },
    
    set(target, property, value) {
        console.log(`Setting ${property} to ${value}`);
        if (property === 'age' && value < 0) {
            throw new Error('Age cannot be negative');
        }
        target[property] = value;
        return true;
    }
});

proxy.name; // "Getting name" -> "John"
proxy.age = 25; // "Setting age to 25"
proxy.age = -5; // Error: Age cannot be negative
```

## WeakMap and WeakSet: Garbage Collection Friendly

```javascript
// WeakMap: Keys must be objects and are weakly referenced
const wm = new WeakMap();
let obj = {};
wm.set(obj, 'some value');

// When obj goes out of scope, the entry is garbage collected
obj = null; // Entry in WeakMap is now eligible for GC

// WeakSet: Similar for sets
const ws = new WeakSet();
ws.add(obj);
```

## Browser Support and Polyfills

As of early 2016, ES6 support varies:

```javascript
// Feature detection
if (typeof Symbol !== 'undefined') {
    // Use symbols
} else {
    // Fallback
}

// Popular polyfills
import 'babel-polyfill';  // Full ES6 polyfill
import 'core-js/fn/promise'; // Just promises
import 'core-js/fn/array/from'; // Just Array.from
```

### Babel Presets:
```json
{
  "presets": [
    ["es2015", { "modules": false }], // For webpack 2
    "stage-2" // Experimental features
  ]
}
```

## Migration Strategy

### Start Small:
1. **Use Babel** with your build process
2. **Convert var to let/const** gradually
3. **Use arrow functions** for callbacks
4. **Destructure** function parameters
5. **Template literals** for string building

### Advanced Features:
6. **Classes** for constructor functions
7. **Modules** instead of AMD/CommonJS
8. **Promises** for async operations
9. **Generators** for complex iteration

## Performance Considerations

### What's Fast:
- Arrow functions (slightly faster than .bind())
- Template literals (faster than concatenation)
- Destructuring (optimized by engines)
- Native Promises (faster than libraries)

### What to Watch:
- Classes (syntax sugar, same performance as prototypes)
- Spread operator (creates new arrays/objects)
- Generators (memory overhead for state)

## Looking Ahead: ES2016 and Beyond

The annual release cycle means more features coming:

### ES2016 (ES7) Features:
- `Array.prototype.includes()`
- Exponentiation operator (`**`)

### Proposed Features:
- `async/await` (coming in ES2017)
- Object spread operator
- Optional chaining (`obj?.prop?.method?.()`)

## Essential Tools and Resources

### Build Tools:
- **Babel**: ES6+ transpiler
- **Webpack**: Module bundler with ES6 support
- **Rollup**: ES6 module bundler

### Learning Resources:
- **Babel REPL**: Online ES6 playground
- **ES6 Compatibility Table**: kangax.github.io/compat-table/
- **You Don't Know JS: ES6 & Beyond**: Kyle Simpson's book

### Linting:
```json
{
  "extends": ["eslint:recommended"],
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module"
  },
  "rules": {
    "prefer-const": "error",
    "prefer-arrow-callback": "error",
    "prefer-template": "error"
  }
}
```

## Why ES6 Matters

ES6 isn't just about new syntax—it's about making JavaScript more:

- **Expressive**: Less boilerplate, clearer intent
- **Powerful**: Better abstractions and patterns
- **Safe**: Block scoping, immutable bindings
- **Modular**: Native module system
- **Async-friendly**: Promises and generators

The JavaScript renaissance is here. ES6 gives us the tools to write better, more maintainable code. With Babel, you can start using these features today while maintaining browser compatibility.

**The future of JavaScript is ES6. The time to start is now.** 
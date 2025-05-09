# css-rules-matcher

A lightweight utility to partially restore the behavior of the deprecated `window.getMatchedCSSRules` method.

## Table of Contents

* [Installation](#installation)
* [Overview](#overview)
* [Usage](#usage)

    * [Basic Example](#basic-example)
* [API Reference](#api-reference)

    * [`CSSRulesMatcher` Class](#cssrulesmatcher-class)
* [Properties](#properties)

## Installation

Install via npm or yarn:

```bash
npm install css-rules-matcher --save
# or
yarn add css-rules-matcher
```

**CDN:**
```html
<script src="https://unpkg.com/css-rules-matcher@0.0.8/dist/css-rules-matcher.umd.cjs"></script>
```

## Overview

Modern browsers have removed `window.getMatchedCSSRules` from their APIs, making it difficult to introspect which CSS rules apply to a given element. `css-rules-matcher` fills this gap by providing a simple interface to retrieve matched CSS rules for specific CSS properties.

* **Lightweight**: No runtime dependencies.
* **Fast**: Parses only the specified properties.

## Usage

### Basic Example

```ts
import CSSRulesMatcher from 'css-rules-matcher';

// Create a matcher for specific CSS properties
const matcher = new CSSRulesMatcher({
  properties: ['background-color', 'color', 'font-size'],
});

// Select an element
const el = document.querySelector('.content');

// Get matched CSS rules
const rules = matcher.getMatchedCSSRules(el);

console.log(rules); // Array of CSSStyleRule objects
```

> **Note**: When specifying `properties`, use **exact** CSS property names in kebab-case (e.g., `background-color`, not `background`).

## API Reference

### `CSSRulesMatcher` Class

#### Constructor

* `options.properties` **(required)**: An array of CSS property names (kebab-case) to match.

#### Methods

##### `getMatchedCSSRules(element: Element): CSSStyleRule[]`

Returns an array of `CSSStyleRule` objects matching the specified properties on the given DOM element.

* **Parameters**:

    * `element` (`Element`): The target element to inspect.
* **Returns**: `CSSStyleRule[]` – an array of matched CSS rules.

## Properties

* **Exact Matching**: Only rules that explicitly set one of the specified properties are returned.
* **Order**: Rules are returned in the order they appear in the active stylesheets.

---

*Issues, suggestions, and pull requests are welcome!  
Feel free to check out the  [GitHub](https://github.com/belousovjr/css-rules-matcher).*

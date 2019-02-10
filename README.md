# navpush

> 

![](https://img.shields.io/travis/com/nicholasray/navpush.svg?style=flat) [![NPM](https://img.shields.io/npm/v/navpush.svg)](https://www.npmjs.com/package/navpush) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save navpush
```

## Usage

```jsx
import React, { Component } from 'react';

import 'navpush/styles/Hamburger.css';
import 'navpush/styles/PushRight.css';
import { PushRight, Hamburger } from 'navpush';

class ExampleSite extends Component {
  render() {
    return (
      // navpush should go at the top of your body
      <PushRight
        header={ ( isOpen, toggle ) => (
          <div>
            <Hamburger onClick={ toggle } />
          </div>
        ) }
        nav={ ( isOpen, toggle ) => (
          <ul>
            <li>
              <a href="/Features">Features</a>
            </li>
            <li>
              <a href="/Contact">Contact</a>
            </li>
            <li>
              <a href="/About">About</a>
            </li>
          </ul>
        ) }
      >
        // Place your page's content here
        <section className="hero">Hello World!</section>
      </PushRight>
    );
  }
}

export default ExampleSite;
```

## License

MIT

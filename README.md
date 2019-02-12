# navpush

> 

![](https://img.shields.io/travis/com/nicholasray/navpush.svg?style=flat)
[![NPM](https://img.shields.io/npm/v/navpush.svg)](https://www.npmjs.com/package/navpush)
[![JavaScript Style
Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
![](https://img.shields.io/github/license/nicholasray/navpush.svg?style=flat)

## Install

```bash
npm install --save navpush
```

## Example

```jsx
import React, { Component } from 'react';

import 'navpush/styles/Hamburger.css';
import 'navpush/styles/PushRight.css';
import { PushRight, Hamburger } from 'navpush';

class ExampleSite extends Component {
  render() {
    return (
      <html>
        <body>
          {
            // navpush should go at the top of your body
          }
          <PushRight
            fixbox={ ( isOpen, toggle ) => (
              <div>
                <a className="logo" href="/">
                  Name of site
                </a>
                {
                  // Hamburger is added for convenience, but you can use whatever
                  // component you would like to trigger the open menu as long
                  // as you call the toggle function
                }
                <Hamburger onClick={ toggle } />
              </div>
            ) }
            nav={ ( isOpen, toggle ) => (
              <ul>
                <li>
                  <a href="/Features">Features</a>
                </li>
                <li>
                  <a href="/About">About</a>
                </li>
                <li>
                  <a href="/Contact">Contact</a>
                </li>
              </ul>
            ) }
          >
            {
              // Place your page's content as a child of navpush
            }
            <section className="hero">Hello World!</section>
          </PushRight>
        </body>
      </html>
    );
  }
}

export default ExampleSite;
```

## Styling

[CSS Modules](https://github.com/css-modules/css-modules) are supported by
importing the `navpush/styles/*.module.scss` files of your choice and passing
them to the relevant component(s) as props. Here is an example of using the
`Hamburger` and `PushRight` themes

```jsx

import React, { Component } from 'react';

import HamburgerTheme from 'navpush/styles/Hamburger.module.scss';
import PushRightTheme from 'navpush/styles/PushRight.module.scss';
import { PushRight, Hamburger } from 'navpush';

class ExampleSite extends Component {
  render() {
    return (
      <html>
        <body>
          {
            // navpush should go at the top of your body
          }
          <PushRight
            theme={ PushRightTheme }
            fixbox={ ( isOpen, toggle ) => (
              <div>
                <a className="logo" href="/">
                  Name of site
                </a>
                {
                  // Hamburger is added for convenience, but you can use whatever
                  // component you would like to trigger the open menu as long
                  // as you call the toggle function
                }
                <Hamburger theme={ HamburgerTheme } onClick={ toggle } />
              </div>
            ) }
            nav={ ( isOpen, toggle ) => (
              <ul>
                <li>
                  <a href="/Features">Features</a>
                </li>
                <li>
                  <a href="/About">About</a>
                </li>
                <li>
                  <a href="/Contact">Contact</a>
                </li>
              </ul>
            ) }
          >
            {
              // Place your page's content as a child of navpush
            }
            <section className="hero">Hello World!</section>
          </PushRight>
        </body>
      </html>
    );
  }
}

export default ExampleSite;
```

## License

MIT

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

import 'navpush/dist/styles/Hamburger.css';
import 'navpush/dist/styles/PushRight.css';
import { PushRight, Hamburger } from 'navpush';

class App extends Component {
  render() {
    // navpush should go at the top of your body
    return (
      <PushRight
        fixbox={ ( isOpen, toggle ) => {
          // for any of the off-canvas animations, you will need to place your
          // fixed elements inside the fixbox render prop
          return (
            <header>
              <a className="logo" href="/">
                Name of site
              </a>
              {
                // The exported Hamburger component is added for convenience, but you can use whatever
                // component you would like to trigger the open menu as long
                // as it calls the toggle callback
              }
              <Hamburger onClick={ toggle } />
            </header>
          );
        } }
        nav={ ( isOpen, toggle ) => {
          // place all your nav content here. You can also include a close
          // button and pass it the toggle callback to close the menu.
          return (
            <div>
              <button className="CloseBtn" onClick={ toggle } />
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
            </div>
          );
        } }
      >
        {( isOpen, toggle ) => {
          // Place your page's content (elements that are not fixed) as children
          return <section className="hero">Hello World!</section>;
        }}
      </PushRight>
    );
  }
}

export default App;
```

## Styling

[CSS Modules](https://github.com/css-modules/css-modules) are supported by
importing the `navpush/styles/*.module.scss` files of your choice and passing
them to the relevant component(s) as props. Here is an example of using the
`Hamburger` and `PushRight` themes

```jsx
import React, { Component } from 'react';

import HamburgerTheme from 'navpush/dist/styles/Hamburger.module.scss';
import Theme from 'navpush/dist/styles/PushRight.module.scss';
import { OverlayLeft, Hamburger } from 'navpush';

class App extends Component {
  render() {
    return (
      <OverlayLeft
        theme={ Theme }
        nav={ ( isOpen, toggle ) => <div>Sidebar content</div> }
      >
        {( isOpen, toggle ) => (
          <div>
            <header>
              <Hamburger theme={ HamburgerTheme } onClick={ toggle } />
            </header>
            <section className="hero">Hello World!</section>;
          </div>
        )}
      </OverlayLeft>
    );
  }
}

export default App;
```

## License

MIT

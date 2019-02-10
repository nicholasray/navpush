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
            header={ ( isOpen, toggle ) => (
              <div>
                <a className="logo" href="/">
                  Name of site
                </a>
                {
                  // Hamburger is added for convenience but you can use whatever
                  // component you would like to trigger the open menu as long
                  // as you pass the toggle function
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

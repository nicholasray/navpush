import React from 'react';

const factory = strategy => {
  class NavPush extends React.Component {
    constructor( props ) {
      super( props );

      this.state = {
        isMounted: false,
        isOpen: false,
      };

      this.toggle = this.toggle.bind( this );
    }

    componentDidMount() {
      this.setState( {
        isMounted: true
      } );
    }

    componentWillUnmount() {
      // in case we unmount when the overlay is open
      window.removeEventListener( 'scroll', this.toggle );
    }

    toggle() {
      this.state.isOpen
        ? window.removeEventListener( 'scroll', this.toggle )
        : window.addEventListener( 'scroll', this.toggle );

      this.setState( {
        isOpen: !this.state.isOpen
      } );
    }

    render() {
      const Renderer = strategy.renderer;

      return (
        <Renderer strategy={ strategy } isOpen={ this.state.isOpen } isMounted={ this.state.isMounted } onToggle={ this.toggle } { ...this.props } />
      );
    }
  }

  NavPush.direction = strategy.direction;
  NavPush.renderer = strategy.renderer;

  return NavPush;
};

export default factory;

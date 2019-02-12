import setup from '../../../Factory';

export default setup( {
  direction: 'top',
  fixbox: {
    getStyles( { nav, props, isOpen } ) {
      if ( !isOpen ) return {};

      return {
        transform: `translate3d(0, ${nav.getHeight()}px, 0)`
      };
    }
  },
  overlay: {
    getStyles( { nav, props, isOpen } ) {
      if ( !isOpen ) return {};

      return {
        transform: `translate3d(0, ${nav.getHeight()}px, 0)`
      };
    }
  },
  canvas: {
    getStyles( { nav, props, isOpen } ) {
      if ( !isOpen ) return {};

      return {
        transform: `translate3d(0, ${nav.getHeight()}px, 0)`
      };
    }
  }
} );

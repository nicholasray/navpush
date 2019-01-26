import setup from '../../../Factory';

export default setup( {
  direction: 'bottom',
  nav: {
    getStyles( { sidebar, props, isOpen } ) {
      if ( !isOpen ) return {};

      return {
        transform: `translate3d(0, -${sidebar.getHeight()}px, 0)`
      };
    }
  },
  canvas: {
    getStyles( { sidebar, props, isOpen } ) {
      if ( !isOpen ) return {};

      return {
        transform: `translate3d(0, -${sidebar.getHeight()}px, 0)`
      };
    }
  }
} );

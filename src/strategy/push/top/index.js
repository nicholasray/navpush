import setup from '../../../Factory';
import OffCanvas from '../../../renderer/OffCanvas';

export default setup( {
  direction: 'top',
  renderer: OffCanvas,
  fixbox: {
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

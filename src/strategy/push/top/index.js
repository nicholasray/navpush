import setup from '../../../index.js';

export default setup({
  direction: 'top',
  nav: {
    getStyles({ sidebar, props, isOpen }) {
      if (!isOpen) return {};

      return {
        transform: `translate3d(0, ${sidebar.getHeight()}px, 0)`
      };
    }
  },
  canvas: {
    getStyles({ sidebar, props, isOpen }) {
      if (!isOpen) return {};

      return {
        transform: `translate3d(0, ${sidebar.getHeight()}px, 0)`
      };
    }
  }
});

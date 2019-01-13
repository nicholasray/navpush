import setup from '../../index.js';

const push = {
  defaults: {
    direction: 'right'
  },
  directions: ['top', 'bottom', 'left', 'right'],
  nav: {
    getStyles({ sidebar, props, isOpen }) {
      if (!isOpen) return {};

      return ({
        top: () => ({
          transform: `translate3d(0, ${sidebar.getHeight()}px, 0)`
        }),
        bottom: () => ({
          transform: `translate3d(0, -${sidebar.getHeight()}px, 0)`
        })
      }[props.direction] ||
        (() => {
          return {};
        }))();
    }
  },
  canvas: {
    getStyles({ sidebar, props, isOpen }) {
      if (!isOpen) return {};

      return ({
        top: () => ({
          transform: `translate3d(0, ${sidebar.getHeight()}px, 0)`
        }),
        bottom: () => ({
          transform: `translate3d(0, -${sidebar.getHeight()}px, 0)`
        })
      }[props.direction] ||
        (() => {
          return {};
        }))();
    }
  }
};

export default setup(push);

import setup from '../ContainerHOC';
import PropTypes from 'prop-types';

const Container = setup( 'Overlay' );

Container.propTypes = Object.assign(
  {},
  Container.propTypes,
  {
    onClick: PropTypes.func,
    onTouchStart: PropTypes.func,

  }
);

export default Container;

import React from 'react';
import cx from 'classnames';

const Canvas = ({ children, onClick, theme, dimmed, styles, classes }) => {
  return (
    <div
      onClick={onClick}
      style={styles}
      className={cx(theme['Canvas'], classes)}
    >
      {children}
    </div>
  );
};

export default Canvas;

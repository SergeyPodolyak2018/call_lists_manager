import React, { ForwardedRef, LegacyRef } from 'react';
import styles from './button.module.scss';

const buttonData = {
  left: '<',
  right: '>',
  endLeft: '<<',
  endRight: '>>',
};

export interface IIconButtonProps extends React.HTMLProps<HTMLElement> {
  type: 'left' | 'right' | 'endLeft' | 'endRight';
  click: (...args: any[]) => void;
  disable?: boolean;
}

const PaginationButton = React.forwardRef((props: IIconButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
  const { click, type, disable } = props;

  return (
    <button
      ref={ref}
      className={`${styles.button} ${disable ? styles.disable : ''}`}
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
        if (!props.disable) click(e);
      }}
      disabled={disable}
      title={props.title}
    >
      {buttonData[type]}
    </button>
  );
});
PaginationButton.displayName = 'IconButton';
export default PaginationButton;

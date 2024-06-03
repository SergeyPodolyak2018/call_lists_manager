import React, { ForwardedRef, LegacyRef } from 'react';
import styles from './button.module.scss';

export interface IIconButtonProps extends React.HTMLProps<HTMLElement> {
  title?: string;
  click: (...args: any[]) => void;
  style?: any;
  active?: boolean;
  disable?: boolean;
  ref?: LegacyRef<HTMLButtonElement>;
}

const MenuButton = React.forwardRef((props: IIconButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
  const { click, type, style = {}, disable, active, ...rest } = props;

  return (
    <button
      ref={ref}
      className={`${styles.button} ${active ? styles.active : ''} ${disable ? styles.disable : ''}`}
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
        if (!props.disable) click();
      }}
      style={style}
      disabled={disable}
      {...rest}
      title={props.title}
    >
      <span className={`fonticon ${styles.icon}`} />
      <span className={`fonticon icon-settings-gear`} />
    </button>
  );
});
MenuButton.displayName = 'IconButton';
export default MenuButton;

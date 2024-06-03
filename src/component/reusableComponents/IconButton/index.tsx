import React, { ForwardedRef, LegacyRef } from 'react';
import styles from './button.module.scss';

export type ScheduleBtnType =
  | 'export'
  | 'import'
  | 'delete'
  | 'edite'
  | 'insert'
  | 'filter'
  | 'ellipsis'
  | 'gear'
  | 'checked'
  | 'stop'
  | 'controlStop'
  | 'controlPlay'
  | 'expand'
  | 'collapse'
  | 'eye'
  | 'refresh'
  | 'phones'
  | 'phone'
  | 'info'
  | 'dock';

type TButtonData = {
  [key in ScheduleBtnType]: string;
};

const buttonData: TButtonData = {
  export: 'icon-download',
  import: 'icon-page-single',
  delete: 'icon-trash',
  insert: 'icon-plus',
  edite: 'icon-pencil',
  filter: 'icon-filter',
  ellipsis: 'icon-ellipsis',
  gear: 'icon-settings-gear',
  checked: 'icon-checkbox-tick checked',
  stop: 'icon-stop',
  controlStop: 'icon-iw-control-circle-stop',
  controlPlay: 'icon-iw-control-circle-play',
  expand: 'icon-expand-down',
  collapse: 'icon-expand-up',
  eye: 'icon-inspect',
  refresh: 'icon-refresh',
  phones: 'icon-phones',
  phone: 'icon-phone',
  info: 'icon-info',
  dock: 'icon-doc-list',
};

export interface IIconButtonProps extends React.HTMLProps<HTMLElement> {
  type: ScheduleBtnType;
  subType?: ScheduleBtnType;
  title?: string;
  click: (...args: any[]) => void;
  style?: any;
  active?: boolean;
  disable?: boolean;
  ref?: LegacyRef<HTMLButtonElement>;
}

const IconButton = React.forwardRef((props: IIconButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
  const { name, click, type, subType, style = {}, disable, active, ...rest } = props;

  return (
    <button
      ref={ref}
      className={`${styles.button} ${active ? styles.active : ''} ${disable ? styles.disable : ''}`}
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
        if (!props.disable) click(e);
      }}
      style={style}
      disabled={disable}
      {...rest}
      title={props.title}
    >
      {name}
      <span style={name ? { paddingLeft: '5px' } : {}} className={`fonticon ${buttonData[type]}`} />
      {subType && <span className={`fonticon ${buttonData[subType]} ${styles.subIcon}`} />}
    </button>
  );
});
IconButton.displayName = 'IconButton';
export default IconButton;

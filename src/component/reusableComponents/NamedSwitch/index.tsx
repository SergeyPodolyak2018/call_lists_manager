import React from 'react';
import styles from './namedSwitch.module.scss';
import classnames from 'classnames';

export interface ICheckbox extends React.HTMLProps<HTMLElement> {
  onClick?: (e: React.MouseEvent) => void;
  checked?: boolean;
  customStyle?:any;
  tooltipOn?:string;
  tooltipOff?:string;
  nameOn: string;
  nameOff: string;
}


const NamedSwitch = (props: ICheckbox) => {
  const { onClick, checked, customStyle, tooltipOn, tooltipOff} = props;

  return (
    <div className={classnames({
      [styles.wrapper]: true,
      })}
      style={customStyle}
      onClick={onClick}
    >
      <div className={classnames({
          [styles.name]: true,
        })}>{checked?props.nameOn:props.nameOff}</div>
      <div
        className={classnames({
          [styles.switch]: true,
          [styles['switch--checked']]: checked,
        })}
        title={checked?tooltipOn:tooltipOff}
      >

      <div className={classnames({
        [styles.round]: true,
        [styles['round--checked']]: checked,
      })}>
      </div>
    </div>
  </div>
   
  );
};

export default NamedSwitch;

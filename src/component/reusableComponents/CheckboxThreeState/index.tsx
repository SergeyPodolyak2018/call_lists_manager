import React, {useState,useRef} from 'react';
import styles from './checkboxThreeState.module.scss';
import classnames from 'classnames';
import useOutsideClick from 'src/hooks/outsideClick';
import useStateRef from 'react-usestateref';

export interface ICheckbox extends React.HTMLProps<HTMLElement> {
  customStyle?:any;
  tooltip?:string;
  name?: string;
  state: 0 | 1 | 2
  actionList? : {
    name:string,
    action:()=>void
  }[]
}

const CheckboxThreeState = (props: ICheckbox) => {
  const {customStyle, tooltip, state, actionList} = props;
  const [dropdown, setDropDown, dropdownRef] = useStateRef(false);
  const elementRef = useRef<HTMLDivElement | null>(null);


  

  const openDropdown = (e:React.MouseEvent)=>{
    e.preventDefault();
    e.stopPropagation();
    const x = e.clientX;
    const y = e.clientY;

    if(elementRef.current){
      if(!dropdown){
        elementRef.current.style.display='block';
        elementRef.current.style.left=x+10+'px';
        elementRef.current.style.top=y+10+'px';
        setDropDown(true);
      }else{
        elementRef.current.style.display='none';
        setDropDown(false);
      }
    }
  }

  const closeDropdown = ()=>{
    if(elementRef.current){
      if(dropdownRef.current){
        elementRef.current.style.display='none';
        setDropDown(false);
      }
    }
  }
  useOutsideClick(closeDropdown)

  return (
    <div
      className={styles.checkbox_wrapper}
      style={customStyle}
      title={tooltip}
      onClick={openDropdown}
    >
      <i
      className={classnames({
        'ng-grid-checkbox-multi-state ark-checkbox': true,
        'icon-checkbox': state===0,
        'icon-select-yes checked': state===1,
        'icon-checkbox-tick checked': state===2,
      })}
      />
        <div className={styles.dropdown} ref={elementRef}>
          {actionList?.map((el, index)=><div key={index}onClick={(e:React.MouseEvent)=>{
            e.preventDefault();
            e.stopPropagation();
            el.action();
            closeDropdown();
          }}>{el.name}</div>)}
        </div>
      
    </div>
  );
};

export default CheckboxThreeState;

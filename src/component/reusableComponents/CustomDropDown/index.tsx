import React, { useState, useRef, useEffect } from 'react';
import './customDropDown.scss';
import { DropDownTypes, IDropDownFlex } from 'src/interfaces/dropDown';
import { cloneDeep } from 'lodash';
let flag = true;

const CustomDropdown: React.FC<IDropDownFlex> = (props: IDropDownFlex) => {
  const { type, validation, onSelectAction, options, style, optionsPanelColor, preopenAction } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggleDropdown = () => {
    if (!isOpen && preopenAction) {
      preopenAction();
    }
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (option: any) => {
    setSelectedOption(option);
    onSelectAction(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const [opts, setOpts] = useState(options);
  
  useEffect(() => {
      setOpts(options);
  }, [options]);
  
  const executer = (arr:Array<any>, length = 5, fn:any) => {
    Array.from({length}, () => fn).map(f=>f());
    return arr;
  };
  
  const downUp = (arr:Array<any>, length = 5) => executer(arr, length,() => (arr.push(arr.shift() as any)));
  const upDown = (arr:Array<any>, length = 5) => executer(arr, length,() => (arr.unshift(arr.pop() as any)));

  const shift = (target:any, scrollTop:number, halfFloorLen:number, halfCeilHeight:number, fn:any, isSum:boolean)=>{
    flag = false;
    setOpts(cloneDeep(fn(opts, halfFloorLen)));
    target.scrollTo(0,isSum ? scrollTop + halfCeilHeight : scrollTop - halfCeilHeight);
    flag = true;
  }

  const handle = (event: any) => {
    const tenPercent = Math.ceil(opts.length / 10) * 36;
    const maxScrollTop = Math.ceil(opts.length * 36) - 99;
    const scrollTop = event.target.scrollTop as any;
    const halfFloorLen = Math.floor(opts.length / 2);
    const halfCeilHeight = (36*Math.ceil(opts.length/2));
    if ((scrollTop < tenPercent) && flag)  shift(event.target, scrollTop, halfFloorLen, halfCeilHeight, downUp,true);
    if (((maxScrollTop - scrollTop) < tenPercent) && flag)  shift(event.target, scrollTop, halfFloorLen, halfCeilHeight, upDown,false);
  };

  const [init, setInit] = useState(false);
  useEffect(() => {
    if(!init && props.circled) {
      setOpts(downUp(opts,Math.floor(opts.length/2)));
      setInit(true);
    }
  }, [opts]);


  useEffect(() => {
    if (isOpen && props.circled) {
      const optEl = dropdownRef?.current?.querySelector('.dropdown-options');
      optEl?.addEventListener('scroll', handle);
      optEl?.scrollTo(0,36*Math.ceil(opts.length/2));
      return () => {
        optEl?.removeEventListener('scroll', handle);
      };
    } else {
      flag = true;
    }
  }, [isOpen]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`custom-dropdown ${props.disabled ? 'disabled' : ''}`} ref={dropdownRef} style={style}>
      <div className="dropdown-header" onClick={handleToggleDropdown}>
        <span className={`dropdown-header-text ${props.placeholder && !props.value ? 'placeHolderText' : ''}`}>
          {props.value || props.placeholder || 'Select an option'}
        </span>

        <span className={`icon-arrow-accordion icon ${isOpen ? 'up' : 'down'}`}></span>
      </div>
      {isOpen && (
        <div className={`dropdown-options`} style={optionsPanelColor ? { backgroundColor: optionsPanelColor } : {}}>
          {opts.map((option, index) =>
            !validation && type !== DropDownTypes.OTHER ? null : type === DropDownTypes.OTHER ||
              validation?.includes(option.optionLabel) ? (
              <div
                key={index}
                className={optionsPanelColor ? `dropdown-option-custom` : `dropdown-option`}
                onClick={() => {
                  handleSelectOption(
                    type === DropDownTypes.IMPORT_MODE || type === DropDownTypes.OTHER
                      ? option.optionKey
                      : {
                          optMethod: type === DropDownTypes.OPT_TYPE ? option.optionLabel : '',
                          dialMode: type === DropDownTypes.DIAL_MODE ? option.optionLabel : '',
                        },
                  );
                }}
              >
                {option.optionLabel}
              </div>
            ) : (
              <p key={index}></p>
            ),
          )}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;

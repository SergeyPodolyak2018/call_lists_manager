import React, { ChangeEventHandler, ReactEventHandler, useEffect, useRef, useState } from 'react';
import './Buttons.scss';
import { useTranslation } from 'react-i18next';

type TProps = {
  buttons: any[];
  value: any;
  change?: any;
  duration?: number;
  width?: number;
  disable?: boolean;
};

let timeoutId: any;
const ButtonsGroup = (props: TProps) => {
  const { t } = useTranslation();
  const findButtonIndex = () => props.buttons.map(o => o.name).indexOf(props.value);
  const [value, setValue] = useState(props.value);
  const [bIndex, setBIndex] = useState(findButtonIndex());

  const duration = props.duration || 300;

  const getStyles = () => {
    const off: any = [];
    const num = props.width || 100;
    props.buttons.forEach((o: any, i: any) => {
      off.push(`.box.b-${o.name}${i} {transform: translateX(${num * i}px);}`);
    });
    return `.buttons-group .box, .buttons-group label{width: ${num}px;}
    ${off.join('\n')}\n.anime{transition: all ease-in-out 0.${duration / 100}s !important;}\n`;
  };

  const change = (button: any, index: any, flag = true) => {
    if (!props.disable) {
      clearTimeout(timeoutId);
      setValue(button.name);
      setBIndex(index);
      timeoutId = setTimeout(() => {
        props.change && props.change(button.name, flag);
      }, duration);
    }
  };

  useEffect(() => {
    if (props.value === value) return;
    change(
      props.buttons.find(b => b.name === props.value),
      findButtonIndex(),
      false,
    );
  }, [props.value]);

  return (
    <>
      <style>{getStyles()}</style>
      <div className={'buttons-group'}>
        <div className={'bg-wrap'}>
          <div className={`box b-${value}${bIndex} anime`} />
          {props.buttons.map((button, index) => {
            return (
              <label htmlFor={`butt${index}`} key={index}>
                <input
                  onChange={() => change(button, index)}
                  id={`butt${index}`}
                  type="radio"
                  checked={value === button.name}
                />
                <span>{t(button.caption)}</span>
              </label>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ButtonsGroup;

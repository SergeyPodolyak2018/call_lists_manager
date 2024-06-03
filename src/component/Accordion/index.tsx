import React, { useState, ReactNode, useEffect } from 'react';
import styles from './accordion.module.scss';
import { useSelector } from 'react-redux';
import { getCampaignsToggle } from 'src/redux/selectors/campaignSelectors';
import { relative } from 'path';
interface AccordionProps {
  title: ReactNode;
  children: ReactNode;
  isForceOpen?: boolean;
  disabled?: boolean;
  ml: string;
  onClickCallBack: () => void;
  selected?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ title, children, disabled, ml, onClickCallBack, selected }) => {
  const toggle = useSelector(getCampaignsToggle);

  useEffect(() => {
    if (disabled) return;
    setIsOpen(toggle.expand);
  }, [toggle]);
  const [isOpen, setIsOpen] = useState(false);
  const toggleAccordion = () => {
    if (disabled) return;
    onClickCallBack();
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${disabled ? styles.disabledAccordion : styles.accordion}  ${isOpen ? styles.active : ''}`}>
      <div
        style={{
          backgroundColor: `${selected ? 'lightgray' : '#f6f7f9'}`,
        }}
        className={styles.header}
      >
        <div style={{ width: '20px' }}>
          <span
            style={{ left: ml, position: 'relative', cursor: 'pointer' }}
            onClick={toggleAccordion}
            className={`icon-arrow-accordion custom-arrow ${isOpen ? 'rotate-up' : 'rotate-down'}`}
          ></span>
        </div>

        {title}
      </div>
      {isOpen && <div className={styles.content}>{children}</div>}
    </div>
  );
};

export default Accordion;

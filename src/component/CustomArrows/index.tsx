import { D } from 'src/styles/genesys-webcomponents/p-ec1ea945';
import styles from './customArrows.module.scss';

interface ICustomArrowsProps {
  minValue?: number;
  maxValue?: number;
  value?: number;
  disabled?: boolean;
  isRightValue?: boolean;
  onIncrease: () => void;
  onDecrease: () => void;
}

export const CustomArrows = (props: ICustomArrowsProps) => {
  if (props.disabled) {
    return <></>;
  }

  return (
    <div className={styles.arrowsHolder}>
      <div
        onClick={() => {
          if (props.maxValue && props.value === props.maxValue) return;
          props.onIncrease();
        }}
      >
        <span className={`icon-arrow-accordion ${styles.up} ${styles.customArrow}`}></span>
      </div>
      <div
        onClick={() => {
          if (props.value !== undefined && props.value === 0) return;
          props.onDecrease();
        }}
      >
        <span className={`icon-arrow-accordion  ${styles.customArrow}`}></span>
      </div>
    </div>
  );
};

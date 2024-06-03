import { IncludedGroups } from 'src/api/ts/constants/codes';
import '../CampaignInfoComponent';
import styles from './TdSection.module.scss';
import { TCallingListsRecordsResponse } from 'src/api/ts/interfaces/CallingLists.response';
import { ReactNode } from 'react';
import { ToolTip } from '../reusableComponents/ToolTip';

interface TdSectionProps {
  info: string;
  paddingLR?: number;
  bagroundColor?: string;
  column?: string;
  included?: TCallingListsRecordsResponse['included'];
  fildsMap?: typeof IncludedGroups;
  useIncluded?: boolean;
  onClick?: any;
  style?: any;
}

const TdSection = (props: TdSectionProps) => {
  const text = props.info !== 'None' ? props.info : '';

  const getIncludedField = (text: string | number): ReactNode => {
    if (
      props.included &&
      props.fildsMap &&
      props.column &&
      props.column in props.fildsMap &&
      typeof text === 'number'
    ) {
      const includeSection =
        props.included[props.fildsMap[props.column as keyof typeof props.fildsMap] as keyof typeof props.included];
      if (includeSection) {
        const ditailsElement = includeSection.find(el => el.id === text);
        if (ditailsElement) {
          return (
            <span className={styles.data_wrapper}>
              <span className={styles.name}>{ditailsElement.name}</span>
              <span className={styles.id}>{ditailsElement.id}</span>
              <span className={`${styles.info} fonticon icon-info`} />
            </span>
          );
        }
      }
    }
    return <span>{text}</span>;
  };

  return (
    <td
      colSpan={1}
      style={{
        paddingLeft: props.paddingLR,
        paddingRight: props.paddingLR,
        background: props.bagroundColor,
        ...props.style,
      }}
      className={'text'}
    >
      {['daily_from', 'daily_till'].includes(props.column || '') ? (
        <input className={styles.noInputTime} type="time" defaultValue={text} />
      ) : props.useIncluded && props.fildsMap && props.column && props.column in props.fildsMap ? (
        getIncludedField(text)
      ) : (
        <ToolTip label={text?.toString()}>
          <span onClick={props.onClick}>{text}</span>
        </ToolTip>
      )}
    </td>
  );
};

export default TdSection;

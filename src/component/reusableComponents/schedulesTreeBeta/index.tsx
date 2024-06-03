import React from 'react';
import styles from './tree.module.scss';
import styles2 from 'src/component/reusableComponents/NewCallingList/NewCallingList.module.scss';
import CfgFolder from './cfgFolder';
import { EClass } from 'src/api/ts/interfaces/FindFolders.response';
import CfgSchedule from './cfgSchedule';
import ConfirmEditAll from '../ConfirmEditAll';
import { useSelector } from 'react-redux';
import { getActiveListSelector, getConfirmDeleteSelector } from 'src/redux/selectors/schedulesListsSelectors';
import { deleteListsRecord, setConfirmDeleteSelector } from 'src/redux/actions/scheduleListsActions';
import { useAppDispatch } from 'src/redux/hooks';

export type TTreeRoot = {
  data: any | any[];
};
export const SchedulesTreeRootBeta = (props: TTreeRoot) => {

  const active = useSelector(getActiveListSelector);
  const confirm = useSelector(getConfirmDeleteSelector);
  const dispatch = useAppDispatch();

  return (
    <>
      {confirm && (
        <>
          <div className={styles2.popUp} />
          <div className={styles2.subPopUp} style={{width:'30%', top:'10%'}}>
            <ConfirmEditAll
              title={'Delete'}
              message={`Are you sure you want to delete ${active.name}?`}
              close={() => {
                dispatch(setConfirmDeleteSelector(false));
              }}
              callBack={() => {

                dispatch(deleteListsRecord(active));


              }}
            />
          </div>
        </>
      )}
      <div className={styles.container}>
        {props.data.map((el:any, i:number) =>
          el.$class === EClass.FOLDER ? (
              <CfgFolder margin={20} key={`${el.id}${i}`} data={el} />
            ) :
            el.$class === EClass.SCRIPT ?(
              <CfgSchedule margin={20} key={`${el.id}${i}`} data={el} />
            ) :(<></>)
        )}
      </div>
    </>
  );
};

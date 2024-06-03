import React, { useState } from 'react';
import styles from '../tree.module.scss';
import { TScheduleResponse } from 'src/api/ts/interfaces/ScheduleLists.response';
import { EClass } from 'src/api/ts/interfaces/FindFolders.response';
import Utils from 'src/helper/utils';
import { IItemsInCallingLists } from 'src/redux/reducers/callingListsReducer';
import CfgSchedule from '../cfgSchedule';

import { useAppDispatch } from 'src/redux/hooks';
import { useSelector } from 'react-redux';
import {
  getSchedules,
  setScheduleActive,
  setExpandCallingListsRecords,
  setScheduleFolderActive,
} from 'src/redux/actions/scheduleListsActions';
import { getActiveFolderSelector, isExpanded, isFolderLoading } from 'src/redux/selectors/schedulesListsSelectors';
import Spinner from '../../spinner';

export type TCfgFolder = {
  data: TScheduleResponse;
  margin: number;
};
const CfgFolder = (props: any) => {
  //const [expand, setExpand] = useState(false);

  const activeFolder = useSelector(getActiveFolderSelector);
  // console.log(activeFolder);
  const isExpand = useSelector(isExpanded(props.data.id));
  const isLoading = useSelector(isFolderLoading(props.data.id));
  const dispatch = useAppDispatch();
  const handleTogle = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isExpand) {
      dispatch(getSchedules({ parentId: props.data.id }));
    } else {
      dispatch(setExpandCallingListsRecords({ id: props.data.id }));
    }
  };

  return (
    <div className={styles.tree_node}>
      <div
        onClick={e => {
          dispatch(setScheduleActive(null));
          dispatch(setScheduleFolderActive(props.data));
        }}
        className={`${styles.node_toggle} ${isExpand ? styles.expand : ''} ${
          activeFolder.id === props.data.id ? styles.active : ''
        }`}
      >
        {isLoading ? (
          <Spinner style={{ marginLeft: `${props.margin}px` }} />
        ) : (
          <>
            <div
              onClick={handleTogle}
              style={{
                marginLeft: `${props.margin - 10}px`,
                marginRight: '-4px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '20px',
                height: '20px',
              }}
            >
              <div className={`${styles.arrow_left} ${isExpand && props.data.items.length > 0 ? styles.rotate : ''}`} />
            </div>
          </>
        )}
        <span slot="icon" className={`textIcon ${Utils.getIcon(props.data.$class)} ${styles.icon}`} /> {props.data.name}
      </div>
      {isExpand && (
        <div className={styles.child_nodes}>
          {props.data.items.map((childNode: any) =>
            childNode.$class === EClass.FOLDER ? (
              <CfgFolder margin={props.margin + 20} key={childNode.id} data={childNode} />
            ) : (
              <CfgSchedule margin={props.margin + 20} key={childNode.id} data={childNode} />
            ),
          )}
        </div>
      )}
    </div>
  );
};
export default CfgFolder;

import React, { useState } from 'react';
import styles from '../tree.module.scss';
import { TCallingListsObjectsResponse } from 'src/api/ts/interfaces/CallingLists.response';
import { EClass } from 'src/api/ts/interfaces/FindFolders.response';
import Utils from 'src/helper/utils';
import { IItemsInCallingLists } from 'src/redux/reducers/callingListsReducer';
import CfgCallingLists from '../cfgCallingList';

import { useAppDispatch } from 'src/redux/hooks';
import { useSelector } from 'react-redux';
import { getCallingListsObjects, setExpandCallingListsRecords } from 'src/redux/actions/callingLitssActions';
import { isExpanded, isFolderLoading } from 'src/redux/selectors/callingListsSelectors';
import Spinner from '../../spinner';

export type TCfgFolder = {
  data: TCallingListsObjectsResponse;
  margin: number;
};
const CfgFolder = (props: TCfgFolder) => {
  //const [expand, setExpand] = useState(false);
  const isExpand = useSelector(isExpanded(props.data.id));
  const isLoading = useSelector(isFolderLoading(props.data.id));
  const dispatch = useAppDispatch();
  const disabled = props.data.state === 2;
  const handleTogle = () => {
    if (disabled) return;
    if (!isExpand) {
      dispatch(getCallingListsObjects({ parentId: props.data.id }));
    } else {
      dispatch(setExpandCallingListsRecords({ id: props.data.id }));
    }
  };

  return (
    <div className={`${disabled ? styles.disabledObject : ''} ${styles.tree_node}`}>
      <div onClick={handleTogle} className={`${styles.node_toggle} ${isExpand ? styles.expand : ''}`}>
        {isLoading ? (
          <Spinner style={{ marginLeft: `${props.margin}px` }} />
        ) : (
          <div
            className={`${styles.arrow_left} ${isExpand && props.data.items.length > 0 ? styles.rotate : ''}`}
            style={{ marginLeft: `${props.margin}px` }}
          />
        )}
        <span slot="icon" className={`textIcon ${Utils.getIcon(props.data.$class)} ${styles.icon}`} /> {props.data.name}
      </div>
      {isExpand && (
        <div className={styles.child_nodes}>
          {props.data.items.map(childNode =>
            childNode.$class === EClass.FOLDER ? (
              <CfgFolder margin={props.margin + 20} key={childNode.id} data={childNode} />
            ) : (
              <CfgCallingLists margin={props.margin + 20} key={childNode.id} data={childNode} />
            ),
          )}
        </div>
      )}
    </div>
  );
};
export default CfgFolder;

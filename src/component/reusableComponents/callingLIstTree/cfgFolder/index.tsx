import React, { useState } from 'react';
import styles from '../tree.module.scss';
import { TCallingListsObjectsResponse } from 'src/api/ts/interfaces/CallingLists.response';
import { EClass } from 'src/api/ts/interfaces/FindFolders.response';
import Utils from 'src/helper/utils';
import { IItemsInCallingLists } from 'src/redux/reducers/callingListsReducer';
import CfgCallingLists from '../cfgCallingList';
import { useAppDispatch } from 'src/redux/hooks';
import { getCallingListsObjects } from 'src/redux/actions/callingLitssActions';

export type TCfgFolder = {
  data: TCallingListsObjectsResponse;
};
const CfgFolder = (props: TCfgFolder) => {
  const [expand, setExpand] = useState(false);
  const dispatch = useAppDispatch();
  const handleTogle = () => {
    setExpand(!expand);
    if (!expand) {
      dispatch(getCallingListsObjects({ parentId: props.data.id }));
    }
  };

  return (
    <div className={styles.tree_node}>
      <div onClick={handleTogle} className={`${styles.node_toggle} ${expand ? styles.expand : ''}`}>
        <div className={`${styles.arrow_left} ${expand ? styles.rotate : ''}`}></div>
        <span slot="icon" className={`textIcon ${Utils.getIcon(props.data.$class)} ${styles.icon}`} /> {props.data.name}
      </div>
      {expand && (
        <ul className={styles.child_nodes}>
          {props.data.items.map(childNode => (
            <li key={childNode.id}>
              {childNode.$class === EClass.FOLDER ? (
                <CfgFolder data={childNode} />
              ) : (
                <CfgCallingLists data={childNode} />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default CfgFolder;

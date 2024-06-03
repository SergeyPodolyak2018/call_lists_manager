import React from 'react';
import styles from './tree.module.scss';
import { TCallingListsObjectsResponse } from 'src/api/ts/interfaces/CallingLists.response';
import Utils from 'src/helper/utils';
import CfgFolder from './cfgFolder';
import { EClass } from 'src/api/ts/interfaces/FindFolders.response';
import CfgCallingLists from './cfgCallingList';
import { IItemsInCallingLists } from 'src/redux/reducers/callingListsReducer';

export type TCallingListTreeRoot = {
  data: IItemsInCallingLists;
};
export const CallingListTreeRoot = (props: TCallingListTreeRoot) => {
  return (
    <div className={styles.container}>
      <ul style={{ listStyleType: 'none', paddingLeft: '20px' }}>
        {props.data.map(el => (
          <li key={el.id}>{el.$class === EClass.FOLDER ? <CfgFolder data={el} /> : <CfgCallingLists data={el} />}</li>
        ))}
      </ul>
    </div>
  );
};

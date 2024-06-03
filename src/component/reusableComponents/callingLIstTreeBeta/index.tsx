import React from 'react';
import styles from './tree.module.scss';
import { TCallingListsObjectsResponse, TTableAccessResponse } from 'src/api/ts/interfaces/CallingLists.response';
import Utils from 'src/helper/utils';
import CfgFolder from './cfgFolder';
import { EClass } from 'src/api/ts/interfaces/FindFolders.response';
import CfgCallingLists from './cfgCallingList';
import { IItemsInCallingLists } from 'src/redux/reducers/callingListsReducer';
import CfgTableAccess from './CfgTableAccess';

export type TCallingListTreeRoot = {
  data: IItemsInCallingLists | TTableAccessResponse[];
};
export const CallingListTreeRootBeta = (props: TCallingListTreeRoot) => {
  return (
    <div className={styles.container}>
      {props.data.map(el =>
        el.$class === EClass.FOLDER ? (
          <CfgFolder margin={20} key={el.id} data={el} />
        ) : 
        el.$class === EClass.CALLING_LIST ?(
          <CfgCallingLists margin={20} key={el.id} data={el} />
        ):(
          <CfgTableAccess margin={20} key={el.id} data={el} />
        ),
      )}
    </div>
  );
};

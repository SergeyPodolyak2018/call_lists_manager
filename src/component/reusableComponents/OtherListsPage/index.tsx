import React from 'react';
import styles from './OtherListsPage.module.scss';
import { IItemsInCallingLists } from 'src/redux/reducers/callingListsReducer';
import { TTableAccessResponse } from 'src/api/ts/interfaces/CallingLists.response';
import { setEditPopUpAction } from 'src/redux/actions/callingLitssActions';
import { useAppDispatch } from 'src/redux/hooks';
import { EClass } from 'src/api/ts/interfaces/FindFolders.response';
import { TableAccessTypes } from 'src/api/ts/constants/codes';
import CfgTableAccess from '../callingLIstTreeBeta/CfgTableAccess';


export type TOtherListPage = {
  data: TTableAccessResponse[];
};
export const OtherListPage = (props: TOtherListPage) => {
  const dispatch = useAppDispatch();

  const defaultObject:TTableAccessResponse = {
    $class: EClass.TABLE_ACCESS,
    id: -1,
    name: TableAccessTypes[2],
    state: -1,
    weight: -1,
    tableAccessId: -1,
    dbAccessId: -1,
    dbTableNam: TableAccessTypes[2],
    tenantId: -1,
    type: 2
}

  const getData = (name:typeof TableAccessTypes[2] | typeof TableAccessTypes[11]):TTableAccessResponse=>{
    const object = props.data.find(el=>el.name === name);
    if(!object){
      return {...defaultObject, name:name}
    }
    return object;
  }
  const isConfigured = (name:typeof TableAccessTypes[2] | typeof TableAccessTypes[11]):boolean=>{
    const object = props.data.find(el=>el.name === name);
    if(!object){
      return false
    }
    return true
  }

  const clickHandler = () => {
    dispatch(
      setEditPopUpAction({
        open: true,
        type: 'do_not_call_list',
      }),
    );
    
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>Do Not Call List</div>
      <CfgTableAccess margin={20} data={getData(TableAccessTypes[11])} configured={isConfigured(TableAccessTypes[11])}/>
      <div className={styles.header}>Request Log</div>
      <CfgTableAccess margin={20} data={getData(TableAccessTypes[2])} configured={isConfigured(TableAccessTypes[2])}/>
    </div>
  );
};

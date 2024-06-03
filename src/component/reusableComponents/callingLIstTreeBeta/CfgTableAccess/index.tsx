import React, { useState } from 'react';
import styles from '../tree.module.scss';
import { TCallingListsObjectsResponse, TCallingListsResponse, TTableAccessResponse } from 'src/api/ts/interfaces/CallingLists.response';
import { EClass } from 'src/api/ts/interfaces/FindFolders.response';
import Utils from 'src/helper/utils';
import { IItemsInCallingLists } from 'src/redux/reducers/callingListsReducer';
import { useAppDispatch } from 'src/redux/hooks';
import { useSelector } from 'react-redux';
import { getActiveListSelector } from 'src/redux/selectors/callingListsSelectors';
import { getCallingList, getCallingListsRecords, setEditPopUpAction } from 'src/redux/actions/callingLitssActions';
import { useTranslation } from 'react-i18next';
import { TableAccessTypes } from 'src/api/ts/constants/codes';


export type TCfgTableAccess = {
  data: TTableAccessResponse;
  margin: number;
  configured?:boolean
};
const CfgTableAccess = (props: TCfgTableAccess) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const activeList = useSelector(getActiveListSelector);

  const clickHandler = () => {
    if(props.data.name === TableAccessTypes[11] && props.configured){
      dispatch(
        setEditPopUpAction({
          open: true,
          type: 'do_not_call_list',
        }),
      );
    }
    
  };

  return (
    <div
      className={`${styles.tree_node} ${styles.tree_node_end} ${styles.tree_node_end_flex}`}
      onClick={clickHandler}
    >
      <div className={`${styles.node_simple} `} style={{ marginLeft: `${props.margin}px` }}>
        <span slot="icon" className={`textIcon ${Utils.getIcon(props.data.$class)}`} style={{ height: '19px' }} />{' '}
        {props.data.name}
      </div>
      {!props.configured && <div className={styles.configInfo}>
        <div className="g-message-icon ui-icon icon-24 g-icon-alternative icon-stop-circle"></div>
         <div style={{marginLeft:'5px'}}className="g-message-text">{t('not_configured')}</div></div>}
    </div>
  );
};
export default CfgTableAccess;

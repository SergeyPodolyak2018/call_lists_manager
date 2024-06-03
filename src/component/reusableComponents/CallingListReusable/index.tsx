import React from 'react';
import styles from './callingList.module.scss';
import '../FolderReusable/campaignGroup.scss';
import { ITableInfo } from '../../../interfaces/tables';
import Utils from '../../../helper/utils';
import { useAppDispatch } from '../../../redux/hooks';
import { useSelector } from 'react-redux';
import { TCallingListsResponse } from 'src/api/ts/interfaces/CallingLists.response';
import { getCallingListsRecords } from 'src/redux/actions/callingLitssActions';
import { getActiveListSelector } from 'src/redux/selectors/callingListsSelectors';

export interface ICallingList {
  data: TCallingListsResponse;
  parentMargin: number;
  tableInfo: ITableInfo;
}

export const CallingListReusable = (callingListData: ICallingList) => {
  const { data, parentMargin } = callingListData;
  const dispatch = useAppDispatch();
  const activeList = useSelector(getActiveListSelector);

  const clickHandler = () => {
    dispatch(getCallingListsRecords({ listId: data.id}));
  };

  const classNames = ['headerContainer'];

  if (parentMargin > 0) {
    classNames.push('with-margin');
  }

  const ml = `${parentMargin + 20}px`;

  return (
    <div
      style={{ marginLeft: ml }}
      className={`${styles.container} ${activeList.id === data.id ? styles.active : ''}`}
      onClick={clickHandler}
    >
      <span slot="icon" className={`textIcon ${Utils.getIcon(data.$class)}`}></span>
      {data.name}
    </div>
  );
};

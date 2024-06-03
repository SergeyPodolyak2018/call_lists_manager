import React from 'react';
import { ITableInfo } from 'src/interfaces/tables';
import { TFindFoldersResponseStandartPart, EClass } from 'src/api/ts/interfaces/FindFolders.response';
import { TCallingListsObjectsResponse } from 'src/api/ts/interfaces/CallingLists.response';
import styles from './customTable.module.scss';
import { CampaignGroupReusable } from '../CampaignGroupReusable';
import { FolderReusable } from '../FolderReusable';
import Accordion from 'src/component/Accordion';

interface ICustomTableProps {
  tableInfo: ITableInfo;
  data: TFindFoldersResponseStandartPart[] | TCallingListsObjectsResponse[];
}

export const CustomTable = (props: ICustomTableProps) => {
  const { data, tableInfo } = props;
  return (
    <div className={styles.table}>
      <div className={`${styles.row} ${styles.header}`}>
        {tableInfo.columns.map((column, index) => (
          <div key={index} className={styles.cell}>
            {column.name}
          </div>
        ))}
      </div>
      <div className={styles.tableBody}>
        {data.map((el: TFindFoldersResponseStandartPart | TCallingListsObjectsResponse, index: number) =>
          el.$class === EClass.CAMPAIGN ? (
            <div key={index} className={`${styles.row}`}>
              <div key={index} className={styles.cell}>
                {/* <Accordion title="Section 1">
                  <p>Content for Section 1</p>
                </Accordion> */}
              </div>
            </div>
          ) : (
            <div key={index} className={`${styles.row}`}>
              <div key={index} className={styles.cell}>
                {/* <Accordion title="Section 1">
                  <p>Content for Section 1</p>
                </Accordion> */}
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
};

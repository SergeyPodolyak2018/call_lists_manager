import { ITableInfo } from '../../interfaces/tables';
import './table.scss';
import { CampaignGroupReusable } from '../reusableComponents/CampaignGroupReusable';
import {
  TFindFoldersResponseStandartPart,
  EClass,
  IFoundCfgCampaignGroup,
} from '../../api/ts/interfaces/FindFolders.response';
import { FolderReusable } from '../reusableComponents/FolderReusable';
import { TCallingListsObjectsResponse } from 'src/api/ts/interfaces/CallingLists.response';
import { CampaignGroupWithCallingList } from '../reusableComponents/CampaignGroupWithCallingList';

export interface ITableProps {
  tableInfo: ITableInfo;
  data: TFindFoldersResponseStandartPart[] | TCallingListsObjectsResponse[];
  foundCampaigns?: IFoundCfgCampaignGroup;
}

export const getTable = (props: ITableProps) => {
  const { tableInfo, data, foundCampaigns } = props;
  return (
    <table slot="data" id={'mainTable'}>
      <thead>
        <tr>
          {tableInfo.columns.map((column: any, index) => (
            <th key={index} id={'headerTable'} colSpan={column.subColumns ? column.subColumns.length : 1}>
              <span>{column.name}</span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {foundCampaigns?.isSearching || (foundCampaigns?.campaigns && foundCampaigns.campaigns.length > 0)
          ? foundCampaigns.campaigns.map((campaign, index) => (
              <tr key={index}>
                <td className={'noPadding'} colSpan={999} style={{ border: 'none', backgroundColor: 'white' }}>
                  <CampaignGroupWithCallingList
                    tableInfo={tableInfo}
                    campaign={campaign}
                    callingList={[]}
                    parentMargin={0}
                    isSearch={true}
                  />
                </td>
              </tr>
            ))
          : data.map((el: TFindFoldersResponseStandartPart | TCallingListsObjectsResponse, index: number) => (
              <tr key={index}>
                <td className={'noPadding'} colSpan={999} style={{ border: 'none', backgroundColor: 'white' }}>
                  {el.$class === EClass.CAMPAIGN ? (
                    <CampaignGroupReusable tableInfo={tableInfo} data={el} parentMargin={0} />
                  ) : (
                    <FolderReusable callingList={{}} data={el} parentMargin={0} tableInfo={tableInfo} />
                  )}
                </td>
              </tr>
            ))}
      </tbody>
    </table>
  );
};

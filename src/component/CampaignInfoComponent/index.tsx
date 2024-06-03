import { ToolTip } from '../reusableComponents/ToolTip';
import './campaignInfo.scss';
import { TCfgCampaignGroup } from 'src/api/ts/interfaces/FindFolders.response';
import TdSection from '../TdSection';
import { OptimizationParameters } from 'src/api/ts/constants/codes';

type TCampaignInfoComponent = {
  tableData: TCfgCampaignGroup;
  children?: React.ReactNode;
};

export const CampaignInfoComponent = (props: TCampaignInfoComponent) => {
  const {
    dialMode,
    ivrProfile,
    optMethod,
    target,
    voiceTransferDestination,
    trunkGroup,
    statServer,
    schedule,
    maxQueueSize,
  } = props.tableData;

  return (
    <>
      {/* <TdSection info={dialMode} /> */}
      <TdSection info={OptimizationParameters[optMethod as keyof typeof OptimizationParameters]} />
      <TdSection info={target?.toString()} />

      <TdSection info={voiceTransferDestination} />

      <TdSection info={trunkGroup} />

      <TdSection info={schedule?.toString()} />
      <TdSection info={maxQueueSize.toString()} />
    </>
  );
};

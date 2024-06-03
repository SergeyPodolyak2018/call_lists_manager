import React, { useState, useEffect } from 'react';
import './statusBar.scss';
import { useToast } from '../ToastProvider';
import restApi from 'src/api/rest';
import { CampaignStatuses, CampaignStatusesUI, CampaignStatusesMap } from '../../api/ts/constants/codes';
import { ICampaignAction, ICampaignStart } from 'src/api/ts/interfaces/Campaigns.payload';
import { ICampaignStatus } from 'src/api/ts/interfaces/Campaigns.response';
import { TCfgCampaignGroup } from 'src/api/ts/interfaces/FindFolders.response';
import { useSelector } from 'react-redux';
import { getOCSSelector } from 'src/redux/selectors/loginSelector';
import { getAllCurrentProperties } from 'src/redux/selectors/campaignSelectors';
import { ToolTip } from '../reusableComponents/ToolTip';
import { useAppDispatch } from 'src/redux/hooks';
type TStatusBar = {
  status: ICampaignStatus;
  data: TCfgCampaignGroup;
  instantDisable: boolean;
};
const StatusBar = (props: TStatusBar) => {
  const ocs = useSelector(getOCSSelector);
  const dispatch = useAppDispatch();
  const { addToast } = useToast();
  const properties = useSelector(getAllCurrentProperties);
  const isCurrentCampaing = properties?.campaignId === props.status?.campaignId;
  const [disabled, setIsDisabled] = useState(true);
  const [mainState, setMainState] = useState({
    startButtonEnabled: false,
    stopButtonEnabled: false,
    pauseButtonEnabled: false,
    stopButtonEnabledRed: false,
    loadButtonEnabled: false,
    startClicked: false,
    pauseClicked: false,
    stopClicked: false,
    loadClicked: false,
    blocker: false,
    mainStatus: 'off',
  });

  useEffect(() => {
    setIsDisabled(true);
    if (ocs.ocsId === 0) return;
    setTimeout(() => {
      setIsDisabled(false);
    }, 1000);
  }, [ocs.ocsId]);

  useEffect(() => {
    if (props.status && !mainState.blocker) {
      switch (props.status.campaignStatus) {
        case CampaignStatuses.Active: //on pause
          setMainState(prevstate => {
            return {
              ...prevstate,
              startButtonEnabled: false,
              pauseButtonEnabled: false,
              stopButtonEnabled: true,
              stopButtonEnabledRed: false,
              mainStatus: CampaignStatusesUI[props.status.campaignStatus as keyof typeof CampaignStatusesUI],
            };
          });
          break;
        case CampaignStatuses.WaitingUnload:
        case CampaignStatuses.UnloadInProgress:
          setMainState(prevstate => {
            return {
              ...prevstate,
              startButtonEnabled: false,
              pauseButtonEnabled: false,
              stopButtonEnabled: true,
              stopButtonEnabledRed: true,
              mainStatus: CampaignStatusesUI[props.status.campaignStatus as keyof typeof CampaignStatusesUI],
            };
          });
          break;
        case CampaignStatuses.Running:
          setMainState(prevstate => {
            return {
              ...prevstate,
              startButtonEnabled: false,
              pauseButtonEnabled: true,
              stopButtonEnabled: true,
              stopButtonEnabledRed: false,
              mainStatus: CampaignStatusesUI[props.status.campaignStatus as keyof typeof CampaignStatusesUI],
            };
          });
          break;
        case CampaignStatuses.NotLoaded: //stopped
          setMainState(prevstate => {
            return {
              ...prevstate,
              startButtonEnabled: true,
              pauseButtonEnabled: false,
              stopButtonEnabled: false,
              stopButtonEnabledRed: false,
              startClicked: false,
              pauseClicked: false,
              stopClicked: false,
              loadClicked: false,
              loadButtonEnabled: true,
              mainStatus: CampaignStatusesUI[props.status.campaignStatus as keyof typeof CampaignStatusesUI],
            };
          });

          break;
        default:
        // this.disableAllButtons();
      }
    }
  }, [props.status.campaignStatus]);

  const onStartClicked = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();

    const payload: ICampaignStart = {
      campaignId: props.status.campaignId,
      groupId: props.status.groupId,
      completeIfNoMoreRecords: isCurrentCampaing ? properties.completeIfNoMoreRecords : false,
      dialMode: isCurrentCampaing ? properties.dialMode : props.data.dialMode,
      optMethod: isCurrentCampaing ? properties.optMethod : props.data.optMethod,
      optMethodValue: isCurrentCampaing ? properties.optMethodValue : props.data.target,
      ocsId: ocs.ocsId,
    };
    setMainState(data => ({
      ...data,
      mainStatus: 'off',
      blocker: true,
    }));
    try {
      const resp = await restApi.campaignStart(payload);
      if (resp.data.status) {
        setMainState(data => ({
          ...data,
          mainStatus: CampaignStatusesUI[resp.data.status as keyof typeof CampaignStatusesUI],
          blocker: false,
        }));
      } else {
        setMainState(data => ({
          ...data,
          blocker: false,
        }));
      }
    } catch (e: any) {
      addToast(
        'Start',
        `${e.response.data.status.message}: ${e.response.data.status.details[0].error}`,
        e.response.status,
      );
      setMainState(data => ({
        ...data,
        mainStatus: props.status.campaignStatus,
        blocker: false,
      }));
    }
  };

  const onPauseClicked = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    const payload: ICampaignAction = {
      campaignId: props.status.campaignId,
      groupId: props.status.groupId,
      ocsId: ocs.ocsId,
    };
    setMainState(data => ({
      ...data,
      mainStatus: 'off',
      blocker: true,
    }));
    const resp = await restApi.campaignPause(payload);
    try {
      if (resp.data.status) {
        setMainState(data => ({
          ...data,
          mainStatus: CampaignStatusesUI[resp.data.status as keyof typeof CampaignStatusesUI],
          blocker: false,
        }));
      } else {
        setMainState(data => ({
          ...data,
          blocker: false,
        }));
      }
    } catch (e: any) {
      addToast('Pause', e.message, e.response.status);
      setMainState(data => ({
        ...data,
        mainStatus: props.status.campaignStatus,
        blocker: false,
      }));
    }
  };
  const onLoadClicked = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    const payload: ICampaignAction = {
      campaignId: props.status.campaignId,
      groupId: props.status.groupId,
      ocsId: ocs.ocsId,
      completeIfNoMoreRecords: false,
    };
    setMainState(data => ({
      ...data,
      mainStatus: 'off',
      blocker: true,
    }));
    try {
      const resp = await restApi.campaignLoad(payload);
      if (resp.data) {
        setMainState(data => ({
          ...data,
          mainStatus: CampaignStatusesUI[resp.data.status as keyof typeof CampaignStatusesUI],
          blocker: false,
        }));
      } else {
        setMainState(data => ({
          ...data,
          blocker: false,
        }));
      }
    } catch (e: any) {
      addToast('Load', e.message, e.response.status);
      setMainState(data => ({
        ...data,
        mainStatus: props.status.campaignStatus,
        blocker: false,
      }));
    }
  };

  const onStopClicked = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    const payload: ICampaignAction = {
      campaignId: props.status.campaignId,
      groupId: props.status.groupId,
      ocsId: ocs.ocsId,
    };
    const forceUnloadPayload: ICampaignStart = {
      campaignId: props.status.campaignId,
      groupId: props.status.groupId,
      completeIfNoMoreRecords: isCurrentCampaing ? properties.completeIfNoMoreRecords : false,
      dialMode: isCurrentCampaing ? properties.dialMode : props.data.dialMode,
      optMethod: isCurrentCampaing ? properties.optMethod : props.data.optMethod,
      optMethodValue: isCurrentCampaing ? properties.optMethodValue : props.data.target,
      ocsId: ocs.ocsId,
    };

    setMainState(data => ({
      ...data,
      mainStatus: 'off',
      blocker: true,
    }));
    try {
      const resp =
        props.status.campaignStatus === CampaignStatuses.UnloadInProgress
          ? await restApi.campaignForceStop(forceUnloadPayload)
          : await restApi.campaignStop(payload);
      if (resp.data) {
        setMainState(data => ({
          ...data,
          mainStatus: CampaignStatusesUI[resp.data.status as keyof typeof CampaignStatusesUI],
          blocker: false,
        }));
      } else {
        setMainState(data => ({
          ...data,
          blocker: false,
        }));
      }
    } catch (e: any) {
      addToast('Stop', e.message, e.response.status);
      setMainState(data => ({
        ...data,
        mainStatus: props.status.campaignStatus,
        blocker: false,
      }));
    }
  };

  return (
    <div
      className={'container-c'}
      onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <div className={'actionsHolder'}>
        <span
          className={`status-indicators ${
            disabled || props.instantDisable
              ? `off`
              : CampaignStatusesUI[props.status.campaignStatus as keyof typeof CampaignStatusesUI]
          }`}
        >
          <ToolTip label="Load">
            <span
              className={`icon-btn icon-iw-control-circle-fwd icon-iw-control-circle-load`}
              onClick={onLoadClicked}
            ></span>
          </ToolTip>
          <ToolTip label="Start">
            <span className={`icon-iw-control-circle-play icon-btn start`} onClick={onStartClicked}></span>
          </ToolTip>
          <ToolTip label="Pause">
            <span className={`icon-iw-control-circle-pause icon-btn pause`} onClick={onPauseClicked}></span>
          </ToolTip>
          <ToolTip label="Unload">
            <span className={`icon-iw-control-circle-stop icon-btn stop`} onClick={onStopClicked}></span>
          </ToolTip>
          {/* <span className={`icon-proposal_status`} title="Running" style={{ padding: '0' }} /> */}
        </span>
      </div>
      <div className={'statusHolder'}>
        <span>{CampaignStatusesMap[props.status?.campaignStatus as keyof typeof CampaignStatusesMap]}</span>
      </div>
    </div>
  );
};

export default StatusBar;

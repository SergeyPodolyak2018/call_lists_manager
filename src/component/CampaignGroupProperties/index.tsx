import styles from './cgproperties.module.scss';
import { DropDownTypes } from 'src/interfaces/dropDown';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import {
  getSelectedCampaignGroupProperties,
  getSavedProperties,
  getSelectedCampaignStatus,
} from 'src/redux/selectors/campaignSelectors';

import {
  OptimizationParameters,
  OptimizationParametersReverseMap,
  InvDialModesReverseMap,
  InvDialModesMap,
} from 'src/api/ts/constants/codes';
import { getTableInfoByType } from 'src/utils/tablesInfoManager';
import { TableType } from 'src/constants/tablesTypes';
import restApi from 'src/api/rest';
import { getOCSSelector } from 'src/redux/selectors/loginSelector';
import React, { useEffect, useState, useRef, ReactElement } from 'react';
import { Properties, ICampaignChangeDialAction } from 'src/api/ts/interfaces/Campaigns.payload';
import { useAppDispatch } from 'src/redux/hooks';
import { setCurrentProperties, saveCampaignConfig, selectCampaignGroup } from 'src/redux/actions/campaignActions';
import Utils from 'src/helper/utils';
import PropTypes from 'prop-types';
import { changeDialValidation } from 'src/utils/changeDialValidation';
import { useToast } from '../ToastProvider';
import CustomDropdown from '../reusableComponents/CustomDropDown';
import { CustomArrows } from '../CustomArrows';
import { TCfgCampaignGroup } from 'src/api/ts/interfaces/FindFolders.response';

const targetChars = [
  { optMethod: ['BusyFactor', 'OverdialRate'], value: '%' },
  { optMethod: ['WaitTime'], value: 'sec' },
];

export const CampaignGroupProperties = () => {
  const { addToast } = useToast();
  const campaignGroup = useSelector(getSelectedCampaignGroupProperties);
  const campaignStatus = useSelector(getSelectedCampaignStatus);
  const savedConfigs = useSelector(getSavedProperties);
  const ocsId = useSelector(getOCSSelector);
  const dialModes: string[] = Object.values(InvDialModesMap);
  const optParameters: string[] = Object.values(OptimizationParameters);
  const tableInfo = getTableInfoByType(TableType.CampaignsProperties);
  const disabled = campaignStatus !== 'Running';
  const [panelDisabled, setPanelDisabled] = useState(campaignStatus === 'NotLoaded');

  const cgIsRunning = campaignStatus === 'Running';
  const cgIsActive = campaignStatus === 'Active';
  const dispatch = useAppDispatch();
  const savedConfig = savedConfigs.find(
    config => config.campaignId === campaignGroup?.campaignId && config.groupId === campaignGroup?.groupId,
  );

  const defaultValue: Properties = {
    General: { priority: 1, n_records: 2 },
    CampaignRescheduled: { priority: 1, n_records: 1 },
    CampaignCallBack: { priority: 1, n_records: 1 },
  };
  const [properties, setProperties] = useState<Properties>(defaultValue);

  const [changableState, setChangableState] = useState<ICampaignChangeDialAction>({
    campaignId: 0,
    groupId: 0,
    completeIfNoMoreRecords: false,
    dialMode: '',
    optMethod: '',
    optMethodValue: 0,
    ocsId: 0,
    requestProperties: defaultValue,
  });

  useEffect(() => {
    setPanelDisabled(campaignStatus === 'NotLoaded');
  }, [campaignStatus]);

  useEffect(() => {
    if (!campaignGroup) {
      return;
    }

    setChangableState(prevState => ({
      ...prevState,
      optMethodValue: savedConfig && savedConfig.optMethodValue ? savedConfig.optMethodValue : campaignGroup.target,
      campaignId: campaignGroup.campaignId,
      groupId: campaignGroup.groupId,
      completeIfNoMoreRecords: false,
      dialMode: savedConfig && savedConfig.dialMode !== 'NoDialMode' ? savedConfig.dialMode : campaignGroup.dialMode,
      optMethod: savedConfig && savedConfig.optMethod ? savedConfig.optMethod : campaignGroup.optMethod,
      requestProperties: savedConfig && savedConfig.requestProperties ? savedConfig.requestProperties : defaultValue,
      ocsId: ocsId.ocsId,
    }));

    setProperties(prevState => {
      return savedConfig && savedConfig.requestProperties ? savedConfig.requestProperties : defaultValue;
    });
  }, [campaignGroup]);

  useEffect(() => {
    dispatch(setCurrentProperties(changableState));
  }, [changableState]);

  const updateProperties = (key: string, field: keyof Properties[string], value: string) => {
    setProperties(prevState => {
      return {
        ...prevState,
        [key]: {
          ...prevState[key],
          [field]: parseInt(value, 10),
        },
      };
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onTargetChange(parseInt(event.target.value));
  };

  const onIncrease = () => {
    onTargetChange(changableState.optMethodValue + 1);
  };

  const onDecrease = () => {
    onTargetChange(changableState.optMethodValue - 1);
  };

  const onApply = () => {
    if (!campaignGroup) {
      return;
    }
    const combinedPayload: any = {
      campaignId: campaignGroup?.campaignId,
      groupId: campaignGroup?.groupId,
      completeIfNoMoreRecords: false,
      dialMode: changableState.dialMode,
      optMethod: changableState.optMethod,
      optMethodValue: changableState.optMethodValue,
      ocsId: ocsId.ocsId,
      requestProperties: properties,
      statServer: campaignGroup.statServer,
      ivrProfile: campaignGroup.ivrProfile,
      interactionQueue: campaignGroup.interactionQueue,
      target: changableState.optMethodValue,
    };

    dispatch(selectCampaignGroup(combinedPayload));

    restApi
      .campaignChangeDial(combinedPayload)
      .then(data => {
        addToast('Change Dialing Parameters', 'Dial mode has been changed', 200);
        dispatch(saveCampaignConfig(combinedPayload));
      })
      .catch(e => {
        addToast(
          'Change Dialing Parameters',
          `${e.response.data.status.message}: ${e.response.data.status.details[0].error}`,
          e.response.status,
        );
      });
  };

  const onSelectOption = (states: any) => {
    const optimizationMethod = states.optMethod ? states.optMethod : changableState?.optMethod;
    const dialMode = states.dialMode ? states.dialMode : changableState.dialMode;

    const payload: any = {
      campaignId: campaignGroup ? campaignGroup.campaignId : 0,
      groupId: campaignGroup ? campaignGroup.groupId : 0,
      optMethod: OptimizationParametersReverseMap[optimizationMethod]
        ? OptimizationParametersReverseMap[optimizationMethod]
        : optimizationMethod,
      dialMode: Object.values(InvDialModesReverseMap).includes(dialMode) ? dialMode : InvDialModesReverseMap[dialMode],
      optMethodValue: states.optMethodValue ? states.optMethodValue : changableState?.optMethodValue,
      completeIfNoMoreRecords: false,
      ocsId: ocsId.ocsId,
      requestProperties: properties,
    };
    setChangableState(payload);
    dispatch(setCurrentProperties(payload));
  };

  const onTargetChange = (value: number) => {
    setChangableState(prevState => ({
      ...prevState,
      optMethodValue: value,
    }));
  };

  const checkMaxValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseInt(event.currentTarget.value) || 0;
    const minValue = targetValidation?.range[0] || 0;
    const maxValue = targetValidation?.range[1] || 0;

    event.target.value = Math.max(minValue, Math.min(inputValue, maxValue)).toString();
  };

  const handleChange = (event: any) => {
    const newValue = parseInt(event.target.value) || 0;

    const minValue = targetValidation?.range[0] || 0;
    const maxValue = targetValidation?.range[1] || 0;

    if (newValue > minValue || newValue < maxValue) {
      event.target.classList.add(styles.errorBorder);
    } else {
      event.target.classList.remove(styles.errorBorder);
    }
  };
  if (!campaignGroup) return <div></div>;
  changeDialValidation.isAbleToChangeDialMode(campaignGroup?.dialMode)?.length === 1;

  const targetValidation = changeDialValidation.getTargetValidation(changableState.optMethod);
  const dialMode = changableState.dialMode;
  const valueOfOptMethod = [
    OptimizationParameters[campaignGroup.optMethod as keyof typeof OptimizationParameters],
  ].toString();

  const minValue = targetValidation?.range[0] || 0;
  const maxValue = targetValidation?.range[1] || 0;
  const value = changableState.optMethodValue ? changableState.optMethodValue : campaignGroup.target;
  const isRightValue = value <= maxValue && value >= minValue;
  return (
    <div className={styles.mainContainer}>
      <div className={styles.propertiesContainer}>
        <div className={styles.propertyContainer}>
          <span className={styles.label}>Dial Mode:</span>
          <div className={styles.dropDown}>
            <CustomDropdown
              validation={
                cgIsActive
                  ? dialModes
                  : cgIsRunning
                  ? changeDialValidation.isAbleToChangeDialMode(changableState.dialMode)
                  : [dialMode]
              }
              disabled={
                panelDisabled ||
                (!cgIsActive &&
                  changeDialValidation.isAbleToChangeDialMode(savedConfig?.dialMode || campaignGroup?.dialMode)
                    ?.length === 1)
              }
              type={DropDownTypes.DIAL_MODE}
              value={
                changableState.dialMode !== ''
                  ? InvDialModesMap[changableState.dialMode]
                  : InvDialModesMap[campaignGroup.dialMode]
              }
              onSelectAction={onSelectOption}
              options={dialModes.map(mode => {
                return { optionLabel: mode, optionKey: mode };
              })}
            />
          </div>
        </div>
        <div className={styles.propertyContainer}>
          <span className={styles.label}>Optimization Method:</span>
          <div className={styles.dropDown}>
            <CustomDropdown
              validation={
                cgIsActive && changeDialValidation.parameterIsAbleToChange(InvDialModesMap[changableState.dialMode])
                  ? changeDialValidation.isAbleToChangeOptimizationMethod(changableState.dialMode, valueOfOptMethod)
                  : cgIsRunning
                  ? changeDialValidation.isAbleToChangeOptimizationMethod(changableState.dialMode, valueOfOptMethod)
                  : [OptimizationParameters[changableState.optMethod as keyof typeof OptimizationParameters]]
              }
              disabled={
                panelDisabled || !changeDialValidation.parameterIsAbleToChange(InvDialModesMap[changableState.dialMode])
              }
              type={DropDownTypes.OPT_TYPE}
              value={OptimizationParameters[changableState.optMethod as keyof typeof OptimizationParameters]}
              onSelectAction={onSelectOption}
              options={optParameters.map(parameter => {
                return { optionLabel: parameter, optionKey: parameter };
              })}
            />
          </div>
        </div>
        <div className={styles.propertyContainer}>
          <span className={styles.label}>Target Value:</span>
          <div className={styles.dropDown}>
            <input
              onKeyDown={event => {
                Utils.allowOnlyNumeric(event);
              }}
              onInput={handleChange}
              onChange={handleInputChange}
              disabled={
                panelDisabled || !changeDialValidation.parameterIsAbleToChange(InvDialModesMap[changableState.dialMode])
              }
              type="number"
              onBlur={checkMaxValue}
              value={changableState.optMethodValue}
              style={
                !isRightValue ? { outline: ' red auto 1px', borderRadius: '1px', width: '100%' } : { width: '100%' }
              }
            />
            <span>{targetChars.find(x => x.optMethod.includes(changableState?.optMethod))?.value}</span>
            <CustomArrows
              onIncrease={onIncrease}
              onDecrease={onDecrease}
              disabled={
                panelDisabled || !changeDialValidation.parameterIsAbleToChange(InvDialModesMap[changableState.dialMode])
              }
            />
          </div>
        </div>
      </div>
      <div className={styles.propsTableContainer}>
        <table slot="data" className={styles.propsTable}>
          <caption>Priorities for record types</caption>
          <thead>
            <tr>
              {tableInfo.columns.map((col, index) => (
                <th key={index}>{col.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(
              savedConfig && savedConfig.requestProperties ? savedConfig.requestProperties : defaultValue,
            ).map(([key, values], index) => (
              <tr key={index}>
                <td>{key}</td>
                {Object.entries(values).map(([field, fieldValue], fieldIndex) => (
                  <EditableCell
                    some={savedConfig && savedConfig.requestProperties ? savedConfig.requestProperties : defaultValue}
                    campaign={campaignGroup}
                    key={fieldIndex}
                    keyField={fieldIndex}
                    initialValue={fieldValue.toString()}
                    onSave={newValue => updateProperties(key, field as keyof Properties[string], newValue)}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.thirdPropertiesContainer}>
        <div className={styles.smallPropContainer}>
          <span className={styles.label}>Stat Server:</span>

          <span className={styles.label}>{campaignGroup.statServer}</span>
        </div>
        <div className={styles.smallPropContainer}>
          <span className={styles.label}>IVR Profile:</span>
          <span className={styles.label}>{campaignGroup.ivrProfile}</span>
        </div>
        <div className={styles.smallPropContainer}>
          <span className={styles.label}>Interaction Queue:</span>
          <span className={styles.label}> {campaignGroup.interactionQueue}</span>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={() => onApply()} className={`btn btn-primary${disabled ? ' disabled' : ''}`}>
          Apply
        </button>
      </div>
    </div>
  );
};

interface EditableCellProps {
  initialValue: string;
  onSave: (newValue: string) => void;
  keyField: number;
  campaign: TCfgCampaignGroup;
  some: any;
}

const EditableCell: React.FC<EditableCellProps> = ({ some, campaign, initialValue, onSave, keyField }) => {
  const [value, setValue] = useState<string>(initialValue);
  const [isEditing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(prevValue => {
      return initialValue;
    });
  }, [campaign, initialValue]);
  const onIncrease = () => {
    setValue(prevValue => {
      onSave((parseInt(prevValue) + 1).toString());
      return (parseInt(prevValue) + 1).toString();
    });
  };

  const onDecrease = () => {
    setValue(prevValue => {
      onSave((parseInt(prevValue) - 1).toString());
      return (parseInt(prevValue) - 1).toString();
    });
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleBlur = () => {
    setEditing(false);
    onSave(value);
  };

  const handleInput = () => {
    const inputValue = inputRef.current?.value || '';

    if (inputValue === '' || (parseInt(inputValue) >= 0 && parseInt(inputValue) <= (keyField === 0 ? 3 : 9999))) {
      setValue(inputValue);
    } else {
      setValue('0');
    }
  };

  return (
    <td style={{ padding: 0 }}>
      <div className={styles.cellHolder}>
        <input
          value={value}
          type="number"
          onBlur={handleBlur}
          onChange={handleInput}
          ref={inputRef}
          style={value === '0' ? { color: 'red' } : {}}
        />
        <div className={styles.arrowWrapper}>
          {
            <CustomArrows
              onIncrease={onIncrease}
              onDecrease={onDecrease}
              minValue={0}
              maxValue={keyField === 0 ? 3 : 9999}
              value={parseInt(value)}
            />
          }
        </div>
      </div>
    </td>
  );
};

EditableCell.propTypes = {
  initialValue: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  keyField: PropTypes.number.isRequired,
};

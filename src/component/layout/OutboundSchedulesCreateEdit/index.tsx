import React, { useEffect, useRef, useState } from 'react';
import './outboundSchedules.scss';
import { useSelector } from 'react-redux';
import ButtonsGroup from '../../reusableComponents/ButtonsGroup';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import IconButton from '../../reusableComponents/IconButton';
import CustomDropdown from '../../reusableComponents/CustomDropDown';
import { DropDownTypes } from '../../../interfaces/dropDown';
import { generateArray, timeToSecConverter } from '../../../utils/tablesInfoManager';
import {
  getActiveListSelector,
  getActiveFolderSelector,
  getCampaignGroupsSchedulesSelector, getCampaignGroupsServersSelector,
} from '../../../redux/selectors/schedulesListsSelectors';
import Spinner from '@genesys/arkui-react/dist/components/Progress/LoadingSpinner';
import {
  postListsRecord,
  putListsRecord,
  setScheduleActive, setName,
  setScheduleFolderActive, getPartCampaingsAction, getCampaingServers,
} from '../../../redux/actions/scheduleListsActions';
import { useAppDispatch } from '../../../redux/hooks';
import styles from '../../reusableComponents/NewCallingList/NewCallingList.module.scss';
import ConfirmEditAll from '../../reusableComponents/ConfirmEditAll';
import { cloneDeep, get } from 'lodash';
import CustomPopUp from '../../reusableComponents/CustumPopUp';
import { getServersList } from '../../../redux/selectors/loginSelector';
import SerchTrottled from '../../reusableComponents/TrotteledSearchField';
import OutboundSchedulesCommand from './command';
import { changeDialValidation } from 'src/utils/changeDialValidation';
let clearSearch = () => {};


const OutboundSchedulesCreateEdit = () => {
  const dispatch = useAppDispatch();

  const active = useSelector(getActiveListSelector);
  const campaignGroups = useSelector(getCampaignGroupsSchedulesSelector);
  const activeFolder = useSelector(getActiveFolderSelector);
  const applications = {
    statServers: useSelector(getCampaignGroupsServersSelector)
  } as any;
  const serversList = [{name:'Any OCS', ocsId:undefined},...useSelector(getServersList)] as any;

  const toDateInputValue = (date:Date) => {
    const local = new Date(date);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return local.toJSON().slice(0,10);
  };

  const { t } = useTranslation();
  const schedule = JSON.parse(`{
        "label": "",
        "dialMode": null,
        "items": [
          {
            "label": "Sequential commands",
            "instant": false,
            "items": [
              {
                "label": "Load Immediately",
                "command": "load",
                "condition": "immediately",
                "atSec": null,
                "expanded": false
              },
              {
                "label": "Start Immediately",
                "command": "start",
                "condition": "immediately",
                "atSec": null,
                "expanded": false
              }
            ],
            "expanded": false
          },
          {
            "label": "Instant commands",
            "instant": true,
            "items": [],
            "expanded": false
          }
        ],
        "expanded": false
      }`)
  const obj: any = {
    name: '',
    description: '',
    execute:'daily',
    schedule:[

    ],
    cycle:[],
    dateFrom: toDateInputValue(new Date()),
    dateTill: toDateInputValue(new Date()),
    every: 1,
    startTime: '08:00',
    startTimeSec: timeToSecConverter('08:00'),
    stopTime: '', //'18:00',
    stopTimeSec: null, //timeToSecConverter('18:00'),
    stopAfterMin:null,
    stopAfterHour:null,
    state: undefined
  }
  const [model, setModel] = useState(obj);
  const buttons = [
    {caption: 'labelDaily', name: 'daily'},
    {caption: 'labelWeekly', name: 'weekly'},
    {caption: 'labelMonthly', name: 'monthly'},
    {caption: 'labelOnce', name: 'once'}
  ];
  // @ts-ignore
  const days = [...new Array(32).keys()];
  // @ts-ignore
  const week = [...new Array(6).keys()];
  const weekStr =  ['labelSunday', 'labelMonday', 'labelTuesday', 'labelWednesday', 'labelThursday', 'labelFriday', 'labelSaturday'];



  useEffect(()=>{
    if(active.id > -1){
      setModel({...model,...{stopAfterMin:null,stopAfterHour:null, serverId:undefined},...cloneDeep(active)});
    }else {
      if(model.name !== obj.name)
      setModel({ ...obj })
    }
    setSearch('');
    clearSearch();
  },[active.id])

  const changeExecute = (execute:string, flag = true) => {
    const newModel = {...model};

    if(flag){
      Object.assign(newModel,{every: 1});

      if(['weekly'].includes(execute)){
        Object.assign(newModel,{cycle:[1,2,3,4,5]});
      }else if(['monthly'].includes(execute)){
        Object.assign(newModel,{cycle:[]});
      } else {
        delete newModel['cycle'];
      }
      if(model.execute === 'once'){
        // delete newModel['every'];
      }
    }


    setModel({ ...newModel, execute});
  }

  const changeDays = (currIndex:any, field = 'cycle') => {
    setModel((oldModel: any) =>{
      if(oldModel[field].includes(currIndex)){
        oldModel[field].splice(oldModel[field].indexOf(currIndex),1);
      }else{
        oldModel[field].push(currIndex);
      }
      return {...oldModel };
    });
  }


  const [ii, setIi] = useState({} as any);
  const confirmCallback = ()=>{
    const {item, index} = ii as any;
    setIi({});
    if(!Array.isArray(item)){
      model.schedule.splice(index, 1);
    }else{
      item.splice(index, 1);
    }

    setModel({...model});
    setConfirm(false);
  };
  const removeItem = (item:any, index:any) => {
    setIi({ item, index });
    setConfirm(true);
  }
  const removeCampaignGroup = (item:any, index:any) => {
    setIi({ item, index });
    setConfirm(true);
  }
  const [campaignCommCondIndexes,setCampaignCommCondIndexes] = useState({} as any);
  const addItem = (item2:any,item3:any,item:any, indexes = {}) => {
    setCampaignCommCondIndexes(indexes);
    dispatch(getCampaingServers());
    setShowItem(true);
    setCommCond((oldCommCond:any) =>
       ({...oldCommCond,...{
          command:'load',
          condition:'immediately',
          dialMode:dialModes[item.dialMode],
          optMethod: optimizationMethods[item.optMethod],
          optMethodValue:item.optMethodValue,
          campaignGroup: item.label,
          priorities:[
            { type: 'general', priority: 1, nRecords: 2 },
            { type: 'campaignRescheduled', priority: 1, nRecords: 1 },
            { type: 'campaignCallBack', priority: 1, nRecords: 1 }
          ]
        },...item3})
    );

    const [min, max] = changeDialValidation.getTargetValidation(optimizationMethods[item.optMethod]).range;
    setMinMax({min,max});
  }

  const toggleExpand = (items:any, flag:boolean) => {
    items.forEach((item:any) => {
      //
        item.expanded = flag;
      // dispatch(setParamsAction({ item, flag }));
      if (item.items)toggleExpand(item.items, flag);
    });
  };



  const executionDescrition:any= {
    daily:'Execute every n-th day between Start Date and optional End Date',
    weekly:'Execute every n-th week between Start Date and optional End Date',
    monthly:'Execute every n-th month between Start Date and optional End Date',
    once:'Execute once only',
  }



  const repeatEvery:any = {
    daily: generateArray(100,1,1,'Day'),
    weekly:generateArray(56 ,1,1,'Week'),
    monthly:generateArray(24,1,1,'Month'),
    once: []
  }
  const stopAfter:any = {
    h: generateArray(49,0,60*60,'H'),
    min:generateArray(60 ,0,60,'min'),
    s:generateArray(60,0,1,'sec')
  }


  const changeTime = ({target: { value, name }}:any) => {
    setModel({...model, [name]:value, [`${name}Sec`]:timeToSecConverter(value)});
  }
  const changeFn = ({target: { value, name }}:any) => {
    setModel({...model, [name]:value});
  }
  const loading = false;
  const isLoadingList = false;

  const [confirm, setConfirm] = useState(false);
  const [addCampaign, setAddCampaign] = useState(false);
  const [scheduleLabel, setScheduleLabel] = useState('');
  const [scheduleCG, setScheduleCG] = useState({} as any);

  const reverseObject = (obj:any) => {
    return Object.keys(obj).reduce((a,b)=>{
      return Object.assign(a,{[obj[b]]:+b})
    },{})
  }

  const dialModes = {
    1:'Predict',
    2:'Progress',
    3:'Preview',
    8:'PushPreview',
    5:'PredictAndSeize',
    4:'ProgressAndSeize',
    11:'PowerGVP',
    9:'ProgressGVP',
    10:'PredictGVP',
    6:'Power'
  } as any;

  // const dialingModesDropDown = Object.keys(dialModes).map((b:any)=>({optionLabel:dialModes[b],optionKey:+b}));

  const pareDM = {
    Predict: 'Predictive',
    Progress: 'Progressive',
    Preview: 'Preview',
    PushPreview: 'Push Preview',
    PredictAndSeize: 'Predictive with seizing',
    ProgressAndSeize: 'Progressive with seizing',
    PowerGVP: 'Power GVP',
    ProgressGVP: 'Progressive GVP',
    PredictGVP: 'Predictive GVP',
  } as any;
  const dialingModesDropDown = Object.keys(pareDM).map((b:any,i,aq)=>({optionLabel:pareDM[b],optionKey:b}));



  const dialModesReverse = reverseObject(dialModes) as any;

  const optimizationMethods = {
    1:'BusyFactor',
    2:'OverdialRate',
    3:'WaitTime',
    4:'DistributionTime'
  } as any;

  const pareOM = {
    'Agent Busy Factor': 'BusyFactor',
    'Average Waiting Time': 'WaitTime',
    'Overdial Rate': 'OverdialRate',
    'Average Distribution Time': 'DistributionTime',
  } as any;

  const optimizationMethodsDropDown = Object.keys(pareOM).map((b:any)=>({optionKey:pareOM[b],optionLabel:b}));

  const optimizationMethodsReverse = reverseObject(optimizationMethods) as any;

  const [showItem, setShowItem] = useState(false);

  const [commCond, setCommCond] = useState({
    spentInState:'paused',
    at:'08:00',
    objectName:'',
    atSec:timeToSecConverter('08:00'),
  } as any);

  useEffect(()=>{
    if(addCampaign || showItem){
      dispatch(getPartCampaingsAction(false, 38, { limit:100 }, undefined, true));
    }
  },[addCampaign, showItem]);




  const commands = [
    {optionLabel: t('Complete Campaign'), optionKey: 'complete'},
    {optionLabel: t('Force Unload Campaign'), optionKey: 'forceunload'},
    {optionLabel: t('Load Campaign'), optionKey: 'load'},
    {optionLabel: t('Set Dialing Mode'), optionKey: 'setmode'},
    {optionLabel: t('Start Dialing'), optionKey: 'start'},
    {optionLabel: t('Stop Dialing'), optionKey: 'stop'},
    {optionLabel: t('Unload Campaign'), optionKey: 'unload'}
  ];

  const conditions = [
    {optionLabel: t('labelAfter'), optionKey: 'after'},
    {optionLabel: t('labelAtTime'), optionKey: 'attime'},
    {optionLabel: t('labelImmediately'), optionKey: 'immediately'},
    {optionLabel: t('labelStatisticalConditionAdvanced'), optionKey: 'statistics'},
    {optionLabel: t('labelTimeInState'), optionKey: 'timeInState'},
    {optionLabel: t('labelTimeInStateAdvanced'), optionKey: 'timeInStateAdvanced'},
  ];

  const states = [
    {optionLabel: t('labelActivePaused'), optionKey: 'paused'},
    {optionLabel: t('labelInactive'), optionKey: 'inactive'},
    {optionLabel: t('labelNotLoaded'), optionKey: 'notLoaded'},
    {optionLabel: t('labelRunning'), optionKey: 'running'},
    {optionLabel: t('labelUnloadInProgress'), optionKey: 'unloadInProgress'},
    {optionLabel: t('labelWaitingUnload'), optionKey: 'waitingUnload'},
  ];

  const [minMax, setMinMax] = useState({} as any);
  const [statistics, setStatistics] = useState([] as any);
  const [objects, setObjects] = useState([] as any);
  const stat= {
    s:[{name:'Change based', value:0},{name:'Time based', value:1}],
    changeStatServer(statServerDBID:any) {
      setStatistics(get(get(applications, 'statServers', []).find((ss:any) => ss.id === statServerDBID), 'statistics', []) as any);
    },
    changeStatName(statName:any) {
      setObjects(get(statistics.find((stat:any) => stat.name === statName), 'objects', []));
    },
    statValues:[
      {name:'=', value:'eq'},
      {name:'!=', value:'ne'},
      {name:'>', value:'gt'},
      {name:'<', value:'lt'},
      {name:'>=', value:'ge'},
      {name:'<=', value:'le'},
    ],
  }

  const schedulesLabels = {} as any;

  const [filtered, setFiltered] = useState([] as  any);
  const [search, setSearch] = useState('');
  const [valid, setValid] = useState(true);
  const formRef = useRef<HTMLDivElement>(null) as any;

  useEffect(()=>{
    setValid(formRef.current?.checkValidity())
  },[commCond,formRef.current])
  return (<>
      {confirm && (
        <>
          <div className={styles.popUp} />
          <div className={styles.subPopUp} style={{width:'30%'}}>
            <ConfirmEditAll
              title={'Delete'}
              message={`Are you sure you want to delete ${ Array.isArray(ii.item) ? 'command' : 'campaign group'} ${ ii.item.label || ii.item[ii.index].label} ?`}
              close={() => {
                setConfirm(false);
              }}
              callBack={() => {
                confirmCallback();
              }}
            />
          </div>
        </>
      )}

      { addCampaign &&
        <CustomPopUp style={{position:'absolute'}}>
          <form onSubmit={() => {}}>
            <div className="modal-header">
              <div className="header-message-container">
                <h1 className="modal-title">Add Campaign Group to the Schedule</h1>
              </div>
            </div>
            <div className={`modal-body`}>
              <CustomDropdown
                type={DropDownTypes.OTHER}
                onSelectAction={(option:any) => {
                  setScheduleLabel(campaignGroups.find((o:any) => o.id === option)?.name);
                  setScheduleCG(campaignGroups.find((o:any) => o.id === option));
                }}
                value={scheduleLabel}
                options={campaignGroups.map((o:any)=>({optionKey:o.id,optionLabel:o.name}))}
                style={{height:'30px', width:'350px'}}
              />
            </div>
            <div className="modal-footer">
              <button style={{ float: 'left' }} className="btn btn-default" onClick={(e) => {
                e.preventDefault();
                setAddCampaign(false);
                setScheduleLabel('');
              }}>
                {t('cancel')}
              </button>
              <button focus-me="true" disabled={!scheduleLabel} style={{ float: 'right' }} className="btn btn-primary" onClick={(e) => {
                e.preventDefault();
                setAddCampaign(false);
                model.schedule.push({...cloneDeep(schedule),
                  label: scheduleLabel,
                  dialMode:dialModesReverse[scheduleCG.dialMode],
                  optMethod:optimizationMethodsReverse[scheduleCG.optMethod],
                  optMethodValue:scheduleCG.target
                });
                setModel({...model});
                setScheduleLabel('')
              }}>
                {t('ok')}
              </button>
              <input type="submit" style={{ display: 'none' }} />
            </div>
          </form>
        </CustomPopUp>
      }
      { showItem &&
        <CustomPopUp >
          <form onSubmit={() => {}} ref={formRef}>

            <div className={`modal-body`}>
              <div className={'comm-cond'} >
                <label htmlFor=''>Command</label>
                <CustomDropdown
                  disabled={!valid}
                  type={DropDownTypes.OTHER}
                  onSelectAction={(option:any) => {
                    setCommCond({...commCond,command:option,});
                  }}
                  value={commands.find((o:any)=>o.optionKey===commCond.command)?.optionLabel}
                  options={commands}
                  style={{height:'30px', width:'350px'}}
                />
                <label htmlFor=''>Condition</label>
                <CustomDropdown
                  disabled={!valid}
                  type={DropDownTypes.OTHER}
                  onSelectAction={(option:any) => {
                    if(['after','timeInState','timeInStateAdvanced'].includes(option)){
                      Object.assign(commCond,{
                        afterHour:+'3600',
                        afterMin:+'2400',
                        afterSec:+'50',
                      });
                    }
                    setCommCond({...commCond,condition:option});
                  }}
                  value={conditions.find((o:any)=>o.optionKey===commCond.condition)?.optionLabel}
                  options={conditions}
                  style={{height:'30px', width:'350px'}}
                />
              </div>
              <div className="row" style={['attime','after','timeInState','timeInStateAdvanced'].includes(commCond.condition)?{}:{display:'none'}}>
                <div className="col-md-12">
                  <div className={'delimiter-line'}/>
                </div>
              </div>


              <h2  style={['statistics'].includes(commCond.condition)?{}:{display:'none'}} >{ t('labelSetStatisticalCondition') }</h2>
              <h2 style={['attime'].includes(commCond.condition)?{}:{display:'none'}} >{ t('labelSetTime') }</h2>
              <h2 style={['after'].includes(commCond.condition)?{}:{display:'none'}} >{ t('labelSetTimeInterval')}</h2>
              <h2 style={['timeInState','timeInStateAdvanced'].includes(commCond.condition)?{}:{display:'none'}} >{
                commCond.condition === 'timeInStateAdvanced' ? t('labelSetCampaignGroup') : '' } {t('labelSetTimeIntervalAndState')}</h2>


              <div className="row" style={['after','timeInState','timeInStateAdvanced'].includes(commCond.condition)?{}:{display:'none'}} >

                <div className="col-md-12">
                  <label style={{fontWeight: 'normal',padding: '6px 10px',paddingLeft: 0}}
                         className="required">{t('labelAfter')}</label>


                    <CustomDropdown
                      type={DropDownTypes.OTHER}
                      onSelectAction={(option:any) => {
                        setCommCond({...commCond,afterHour:option});
                      }}
                      value={stopAfter.h.find((o:any)=>o.optionKey===commCond.afterHour)?.optionLabel}
                      options={stopAfter.h}
                      style={{height:'30px', width:'82px'}}
                    />
                    <CustomDropdown
                      type={DropDownTypes.OTHER}
                      onSelectAction={(option:any) => {
                        setCommCond({...commCond,afterMin:option});
                      }}
                      value={stopAfter.min.find((o:any)=>o.optionKey===commCond.afterMin)?.optionLabel}
                      options={stopAfter.min}
                      style={{height:'30px', width:'82px'}}
                    />
                    <CustomDropdown
                      type={DropDownTypes.OTHER}
                      onSelectAction={(option:any) => {
                        setCommCond({...commCond,afterSec:option});
                      }}
                      value={stopAfter.s.find((o:any)=>o.optionKey===commCond.afterSec)?.optionLabel}
                      options={stopAfter.s}
                      style={{height:'30px', width:'82px'}}
                    />

                </div>

              </div>

              <div className="row" style={['timeInStateAdvanced'].includes(commCond.condition)?{marginTop:'10px'}:{display:'none'}}>

                <div className={`col-md-12 ${get(formRef,'current.campaignGroup.validity.valid', true) ?'':'has-error'}`}>
                  <label style={{fontWeight: 'normal',padding: '6px 10px',paddingLeft: 0}}
                         className="required">{ t('labelCampaignGroup')}</label>
                  <CustomDropdown
                    type={DropDownTypes.OTHER}
                    onSelectAction={(option:any) => {
                      setCommCond({...commCond,campaignGroup:option});
                    }}
                    value={commCond.campaignGroup}
                    options={campaignGroups.map((o:any)=>({optionKey:o.name,optionLabel:o.name}))}
                    style={{height:'30px', width:'328px'}}
                  />


                </div>

              </div>


              <div className="row" style={['timeInState','timeInStateAdvanced'].includes(commCond.condition)?{marginTop:'10px'}:{display:'none'}}
                   >

                <div className="col-md-12">
                  <label style={{fontWeight: 'normal',padding: '6px 10px',paddingLeft: 0,paddingRight: '27px'}}
                         className="required">Spent in state</label>
                  <CustomDropdown
                    type={DropDownTypes.OTHER}
                    onSelectAction={(option:any) => {
                      setCommCond({...commCond,spentInState:option});
                    }}
                    value={states.find((o:any)=>o.optionKey===commCond.spentInState)?.optionLabel}
                    options={states}
                    style={{height:'30px', width:'328px'}}
                  />

                </div>

              </div>


              <div className="row" style={['attime'].includes(commCond.condition)?{}:{display:'none'}} >
                <div className="col-md-12">
                  <div style={{...{display:'inline-grid'}}}>
                    <label htmlFor="at" >at</label>
                    <input value={commCond.at} onChange={({target:{value}})=>{
                      setCommCond({...commCond, at:value, atSec:timeToSecConverter(value)});
                    }} className={'btn btn-default date-time-fix'} name={'at'} type="time" />
                  </div>
                </div>
              </div>


              <div style={['statistics'].includes(commCond.condition)?{}:{display:'none'}} >

                <div className="row inner" style={{marginTop: '10px'}}>
                  <div className="col-md-4">
                    <label htmlFor="onStatServer" className="required">{ t('labelOnStatServer')}</label>
                  </div>
                  <div className="col-md-5">

                    <CustomDropdown
                      type={DropDownTypes.OTHER}
                      onSelectAction={(option:any) => {
                        stat.changeStatServer(option);
                        setCommCond({...commCond,statServerDBID:option,statName:null,objectType:null});
                      }}
                      value={applications.statServers.find((o:any)=>o.id===commCond.statServerDBID)?.name}
                      options={applications.statServers.map((o:any)=>({optionKey:o.id,optionLabel:o.name}))}
                      style={{height:'30px', width:'272px'}}
                    />
                  </div>
                  <div className='col-md-3'/>
                </div>
                <div className="row inner" style={{marginTop: '10px'}}>
                  <div className="col-md-4">
                    <label htmlFor="nameOfTheStatistic"
                           className="required">{ t('labelNameOfTheStatistic')}</label>
                  </div>
                  <div className="col-md-5">

                    <CustomDropdown
                      type={DropDownTypes.OTHER}
                      onSelectAction={(option:any) => {
                        stat.changeStatName(option);
                        setCommCond({...commCond,statName:option,objectType:null});
                      }}
                      value={statistics.find((o:any)=>o.name===commCond.statName)?.name}
                      options={statistics.map((o:any)=>({optionKey:o.name,optionLabel:o.name}))}
                      style={{height:'30px', width:'272px'}}
                    />
                  </div>
                  <div className='col-md-3'/>
                </div>

                <div className="row inner" style={{marginTop: '10px'}}>
                  <div className="col-md-4">
                    <label htmlFor="objectType" className="required">{t('labelObjectType')}</label>
                  </div>
                  <div className="col-md-5">


                    <CustomDropdown
                      type={DropDownTypes.OTHER}
                      onSelectAction={(option:any) => {
                        setCommCond({...commCond,objectType:option});
                      }}
                      value={commCond.objectType}
                      options={objects.map((o:any)=>({optionKey:o,optionLabel:o}))}
                      style={{height:'30px', width:'272px'}}
                    />
                  </div>
                  <div className='col-md-3'/>
                </div>

                <div className="row inner" style={{marginTop: '10px'}}>
                  <div className="col-md-4">
                    <label htmlFor="objectName" className="required">{t('labelObjectName')}</label>
                  </div>
                  <div className="col-md-5">
                    <div className="v-a--m">
                      <input
                        id="objectName"
                        className="form-control"
                        name="objectName"
                        disabled={!commCond.objectType}
                        value={commCond.objectName}
                        required
                        onChange={({target: { value}}:any) => {
                          setCommCond({...commCond, objectName:value});
                        }}
                        style={{width: '220px', display: 'inline'}} />
                    </div>
                  </div>
                  <div className='col-md-3'/>
                </div>

                <div className="row inner" style={{marginTop: '10px'}}>
                  <div className="col-md-4">
                    <label htmlFor="statisticValue" className="required">{ t('labelStatisticValue')}</label>
                  </div>
                  <div className="col-md-3">
                    <CustomDropdown
                      type={DropDownTypes.OTHER}
                      onSelectAction={(option:any) => {
                        setCommCond({...commCond,statValue:option});
                      }}
                      value={stat.statValues.find((o:any)=>o.value===commCond.statValue)?.name as string}
                      options={stat.statValues.map((o:any)=>({optionKey:o.value,optionLabel:o.name}))}
                      style={{height:'30px', width:'127px'}}
                    />
                  </div>
                  <div className="col-md-3">


                    <div className="v-a--m">
                      <input
                        id="statisticValueBox"
                        className="form-control"
                        name="statisticValueBox"
                        disabled={!commCond.objectType}
                        value={commCond.statisticValueBox}
                        required
                        onChange={({target: { value}}:any) => {
                          setCommCond({...commCond, statisticValueBox:value});
                        }}
                        min="1"
                        style={{width: '40px', display: 'inline'}} />
                    </div>


                  </div>
                </div>

                <div className="row inner" style={{marginTop: '10px'}}>
                  <div className="col-md-4">
                    <label htmlFor="notificationType"
                           className="required">{t('labelNotificationType')}</label>
                  </div>
                  <div className="col-md-4">
                    <CustomDropdown
                      type={DropDownTypes.OTHER}
                      onSelectAction={(option:any) => {
                        setCommCond({...commCond,notificationType:option});
                      }}
                      value={stat.s.find((o:any)=>o.value===commCond.notificationType)?.name as string}
                      options={stat.s.map((o:any)=>({optionKey:o.value,optionLabel:o.name}))}
                      style={{height:'30px', width:'127px'}}
                    />
                  </div>
                  <div className="col-md-2" style={{lineHeight: '32px',padding: 0,marginRight: '-20px'}}>
                    { commCond.notificationType === 0 ? t('labelIntensity') : t('labelFrequency')}&nbsp;
                  </div>

                  <div className="col-md-1">

                    <div className="v-a--m">
                      <input
                        id="intensityFrequency"
                        className="form-control"
                        name="intensityFrequency"
                        disabled={!commCond.objectType}
                        value={commCond.intensityFrequency}
                        required
                        onChange={({target: { value}}:any) => {
                          setCommCond({...commCond, intensityFrequency:value});
                        }}
                        max={commCond.notificationType === 0 ? 100 : 1000000000}
                        style={{width: '40px', display: 'inline'}} />
                    </div>

                  </div>
                  <div className="col-md-1" style={{lineHeight: '32px'}}>
                    { commCond.notificationType === 0 ? '%' : t('labelSec')}

                  </div>
                </div>


              </div>



              <div className="dialing-block ng-hide" style={['setmode','start'].includes(commCond.command)?{}:{display:'none'}}
                   >
                <div className="row">
                  <div className="col-md-12">
                    <div style={{ height: '30px', borderBottom: '1px solid rgba(0, 0, 0, 0.12)', marginBottom: '10px' }}/>
                  </div>
                </div>


                <h2>
                  {/*<span style="padding: 0 5px;top: -1px;position: relative;color: #ffc107;" ng-if="vm.model.errorMess"*/}
                  {/*      className="fonticon icon-alert-circle icon__entity--invalid">*/}
                  {/*  <md-tooltip md-direction="top"> {{ 'labelDialingParametersOverCampaignGroup' | translate}}</md-tooltip>*/}
                  {/*</span>*/}
                  {t('labelCampaignGroupDialing')}</h2>

                <div className="row inner" style={{ marginTop: '10px'}}>

                  <div className="col-md-4" style={{ lineHeight: '32px'}} >
                    <label htmlFor="dialMode" className="">{t('labelDialingMode')}</label>
                  </div>
                  <div className="col-md-5">

                      <CustomDropdown
                        type={DropDownTypes.OTHER}
                        onSelectAction={(option:any) => {
                          setCommCond({...commCond,dialMode:option});
                        }}
                        value={dialingModesDropDown.find((o:any)=>o.optionKey===commCond.dialMode)?.optionLabel}
                        options={dialingModesDropDown}
                        style={{height:'30px', width:'328px'}}
                      />

                  </div>
                  <div className='col-md-2'/>
                </div>



                <div className="row inner" style={{marginTop: '10px'}} >
                  <div className="col-md-4" style={{lineHeight: '32px'}}>
                    <label htmlFor="optMethod" className="">{ t('labelOptimizationParameter') }</label>
                  </div>
                  <div className="col-md-5">
                    <div className="btn-group bootstrap-select show-tick ark-dropdown"
                         >

                      <CustomDropdown
                        type={DropDownTypes.OTHER}
                        onSelectAction={(option:any) => {
                          const [min, max] = changeDialValidation.getTargetValidation(option).range;
                          setMinMax({min,max});
                          setCommCond({...commCond,optMethod:option,optMethodValue:changeDialValidation.getTargetValidation(option).defaultValue});
                        }}
                        value={optimizationMethodsDropDown.find((o:any)=>o.optionKey===commCond.optMethod)?.optionLabel}
                        options={optimizationMethodsDropDown.filter((opt:any)=>
                          'PredictGVP' === commCond.dialMode ||
                          ['Predict', 'PredictAndSeize'].includes(commCond.dialMode) && opt.optionKey!=='DistributionTime')}
                        disabled={!['Predict', 'PredictGVP', 'PredictAndSeize'].includes(commCond.dialMode)}
                        style={{height:'30px', width:'328px'}}
                      />

                    </div>
                  </div>
                  <div className='col-md-2'/>
                </div>


                <div className="row" style={{marginTop: '10px'}} >
                  <div className="col-md-4" style={{lineHeight: '30px'}}>
                    { t(commCond.dialMode !== dialModesReverse['Power'] ? 'labelOptimizationGoal' : 'labelCallsPerMinute')}
                  </div>
                  <div className="col-md-2">
                    <div className={`${get(formRef,'current.optMethodValue.validity.valid', true) ?'':'has-error'}`} >
                      <input
                        type="number"
                        id="optMethodValue"
                        className="form-control"
                        name="optMethodValue"
                        onChange={({target: { valueAsNumber}}:any) => {
                          setCommCond({...commCond,optMethodValue:valueAsNumber})
                        }}
                        value={commCond.optMethodValue}
                        required={['Predict', 'PredictGVP', 'PredictAndSeize'].includes(commCond.dialMode) && ['setmode','start'].includes(commCond.command)}
                        disabled={!['Predict', 'PredictGVP', 'PredictAndSeize'].includes(commCond.dialMode)}
                        max={minMax.max}
                        min={minMax.min}
                        style={{width: '50px', display: 'inline'}}/>
                    </div>
                  </div>
                  <div className="col-md-2" style={{lineHeight: '30px',paddingLeft: 0,marginLeft: '-10px'}}>
                    <div  style={commCond.dialMode !== dialModesReverse['Power']?{display: 'contents'}:{display:'none'}}>
                      <span style={!['WaitTime','DistributionTime'].includes(commCond.optMethod)?{}:{display:'none'}} >%</span>
                      <span style={['WaitTime','DistributionTime'].includes(commCond.optMethod)?{}:{display:'none'}}
                            >{t('labelSec')}</span>
                    </div>
                  </div>
                </div>

                {/*<div className="row" style="margin-top:5px" ng-if="vm.channel === 'voice'">*/}
                {/*  <div className="col-md-12">*/}
                {/*    <div className="checkbox repeat"*/}
                {/*         ng-class="{disabled:['Preview','PushPreview','Power'].includes(vm.model.dialMode)}">*/}
                {/*      <label>*/}
                {/*        <input id="engageAgentsFirst" name="engageAgentsFirst" type="checkbox" className="ark-checkbox"*/}
                {/*               ng-disabled="['Preview','PushPreview','Power'].includes(vm.model.dialMode)"*/}
                {/*               ng-checked="vm.model.engageAgentsFirst === true"*/}
                {/*               ng-model="vm.model.engageAgentsFirst" /><span></span> {{ 'labelEngageAgentsFirst' | translate}}*/}
                {/*        <span className="icon-iw-active-circle-question" style="vertical-align: top;"*/}
                {/*              aria-hidden="true">*/}
                {/*    <md-tooltip*/}
                {/*      md-direction="bottom">{{ 'labelWhenCheckedCurrentDialingModeChangesToSeizing' | translate}}</md-tooltip>*/}
                {/*  </span>*/}
                {/*      </label>*/}

                {/*    </div>*/}
                {/*  </div>*/}
                {/*</div>*/}
              </div>



              <div className="row" style={['load','start','setmode'].includes(commCond.command)?{}:{display:'none'}}>
                <div className="col-md-12">
                  <div className={'delimiter-line'}/>
                </div>
              </div>
              <div style={['load','start','setmode'].includes(commCond.command)?{}:{display:'none'}}>
                <h2>Priorities for record types</h2>
                <div>

                  <div className={'priorities-row'}>
                    {[{name:'Record type'},{name:'Priority'},{name:'N Records'}].map((col, index) => (
                      <div className={'properties-head'} key={index}>{col.name}</div>
                    ))}
                  </div>

                    {commCond.priorities?.map(({type, priority, nRecords}:any, index:any) => (
                      <div className={'priorities-row'} key={index}>
                        <div style={{lineHeight:'30px'}}>{t(type)}</div>
                        <div className={`${get(formRef,`current.${type}priority${index}.validity.valid`, true) ?'':'has-error'}`} >
                          <input
                            name={`${type}priority${index}`}
                            id={`${type}priority${index}`}
                            required={['load','start','setmode'].includes(commCond.command)} style={{lineHeight:'30px'}}
                            className={'form-control'} type='number' value={priority}
                            onChange={({target:{valueAsNumber}})=>{
                            commCond.priorities[index].priority = valueAsNumber;
                            setCommCond({...commCond})
                          }}/>
                        </div>
                        <div className={`${get(formRef,`current.${type}nRecords${index}.validity.valid`, true) ?'':'has-error'}`}>
                          <input
                            name={`${type}nRecords${index}`}
                            id={`${type}nRecords${index}`}
                            required={['load','start','setmode'].includes(commCond.command)} style={{lineHeight:'30px'}}
                            className={'form-control'} type='number' value={nRecords}
                            onChange={({target:{valueAsNumber}})=>{
                            commCond.priorities[index].nRecords = valueAsNumber;
                            setCommCond({...commCond})
                          }}/>
                        </div>
                      </div>
                    ))}
                </div>

              </div>

            </div>
            <div className="modal-footer">
              <button style={{ float: 'left' }} className="btn btn-default" onClick={(e) => {
                e.preventDefault();
                setShowItem(false);
              }}>
                {t('no')}
              </button>
              <button focus-me="true" disabled={!valid} style={{ float: 'right' }} className="btn btn-primary" onClick={(e) => {
                e.preventDefault();
                setShowItem(false);
                const {campaign,type,command} = campaignCommCondIndexes;



                const finder = (arr:any, value:any) => arr.find((o:any) => o.optionKey === value)?.optionLabel;


                const comm = finder(commands, commCond.command);


                let cond = finder(conditions, commCond.condition);
                cond = cond === 'At time' ? '' : cond;

                let time = '';
                if(['after','timeInState', 'timeInStateAdvanced'].includes(commCond.condition)){
                  const h = finder(stopAfter.h, commCond.afterHour);
                  const m = finder(stopAfter.min, commCond.afterMin);
                  const s = finder(stopAfter.s, commCond.afterSec);
                  time = `${h} ${m} ${s}`;
                }

                if(commCond.condition === 'attime'){
                  const at = commCond.at.replace(/\./g,(q:any,w:any)=>(w===+'4' || w===+'5')?' ':':');
                  time = `at ${at}`;
                }

                let state = '';
                if(['timeInStateAdvanced'].includes(commCond.condition)){
                  state += `when Campaign Group is ${commCond.campaignGroup} and `;
                }
                if(['timeInState','timeInStateAdvanced'].includes(commCond.condition)){
                  const sis = finder(states, commCond.spentInState);

                  state += `when state is ${sis}`;
                }


                commCond.label = `${comm} ${cond} ${time} ${state}`.trim();


                if(command !== null) {
                  Object.assign(model.schedule[campaign].items[type].items[command], commCond);
                }else{
                  model.schedule[campaign].items[type].items.push(commCond)
                }
                setModel({...model});
              }}>
                {t('yes')}
              </button>
              <input type="submit" style={{ display: 'none' }} />
            </div>
          </form>
        </CustomPopUp>
      }
      { isLoadingList ?
        <Spinner /> :
        <div style={{margin:'20px', display:'flex', justifyContent: 'space-around', gap:'20px'}}>
          <div style={{width:'400px'}}>
            <div className="tenant-container form-group">
              <label htmlFor="name"  style={{marginBottom:'20px'}} className="required ng-binding">Name</label>
              <input className="form-control right-icon" id="name" name="name" placeholder="Outbound schedule name"
                     type="text" value={model.name} onChange={changeFn}/>
            </div>
            <div className="tenant-container form-group" style={{marginBottom:'31px'}}>
                <textarea style={{resize:'none',height:'100px'}} className="form-control right-icon" id="description" name="description" placeholder="Description"
                     value={model.description} onChange={changeFn}/>
            </div>
            <div className="tenant-container form-group" style={{marginBottom:'90px'}} id={'schedule-ocs'}>
              <CustomDropdown
                value={serversList.find((o:any)=>o.ocsId===model.serverId)?.name}
                placeholder={'Select a server'}
                type={DropDownTypes.OTHER}
                options={serversList.map((x:any) => {
                  return { optionLabel: x.name, optionKey: x.ocsId };
                })}
                onSelectAction={(option:any) => setModel({...model, serverId: option})}
                style={{height:'30px'}}
              />
            </div>
            <button style={{ float: 'left' }} className="btn btn-default" onClick={() => {
              setModel(obj);
              dispatch(setScheduleActive(undefined));
              dispatch(setScheduleFolderActive(undefined));
            }}>
              {t('labelReset')}
            </button>

            <button focus-me="true" style={{ float: 'right' }} disabled={JSON.stringify(obj) === JSON.stringify(model)} className={`btn btn-primary ${loading?'disabled':''}`} onClick={() => {
              active.id > -1 ? dispatch(putListsRecord(model)) : dispatch(postListsRecord(model));
              active.id > -1 && dispatch(setName(model));
              // dispatch(setCallingListsActive(model));
              // dispatch(getCallingList({ listId: active.id, name: active.name }));
            }}>
              {active.id < 0 ? `${t('Create in ')} ${activeFolder.id<0 ? 'root': activeFolder.name} folder` : t('Update')}
            </button>
          </div>
          <div>
            <div>{t('labelDefineRecurrenceOfTheOutboundSchedule')}</div>
            <ButtonsGroup value={model.execute} change={changeExecute} buttons={buttons} />
            <br/>
            <div>{executionDescrition[model.execute]}</div>
            <div style={{ height: '30px', borderBottom: '1px solid rgba(0, 0, 0, 0.12)', marginBottom: '10px' }}/>
            <h2>Start Condition</h2>
            {/*<div style={{display:'flex', gap:'20px'}}>*/}
            <div className={`dates ${model.execute}`}>
              {model.execute  !== 'once' && <div style={{display:'inline-grid'}}>
                <label htmlFor="every"  className="required ng-binding">Repeat every</label>
                <CustomDropdown
                  type={DropDownTypes.OTHER}
                  onSelectAction={(option:any) => setModel({...model, every: option})}
                  placeholder={'Repeat every'}
                  value={repeatEvery[model.execute]?.find((o:any) => o.optionKey === model.every)?.optionLabel || model.every}
                  options={repeatEvery[model.execute]}
                  style={{height:'30px', width:'150px'}}
                />
              </div>}
              <div style={{...{display:'inline-grid'},...(model.execute ==='once'?{gridArea:'right'}:{})}}>
                <label htmlFor="at" >at</label>
                <input value={model.startTime} onChange={changeTime} className={'btn btn-default date-time-fix'} name={'startTime'} type="time" />
              </div>
              <div style={{display:'inline-grid'}}>
                <label htmlFor="from" >{model.execute !=='once' ? 'from' : 'Execute once on'}</label>
                <input type="date"  className={'btn btn-default date-time-fix'} value={model.dateFrom} name={'dateFrom'} onChange={changeFn}/>
              </div>
              {model.execute  !== 'once' && <div style={{display:'inline-grid'}}>
                <label htmlFor="until" >until</label>
                <input type="date" className={'btn btn-default date-time-fix'} value={model.dateTill} name={'dateTill'} onChange={changeFn}  />
              </div>}
            </div>
            { ['monthly', 'weekly'].includes(model.execute) && <label style={{fontWeight: 'normal', marginTop:'20px'}} className="required ng-binding">On the following Days of the {model.execute=== 'monthly' ?'Month':'Week'}</label>}
            <div className={`month-days ${model.execute === 'weekly' ? 'week' : ''}`}>
              {model.execute === 'monthly' && days.map((_, index:number)=><label key={`label${index}`}>
                  <input key={`input${index}`}
                         required={!model.cycle.length}
                         type="checkbox" name={`day${index}`}
                         value={days[index]}
                         onChange={()=>changeDays(index+1)}
                         checked={model.cycle.includes(index+1)}
                  />
                  <span style={index === 31 ? {width: 'auto',padding: '0px 6px'} : {}}
                        className={model.cycle.includes(index+1) ? 'btn-primary' : 'btn-default'}>
            {index === 31 ? 'last day of the month' : index+1}
          </span></label>
              )}
              {model.execute === 'weekly' && week.map((_, index:number)=><label key={`label${index+1}`}>
                  <input key={`input${index+1}`}
                         required={!model.cycle.length}
                         type="checkbox" name={`week${index+1}`}
                         value={week[index+1]}
                         onChange={()=>changeDays(index+1)}
                         checked={model.cycle.includes(index+1)}
                  />
                  <span className={model.cycle.includes(index+1) ? 'btn-primary' : 'btn-default'}>
            {t(weekStr[index+1])}
          </span></label>
              )}
              {model.execute === 'weekly' && [0].map((_, index:number)=><label key={`label${index}`}>
                  <input key={`input${index}`}
                         required={!model.cycle.length}
                         type="checkbox" name={`week${index}`}
                         value={week[index]}
                         onChange={()=>changeDays(index)}
                         checked={model.cycle.includes(index)}
                  />
                  <span className={model.cycle.includes(index) ? 'btn-primary' : 'btn-default'}>
            {t(weekStr[index])}
          </span></label>
              )}
            </div>
            {/*</div>*/}


            <h2>Stop Condition (whichever occurs first)</h2>
            <div className={'dates'}>

              <div style={{display:'inline-grid'}}>
                <label htmlFor="stopAt" >Stop at <span style={model.stopTime !== '' ? {} : {visibility:'hidden'}} onClick={()=>{
                  model.stopTime = '';
                  setModel({...model});
                }} className={'clearer'} >clear<strong>+</strong></span></label>
                <input value={model.stopTime} onChange={changeTime} className={'btn btn-default date-time-fix'} name={'stopTime'} type="time" />
              </div>
              <div style={{display:'inline-grid'}}>
                <label htmlFor="stopAfter" >Stop after <span style={model.stopAfterHour && model.stopAfterMin ? {} : {visibility:'hidden'}} onClick={()=>{
                  model.stopAfterHour = null;
                  model.stopAfterMin = null;
                  setModel({...model});
                }} className={'clearer'} >clear<strong>+</strong></span></label>
                <CustomDropdown
                  type={DropDownTypes.OTHER}
                  onSelectAction={(option:any) => setModel({...model, stopAfterHour: option})}
                  placeholder={'Hour'}
                  value={stopAfter.h.find((o:any) => o.optionKey === model.stopAfterHour)?.optionLabel}
                  options={stopAfter.h}
                  style={{height:'30px', width:'150px'}}
                />
              </div>
              <div style={{display:'inline-grid'}}>
                <label style={{visibility:'hidden'}} htmlFor="stopAfter" >Stop after</label>
                <CustomDropdown
                  type={DropDownTypes.OTHER}
                  onSelectAction={(option:any) => setModel({...model, stopAfterMin: option})}
                  placeholder={'Min'}
                  value={stopAfter.min.find((o:any) => o.optionKey === model.stopAfterMin)?.optionLabel}
                  options={stopAfter.min}
                  style={{height:'30px', width:'150px'}}
                />
              </div>
            </div>


          </div>

          <div  id="campaignTree" className="form-control" style={{...{ height: 'fit-content', padding: 0 , marginTop:'20px', width:'500px'}}}>
            <div style={{display:'flex', margin: '5px 0'}}>
              {['expand', 'collapse'].map((actionType: any, index) => (
                <div key={index}>
                  <IconButton
                    name={t(actionType)}
                    key={actionType}
                    style={{ width: 'initial' }}
                    click={event => {
                      toggleExpand(model.schedule, actionType === 'expand');
                      setModel({...model});
                    }}
                    type={actionType}
                  />
                </div>
              ))}
              <div >
                <IconButton
                  name={t('Add Campaign Group')}

                  style={{ width: 'initial' }}
                  click={event => {
                    setAddCampaign(true);
                  }}
                  type={'insert'}
                />
              </div>
            </div>
            <div className={'search-container'} id={'search-schedule-campaigns'}>
              <SerchTrottled width={430} callback={(value,fn)=>{
                setFiltered(Object.values(schedulesLabels).filter((o:any)=>o.includes(value)));
                setSearch(value);
                clearSearch = fn;
              }} />
            </div>
            <ul style={{overflow: 'scroll', maxHeight: '500px'}}>
              {model.schedule?.map((item:any, index:any) =>{
                schedulesLabels[index] = item.label.toLowerCase();
                return (<li key={index} style={search && !filtered.includes(item.label.toLowerCase()) ? {display:'none'} : {}}>

                  {/*<div ng-class="{line1:!$first}" ng-init="scheduleError = vm.model.scheduleErrors[$index]"></div>*/}
                  <div style={{ background: '#f5f7fa', display: 'flex', position: 'relative' }} key={index} className="title" id={`cg${index}`}>
              <span style={{ padding: 0 }} className={`fonticon icon-dropdown-arrow ${!item.expanded ? 'collapsed' : ''}`}
                    onClick={() => {
                      item.expanded = !item.expanded;
                      setModel({...model})
                    }}/>
                    <i className={`fonticon campaign-icon icon-agent`}/>
                    <span style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginRight: '25px'}}
                          title={item.label}>{ item.label }</span>
                    <span className='action icon-trash' onClick={() => removeCampaignGroup(item, index)}
                          style={{ position: 'absolute', right: 0 }}/>
                  </div>
                  <ul style={item.expanded ?{ } : {display: 'none'}}>
                    {item.items.map((item2:any, index2:any)=><li key={`${index}${index2}`}>
                      <div className='line2'/>
                      <div className="title">
                  <span className={`fonticon icon-dropdown-arrow ${!item2.expanded ? 'collapsed' : ''} ${!item2.items.length ? 'invisible' : ''}`}
                        onClick={() => {
                          item2.expanded = !item2.expanded;
                          setModel({ ...model });
                        }}/>
                        { item2.label }
                        <span className={'action icon-add'} onClick={() => {
                          addItem(cloneDeep(item2), null, cloneDeep(item),{campaign:index,type:index2,command:null});
                        }}/>

                      </div>


                        <OutboundSchedulesCommand
                          addItem={addItem}
                          removeItem={removeItem}
                          callback={(items:any)=>{
                            item2.items = items;
                            setModel({...model});
                          }}
                          expanded={item2.expanded}
                          index={index}
                          index2={index2}
                          item={item}
                          item2={item2}/>


                    </li>)}
                  </ul>

                </li>)})}
            </ul>
          </div>

        </div>
      }
  </>
  );

};

export default OutboundSchedulesCreateEdit;

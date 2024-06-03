import { TCallingListRecors } from 'src/api/ts/interfaces/CallingLists.response';
import TdSection from '../TdSection';
import { recordStatus, recordType, deviceType, callResult } from 'src/constants/tablesPropertiesTypes';

interface TCallingListInfo {
  data: TCallingListRecors;
}

export const CallingListInfoComponent = (props: TCallingListInfo) => {
  const {
    c_first_name,
    c_last_name,
    contact_info,
    contact_info_type,
    c_client_id,
    c_company,
    c_tz_name,
    c_postal_code,
    cd_country_code_iso,
    cd_state_code,
    call_result,
    disposition_code,
    call_time,
    record_type,
    record_status,
    c_other1,
    c_other2,
    c_other3,
    c_other4,
    c_other5,
    c_other6,
    c_other7,
    c_other8,
    c_other9,
    c_other10,
    c_other11,
    c_other12,
    c_other13,
    c_other14,
    c_other15,
    c_other16,
    c_other17,
    c_other18,
    c_other19,
    c_other20,
  } = props.data;
  return (
    <>
      <TdSection paddingLR={15} info={c_first_name} />
      <TdSection paddingLR={15} info={c_last_name} />
      <TdSection paddingLR={15} info={contact_info} />
      <TdSection paddingLR={15} info={deviceType[contact_info_type]} />
      <TdSection paddingLR={15} info={c_client_id} />
      <TdSection paddingLR={15} info={c_company} />
      <TdSection paddingLR={15} info={c_tz_name} />
      <TdSection paddingLR={15} info={c_postal_code} />
      <TdSection paddingLR={15} info={cd_country_code_iso} />
      <TdSection paddingLR={15} info={cd_state_code} />
      <TdSection paddingLR={15} info={callResult[call_result]} />
      <TdSection paddingLR={15} info={disposition_code} />
      <TdSection paddingLR={15} info={call_time} />
      <TdSection paddingLR={15} info={recordType[record_type]} />
      <TdSection paddingLR={15} info={recordStatus[record_status]} />
      <TdSection paddingLR={15} info={c_other1} />
      <TdSection paddingLR={15} info={c_other2} />
      <TdSection paddingLR={15} info={c_other3} />
      <TdSection paddingLR={15} info={c_other4} />
      <TdSection paddingLR={15} info={c_other5} />
      <TdSection paddingLR={15} info={c_other6} />
      <TdSection paddingLR={15} info={c_other7} />
      <TdSection paddingLR={15} info={c_other8} />
      <TdSection paddingLR={15} info={c_other9} />
      <TdSection paddingLR={15} info={c_other10} />
      <TdSection paddingLR={15} info={c_other11} />
      <TdSection paddingLR={15} info={c_other12} />
      <TdSection paddingLR={15} info={c_other13} />
      <TdSection paddingLR={15} info={c_other14} />
      <TdSection paddingLR={15} info={c_other15} />
      <TdSection paddingLR={15} info={c_other16} />
      <TdSection paddingLR={15} info={c_other17} />
      <TdSection paddingLR={15} info={c_other18} />
      <TdSection paddingLR={15} info={c_other19} />
      <TdSection paddingLR={15} info={c_other20} />
    </>
  );
};

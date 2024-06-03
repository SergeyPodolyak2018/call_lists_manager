import { EClass, Tree, TCfgFolder } from './FindFolders.response';


export type TScheduleResponse = {
  $class: string;
  id: number;
  name: string;
  description: string;
  cycle: number[];
  dateFrom: string;
  dateTill: string;
  every: number;
  schedule: {}[];
};



export type TScheduleListsResponse = {
  $class: EClass.SCRIPT;
  id: number;
  name: string;
  state: number;
};

export type TIncluded = {
  id:number;
  name:string;
}


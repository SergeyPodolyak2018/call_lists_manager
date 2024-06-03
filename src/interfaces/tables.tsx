import { TableType } from 'src/constants/tablesTypes';

export interface ITableInfo {
  type: TableType;
  columns: IColumnEntity[];
}

export interface IColumnEntity {
  id: number;
  name: string;
  subColumns?: IColumnEntity[];
}

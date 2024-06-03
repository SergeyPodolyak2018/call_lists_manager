export interface IDropDown {
  onSelectAction: (option: any) => void;
  options: IOption[];
  value: string;
  type: DropDownTypes;
  disabled?: boolean;
  validation?: string[];
  placeholder?: string;
  style?: React.CSSProperties;
  optionsPanelColor?: any;
}

export interface IOption {
  optionLabel: string;
  optionKey?: string;
}

export interface IOptionUniversal {
  optionLabel: string;
  optionKey?: string | number;
}

export enum DropDownTypes {
  OPT_TYPE,
  DIAL_MODE,
  IMPORT_MODE,
  OTHER,
}
type Modify<T, R> = Omit<T, keyof R> & R;

export interface IDropDownFlex extends Omit<IDropDown, 'value' | 'options'> {
  value: string | number;
  options: IOptionUniversal[];
  circled?: boolean;
  preopenAction?: () => void;
}

import { CSSProperties } from 'styled-components';

export type ShadowRootStyle = {
  styles: CSSProperties;
  selector: string;
};

export type ShadowRootStyles = ShadowRootStyle[] | ShadowRootStyle;

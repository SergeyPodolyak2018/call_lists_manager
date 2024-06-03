import { CSSProperties } from 'react';

export type ShadowRootStyle = {
  styles: CSSProperties;
  selector: string;
};

export type ShadowRootStyles = ShadowRootStyle[] | ShadowRootStyle;

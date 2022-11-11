import 'styled-components';
import { ThemeModel } from './theme/theme-model';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends ThemeModel {}
}

/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

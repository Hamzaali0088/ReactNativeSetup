declare module 'react-circle-flags' {
  import * as React from 'react';

  export interface CircleFlagProps {
    countryCode: string;
    height?: number;
    width?: number;
  }

  export const CircleFlag: React.FC<CircleFlagProps>;
}


import * as React from 'react';

import { Path, Svg } from 'react-native-svg';
import { COLORS } from '@themes';

function AccountIcon({ color = COLORS.primaryBlack, width = 18, height = 18 }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 18 18" fill="none">
      <Path
        d="M0 2v14a2 2 0 002 2h14c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2H2a2 2 0 00-2 2zm12 4c0 1.66-1.34 3-3 3S6 7.66 6 6s1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H3v-1z"
        fill={color}
      />
    </Svg>
  );
}

export { AccountIcon };

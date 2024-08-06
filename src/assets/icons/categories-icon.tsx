import { COLORS } from '@themes';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function CategoriesIcon({
  color = COLORS.primaryBlack,
  width = 20,
  height = 20
}) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
    >
      <Path
        d="M8.65.94L4.93 7.02c-.41.66.07 1.52.85 1.52h7.43c.78 0 1.26-.86.85-1.52L10.35.94a.993.993 0 00-1.7 0zM15 19.54a4.5 4.5 0 100-9 4.5 4.5 0 000 9zM1.5 19.04h6c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1z"
        fill={color}
      />
    </Svg>
  );
}

export { CategoriesIcon };

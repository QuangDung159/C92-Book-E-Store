import * as React from 'react';
import { Path, Svg } from 'react-native-svg';
import { COLORS } from '@themes';

function HomeIcon({ color = COLORS.primaryBlack, width = 19, height = 18 }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 19 18" fill="none">
      <Path
        d="M7.198 16.332v-5.001h4v5.001c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V9.33h1.7c.46 0 .68-.57.33-.87L9.868.928c-.38-.34-.96-.34-1.34 0L.168 8.46c-.34.3-.13.87.33.87h1.7v7.002c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z"
        fill={color}
      />
    </Svg>
  );
}

export { HomeIcon };

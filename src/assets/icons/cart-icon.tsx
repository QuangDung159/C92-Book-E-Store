import * as React from 'react';
import { Path, Svg } from 'react-native-svg';
import { COLORS } from '@themes';

function CartIcon({ color = COLORS.primaryBlack, width = 20, height = 20 }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        d="M5.996 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-6-15c0 .55.45 1 1 1h1l3.6 7.59-1.35 2.44c-.73 1.34.23 2.97 1.75 2.97h11c.55 0 1-.45 1-1s-.45-1-1-1h-11l1.1-2h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49a.996.996 0 00-.87-1.48h-14.8L3.536.57a.993.993 0 00-.9-.57H.996c-.55 0-1 .45-1 1zm16 15c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"
        fill={color}
      />
    </Svg>
  );
}

export { CartIcon };

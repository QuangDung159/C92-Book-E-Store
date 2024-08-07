import React, { FC } from 'react';
import { View } from 'react-native';
interface MaxSpaceProps {
  value?: string;
}

const MaxSpace: FC<MaxSpaceProps> = () => {
  return <View style={{ flex: 1 }} />;
};

export { MaxSpace };

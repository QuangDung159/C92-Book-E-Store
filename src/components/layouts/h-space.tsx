import React, { FC } from 'react';
import { View } from 'react-native';

interface HSpaceProps {
  value: number;
}

const HSpace: FC<HSpaceProps> = ({ value }) => {
  return <View style={{ width: value }} />;
};

HSpace.defaultProps = {};

export { HSpace };

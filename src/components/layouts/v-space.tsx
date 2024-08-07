import React, { FC } from 'react';
import { View } from 'react-native';
interface VSpaceProps {
  value: number;
}

const VSpace: FC<VSpaceProps> = ({ value }) => {
  return <View style={{ height: value }} />;
};

VSpace.defaultProps = {};

export { VSpace };

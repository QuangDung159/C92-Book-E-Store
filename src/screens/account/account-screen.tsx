import React from 'react';
import { Button, Text, View } from 'react-native';
import { USER } from '@constants';
import { useNavigate } from '@hooks';
import { appModel } from '@store';
import { delay } from '@utils';

const AccountScreen = ({ navigation }: any) => {
  const { openCartScreen } = useNavigate(navigation);

  return (
    <View>
      <Text>AccountScreen</Text>
      <Button
        title="Go to account screen"
        onPress={() => {
          appModel.login(USER);
          delay(1000).then(() => openCartScreen());
        }}
      />
    </View>
  );
};

export { AccountScreen };

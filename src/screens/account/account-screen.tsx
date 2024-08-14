import React from 'react';
import { Button, Text, View } from 'react-native';
import { USER } from '@constants';
import { userStore } from '@store';

const AccountScreen = ({ navigation }: any) => {
  return (
    <View>
      <Text>AccountScreen</Text>
      <Button
        title="Go to account screen"
        onPress={() => {
          userStore.setUserProfile(USER);
        }}
      />
    </View>
  );
};

export { AccountScreen };

import React from 'react';
import { Button, Text, View } from 'react-native';

const AccountScreen = ({ navigation }: any) => {
  return (
    <View>
      <Text>AccountScreen</Text>
      <Button
        title="Go to account screen"
        onPress={() => navigation.navigate('account')}
      />
    </View>
  );
};

export { AccountScreen };

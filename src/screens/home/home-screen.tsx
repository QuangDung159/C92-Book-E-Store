import React from 'react';
import { Button, Text, View } from 'react-native';

const HomeScreen = ({ navigation }: any) => {
  return (
    <View>
      <Text>Home Screen</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('account')}
      />
    </View>
  );
};

export { HomeScreen };


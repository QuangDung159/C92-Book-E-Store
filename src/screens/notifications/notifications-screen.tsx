import React from 'react';
import { Button, Text, View } from 'react-native';

const NotificationsScreen = ({ navigation }: any) => {
  return (
    <View>
      <Text>NotificationsScreen</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
};

export { NotificationsScreen };

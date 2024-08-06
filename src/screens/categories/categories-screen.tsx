import React from 'react';
import { Button, Text, View } from 'react-native';

const CategoriesScreen = ({ navigation }: any) => {
  return (
    <View>
      <Text>CategoriesScreen</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
};

export { CategoriesScreen };


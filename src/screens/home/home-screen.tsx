import React from 'react';
import { Button, ScrollView, Text, View } from 'react-native';

const HomeScreen = ({ navigation }: any) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          height: 600,
        }}
      >
        <Text
          style={{
            fontSize: 30,
          }}
        >
          Home Screen
        </Text>
      </View>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('account')}
      />
    </ScrollView>
  );
};

export { HomeScreen };

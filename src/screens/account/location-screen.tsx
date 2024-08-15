import { observer } from 'mobx-react-lite';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { BottomButtonSection, Layouts, ScreenHeader } from '@components';
import { DataModels } from '@models';
import { COLORS } from '@themes';

const LocationScreen = ({ navigation, route }: any) => {
  const shippingAddress: DataModels.IShippingAddress =
    route.params?.shippingAddress;

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={`${shippingAddress ? 'Edit' : 'Add'} Shipping Address`}
        navigation={navigation}
      />
      <ScrollView
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.wrapper}
      >
        <Layouts.VSpace value={12} />
      </ScrollView>
      <BottomButtonSection onPress={() => {}} buttonTitle="Submit" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryWhite,
  },
  wrapper: {
    paddingHorizontal: 24,
  },
});

const observable = observer(LocationScreen);
export { observable as LocationScreen };

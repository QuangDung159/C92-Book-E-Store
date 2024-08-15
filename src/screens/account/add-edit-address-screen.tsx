import { observer } from 'mobx-react-lite';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { BottomButtonSection, Layouts, ScreenHeader } from '@components';
import { DataModels } from '@models';
import { COLORS } from '@themes';
import { AddressItem } from './components';

const AddEditAddress = ({ navigation, route }: any) => {
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
        <Layouts.VSpace value={24} />
        {shippingAddress && <AddressItem addressItem={shippingAddress} />}
        <Layouts.VSpace value={24} />
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

const observable = observer(AddEditAddress);
export { observable as AddEditAddress };

import { observer } from 'mobx-react-lite';
import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Divider, Switch } from 'react-native-paper';
import {
  BottomButtonSection,
  Inputs,
  Layouts,
  ScreenHeader,
} from '@components';
import { DataModels } from '@models';
import { COLORS, FONT_STYLES } from '@themes';
import { AddressItem } from './components';
import { AddEditAddressViewModel } from './view-models';

const AddEditAddress = ({ navigation, route }: any) => {
  const shippingAddress: DataModels.IShippingAddress =
    route.params?.shippingAddress;

  const [primary, setPrimary] = useState(shippingAddress.primary);

  const addEditVM = useRef(
    new AddEditAddressViewModel(shippingAddress),
  ).current;

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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              ...FONT_STYLES.SEMIBOLD_16,
            }}
          >
            Set as default
          </Text>
          <Switch
            style={{
              transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
            }}
            value={primary}
            onValueChange={setPrimary}
          />
        </View>
        <Layouts.VSpace value={12} />
        <Divider />
        <Layouts.VSpace value={12} />
        <Inputs.CTextInput
          value={addEditVM.name}
          placeholder="Enter contact name"
          onChangeText={(value) => {
            addEditVM.setName(value);
          }}
          outlineStyle={{
            borderWidth: 0,
          }}
          style={{
            marginHorizontal: -16,
            height: 30,
          }}
        />
        <Inputs.CTextInput
          value={addEditVM.phoneNumber}
          placeholder="Enter phone number"
          onChangeText={(value) => {
            addEditVM.setPhoneNumber(value);
          }}
          outlineStyle={{
            borderWidth: 0,
          }}
          style={{
            marginHorizontal: -16,
            height: 30,
          }}
        />
        <Layouts.VSpace value={12} />
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

import { observer } from 'mobx-react-lite';
import React, { useRef } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Divider, Switch } from 'react-native-paper';
import {
  BottomButtonSection,
  Buttons,
  Icons,
  Inputs,
  Layouts,
  ScreenHeader,
} from '@components';
import { DataModels } from '@models';
import { COLORS, FONT_STYLES } from '@themes';

import { AddEditAddressViewModel } from './view-models';

const AddEditAddress = ({ navigation, route }: any) => {
  const shippingAddress: DataModels.IShippingAddress =
    route.params?.shippingAddress;

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
              marginRight: -10,
            }}
            value={addEditVM.primary}
            onValueChange={(value) => {
              addEditVM.setPrimary(value);
            }}
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
          style={styles.input}
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
          style={styles.input}
        />
        <Layouts.VSpace value={12} />
        <Divider />
        <Layouts.VSpace value={16} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View>
            <Text style={styles.addressInfo}>{addEditVM.city}</Text>
            <Text style={styles.addressInfo}>{addEditVM.district}</Text>
            <Text style={styles.addressInfo}>{addEditVM.ward}</Text>
          </View>
          <Icons.ChevronRightIcon size={20} />
        </View>
        <Layouts.VSpace value={16} />
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
          style={styles.input}
        />
        <Layouts.VSpace value={12} />
        <Divider />
        <Layouts.VSpace value={24} />
        <Buttons.CButton
          label="Delete address"
          onPress={() => {}}
          labelStyle={{
            color: COLORS.error50,
          }}
          style={{
            borderColor: COLORS.error50,
          }}
        />
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
  addressInfo: {
    ...FONT_STYLES.REGULAR_14,
    lineHeight: 20,
  },
  input: {
    marginHorizontal: -16,
    marginRight: -6,
    height: 30,
  },
});

const observable = observer(AddEditAddress);
export { observable as AddEditAddress };

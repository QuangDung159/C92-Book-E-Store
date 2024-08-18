import { observer } from 'mobx-react-lite';
import React, { useRef } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Divider } from 'react-native-paper';
import {
  BottomButtonSection,
  Buttons,
  Icons,
  Inputs,
  Layouts,
  ScreenHeader,
} from '@components';
import { useNavigate } from '@hooks';
import { DataModels } from '@models';
import { sharedStore } from '@store';
import { COLORS, FONT_STYLES } from '@themes';

import { delay } from '@utils';
import { AddEditAddressViewModel } from './view-models';

const AddEditAddressScreen = ({ navigation, route }: any) => {
  const shippingAddress: DataModels.IShippingAddress =
    route.params?.shippingAddress;

  const onSubmitShippingAddress = route.params?.onSubmitShippingAddress as (
    shippingAddress: DataModels.IShippingAddress,
    isAddNew?: boolean,
  ) => void;

  const { openLocationScreen } = useNavigate(navigation);

  const addEditVM = useRef(
    new AddEditAddressViewModel(shippingAddress),
  ).current;

  const onSubmitAdministrative = (
    city: string,
    district: string,
    ward: string,
  ) => {
    addEditVM.setCity(city);
    addEditVM.setDistrict(district);
    addEditVM.setWard(ward);

    if (shippingAddress) {
      onSubmitShippingAddress({
        ...shippingAddress,
        city: addEditVM.city,
        district: addEditVM.district,
        ward: addEditVM.city,
      });
    }
  };

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
        <Buttons.CSwitch
          value={addEditVM.primary}
          onValueChange={(value) => {
            addEditVM.setPrimary(value);
          }}
          title="Set as default"
          labelStyle={styles.defaultText}
          disabled={shippingAddress?.primary}
        />
        <Layouts.VSpace value={12} />
        <Divider />
        <Layouts.VSpace value={24} />
        <Inputs.CTextInput
          value={addEditVM.name}
          placeholder="Enter contact name"
          onChangeText={(value) => {
            addEditVM.setName(value);
          }}
        />
        <Layouts.VSpace value={12} />
        <Inputs.CTextInput
          keyboardType="phone-pad"
          value={addEditVM.phoneNumber}
          placeholder="Enter phone number"
          onChangeText={(value) => {
            addEditVM.setPhoneNumber(value);
          }}
        />
        <Layouts.VSpace value={24} />
        <Divider />
        <Layouts.VSpace value={16} />
        <TouchableOpacity
          onPress={() => {
            openLocationScreen(shippingAddress, onSubmitAdministrative);
          }}
        >
          <View style={styles.addressContainer}>
            {addEditVM.city ? (
              <View>
                <Text style={styles.addressInfo}>{addEditVM.city}</Text>
                <Text style={styles.addressInfo}>{addEditVM.district}</Text>
                <Text style={styles.addressInfo}>{addEditVM.ward}</Text>
              </View>
            ) : (
              <Text
                style={[
                  styles.addressInfo,
                  {
                    fontWeight: '600',
                  },
                ]}
              >
                {'Add your shipping address'}
              </Text>
            )}
            <Icons.ChevronRightIcon size={20} />
          </View>
        </TouchableOpacity>
        <Layouts.VSpace value={16} />
        <Divider />
        <Layouts.VSpace value={24} />
        <Inputs.CTextInput
          value={addEditVM.address}
          placeholder="Enter address (number, street)"
          onChangeText={(value) => {
            addEditVM.setAddress(value);
          }}
        />
        <Layouts.VSpace value={24} />
        <Divider />
        {shippingAddress && (
          <>
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
              disabled={shippingAddress.primary}
            />
          </>
        )}
        <Layouts.VSpace value={24} />
      </ScrollView>
      <BottomButtonSection
        onPress={() => {
          onSubmitShippingAddress?.(addEditVM.toJsonObject, !shippingAddress);

          sharedStore.setShowLoading(true);

          delay(1000).then(() => {
            navigation.goBack();
            sharedStore.setShowLoading(false);
          });
        }}
        buttonTitle="Submit"
      />
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
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  defaultText: {
    fontWeight: '600',
  },
});

const observable = observer(AddEditAddressScreen);
export { observable as AddEditAddressScreen };

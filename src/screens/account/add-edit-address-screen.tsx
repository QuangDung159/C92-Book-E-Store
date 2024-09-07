import { observer } from 'mobx-react-lite';
import React, { useRef } from 'react';
import {
  Keyboard,
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
import { referenceOptionsStore, sharedStore, userStore } from '@store';
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
    new AddEditAddressViewModel(shippingAddress, referenceOptionsStore),
  ).current;

  const onSubmit = async () => {
    Keyboard.dismiss();
    //
    if (addEditVM.hasAnyValidationError) {
      addEditVM.showValidationErrors(true);
      return;
    }

    sharedStore.setShowLoading(true);
    onSubmitShippingAddress?.(addEditVM.toJsonObject, !shippingAddress);
    addEditVM.createShippingAddress(userStore.userProfile.id);

    sharedStore.setShowLoading(true);

    delay(1000).then(() => {
      navigation.goBack();
      sharedStore.setShowLoading(false);
    });
    sharedStore.setShowLoading(false);
  };

  const onSubmitAdministrative = (
    province: string,
    district: string,
    ward: string,
  ) => {
    addEditVM.setProvince(province);
    addEditVM.setDistrict(district);
    addEditVM.setWard(ward);

    if (shippingAddress) {
      onSubmitShippingAddress({
        ...shippingAddress,
        province: addEditVM.province,
        district: addEditVM.district,
        ward: addEditVM.ward,
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
          errorMessage={addEditVM.validationErrors.get('name')}
          shouldShowErrorTitle={addEditVM.shouldShowValidationErrors}
        />
        <Layouts.VSpace value={12} />
        <Inputs.CTextInput
          keyboardType="phone-pad"
          value={addEditVM.phoneNumber}
          placeholder="Enter phone number"
          onChangeText={(value) => {
            addEditVM.setPhoneNumber(value);
          }}
          errorMessage={addEditVM.validationErrors.get('phoneNumber')}
          shouldShowErrorTitle={addEditVM.shouldShowValidationErrors}
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
            {addEditVM.province ? (
              <View>
                <Text style={styles.addressInfo}>
                  {addEditVM.provinceFromSource?.label}
                </Text>
                <Text style={styles.addressInfo}>
                  {addEditVM.districtFromSource?.label}
                </Text>
                <Text style={styles.addressInfo}>
                  {addEditVM.wardFromSource?.label}
                </Text>
              </View>
            ) : (
              <Text
                style={[
                  styles.addressInfo,
                  {
                    ...FONT_STYLES.SEMIBOLD_14,
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
          errorMessage={addEditVM.validationErrors.get('address')}
          shouldShowErrorTitle={addEditVM.shouldShowValidationErrors}
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
          onSubmit();
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
    ...FONT_STYLES.SEMIBOLD_14,
  },
  errorTextStyle: {
    ...FONT_STYLES.SEMIBOLD_12,
    marginTop: 4,
    color: COLORS.error50,
  },
});

const observable = observer(AddEditAddressScreen);
export { observable as AddEditAddressScreen };

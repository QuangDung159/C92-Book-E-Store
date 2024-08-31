import { observer } from 'mobx-react-lite';
import React, { useRef, useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Divider } from 'react-native-paper';
import {
  BottomButtonSection,
  Buttons,
  Inputs,
  Layouts,
  ScreenHeader,
} from '@components';
import { useNavigate } from '@hooks';
import { appModel, userStore } from '@store';
import { COLORS } from '@themes';
import { EditAccountViewModel } from './view-models';

const EditAccountScreen = ({ navigation }: any) => {
  const editVM = useRef(new EditAccountViewModel(appModel.userStore)).current;
  const { openHomeScreen } = useNavigate(navigation);

  const onSubmit = async () => {
    Keyboard.dismiss();
    //
    if (editVM.hasAnyValidationError) {
      editVM.showValidationErrors(true);
      return;
    }

    openHomeScreen();
  };

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <View style={styles.container}>
      <Layouts.ConfirmPopup
        title="Are you sure to delete account"
        content={`This action can not be revert, please make sure you want ro delete this account.\nDelete process will be handled in 3 days, and you can not log in.`}
        onDismiss={() => setShowConfirm(false)}
        visible={showConfirm}
      />
      <ScreenHeader title="Edit Information" navigation={navigation} />
      <KeyboardAwareScrollView contentContainerStyle={styles.contentWrapper}>
        <Layouts.VSpace value={24} />
        <Inputs.CTextInput
          value={userStore.userProfile?.email}
          disabled
          label="Email"
        />
        <Layouts.VSpace value={12} />
        <Inputs.CTextInput
          value={userStore.userProfile?.username}
          disabled
          label="Username"
        />
        <Layouts.VSpace value={12} />
        <Inputs.CTextInput
          keyboardType="phone-pad"
          value={editVM.phoneNumber}
          placeholder="Phone number"
          onChangeText={(value) => {
            editVM.setPhoneNumber(value);
          }}
          errorMessage={editVM.validationErrors.get('phoneNumber')}
          shouldShowErrorTitle={editVM.shouldShowValidationErrors}
          label="Phone number"
        />
        <Layouts.VSpace value={12} />
        <Divider />
        <Layouts.VSpace value={12} />
        <Buttons.CButton
          label="Change password"
          onPress={() => {
            setShowChangePassword(!showChangePassword);
          }}
        />
        <Layouts.VSpace value={12} />
        <Collapsible collapsed={!showChangePassword}>
          <Inputs.CTextInput
            secureTextEntry
            value={editVM.currentPassword}
            placeholder="Current password"
            onChangeText={(value) => {
              editVM.setCurrentPassword(value);
            }}
            errorMessage={editVM.validationErrors.get('currentPassword')}
            shouldShowErrorTitle={editVM.shouldShowValidationErrors}
            label="Current password"
          />
          <Layouts.VSpace value={12} />
          <Inputs.CTextInput
            secureTextEntry
            value={editVM.password}
            placeholder="Password"
            onChangeText={(value) => {
              editVM.setPassword(value);
            }}
            errorMessage={editVM.validationErrors.get('password')}
            shouldShowErrorTitle={editVM.shouldShowValidationErrors}
            label="New password"
          />
          <Layouts.VSpace value={12} />
          <Inputs.CTextInput
            secureTextEntry
            value={editVM.confirmPassword}
            placeholder="Confirm password"
            onChangeText={(value) => {
              editVM.setConfirmPassword(value);
            }}
            errorMessage={editVM.validationErrors.get('confirmPassword')}
            shouldShowErrorTitle={editVM.shouldShowValidationErrors}
            label="Confirm password"
          />
          <Layouts.VSpace value={12} />
        </Collapsible>
        <Layouts.MaxSpace />
        <Buttons.CButton
          label="Delete account"
          onPress={() => {
            setShowConfirm(true);
          }}
          style={{
            borderColor: COLORS.error50,
          }}
          labelStyle={{
            color: COLORS.error50,
          }}
        />
        <Layouts.VSpace value={12} />
      </KeyboardAwareScrollView>
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
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 24,
  },
});

const observable = observer(EditAccountScreen);
export { observable as EditAccountScreen };

import { observer } from 'mobx-react-lite';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { BottomButtonSection, Layouts, ScreenHeader } from '@components';
import { useNavigate } from '@hooks';
import { DataModels } from '@models';
import { userStore } from '@store';
import { COLORS } from '@themes';
import { ListAddressItem } from './components';

const AddressScreen = ({ navigation }: any) => {
  const { openAddEditAddressScreen } = useNavigate(navigation);

  const onSubmitShippingAddress = (
    shippingAddress: DataModels.IShippingAddress,
    isAddNew?: boolean,
  ) => {
    console.log('isAddNew :>> ', isAddNew);
    userStore.updateListShippingAddress(shippingAddress, isAddNew);
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="Shipping Address" navigation={navigation} />
      <ScrollView
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.wrapper}
      >
        <Layouts.VSpace value={24} />
        <ListAddressItem
          listAddress={userStore.userProfile?.listShippingAddress || []}
          onSubmitShippingAddress={onSubmitShippingAddress}
        />
        <Layouts.VSpace value={24} />
      </ScrollView>
      <BottomButtonSection
        onPress={() => openAddEditAddressScreen()}
        buttonTitle="Add new Shipping Address"
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
});

const observable = observer(AddressScreen);
export { observable as AddressScreen };

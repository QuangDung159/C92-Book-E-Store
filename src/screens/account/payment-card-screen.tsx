import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { BottomButtonSection, Layouts, ScreenHeader } from '@components';
import { useNavigate } from '@hooks';
import { authenticationStore, userStore } from '@store';
import { COLORS } from '@themes';
import { AddCreditCardPopup, CreditCardItem } from 'screens/cart';

const PaymentCardScreen = ({ navigation }: any) => {
  const [refreshing, setRefreshing] = useState(false);
  const [showAddCreditCardPopup, setShowAddCreditCardPopup] = useState(false);

  const { openAddEditPaymentCardScreen } = useNavigate(navigation);

  const onLoadData = async () => {
    await authenticationStore.fetchUser();
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await onLoadData();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <AddCreditCardPopup
        visible={showAddCreditCardPopup}
        onDismiss={() => {
          setShowAddCreditCardPopup(false);
        }}
      />
      <ScreenHeader title="Payment Cards" navigation={navigation} />
      <ScrollView
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.wrapper}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Layouts.VSpace value={24} />
        {(userStore.userProfile.listCreditCard || []).map((item) => {
          return (
            <React.Fragment key={item.id}>
              <TouchableOpacity
                onPress={() => {
                  openAddEditPaymentCardScreen(item);
                }}
              >
                <CreditCardItem key={item.id} cardItem={item} />
              </TouchableOpacity>
            </React.Fragment>
          );
        })}
        <Layouts.VSpace value={24} />
      </ScrollView>
      <BottomButtonSection
        onPress={() => {
          openAddEditPaymentCardScreen();
        }}
        buttonTitle="Add new Payment Card"
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

const observable = observer(PaymentCardScreen);
export { observable as PaymentCardScreen };

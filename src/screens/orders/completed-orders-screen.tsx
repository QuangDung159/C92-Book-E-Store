import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { userStore } from '@store';
import { COLORS } from '@themes';
import { ListOrder } from './components';

const CompletedOrdersScreen = () => {
  return (
    <View style={styles.container}>
      <ListOrder listOrder={userStore.listCompletedOrder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryWhite,
  },
});

const observable = observer(CompletedOrdersScreen);
export { observable as CompletedOrdersScreen };

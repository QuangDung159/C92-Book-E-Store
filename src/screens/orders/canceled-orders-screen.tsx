import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { userStore } from '@store';
import { COLORS } from '@themes';
import { ListOrder } from './components';

const CanceledOrdersScreen = () => {
  return (
    <View style={styles.container}>
      <ListOrder listOrder={userStore.listCanceledOrder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryWhite,
  },
});

const observable = observer(CanceledOrdersScreen);
export { observable as CanceledOrdersScreen };

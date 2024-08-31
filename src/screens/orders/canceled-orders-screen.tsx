import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LIST_ORDER } from '@constants';
import { COLORS } from '@themes';
import { ListOrder } from './components';

const CanceledOrdersScreen = () => {
  return (
    <View style={styles.container}>
      <ListOrder listOrder={LIST_ORDER} />
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

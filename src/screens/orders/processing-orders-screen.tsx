import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { userStore } from '@store';
import { COLORS } from '@themes';
import { ListOrder } from './components';

const ProcessingOrdersScreen = () => {
  return (
    <View style={styles.container}>
      <ListOrder listOrder={userStore.listProcessingOrder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryWhite,
  },
});

const observable = observer(ProcessingOrdersScreen);
export { observable as ProcessingOrdersScreen };

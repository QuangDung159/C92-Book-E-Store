import { observer } from 'mobx-react-lite';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { Layouts, ScreenHeader } from '@components';
import { LIST_ORDER } from '@constants';
import { searchStore } from '@store';
import { COLORS } from '@themes';
import { HorizontalListCard } from 'screens/home/components';
import { ListOrder } from './components';

const OrderDetailScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <ScreenHeader title="Order Detail" navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ListOrder listOrder={LIST_ORDER} isShowFullListCart />
        <Divider />
        <View style={styles.wrapper}>
          <Layouts.VSpace value={12} />
          <HorizontalListCard
            listItem={searchStore.listTopBook}
            title="Maybe you will like"
          />
          <Layouts.VSpace value={24} />
          <HorizontalListCard
            listItem={searchStore.listLatest}
            title="Viewed"
            showSeeMore={true}
          />
        </View>
      </ScrollView>
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
    paddingBottom: 24,
  },
});

const observable = observer(OrderDetailScreen);
export { observable as OrderDetailScreen };

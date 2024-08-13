import { observer } from 'mobx-react-lite';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Buttons, Layouts, ScreenHeader } from '@components';
import { COLORS, FONT_STYLES } from '@themes';

const PaymentScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Checkout"
        navigation={navigation}
        onGoBack={() => {}}
      />
      <ScrollView
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.wrapper}
      >
        <Layouts.VSpace value={24} />
        <Text
          style={{
            ...FONT_STYLES.BOLD_18,
          }}
        >
          Price
        </Text>
        <Layouts.VSpace value={24} />
      </ScrollView>
      <View style={styles.buttonWrapper}>
        <Layouts.VSpace value={12} />
        <Buttons.CButton
          onPress={() => {
            navigation.goBack();
          }}
          label="Apply"
          buttonType="primary"
        />
      </View>
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
  buttonWrapper: {
    paddingHorizontal: 24,
    borderTopColor: COLORS.gray200,
    borderTopWidth: 1,
    height: 64,
  },
});

const observable = observer(PaymentScreen);
export { observable as PaymentScreen };

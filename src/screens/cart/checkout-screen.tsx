import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Buttons, Layouts, ScreenHeader } from '@components';
import { COLORS, FONT_STYLES } from '@themes';
import { SectionTitle } from './components';

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
        <SectionTitle title="Delivering Address" />
        <Layouts.VSpace value={24} />
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: COLORS.primaryBlack,
            padding: 12,
            borderRadius: 8,
            alignItems: 'center',
          }}
        >
          <View
            style={{
              flexShrink: 1,
            }}
          >
            <Text
              style={{
                ...FONT_STYLES.REGULAR_16,
                color: COLORS.primaryWhite,
              }}
            >
              111 Chu Thien, Hiep Tan Ward, Tan Phu District, Ho Chi Minh City
            </Text>
          </View>
          <Layouts.HSpace value={24} />
          <TouchableOpacity>
            <Text
              style={{ ...FONT_STYLES.REGULAR_16, color: COLORS.primaryWhite }}
            >
              Change
            </Text>
          </TouchableOpacity>
        </View>
        <Layouts.VSpace value={24} />
        <Buttons.CButton
          label="Add new Delivery Address"
          onPress={() => {}}
          buttonType="secondary"
        />
        <Layouts.VSpace value={36} />
        <SectionTitle title="Payment Method" />
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

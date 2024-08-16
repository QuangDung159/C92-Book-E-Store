import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import {
  BottomButtonSection,
  Layouts,
  ScreenHeader,
  SectionTitle,
} from '@components';
import { LIST_ADMINITRATIVE_UNIT } from '@constants';
import { DataModels } from '@models';
import { COLORS, FONT_STYLES } from '@themes';

type administrativeUnit = 'city' | 'district' | 'ward';

const LocationScreen = ({ navigation, route }: any) => {
  const shippingAddress: DataModels.IShippingAddress =
    route.params?.shippingAddress;

  const [administrativeUnitSelected, setAdministrativeUnitSelected] =
    useState<administrativeUnit>('city');

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={`${shippingAddress ? 'Edit' : 'Add'} Shipping Address`}
        navigation={navigation}
      />
      <ScrollView
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.wrapper}
      >
        <Layouts.VSpace value={24} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <SectionTitle title="Selected Area" />
          <TouchableOpacity>
            <Text
              style={{
                ...FONT_STYLES.SEMIBOLD_16,
              }}
            >
              Reset
            </Text>
          </TouchableOpacity>
        </View>
        <Layouts.VSpace value={12} />
        <RadioButton.Group
          onValueChange={(value) =>
            setAdministrativeUnitSelected(value as administrativeUnit)
          }
          value={administrativeUnitSelected}
        >
          {LIST_ADMINITRATIVE_UNIT.map((item) => {
            return (
              <View
                key={item.value}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <RadioButton.Android value={item.value} />
                <Text
                  style={{
                    ...FONT_STYLES.REGULAR_14,
                  }}
                >
                  {item.label}
                </Text>
                <Layouts.VSpace value={12} />
              </View>
            );
          })}
        </RadioButton.Group>
        <Layouts.VSpace value={12} />
      </ScrollView>
      <BottomButtonSection onPress={() => {}} buttonTitle="Submit" />
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

const observable = observer(LocationScreen);
export { observable as LocationScreen };

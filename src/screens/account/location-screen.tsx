import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  BottomButtonSection,
  Icons,
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

  const renderAdministrativeUnitItem = (value: string, label: string) => {
    const isChecked = administrativeUnitSelected === value;
    return (
      <TouchableOpacity
        onPress={() => {
          setAdministrativeUnitSelected(value as administrativeUnit);
        }}
      >
        <View
          key={value}
          style={[
            {
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 4,
              borderColor: COLORS.primaryWhite,
              borderWidth: 1,
              height: 50,
            },
            administrativeUnitSelected === value && {
              borderRadius: 8,
              borderWidth: 1,
              borderColor: COLORS.gray70,
            },
          ]}
        >
          {isChecked ? (
            <Icons.RadioButtonCheckedIcon />
          ) : (
            <Icons.DotSingleIcon color={COLORS.gray60} size={50} />
          )}

          <Text
            style={{
              ...FONT_STYLES.REGULAR_14,
            }}
          >
            {label}
          </Text>
          <Layouts.VSpace value={12} />
        </View>
      </TouchableOpacity>
    );
  };

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
        {LIST_ADMINITRATIVE_UNIT.map((item) => {
          return (
            <React.Fragment key={item.value}>
              {renderAdministrativeUnitItem(item.value, item.label)}
            </React.Fragment>
          );
        })}

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

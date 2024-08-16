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

  const renderAdministrativeUnitItem = () => {
    // const isChecked = administrativeUnitSelected === value;
    // return (
    //   <View
    //     key={value}
    //     style={[
    //       {
    //         flexDirection: 'row',
    //         alignItems: 'center',
    //         marginBottom: 4,
    //         borderColor: COLORS.primaryWhite,
    //         borderWidth: 1,
    //         height: 50,
    //       },
    //       administrativeUnitSelected === value && {
    //         borderRadius: 8,
    //         borderWidth: 1,
    //         borderColor: COLORS.gray70,
    //       },
    //     ]}
    //   >
    //     {isChecked ? <Icons.RadioButtonCheckedIcon /> : <Icons.DotSingleIcon />}

    //     <Text
    //       style={{
    //         ...FONT_STYLES.REGULAR_14,
    //       }}
    //     >
    //       {label}
    //     </Text>
    //     <Layouts.VSpace value={12} />
    //   </View>
    // );

    return (
      <RadioButton.Group
        onValueChange={(value) =>
          setAdministrativeUnitSelected(value as administrativeUnit)
        }
        value={administrativeUnitSelected}
      >
        {LIST_ADMINITRATIVE_UNIT.map((item) => {
          const checked = item.value === administrativeUnitSelected;

          return (
            <View
              key={item.value}
              style={[
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: COLORS.primaryWhite,
                  borderRadius: 8,
                  height: 50,
                  marginBottom: 12,
                },
                checked && {
                  borderColor: COLORS.gray70,
                },
              ]}
            >
              <RadioButton.Android value={item.value} />
              <Text
                style={{
                  ...FONT_STYLES.REGULAR_14,
                  marginLeft: 8,
                }}
              >
                {item.label}
              </Text>
              <Layouts.VSpace value={12} />
            </View>
          );
        })}
      </RadioButton.Group>
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
        {renderAdministrativeUnitItem()}
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

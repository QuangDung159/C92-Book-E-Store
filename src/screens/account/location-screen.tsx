import { observer } from 'mobx-react-lite';
import React, { useRef } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Divider, RadioButton } from 'react-native-paper';
import {
  BottomButtonSection,
  Layouts,
  ScreenHeader,
  SectionTitle,
} from '@components';
import { ADMINISTRATIVE, LIST_ADMINITRATIVE_UNIT } from '@constants';
import { DataModels } from '@models';
import { referenceOptionsStore } from '@store';
import { COLORS, FONT_STYLES } from '@themes';
import { AdministrativeUnit } from '@types';
import { LocationViewModel } from './view-models';

const LocationScreen = ({ navigation, route }: any) => {
  const shippingAddress: DataModels.IShippingAddress =
    route.params?.shippingAddress;

  const addEditVM = useRef(
    new LocationViewModel(referenceOptionsStore, shippingAddress),
  ).current;

  const onReset = () => {
    addEditVM.setCity(ADMINISTRATIVE.city);
    addEditVM.setDistrict(ADMINISTRATIVE.district);
    addEditVM.setWard(ADMINISTRATIVE.ward);
  };

  const renderAdministrativeUnitItem = () => {
    return (
      <RadioButton.Group
        onValueChange={(value) =>
          addEditVM.setAdministrativeSelected(value as AdministrativeUnit)
        }
        value={addEditVM.administrativeSelected}
      >
        {LIST_ADMINITRATIVE_UNIT.map((item) => {
          const checked = item.value === addEditVM.administrativeSelected;

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
                  paddingHorizontal: 4,
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
                {addEditVM.labelSelected}
              </Text>
              <Layouts.VSpace value={12} />
            </View>
          );
        })}
      </RadioButton.Group>
    );
  };

  // const onAdminitrativeChecked = (value: string) => {
  //   switch (administrativeUnitSelected) {
  //     case 'city':
  //       setCity(value);
  //       break;
  //     case 'district':
  //       setDistrict(value);
  //       break;
  //     default:
  //       setWard(value);
  //       break;
  //   }
  // };

  // const getAdminitrativeSelected = () => {
  //   switch (administrativeUnitSelected) {
  //     case 'city':
  //       return city;
  //     case 'district':
  //       return district;
  //     default:
  //       return ward;
  //   }
  // };

  const renderListAdministrativeBySelected = () => {
    let list: DataModels.IReferenceOptions[] = [];

    switch (addEditVM.administrativeSelected) {
      case 'city':
        list = referenceOptionsStore.cityDataSource;
        break;
      case 'district':
        list = addEditVM.districtDataSource;
        break;
      default:
        list = addEditVM.wardDataSource;
        break;
    }

    return (
      <RadioButton.Group
        onValueChange={(value) =>
          addEditVM.setAdministrativeSelected(value as AdministrativeUnit)
        }
        value={addEditVM.administrativeSelected}
      >
        {list.map((item) => {
          return (
            <React.Fragment key={item.value}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  height: 50,
                }}
              >
                <Text>{item.label}</Text>
                <RadioButton.IOS value={item.label} />
              </View>
              <Divider />
            </React.Fragment>
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
      <Layouts.VSpace value={24} />
      <View
        style={{
          paddingHorizontal: 24,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <SectionTitle title="Selected Area" />
          <TouchableOpacity onPress={onReset}>
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
        <Divider />
        <Layouts.VSpace value={24} />
        <SectionTitle
          style={{
            ...FONT_STYLES.BOLD_14,
          }}
          title={`Select ${addEditVM.administrativeSelected}`}
        />
      </View>
      <ScrollView
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.wrapper}
      >
        <Layouts.VSpace value={12} />
        {renderListAdministrativeBySelected()}
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

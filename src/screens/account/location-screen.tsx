import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
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

const LocationScreen = ({ navigation, route }: any) => {
  const shippingAddress: DataModels.IShippingAddress =
    route.params?.shippingAddress;

  const [administrativeUnitSelected, setAdministrativeUnitSelected] =
    useState<AdministrativeUnit>('city');

  const [city, setCity] = useState(ADMINISTRATIVE.city);
  const [district, setDistrict] = useState(ADMINISTRATIVE.district);
  const [ward, setWard] = useState(ADMINISTRATIVE.ward);

  const [districtDataSource, setDistrictDataSource] = useState<
    DataModels.IReferenceOptions[]
  >([]);

  const [wardDataSource, setWardDataSource] = useState<
    DataModels.IReferenceOptions[]
  >([]);

  useEffect(() => {
    if (shippingAddress) {
      setCity(shippingAddress.city);
      setWard(shippingAddress.ward);
      setDistrict(shippingAddress.district);
    }
  }, [shippingAddress]);

  useEffect(() => {
    if (city) {
      const list = referenceOptionsStore.districtDataSource.filter(
        (item) => item.extraData?.parent === city,
      );

      setDistrictDataSource(list);
    }
  }, [city]);

  useEffect(() => {
    if (district) {
      const list = referenceOptionsStore.wardDataSource.filter(
        (item) => item.extraData?.parent === district,
      );

      setWardDataSource(list);
    }
  }, [district]);

  const onReset = () => {
    setCity(ADMINISTRATIVE.city);
    setDistrict(ADMINISTRATIVE.district);
    setWard(ADMINISTRATIVE.ward);
  };

  const renderAdministrativeUnitItem = () => {
    const getLabel = (administrative: AdministrativeUnit) => {
      let label = '';
      switch (administrative) {
        case 'city':
          label = city;
          break;
        case 'district':
          label = district;
          break;
        default:
          label = ward;
          break;
      }

      return label;
    };

    return (
      <RadioButton.Group
        onValueChange={(value) =>
          setAdministrativeUnitSelected(value as AdministrativeUnit)
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
                {getLabel(item.value as AdministrativeUnit)}
              </Text>
              <Layouts.VSpace value={12} />
            </View>
          );
        })}
      </RadioButton.Group>
    );
  };

  const onAdminitrativeChecked = (value: string) => {
    switch (administrativeUnitSelected) {
      case 'city':
        setCity(value);
        break;
      case 'district':
        setDistrict(value);
        break;
      default:
        setWard(value);
        break;
    }
  };

  const getAdminitrativeSelected = () => {
    switch (administrativeUnitSelected) {
      case 'city':
        return city;
      case 'district':
        return district;
      default:
        return ward;
    }
  };

  const renderListAdministrativeBySelected = () => {
    let list: DataModels.IReferenceOptions[] = [];

    switch (administrativeUnitSelected) {
      case 'city':
        list = referenceOptionsStore.cityDataSource;
        break;
      case 'district':
        list = districtDataSource;
        break;
      default:
        list = wardDataSource;
        break;
    }

    return (
      <RadioButton.Group
        onValueChange={(value) => onAdminitrativeChecked(value)}
        value={getAdminitrativeSelected()}
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
          title={`Select ${administrativeUnitSelected}`}
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

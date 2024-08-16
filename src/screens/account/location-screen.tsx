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
import { LIST_ADMINITRATIVE_UNIT } from '@constants';
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
                  height: 45,
                  marginBottom: 8,
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
                {addEditVM.getlabelSelected(item.value as AdministrativeUnit)}
              </Text>
              <Layouts.VSpace value={12} />
            </View>
          );
        })}
      </RadioButton.Group>
    );
  };

  const renderListAdministrativeBySelected = () => {
    if (addEditVM.administrativeDataSource?.length === 0) {
      return (
        <View>
          <Text>Empty</Text>
        </View>
      );
    }

    return (
      <RadioButton.Group
        onValueChange={(value) => {
          addEditVM.onSelectedAdministrativeItem(value);
        }}
        value={addEditVM.selectedAdministrativeValue}
      >
        {addEditVM.administrativeDataSource.map((item) => {
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
          <TouchableOpacity onPress={addEditVM.onReset}>
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
      <Layouts.VSpace value={12} />
      <ScrollView
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.wrapper}
      >
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

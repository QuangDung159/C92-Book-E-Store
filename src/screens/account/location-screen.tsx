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
import { AdministrativeUnitEnum } from '@types';
import { LocationViewModel } from './view-models';

const LocationScreen = ({ navigation, route }: any) => {
  const shippingAddress: DataModels.IShippingAddress =
    route.params?.shippingAddress;

  const onSubmitAdministrative = route.params?.onSubmitAdministrative;

  const addEditVM = useRef(
    new LocationViewModel(referenceOptionsStore, shippingAddress),
  ).current;

  const renderAdministrativeUnitItem = (
    value: string,
    isShow?: boolean,
    isFirstItem?: boolean,
  ) => {
    const checked = value === addEditVM.administrativeSelected;

    if (!isShow) {
      return null;
    }

    return (
      <RadioButton.Group
        onValueChange={(value) =>
          addEditVM.setAdministrativeSelected(value as AdministrativeUnitEnum)
        }
        value={addEditVM.administrativeSelected}
      >
        <React.Fragment key={value}>
          {isFirstItem ? (
            <Layouts.VSpace value={12} />
          ) : (
            <View
              style={{
                height: 24,
                borderLeftColor: COLORS.gray90,
                borderLeftWidth: 1,
                marginLeft: 23,
                zIndex: 1,
              }}
            ></View>
          )}
          <View
            style={[
              {
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: COLORS.primaryWhite,
                borderRadius: 8,
                height: 44,
                paddingHorizontal: 4,
                zIndex: 99,
              },
              checked && {
                borderColor: COLORS.gray70,
                backgroundColor: COLORS.primaryWhite,
              },
            ]}
          >
            <RadioButton.Android value={value} />
            <Text
              style={{
                ...FONT_STYLES.REGULAR_14,
                marginLeft: 8,
              }}
            >
              {addEditVM.getlabelSelected(value as AdministrativeUnitEnum)}
            </Text>
          </View>
        </React.Fragment>
      </RadioButton.Group>
    );
  };

  const renderListAdministrativeBySelected = () => {
    if (addEditVM.administrativeDataSource?.length === 0) {
      return (
        <View
          style={{
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              ...FONT_STYLES.SEMIBOLD_12,
            }}
          >
            Empty
          </Text>
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
        {renderAdministrativeUnitItem(
          LIST_ADMINITRATIVE_UNIT[0].value,
          true,
          true,
        )}
        {renderAdministrativeUnitItem(
          LIST_ADMINITRATIVE_UNIT[1].value,
          addEditVM.province !== ADMINISTRATIVE.province,
        )}
        {renderAdministrativeUnitItem(
          LIST_ADMINITRATIVE_UNIT[2].value,
          addEditVM.district !== ADMINISTRATIVE.district,
        )}
        <Layouts.VSpace value={24} />
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
      <BottomButtonSection
        onPress={() => {
          navigation.goBack();
          onSubmitAdministrative?.(
            addEditVM.province,
            addEditVM.district,
            addEditVM.ward,
          );
        }}
        buttonTitle="Submit"
        disabled={!addEditVM.isCanSubmit}
      />
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

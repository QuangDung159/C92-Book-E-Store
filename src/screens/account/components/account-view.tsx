import { useNavigation } from 'expo-router';
import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import { Divider } from 'react-native-paper';
import { Buttons, Icons, Layouts } from '@components';
import { useNavigate } from '@hooks';
import { userStore } from '@store';
import { COLORS, FONT_STYLES } from '@themes';

const AccountView: React.FC = () => {
  const navigation = useNavigation();
  const { openHomeScreen } = useNavigate(navigation);

  const renderInfoRow = (label: string, value: string) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 12,
        }}
      >
        <Text
          style={{
            ...FONT_STYLES.REGULAR_16,
          }}
        >
          {label}
        </Text>
        <Text
          style={{
            ...FONT_STYLES.SEMIBOLD_16,
          }}
        >
          {value}
        </Text>
      </View>
    );
  };

  const renderMenuItem = (
    label: string,
    onPress: () => void,
    labelStyle?: StyleProp<TextStyle>,
  ) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => onPress()}
          style={{
            paddingVertical: 16,
          }}
        >
          <Text
            style={[
              {
                ...FONT_STYLES.SEMIBOLD_16,
              },
              labelStyle,
            ]}
          >
            {label}
          </Text>
        </TouchableOpacity>
        <Divider />
      </>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Layouts.VSpace value={24} />
        <View
          style={{
            alignItems: 'center',
          }}
        >
          <Icons.AccountCircle size={100} />
        </View>
        <Layouts.VSpace value={24} />
        <View
          style={{
            paddingTop: 12,
            paddingHorizontal: 12,
            backgroundColor: COLORS.gray200,
            borderRadius: 8,
          }}
        >
          {renderInfoRow('Email', userStore.userProfile.email)}
          {renderInfoRow('Username', userStore.userProfile.username)}
          {renderInfoRow('Phone number', userStore.userProfile.phoneNumber)}
        </View>
        <Layouts.VSpace value={12} />
        <Buttons.CButton
          label="Edit"
          onPress={() => {
            openHomeScreen();
          }}
          buttonType="secondary"
        />
        <Layouts.VSpace value={24} />
        {renderMenuItem('Orders', () => {})}
        {renderMenuItem('Address Book', () => {})}
        {renderMenuItem('Payment Methods', () => {})}
        {renderMenuItem('Settings', () => {})}
        {renderMenuItem('Sign Out', () => {}, {
          color: COLORS.error50,
        })}
        <Layouts.VSpace value={24} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
});

const observable = observer(AccountView);
export { observable as AccountView };

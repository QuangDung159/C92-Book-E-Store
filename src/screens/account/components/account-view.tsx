import { useNavigation } from '@react-navigation/native';
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
import { BookServices } from '@services';
import { authenticationStore, sharedStore, userStore } from '@store';
import { COLORS, FONT_STYLES } from '@themes';
import { ToastHelpers } from '@utils';
import { AppVersionText } from './app-version-text';

const AccountView: React.FC = () => {
  const navigation = useNavigation();
  const { openAddressScreen, openEditAccountScreen, openBookListingScreen } =
    useNavigate(navigation);

  const loadListFavourite = async () => {
    sharedStore.setShowLoading(true);
    const result = await BookServices.loadListFavourite();
    if (result.success) {
      openBookListingScreen(result.data?.list || [], 'Favourite');
    }
    sharedStore.setShowLoading(false);
  };

  const loadListViewed = async () => {
    sharedStore.setShowLoading(true);
    const result = await BookServices.loadListFavourite();
    if (result.success) {
      openBookListingScreen(result.data?.list || [], 'Viewed');
    }
    sharedStore.setShowLoading(false);
  };

  const renderInfoRow = (label: string, value: string) => {
    return (
      <View style={styles.infoRow}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
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
        <TouchableOpacity onPress={() => onPress()} style={styles.menuItem}>
          <Text style={[styles.menuLabel, labelStyle]}>{label}</Text>
        </TouchableOpacity>
        <Divider />
      </>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Layouts.VSpace value={24} />
        <View style={styles.avatarIcon}>
          <Icons.AccountCircle size={100} />
        </View>
        <Layouts.VSpace value={24} />
        <View style={styles.profileInfoSection}>
          {renderInfoRow('Email', userStore.userProfile.email)}
          {renderInfoRow('Username', userStore.userProfile.username)}
          {renderInfoRow('Phone number', userStore.userProfile.phoneNumber)}
        </View>
        <Layouts.VSpace value={12} />
        <Buttons.CButton
          label="Edit"
          onPress={() => {
            openEditAccountScreen();
          }}
          buttonType="secondary"
        />
        <Layouts.VSpace value={12} />
        {renderMenuItem('Favourites', () => {
          loadListFavourite();
        })}
        {renderMenuItem('Viewed', () => {
          loadListViewed();
        })}
        {renderMenuItem('Orders', () => {})}
        {renderMenuItem('Shipping Address', () => {
          openAddressScreen();
        })}
        {renderMenuItem('Payment Methods', () => {})}
        {renderMenuItem('Settings', () => {})}
        {renderMenuItem(
          'Sign Out',
          async () => {
            sharedStore.setShowLoading(true);
            if (authenticationStore.googleSigned) {
              await authenticationStore.googleSignOut();
            } else {
              await authenticationStore.signOut();
            }
            sharedStore.setShowLoading(false);

            ToastHelpers.showToast({
              title: 'Account',
              content: 'Sign out success',
            });
          },
          styles.signOut,
        )}
        <AppVersionText />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    ...FONT_STYLES.REGULAR_16,
  },
  value: {
    ...FONT_STYLES.SEMIBOLD_16,
  },
  menuItem: {
    paddingVertical: 16,
  },
  menuLabel: {
    ...FONT_STYLES.SEMIBOLD_16,
  },
  avatarIcon: {
    alignItems: 'center',
  },
  profileInfoSection: {
    paddingTop: 12,
    paddingHorizontal: 12,
    backgroundColor: COLORS.gray200,
    borderRadius: 8,
  },
  signOut: {
    color: COLORS.error50,
  },
});

const observable = observer(AccountView);
export { observable as AccountView };

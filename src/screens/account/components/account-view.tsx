import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
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
import { Icons, Layouts } from '@components';
import { useNavigate } from '@hooks';
import { BookServices } from '@services';
import { authenticationStore, sharedStore, userStore } from '@store';
import { COLORS, FONT_STYLES } from '@themes';
import { AppVersionText } from './app-version-text';

const AccountView: React.FC = () => {
  const navigation = useNavigation();
  const {
    openAddressScreen,
    openEditAccountScreen,
    openBookListingScreen,
    openOrdersScreen,
  } = useNavigate(navigation);

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
          {userStore.userProfile?.avatarUrl ? (
            <Image
              style={styles.avatar}
              source={userStore.userProfile.avatarUrl}
              contentFit="contain"
            />
          ) : (
            <Icons.AccountCircle size={100} />
          )}
        </View>
        <Layouts.VSpace value={24} />
        <View style={styles.profileInfoSection}>
          {renderInfoRow('Email:', userStore.userProfile.email)}
          {renderInfoRow('Username:', userStore.userProfile.username)}
          {renderInfoRow('Phone number:', userStore.userProfile.phoneNumber)}
          <View style={styles.editButton}>
            <Icons.EditIcon size={18} onPress={() => openEditAccountScreen()} />
          </View>
        </View>
        {renderMenuItem('Favourites', () => {
          loadListFavourite();
        })}
        {renderMenuItem('Viewed', () => {
          loadListViewed();
        })}
        {renderMenuItem('Orders', () => {
          openOrdersScreen();
        })}
        {renderMenuItem('Shipping Address', () => {
          openAddressScreen();
        })}
        {renderMenuItem(
          'Sign Out',
          async () => {
            sharedStore.setShowLoading(true);
            await authenticationStore.signOut();
            sharedStore.setShowLoading(false);
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
    // flexDirection: 'row',
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
  avatar: {
    width: 85,
    height: 85,
    borderRadius: 50,
  },
  editButton: {
    position: 'absolute',
    right: 4,
    top: 4,
  },
});

const observable = observer(AccountView);
export { observable as AccountView };

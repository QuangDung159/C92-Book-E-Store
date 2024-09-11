import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icons, Inputs, Layouts } from '@components';
import { useNavigate } from '@hooks';
import { sharedStore, userStore } from '@store';
import { FONT_STYLES } from '@themes';
import { StringHelpers } from '@utils';
import { CartIconWithBadge } from './cart-icon-with-badge';

interface SearchBarProps {
  showCartIcon?: boolean;
  showBackIcon?: boolean;
  onFocus?: () => void;
  onChangeText?: () => void;
  navigation: any;
  autoFocus?: boolean;
  showSearch?: boolean;
  isPreventGoToSearchScreen?: boolean;
  onPressSearch?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  showCartIcon,
  showBackIcon,
  navigation,
  autoFocus,
  showSearch,
  isPreventGoToSearchScreen,
  onPressSearch,
}) => {
  const { goBack } = useNavigation();
  const { openSearchScreen, openAccountScreen } = useNavigate(navigation);

  const geoText = useMemo(() => {
    return sharedStore.geoLocation?.city
      ? `${sharedStore.geoLocation.city}, ${sharedStore.geoLocation.region}`
      : sharedStore.geoLocation?.region || null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sharedStore.geoLocation]);

  return (
    <View style={styles.container}>
      {showBackIcon && (
        <>
          <Icons.ChevronLeftIcon onPress={() => goBack()} size={20} />
          <Layouts.HSpace value={8} />
        </>
      )}
      {showSearch ? (
        <View
          style={{
            flex: 1,
          }}
        >
          <Inputs.CTextInput
            placeholder="Happy reading!"
            style={styles.input}
            autoFocus={autoFocus}
          />
        </View>
      ) : (
        <View
          style={{
            flex: 1,
          }}
        >
          <TouchableOpacity onPress={() => openAccountScreen()}>
            <Text
              style={styles.goodText}
            >{`Good ${StringHelpers.getTimeOfDay()}, ${userStore.userProfile?.username || 'Buddy'}!`}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              sharedStore.getGeoLocation();
            }}
          >
            <Text style={styles.position}>{geoText}</Text>
          </TouchableOpacity>
        </View>
      )}
      <Layouts.HSpace value={8} />
      <View style={styles.iconWrapper}>
        <Icons.SearchIcon
          onPress={() => {
            if (!isPreventGoToSearchScreen) {
              openSearchScreen({
                autoFocus: true,
              });
            } else {
              onPressSearch?.();
            }
          }}
        />
        {showCartIcon && <CartIconWithBadge />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 12,
  },
  iconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 34.5,
  },
  goodText: {
    ...FONT_STYLES.SEMIBOLD_16,
  },
  position: {
    ...FONT_STYLES.REGULAR_14,
  },
});

const observable = observer(SearchBar);
export { observable as SearchBar };

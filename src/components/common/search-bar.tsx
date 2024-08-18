import { Entypo } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icons, Inputs, Layouts } from '@components';
import { useNavigate } from '@hooks';
import { searchStore, userStore } from '@store';
import { FONT_STYLES } from '@themes';
import { CartIconWithBadge } from './cart-icon-with-badge';

interface SearchBarProps {
  showCartIcon?: boolean;
  showBackIcon?: boolean;
  onFocus?: () => void;
  onChangeText?: () => void;
  navigation: any;
  autoFocus?: boolean;
  showSearch?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  showCartIcon,
  showBackIcon,
  navigation,
  autoFocus,
  showSearch,
}) => {
  const { goBack } = useNavigation();
  const { openSearchScreen, openAccountScreen } = useNavigate(navigation);

  return (
    <View style={styles.container}>
      {showBackIcon && (
        <>
          <TouchableOpacity
            onPress={() => {
              goBack();
            }}
          >
            <Entypo name="chevron-left" size={24} />
          </TouchableOpacity>
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
            >{`Good afternoon, ${userStore.userProfile?.username || 'Buddy'}!`}</Text>
          </TouchableOpacity>
          <Text style={styles.position}>Ho Chi Minh City</Text>
        </View>
      )}
      <Layouts.HSpace value={8} />
      <View style={styles.iconWrapper}>
        <Icons.SearchIcon
          onPress={() => {
            searchStore.resetSeachFilter();
            openSearchScreen({
              autoFocus: true,
            });
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
    marginTop: -6,
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
    ...FONT_STYLES.THIN_14,
  },
});

const observable = observer(SearchBar);
export { observable as SearchBar };

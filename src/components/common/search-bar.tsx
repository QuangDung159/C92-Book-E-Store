import { Entypo } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icons, Inputs, Layouts } from '@components';
import { useNavigate } from '@hooks';
import { searchStore } from '@store';
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
        <Inputs.CTextInput
          placeholder="Happy reading!"
          style={styles.input}
          autoFocus={autoFocus}
        />
      ) : (
        <View
          style={{
            flex: 1,
          }}
        >
          <TouchableOpacity onPress={() => openAccountScreen()}>
            <Text style={styles.goodText}>Good afternoon, Joe!</Text>
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
  },
  iconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 34.5,
  },
  goodText: {
    ...FONT_STYLES.SEMIBOLD_16,
  },
  position: {
    ...FONT_STYLES.THIN_14,
  },
});

export { SearchBar };

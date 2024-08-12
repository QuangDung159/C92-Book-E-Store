import { Entypo, Feather } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Inputs, Layouts } from '@components';
import { useNavigate } from '@hooks';
import { searchStore } from '@store';
import { CartIconWithBadge } from './cart-icon-with-badge';

interface SearchBarProps {
  showCartIcon?: boolean;
  showBackIcon?: boolean;
  onFocus?: () => void;
  onChangeText?: () => void;
  navigation: any;
  autoFocus?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  showCartIcon,
  showBackIcon,
  navigation,
  autoFocus,
}) => {
  const { goBack } = useNavigation();
  const { openSearchScreen } = useNavigate(navigation);

  return (
    <View style={styles.container}>
      {showBackIcon && (
        <TouchableOpacity
          onPress={() => {
            goBack();
          }}
        >
          <Entypo name="chevron-left" size={24} />
        </TouchableOpacity>
      )}
      <Layouts.HSpace value={8} />
      <Inputs.CTextInput
        placeholder="Happy reading!"
        style={styles.input}
        onFocus={() => {
          openSearchScreen(searchStore.searchFilter, {
            autoFocus: true,
          });
        }}
        autoFocus={autoFocus}
      />
      <Layouts.HSpace value={8} />
      <View style={styles.iconWrapper}>
        <Feather name="search" size={24} />
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
  },
});

export { SearchBar };

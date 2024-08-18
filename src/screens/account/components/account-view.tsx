import { useNavigation } from 'expo-router';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Buttons, Layouts } from '@components';
import { useNavigate } from '@hooks';
import { authenticationStore, userStore } from '@store';
import { FONT_STYLES } from '@themes';

const AccountView: React.FC = () => {
  const navigation = useNavigation();
  const { openHomeScreen } = useNavigate(navigation);

  return (
    <View style={styles.container}>
      <View>
        <Text
          style={styles.welcomeText}
        >{`Welcome to E-Store, ${userStore.userProfile?.username || 'Buddy'}`}</Text>
        <Layouts.VSpace value={24} />
        <Buttons.CButton
          label="Sign out"
          onPress={() => {
            authenticationStore.signOut();
            openHomeScreen();
          }}
          buttonType="secondary"
        />
        <Layouts.VSpace value={24} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  welcomeText: {
    ...FONT_STYLES.BOLD_18,
    textAlign: 'center',
  },
  SSO: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  continue: {
    ...FONT_STYLES.SEMIBOLD_14,
  },
});

const observable = observer(AccountView);
export { observable as AccountView };

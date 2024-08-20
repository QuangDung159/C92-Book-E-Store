import { useNavigation } from 'expo-router';
import React from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';
import { Buttons, Icons, Layouts } from '@components';
import { useNavigate } from '@hooks';
import { FONT_STYLES } from '@themes';
import { PaymentData } from '@types';
import { StringHelpers } from '@utils';
import { MomoServices } from 'services/momo-services';

const AuthenView: React.FC = () => {
  const navigation = useNavigation();
  const { openSignInScreen, openSignUpScreen } = useNavigate(navigation);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.welcomeText}>Welcome to E-Store</Text>
        <Layouts.VSpace value={24} />
        <Buttons.CButton
          label="Sign In"
          onPress={() => {
            openSignInScreen();
          }}
          buttonType="primary"
        />
        <Layouts.VSpace value={12} />
        <Buttons.CButton
          label="Sign Up"
          onPress={() => {
            openSignUpScreen();
          }}
          buttonType="secondary"
        />
        <Layouts.VSpace value={24} />
        <View style={styles.SSO}>
          <Text style={styles.continue}>
            -------- or continue with --------
          </Text>
          <Layouts.VSpace value={12} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Icons.GoogleIcon />
            <Layouts.HSpace value={12} />
            <Icons.FacebookIcon />
          </View>
        </View>
        <Buttons.CButton
          label="21"
          onPress={() => {
            Linking.openURL('myapp://expo-development-client');
          }}
        />
        <Buttons.CButton
          label="Momo"
          onPress={async () => {
            // const idGenerated = StringHelpers.generateMoMoId();
            // console.log('idGenerated :>> ', idGenerated);

            const idGenerated = {
              orderId: '736de24c-26ea-4e0a-842f-b8b88d53f1f8',
              requestId: 'baae59dc-bf26-4f12-8345-0498b2efd863',
            };

            const requestId = idGenerated.requestId;
            const orderId = idGenerated.orderId;
            const params: PaymentData = {
              amount: 10000,
              ipnUrl:
                'https://webhook.site/94e534cb-a54a-4313-8e91-c42f7aa2e145',
              orderId,
              orderInfo: 'Thanh toán qua ví MoMo',
              redirectUrl:
                'https://webhook.site/94e534cb-a54a-4313-8e91-c42f7aa2e145',
              requestId,
              extraData: '',
            };

            const result = await MomoServices.createMomoPayment(params);
            console.log('result :>> ', result);

            if (result?.statusCode === 200) {
              if (await Linking.canOpenURL(result.data.payUrl)) {
                Linking.openURL(result.data.payUrl);
              }
            }
          }}
        />
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

export { AuthenView };

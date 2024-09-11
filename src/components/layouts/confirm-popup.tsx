import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Buttons, Layouts } from '@components';
import { FONT_STYLES } from '@themes';

interface ConfirmPopupProps {
  title: string;
  content: string;
  hasCancel?: boolean;
  onCancel?: () => void;
  onOk?: () => void;
  visible: boolean;
  onDismiss?: () => void;
  cancelTitle?: string;
  okTitle?: string;
}

const ConfirmPopup: React.FC<ConfirmPopupProps> = ({
  title,
  content,
  hasCancel = true,
  onCancel,
  onOk,
  visible,
  onDismiss,
  okTitle,
  cancelTitle,
}) => {
  return (
    <Layouts.BottomPopup visible={visible}>
      <Layouts.PopupHeader
        label={title}
        onDismiss={() => {
          onDismiss?.();
        }}
        isShowCloseIcon={false}
      />
      <View>
        <Text style={styles.content}>{content}</Text>
      </View>
      <Layouts.VSpace value={24} />
      <View style={styles.buttonWrapper}>
        {hasCancel && (
          <>
            <View style={styles.button}>
              <Buttons.CButton
                label={cancelTitle || 'Cancel'}
                onPress={() => {
                  onCancel?.();
                  onDismiss?.();
                }}
              />
            </View>
            <Layouts.HSpace value={12} />
          </>
        )}
        <View style={styles.button}>
          <Buttons.CButton
            label={okTitle || 'Submit'}
            onPress={() => {
              onOk?.();
              onDismiss?.();
            }}
            buttonType="primary"
          />
        </View>
      </View>
    </Layouts.BottomPopup>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    flex: 1,
  },
  content: {
    ...FONT_STYLES.REGULAR_16,
    lineHeight: 20,
  },
});

const observable = observer(ConfirmPopup);
export { observable as ConfirmPopup };

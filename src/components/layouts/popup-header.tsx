import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icons, Layouts } from '@components';
import { FONT_STYLES } from '@themes';

interface PopupHeaderProps {
  onDismiss: () => void;
  label: string;
  leftComponent?: () => React.ReactNode;
  isShowCloseIcon?: boolean;
  rightComponent?: () => React.ReactNode;
}

const PopupHeader: React.FC<PopupHeaderProps> = ({
  onDismiss,
  label,
  isShowCloseIcon = true,
  leftComponent,
  rightComponent,
}) => {
  const renderCloseIcon = () => <Icons.CloseIcon onPress={onDismiss} />;

  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            flex: 2,
          }}
        >
          {leftComponent
            ? leftComponent()
            : isShowCloseIcon
              ? renderCloseIcon()
              : null}
        </View>
        <View
          style={{
            flex: 6,
            alignItems: 'center',
          }}
        >
          <Text style={styles.popupText}>{label}</Text>
        </View>
        <View
          style={{
            flex: 2,
            alignItems: 'flex-end',
          }}
        >
          {rightComponent?.()}
        </View>
      </View>
      <Layouts.VSpace value={24} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  popupText: {
    ...FONT_STYLES.SEMIBOLD_18,
  },
});

export { PopupHeader };

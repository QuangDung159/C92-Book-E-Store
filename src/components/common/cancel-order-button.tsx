import React from 'react';
import { StyleSheet } from 'react-native';
import { Buttons, Layouts } from '@components';
import { DataModels } from '@models';
import { cartStore, sharedStore } from '@store';
import { COLORS } from '@themes';

interface CancelOrderButtonProps {
  order: DataModels.IOrder;
  onSuccess?: () => void;
}

const CancelOrderButton: React.FC<CancelOrderButtonProps> = ({
  order,
  onSuccess,
}) => {
  const onCancelOrder = async () => {
    sharedStore.setShowLoading(true);
    const result = await cartStore.cancelOrder(order.id);

    if (result?.success) {
      onSuccess?.();
    }
    sharedStore.setShowLoading(false);
  };

  return (
    <>
      <Layouts.VSpace value={16} />
      <Buttons.CButton
        buttonType="secondary"
        label="Cancel order"
        style={styles.cancelButton}
        onPress={() => {
          onCancelOrder();
        }}
        labelStyle={styles.cancelLabel}
      />
    </>
  );
};

const styles = StyleSheet.create({
  cancelButton: {
    backgroundColor: 'transparent',
    borderColor: COLORS.error50,
  },
  cancelLabel: {
    color: COLORS.error50,
  },
});

export { CancelOrderButton };

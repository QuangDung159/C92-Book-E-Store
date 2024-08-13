import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Buttons } from '@components';
import { FONT_STYLES } from '@themes';

interface InfoRowProps {
  title: string;
  value: string;
  hasCheckBox?: boolean;
  onCheck?: (value: string) => void;
  checked?: 'checked' | 'unchecked' | 'indeterminate';
}

const InfoRow: React.FC<InfoRowProps> = ({
  title,
  value,
  hasCheckBox,
  onCheck,
  checked = 'unchecked',
}) => {
  const [checkStatus, setCheckStatus] = useState<
    'checked' | 'unchecked' | 'indeterminate'
  >(checked);

  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.row}>
        {hasCheckBox ? (
          <Buttons.CCheckBox
            checked={checkStatus}
            label={value}
            labelStyle={styles.value}
            onCheck={() => {
              if (checkStatus === 'checked') {
                setCheckStatus('unchecked');
                onCheck('');
              } else {
                setCheckStatus('checked');
                onCheck(value);
              }
            }}
          />
        ) : (
          <Text
            style={[
              styles.value,
              {
                marginLeft: 36,
              },
            ]}
          >
            {value}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  row: {
    flex: 1,
  },
  title: {
    ...FONT_STYLES.REGULAR_14,
    lineHeight: 20,
  },
  value: {
    ...FONT_STYLES.SEMIBOLD_14,
    lineHeight: 20,
  },
});

export { InfoRow };

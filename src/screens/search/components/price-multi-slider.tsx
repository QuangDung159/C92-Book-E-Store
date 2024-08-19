import { Slider } from '@miblanchard/react-native-slider';
import React, { Children, cloneElement, FC, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PRICE_STEP } from '@constants';
import { COLORS, FONT_STYLES } from '@themes';
import { StringHelpers } from '@utils';

interface PriceMultiSliderProps {
  selctedRange: number[];
  maximumValue: number;
  minimumValue: number;
  onSlidingComplete: (range: number[]) => void;
}

const PriceMultiSlider: FC<PriceMultiSliderProps> = ({
  selctedRange,
  maximumValue,
  minimumValue,
  onSlidingComplete,
}) => {
  const DEFAULT_VALUE = [0, 1000000];

  const SliderContainer = (props: {
    children: React.ReactElement;
    sliderValue?: Array<number>;
    trackMarks?: Array<number>;
    vertical?: boolean;
  }) => {
    const { sliderValue, trackMarks } = props;
    const [value, setValue] = useState(
      sliderValue ? sliderValue : DEFAULT_VALUE,
    );
    let renderTrackMarkComponent: (inde: number) => React.ReactNode;

    const renderPriceMultiSlider = () => {
      return Children.map(props.children, (child: React.ReactElement) => {
        if (!!child && child.type === Slider) {
          return cloneElement(child, {
            onValueChange: setValue,
            renderTrackMarkComponent,
            trackMarks,
            value,
          });
        }

        return child;
      });
    };

    return (
      <View>
        {renderPriceMultiSlider()}
        <View style={styles.titleContainer}>
          <Text style={styles.price}>
            {StringHelpers.formatCurrency(value[0])}
          </Text>
          <Text style={styles.price}>
            {StringHelpers.formatCurrency(value[1])}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SliderContainer sliderValue={selctedRange}>
      <Slider
        animateTransitions
        maximumTrackTintColor={COLORS.gray}
        maximumValue={maximumValue}
        minimumTrackTintColor={COLORS.primaryBlack}
        minimumValue={minimumValue}
        step={PRICE_STEP}
        thumbTintColor={COLORS.primaryBlack}
        onSlidingComplete={onSlidingComplete}
      />
    </SliderContainer>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  price: {
    ...FONT_STYLES.REGULAR_16,
  },
});

export { PriceMultiSlider };

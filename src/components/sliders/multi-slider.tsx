import { Slider } from '@miblanchard/react-native-slider';
import React, { Children, cloneElement, FC, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '@themes';

interface MultiSliderProps {
  selctedRange: number[];
  maximumValue: number;
  minimumValue: number;
  onSlidingComplete: (range: number[]) => void;
}

const MultiSlider: FC<MultiSliderProps> = ({
  selctedRange,
  maximumValue,
  minimumValue,
  onSlidingComplete,
}) => {
  const DEFAULT_VALUE = 0.2;

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

    const renderChildren = () => {
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
      <View style={styles.sliderContainer}>
        <View style={styles.titleContainer}>
          <Text>{Array.isArray(value) ? value.join(' - ') : value}</Text>
        </View>
        {renderChildren()}
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
        step={500}
        thumbTintColor={COLORS.primaryBlack}
        onSlidingComplete={onSlidingComplete}
      />
    </SliderContainer>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    paddingVertical: 16,
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { MultiSlider };

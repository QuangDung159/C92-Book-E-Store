import { Slider } from '@miblanchard/react-native-slider';
import React, { Children, cloneElement, FC, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '@themes';

interface MultiSliderProps {
  sliderRange: number[];
}

const MultiSlider: FC<MultiSliderProps> = ({ sliderRange }) => {
  const DEFAULT_VALUE = 0.2;

  const SliderContainer = (props: {
    caption: string;
    children: React.ReactElement;
    sliderValue?: Array<number>;
    trackMarks?: Array<number>;
    vertical?: boolean;
  }) => {
    const { caption, sliderValue, trackMarks } = props;
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
          <Text>{caption}</Text>
          <Text>{Array.isArray(value) ? value.join(' - ') : value}</Text>
        </View>
        {renderChildren()}
      </View>
    );
  };
  return (
    <SliderContainer sliderValue={sliderRange} caption="asd">
      <Slider
        animateTransitions
        maximumTrackTintColor={COLORS.gray}
        maximumValue={20}
        minimumTrackTintColor={COLORS.primaryBlack}
        minimumValue={0}
        step={1}
        thumbTintColor={COLORS.primaryBlack}
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

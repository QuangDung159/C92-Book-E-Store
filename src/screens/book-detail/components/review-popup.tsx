import { observer } from 'mobx-react-lite';
import React, { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import { Buttons, Inputs, Layouts } from '@components';
import { DataModels } from '@models';
import { COLORS, FONT_STYLES } from '@themes';
import { ReviewViewModel } from '../view-models';

interface ReviewPopupProps {
  visible: boolean;
  onDismiss: () => void;
  onSubmit: (data: DataModels.IReviewInput) => void;
}

const ReviewPopup: React.FC<ReviewPopupProps> = ({
  visible,
  onDismiss,
  onSubmit,
}) => {
  const reviewVM = useRef(new ReviewViewModel()).current;

  const closePopup = () => {
    onDismiss();
    reviewVM.resetReview();
  };

  return (
    <Layouts.BottomPopup visible={visible}>
      <Layouts.PopupHeader label="Leave your review" onDismiss={closePopup} />
      <View>
        <Inputs.CTextInput
          label="Your name *"
          placeholder="Please enter your name"
          onChangeText={(value) => {
            reviewVM.setReview({
              ...reviewVM.review,
              userName: value,
            });
          }}
        />
        <Layouts.VSpace value={16} />
        <Text style={styles.title}>Rating</Text>
        <Layouts.VSpace value={8} />
        <StarRating
          starSize={30}
          rating={reviewVM.review?.rating}
          onChange={(value) => {
            reviewVM.setReview({
              ...reviewVM.review,
              rating: value,
            });
          }}
          enableHalfStar={false}
          style={styles.rating}
          color={COLORS.error50}
        />
        <Layouts.VSpace value={16} />
        <Inputs.CTextInput
          multiline
          label="Your review"
          placeholder="Please enter your review"
          onChangeText={(value) => {
            reviewVM.setReview({
              ...reviewVM.review,
              content: value,
            });
          }}
        />
      </View>
      <Layouts.VSpace value={24} />
      <Buttons.CButton
        label="Submit"
        onPress={() => {
          closePopup();
          onSubmit(reviewVM.review);
        }}
        buttonType="primary"
      />
      <Layouts.VSpace value={24} />
    </Layouts.BottomPopup>
  );
};

const styles = StyleSheet.create({
  title: {
    ...FONT_STYLES.BOLD_16,
  },
  rating: {
    marginLeft: -8,
  },
});

const observable = observer(ReviewPopup);
export { observable as ReviewPopup };

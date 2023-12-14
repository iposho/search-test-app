import { ChangeEvent, Dispatch, SetStateAction } from 'react';

import { RATING_OPTIONS } from '../constants';

interface IRatingState {
  ratingFrom: string | number | undefined;
  ratingTo: string | number | undefined;
}

export const handleRatingChange = (
  event: ChangeEvent<HTMLSelectElement>,
  setRating: Dispatch<SetStateAction<IRatingState>>,
): void => {
  const selectedValue = event.target.value;

  switch (selectedValue) {
    case RATING_OPTIONS.NEW:
      setRating({ ratingFrom: 0, ratingTo: 0 });
      break;
    case RATING_OPTIONS.FROM_100_TO_80:
      setRating({ ratingFrom: 80, ratingTo: 100 });
      break;
    case RATING_OPTIONS.FROM_79_TO_60:
      setRating({ ratingFrom: 60, ratingTo: 79 });
      break;
    case RATING_OPTIONS.FROM_59_TO_40:
      setRating({ ratingFrom: 40, ratingTo: 59 });
      break;
    default:
      setRating({ ratingFrom: undefined, ratingTo: undefined });
      break;
  }
};

export const mapRatingToValues = ({ ratingFrom, ratingTo }: IRatingState): string => {
  if (ratingFrom === 0 && ratingTo === 0) {
    return RATING_OPTIONS.NEW;
  } if (ratingFrom === 80 && ratingTo === 100) {
    return RATING_OPTIONS.FROM_100_TO_80;
  } if (ratingFrom === 60 && ratingTo === 79) {
    return RATING_OPTIONS.FROM_79_TO_60;
  } if (ratingFrom === 40 && ratingTo === 59) {
    return RATING_OPTIONS.FROM_59_TO_40;
  }
  return RATING_OPTIONS.NOT_IMPORTANT;
};

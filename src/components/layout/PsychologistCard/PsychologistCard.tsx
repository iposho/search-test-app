import { FC } from 'react';
import { DateTime } from 'luxon';

import calculateAge from '../../../helpers/calculateAge';
import pluralize from '../../../helpers/pluralize';

import { IPsychologistData } from '../../../models';

import noImageMan from '../../../assets/images/noPhotoMan.svg';
import noImageWoman from '../../../assets/images/noPhotoWoman.svg';

import css from './PsychologistCard.module.scss';

interface PsychologistCardProps {
  data: IPsychologistData;
}

export const PsychologistCard: FC<PsychologistCardProps> = ({ data }) => {
  const {
    birthDate,
    defaultSubjectName,
    lastActivityTime,
    name,
    onlineStatus,
    photoUrl,
    subjectsCount,
    rating,
    sex,
  } = data;

  const age = calculateAge(birthDate);
  const pluralizedThemes = pluralize(subjectsCount, ['тема', 'темы', 'тем']);

  const imageSrc = photoUrl || (sex !== 2 ? noImageWoman : noImageMan);

  const dt = DateTime.fromISO(lastActivityTime);
  const lastSeen = dt.toRelative();

  return (
    <div className={css.card}>
      <div className={css.image}>
        <img src={imageSrc} alt={name} />
        <div className={css.rating}>
          <span className={css.ratingTitle}>Рейтинг</span>
          {
            rating > 0
              ? <span className={css.ratingValue}>{rating}</span>
              : <span className={css.ratingValueNew}>NEW</span>
          }
        </div>
      </div>
      <div className={css.info}>
        <div className={css.name}>
          {`${name}, ${age}`}
          {onlineStatus && <span className={css.onlineStatus}>{' '}</span>}
        </div>
        <div className={css.theme}>
          {defaultSubjectName}
          {
            subjectsCount > 0
            && <span className={css.themes}>{`и еще ${subjectsCount} ${pluralizedThemes}`}</span>
          }
        </div>
        {
          lastActivityTime
          && (
            <div className={css.lastSeen}>
              {sex === 1 ? 'Был' : 'Была'}
              {' '}
              {lastSeen}
            </div>
          )
        }
      </div>
    </div>
  );
};

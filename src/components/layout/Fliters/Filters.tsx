import {
  ChangeEvent, FC, useEffect, useState,
} from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import { useGetSubjectsQuery } from '../../../store/api/server.api';

import { Button } from '../../ui/Button';

import { handleRatingChange, mapRatingToValues } from '../../../helpers/ratingUtils';

import { IPsychologistFilters, ISubject } from '../../../models';
import { RATING_OPTIONS, QUALIFICATION } from '../../../constants';

import css from './Filters.module.scss';

interface FiltersProps {
  onFiltersChange: (data: IPsychologistFilters) => void;
  defaultValues: IPsychologistFilters;
}

export const Filters: FC<FiltersProps> = ({ defaultValues, onFiltersChange }) => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
  } = useForm<IPsychologistFilters>();

  const { data: subjectsData } = useGetSubjectsQuery({});

  const [isCertified, setIsCertified] = useState('');
  const [rating, setRating] = useState({});

  const handleProfSpecialityChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    if (selectedValue === '4') {
      setIsCertified('true');
    } else {
      setIsCertified('');
    }
  };

  const onSubmit: SubmitHandler<IPsychologistFilters> = (data) => {
    onFiltersChange({ ...data, isCertified, ...rating });
  };

  useEffect(() => {
    const selectedRating = mapRatingToValues({
      ratingFrom: Number(defaultValues.ratingFrom),
      ratingTo: Number(defaultValues.ratingTo),
    });

    setValue('rating', selectedRating);

    Object.entries(defaultValues).forEach(([fieldName, value]) => {
      if (fieldName === 'isCertified' && !!value) {
        setIsCertified(isCertified);
        setValue('profSpeciality', QUALIFICATION.PSYCHOLOGIST_DIPLOMA);
      }

      if (fieldName === 'profSpeciality' && value === '4') {
        setIsCertified(isCertified);
      }

      if (fieldName === 'rating') {
        return;
      }

      setValue(fieldName as keyof IPsychologistFilters, value);
    });
  }, [isCertified, defaultValues, setValue]);

  return (
    <div className={css.filters}>
      <form
        className={css.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="sex" className={css.label}>
          Я ищу психолога
          <select {...register('sex')}>
            <option value="">Любого пола</option>
            <option value="1">Мужской</option>
            <option value="2">Женский</option>
          </select>
        </label>

        <div className={`${css.label} ${css.labelAge}`}>
          <span>В возрасте</span>
          <div className={css.ageRange}>
            <Controller
              name="ageFrom"
              control={control}
              render={({ field }) => (
                <label htmlFor="ageFrom">
                  От
                  <select id="ageFrom" {...field}>
                    {Array.from({ length: 82 }, (_, index) => 18 + index).map((age) => (
                      <option key={age} value={age}>
                        {age}
                      </option>
                    ))}
                  </select>
                </label>
              )}
            />
            <Controller
              name="ageTo"
              control={control}
              render={({ field }) => (
                <label htmlFor="ageTo">
                  До
                  <select id="ageTo" {...field}>
                    {Array.from({ length: 82 }, (_, index) => 18 + index).map((age) => (
                      <option key={age} value={age}>
                        {age}
                      </option>
                    ))}
                  </select>
                </label>
              )}
            />
          </div>
        </div>

        <Controller
          name="subjectId"
          control={control}
          render={({ field }) => (
            <label htmlFor="subjectId" className={css.label}>
              Тема
              <select {...field}>
                {subjectsData?.data?.map((subject: ISubject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </label>
          )}
        />

        <label htmlFor="profSpeciality" className={css.label}>
          Квалификация
          <select
            defaultValue=""
            {...register('profSpeciality')}
            onChange={handleProfSpecialityChange}
          >
            <option value="">Все варианты</option>
            <option value={QUALIFICATION.CONSULTANT}>Консультант</option>
            <option value={QUALIFICATION.COACH}>Коуч</option>
            <option value={QUALIFICATION.PSYCHOLOGIST_DIPLOMA}>Диплом психолога</option>
            <option value={QUALIFICATION.SEXOLOGIST}>Сексолог</option>
          </select>
        </label>

        <label htmlFor="rating" className={css.label}>
          Рейтинг
          <select
            {...register('rating')}
            onChange={(event) => handleRatingChange(event, setRating)}
          >
            <option value={RATING_OPTIONS.NOT_IMPORTANT}>Не важен</option>
            <option value={RATING_OPTIONS.NEW}>Новые</option>
            <option value={RATING_OPTIONS.FROM_100_TO_80}>от 100 до 80</option>
            <option value={RATING_OPTIONS.FROM_79_TO_60}>от 79 до 60</option>
            <option value={RATING_OPTIONS.FROM_59_TO_40}>от 59 до 40</option>
          </select>
        </label>

        <Button
          type="submit"
          className={css.button}
        >
          Показать анкеты
        </Button>
      </form>
    </div>
  );
};

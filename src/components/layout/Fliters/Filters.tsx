import { FC, useEffect, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import { useGetSubjectsQuery } from '../../../store/api/server.api';

import { Button } from '../../ui/Button';

import { IPsychologistFilters } from '../../../models';

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
  } = useForm();

  const { data: subjectsData } = useGetSubjectsQuery({});

  const [isCertified, setIsCertified] = useState('');

  const handleProfSpecialityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    console.log(selectedValue);
    if (selectedValue === '4') {
      setIsCertified(true);
    } else {
      setIsCertified('');
    }
  };

  const onSubmit: SubmitHandler<any> = (data) => {
    onFiltersChange({ ...data, isCertified });
  };

  useEffect(() => {
    Object.entries(defaultValues).forEach(([fieldName, value]) => {
      setValue(fieldName as keyof PsychologistFilters, value);
    });
  }, [defaultValues, setValue]);

  useEffect(() => {
    const defaultValue = register('profSpeciality')?.defaultChecked;
    if (defaultValue === '4') {
      setIsCertified(true);
    }
  }, [register]);

  console.log('render');

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
                {subjectsData?.data?.map((subject) => (
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
            <option value="1">Консультант</option>
            <option value="3">Коуч</option>
            <option value="4">Диплом психолога</option>
            <option value="2">Сексолог</option>
          </select>
        </label>

        <label htmlFor="rating" className={css.label}>
          Рейтинг
          <select {...register('rating')}>
            <option value="">Select...</option>
            <option value="A">Option A</option>
            <option value="B">Option B</option>
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

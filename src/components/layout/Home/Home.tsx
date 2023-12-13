import { FC, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Filters } from '../Fliters';
import { PsychologistsList } from '../Psychologists';

import { IPsychologistFilters } from '../../../models';

import css from './Home.module.scss';

export const Home: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const [filters, setFilters] = useState<IPsychologistFilters>({
    sex: params.get('sex') || '',
    ageFrom: Number(params.get('ageFrom') || '18'),
    ageTo: Number(params.get('ageTo') || '74'),
    subjectId: Number(params.get('subjectId') || '8'),
    profSpeciality: params.get('profSpeciality') || '',
    rating: params.get('rating') || '',
  });

  const [pagination, setPagination] = useState({
    offset: parseInt(params.get('offset') || '0', 10),
    limit: parseInt(params.get('limit') || '12', 10),
  });

  const handleFiltersChange = (newFilters: IPsychologistFilters) => {
    setFilters(newFilters);
    setPagination({ offset: 0, limit: 12 });

    const queryParams = new URLSearchParams();

    if (newFilters.sex) queryParams.append('sex', newFilters.sex);
    if (newFilters.ageFrom) queryParams.append('ageFrom', String(newFilters.ageFrom));
    if (newFilters.ageTo) queryParams.append('ageTo', String(newFilters.ageTo));
    if (newFilters.subjectId) queryParams.append('subjectId', String(newFilters.subjectId));
    if (newFilters.profSpeciality) queryParams.append('profSpeciality', newFilters.profSpeciality);
    if (newFilters.rating) queryParams.append('rating', newFilters.rating);

    queryParams.append('offset', String(pagination.offset));
    queryParams.append('limit', String(pagination.limit));

    const queryString = `/?${queryParams.toString()}`;
    navigate(queryString);
  };

  const handleLoadMore = () => {
    setPagination((prev) => ({ offset: prev.offset + prev.limit, limit: 12 }));
  };

  return (
    <main className={css.home}>
      <Filters defaultValues={filters} onFiltersChange={handleFiltersChange} />
      <hr className={css.divider} />
      <PsychologistsList filters={filters} pagination={pagination} onLoadMore={handleLoadMore} />
    </main>
  );
};

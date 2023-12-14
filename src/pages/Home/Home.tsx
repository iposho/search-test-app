import { FC, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Filters } from '../../components/layout/Fliters';
import { PsychologistsList } from '../../components/layout/Psychologists';

import { IPsychologistFilters } from '../../models';

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
    isCertified: params.get('isCertified') || '',
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
    if (newFilters.rating) queryParams.append('rating', newFilters.rating);

    if (newFilters.profSpeciality) {
      if (newFilters.profSpeciality === '4') {
        queryParams.append('isCertified', String(newFilters.isCertified));
      } else {
        queryParams.append('profSpeciality', newFilters.profSpeciality);
      }
    }

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
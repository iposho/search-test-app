import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  DEFALUT_SUBJECT_ID,
  DEFAULT_AGE_TO,
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
  DEFAUTL_AGE_FROM,
  RATING_OPTIONS,
} from '../constants';

import { IPsychologistFilters, IPsychologistsPagination } from '../models';

export const usePsychologistFilters = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const [filters, setFilters] = useState<IPsychologistFilters>({
    sex: params.get('sex') || '',
    ageFrom: Number(params.get('ageFrom') || DEFAUTL_AGE_FROM),
    ageTo: Number(params.get('ageTo') || DEFAULT_AGE_TO),
    subjectId: Number(params.get('subjectId') || DEFALUT_SUBJECT_ID),
    profSpeciality: params.get('profSpeciality') || '',
    rating: params.get('rating') || '',
    isCertified: params.get('isCertified') || '',
    ratingFrom: params.get('ratingFrom') || undefined,
    ratingTo: params.get('ratingTo') || undefined,
  });

  const [pagination, setPagination] = useState({
    offset: Number(params.get('offset') || DEFAULT_OFFSET),
    limit: Number(params.get('limit') || DEFAULT_LIMIT),
  });

  const buildQueryParams = (filters: IPsychologistFilters, pagination: IPsychologistsPagination) => {
    const queryParams = new URLSearchParams();

    if (filters.sex) queryParams.append('sex', filters.sex);
    if (filters.ageFrom) queryParams.append('ageFrom', String(filters.ageFrom));
    if (filters.ageTo) queryParams.append('ageTo', String(filters.ageTo));
    if (filters.subjectId) queryParams.append('subjectId', String(filters.subjectId));

    if (filters.rating) {
      switch (filters.rating) {
        case RATING_OPTIONS.NEW:
          queryParams.append('ratingFrom', '0');
          queryParams.append('ratingTo', '0');
          setFilters((prevFilters) => ({ ...prevFilters, ratingFrom: '0', ratingTo: '0' }));
          break;
        case RATING_OPTIONS.FROM_100_TO_80:
          queryParams.append('ratingFrom', '80');
          queryParams.append('ratingTo', '100');
          setFilters((prevFilters) => ({ ...prevFilters, ratingFrom: '80', ratingTo: '100' }));
          break;
        case RATING_OPTIONS.FROM_79_TO_60:
          queryParams.append('ratingFrom', '60');
          queryParams.append('ratingTo', '79');
          setFilters((prevFilters) => ({ ...prevFilters, ratingFrom: '60', ratingTo: '79' }));
          break;
        case RATING_OPTIONS.FROM_59_TO_40:
          queryParams.append('ratingFrom', '40');
          queryParams.append('ratingTo', '59');
          setFilters((prevFilters) => ({ ...prevFilters, ratingFrom: '40', ratingTo: '59' }));
          break;
        default:
          queryParams.append('ratingFrom', '');
          queryParams.append('ratingTo', '');
          setFilters((prevFilters) => ({ ...prevFilters, ratingFrom: '', ratingTo: '' }));
          break;
      }
    }

    if (filters.profSpeciality) {
      console.log(filters.profSpeciality);
      if (filters.profSpeciality === '4' || filters.isCertified) {
        queryParams.append('isCertified', String(true));
      } else {
        queryParams.append('profSpeciality', filters.profSpeciality);
      }
    }

    queryParams.append('offset', String(pagination.offset));
    queryParams.append('limit', String(pagination.limit));

    return queryParams;
  };

  const handleFiltersChange = (newFilters: IPsychologistFilters) => {
    setFilters(newFilters);
    setPagination({ offset: DEFAULT_OFFSET, limit: DEFAULT_LIMIT });

    const queryParams = buildQueryParams(newFilters, { offset: DEFAULT_OFFSET, limit: DEFAULT_LIMIT });

    const queryString = `/?${queryParams.toString()}`;
    navigate(queryString);
  };

  const handleLoadMore = (): void => {
    setPagination((prev) => {
      const newPagination = { offset: DEFAULT_OFFSET, limit: prev.limit + DEFAULT_LIMIT };
      const queryParams = buildQueryParams(filters, newPagination);

      const queryString = `/?${queryParams.toString()}`;
      navigate(queryString);

      return newPagination;
    });
  };

  return {
    filters, pagination, handleFiltersChange, handleLoadMore,
  };
};

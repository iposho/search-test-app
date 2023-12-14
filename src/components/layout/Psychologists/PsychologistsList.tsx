import { FC } from 'react';

import { useGetPsychologistsQuery } from '../../../store/api/server.api';

import { IPsychologistFilters } from '../../../models';

import css from './PsychologistsList.module.scss';

interface PsychologistsListProps {
  filters: IPsychologistFilters;
  pagination: { offset: number; limit: number };
  onLoadMore: () => void;
}

export const PsychologistsList:FC<PsychologistsListProps> = ({ filters, pagination, onLoadMore }) => {
  const { data, isError, isLoading } = useGetPsychologistsQuery({
    offset: pagination.offset,
    limit: pagination.limit,
    ...filters,
  });

  const { items } = data?.data || [];

  return (
    <div className={css.psychologists}>
      {
        isError
        && <>Something went wrong</>
      }
      {
        isLoading
        && <>Loading...</>
      }
      {
        (Array.isArray(items) && items.length > 0)
          && 'Full Data'
      }
      {
        (Array.isArray(items) && items.length === 0)
        && 'Not full Data'
      }
    </div>
  );
};

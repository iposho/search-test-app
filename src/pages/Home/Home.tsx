import { FC } from 'react';
import { Filters } from '../../components/layout/Fliters';
import { PsychologistsList } from '../../components/layout/PsychologistsList';
import { usePsychologistFilters } from '../../hooks/usePsychologistFilters';

import css from './Home.module.scss';

export const Home: FC = () => {
  const {
    filters, pagination, handleFiltersChange, handleLoadMore,
  } = usePsychologistFilters();

  return (
    <main className={css.home}>
      <Filters defaultValues={filters} onFiltersChange={handleFiltersChange} />
      <hr className={css.divider} />
      <PsychologistsList filters={filters} pagination={pagination} onLoadMore={handleLoadMore} />
    </main>
  );
};

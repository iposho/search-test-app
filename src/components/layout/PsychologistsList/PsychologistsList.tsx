import { FC } from 'react';

import { useGetPsychologistsQuery } from '../../../store/api/server.api';

import { Button } from '../../ui/Button';
import { Spinner } from '../../ui/Spinner';
import { PsychologistCard } from '../PsychologistCard';

import { IPsychologistFilters, IPsychologistsPagination } from '../../../models';

import emptySearchImage from '../../../assets/images/emptySearchIcon.svg';

import css from './PsychologistsList.module.scss';

interface PsychologistsListProps {
  filters: IPsychologistFilters;
  pagination: IPsychologistsPagination;
  onLoadMore: () => void;
}

export const PsychologistsList:FC<PsychologistsListProps> = ({ filters, pagination, onLoadMore }) => {
  const {
    data, error, isError, isLoading,
  } = useGetPsychologistsQuery({
    offset: pagination.offset,
    limit: pagination.limit,
    ...filters,
  });

  const { items, totalCount } = data?.data || [];

  console.log(error);

  return (
    <div className={css.psychologists}>
      {
        isError
        && <>Something went wrong</>
      }
      {
        isLoading
        && <Spinner />
      }
      {
        (Array.isArray(items) && items.length > 0)
          && (
            <>
              {items.map((item) => <PsychologistCard key={item.userId} data={item} />)}
              {totalCount > items.length && (
                <div className={css.buttonWrapper}>
                  <Button
                    className={css.loadMoreButton}
                    onClick={onLoadMore}
                  >
                    Показать еще
                  </Button>
                </div>
              )}
            </>
          )
      }
      {
        (Array.isArray(items) && items.length === 0)
        && (
          <div className={css.noData}>
            <div className={css.noDataInfo}>
              <img src={emptySearchImage} alt="" />
              К сожалению, нет анкет с такими параметрами
            </div>
          </div>
        )
      }
    </div>
  );
};

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://freuders-web-api-test-3.azurewebsites.net/api/';
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl }), // Замените '/api' на вашу базовую URL
  endpoints: (builder) => ({
    getPsychologists: builder.query({
      query: ({
        offset, limit, sex, ageFrom, ageTo, subjectId, profSpeciality, ratingFrom, ratingTo, isCertified,
      }) => ({
        url: 'search/specialists',
        params: {
          offset,
          limit,
          sex,
          ageFrom,
          ageTo,
          subjectId,
          profSpeciality: profSpeciality !== '4' ? profSpeciality : '',
          ratingFrom,
          ratingTo,
          isCertified: profSpeciality === '4' || isCertified,
        },
      }),
    }),
    getSubjects: builder.query({
      query: () => 'subjects',
    }),
  }),
});

export const { useGetPsychologistsQuery, useGetSubjectsQuery } = api;

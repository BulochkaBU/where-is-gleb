import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_URL }),
  endpoints: (builder) => ({
    getCurrentLocation: builder.query({
      query: () => ({
        headers: {
          Authorization: "Bearer " + import.meta.env.VITE_TOKEN_TRACKER,
        },
      }),
    }),
    getLocationById: builder.query({
      query: ({ id }) => ({
        url: `?id=${id}`,
        headers: {
          Authorization: "Bearer " + import.meta.env.VITE_TOKEN_TRACKER,
        },
      }),
    }),
  }),
});

export const { useGetCurrentLocationQuery, useGetLocationByIdQuery } = apiSlice;

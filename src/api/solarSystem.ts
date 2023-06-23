// RTK Query endpoint to get data from https://api.le-systeme-solaire.net/rest/bodies

import { PlanetsData } from "@/models";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const solarSystemApi = createApi({
  reducerPath: "solarSystemApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.le-systeme-solaire.net/rest/",
  }),
  endpoints: (builder) => ({
    getPlanetsData: builder.query<PlanetsData, any>({
      query: () => `bodies`,
    }),
  }),
});

// auto-generated based on the defined endpoints
export const { useGetPlanetsDataQuery } = solarSystemApi;

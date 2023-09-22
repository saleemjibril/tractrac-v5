import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { transformRequest } from "../utils";
import { RootState } from "../store";
// import { baseUrl } from 'src/utils/helpers'

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    // base url of backend API
    baseUrl: "https://api.tractrac.co/v1",

    // prepareHeaders is used to configure the header of every request and gives access to getState which we use to include the token from the store
    prepareHeaders: (headers, { getState }) => {
      console.log((getState() as RootState).auth);
      const authState = (getState() as RootState).auth;
      const token = authState.userToken;
      if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/x-www-form-urlencoded");
      }
      if (token) {
        // include token in req header
        headers.set("authorization", `Bearer ${token}`);
        return headers;
      }
      return headers;
    },
  }),
  tagTypes: ['farmers'],
  endpoints: (builder) => ({
    getFarmers: builder.query({
      query: () => ({
        url: `/get_farmers`,
        method: 'GET',
      }),
      providesTags: ['farmers'],
    }),

    getPersonalStats: builder.query({
      query: (user_id) => ({
        url: `/personal_stats/${user_id}`,
        method: "GET",
      }),
    }),

    getEntries: builder.query({
      query: (entry) => ({
        url: `/get_admin_entries/${entry}`,
        method: "GET",
      }),
    }),

    getPayments: builder.query({
        query: () => ({
          url: '/get_admin_payment',
          method: "GET",
        }),
      }),

      getSingleTractor: builder.query({
        query: (tractorId) => ({
          url: `/tractors/${tractorId}`,
          method: "GET",
        }),
      }),
 
    addFarmer: builder.mutation({
      query: (data: any) => ({
        url: "/add_farmer",
        method: "POST",
        body: transformRequest(data),
      }),
      invalidatesTags: ['farmers']
    }),

    updateBioData: builder.mutation({
      query: (data: any) => ({
        url: "/update_biodata",
        method: "POST",
        body: transformRequest(data),
      }),
    }),

    updatePassword: builder.mutation({
      query: (data: any) => ({
        url: "/update_password",
        method: "POST",
        body: transformRequest(data),
      }),
    }),
  }),
});

// export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetFarmersQuery,
  useGetPersonalStatsQuery,
  useGetEntriesQuery,
  useGetPaymentsQuery,
  useLazyGetSingleTractorQuery,
  

  useAddFarmerMutation,
  useUpdateBioDataMutation,
  useUpdatePasswordMutation,
} = adminApi;

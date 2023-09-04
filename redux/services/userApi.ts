import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { transformRequest } from "../utils";
import { RootState } from "../store";
// import { baseUrl } from 'src/utils/helpers'

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    // base url of backend API
    baseUrl: "https://api.tractrac.co/v1",
    // prepareHeaders: (headers, { getState }) => {
    //   return headers;
    // },

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
  endpoints: (builder) => ({
    // getActiveUsers: builder.query({
    //   query: (page) => ({
    //     url: `/api/system/admin-app/users?page=${page}`,
    //     method: 'GET',
    //   }),
    // //   providesTags: ['users'],
    // }),
    // getInActiveUsers: builder.query({
    //   query: (page) => ({
    //     url: `/api/system/admin-app/inactive-users?page=${page}`,
    //     method: 'GET',
    //   }),
    // //   providesTags: ['users'],
    // }),
    getDashboardStats: builder.query({
      query: () => ({
        url: "/dashboard_stats",
        method: "GET",
      }),
    }),
    becomeAnAgent: builder.mutation({
      query: ({ user_id, state, lga, town }) => ({
        url: "/become_an_agent",
        method: "POST",
        body: transformRequest({ user_id, state, lga, town }),
      }),
    }),
    investInTractor: builder.mutation({
      query: (data: any) => ({
        url: "/invest_in_tractor",
        method: "POST",
        body: transformRequest(data),
      }),
    }),
    validateIssamId: builder.mutation({
      query: (data: any) => ({
        url: "/validate_issam_id",
        method: "POST",
        body: transformRequest(data),
      }),
    }),
    collaborate: builder.mutation({
      query: (data: any) => ({
        url: "/collaborate",
        method: "POST",
        body: transformRequest(data),
      }),
    }),
    becomeAnOpOrMech: builder.mutation({
      query: (data: any) => ({
        url: "/become_an_operator_or_mech",
        method: "POST",
        // body: data,
        body: transformRequest(data),
        // formData: true,
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
      }),
    }),
  }),
});

// export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  //   useLazyGetActiveUsersQuery,
  //   useLazyGetInActiveUsersQuery,
  useGetDashboardStatsQuery,
  useBecomeAnAgentMutation,
  useInvestInTractorMutation,
  useValidateIssamIdMutation,
  useCollaborateMutation,
  useBecomeAnOpOrMechMutation,
} = userApi;
// export const { useGetActiveUsersQuery } = userApi

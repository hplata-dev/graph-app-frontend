import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const graphApi = createApi({
  reducerPath: "graphApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  tagTypes: ["Graph", "Graphs"],
  endpoints: (builder) => ({
    getGraph: builder.query({
      query: (id) => `/graphs/${id}`,
      providesTags: ["Graph"],
    }),
    getGraphs: builder.query({
      query: () => "/graphs",
      providesTags: ["Graphs"],
    }),
    deleteGraph: builder.mutation({
      query: (id) => ({
        url: `/graphs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Graph", "Graphs"],
    }),
    createGraph: builder.mutation({
      query: (body) => ({
        url: "/graphs",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Graphs"],
    }),
    updateGraph: builder.mutation({
      query: ({ id, name, description }) => ({
        url: `/graphs/${id}`,
        method: "PUT",
        body: { name, description },
      }),
      invalidatesTags: ["Graph", "Graphs"],
    }),
  }),
});

export const {
  useGetGraphQuery,
  useDeleteGraphMutation,
  useCreateGraphMutation,
  useUpdateGraphMutation,
  useGetGraphsQuery,
  useLazyGetGraphQuery,
} = graphApi;

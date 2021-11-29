import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => `/users`,
        }),
        addUser: builder.mutation({
            query: (body) => {
                return {
                    url: `/users`,
                    method: 'POST',
                    body,
                }
            },
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUsersQuery, useAddUserMutation } = userApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const studentApi = createApi({
    reducerPath: 'studentApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
    endpoints: (builder) => ({
        getStudents: builder.query({
            query: () => `/students`,
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetStudentsQuery } = studentApi
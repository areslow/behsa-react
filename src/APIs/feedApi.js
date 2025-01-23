import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiSettings } from './apiSettings';

const feedApi = createApi({
    reducerPath : "feedApi",
    baseQuery: fetchBaseQuery({
        baseUrl: apiSettings.BASE_URL
    }),
    endpoints: (builder)=>({
        getSpiegelFeed: builder.query({
            query: ()=>({
                url: "RSS/spiegel"
            })
        })
    })
});

export const { useGetSpiegelFeedQuery } = feedApi;

export default feedApi;
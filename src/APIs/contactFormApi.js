import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiSettings } from './apiSettings';


const contactFormApi = createApi({
    reducerPath: "contactFormApi",
    baseQuery: fetchBaseQuery({
        baseUrl: apiSettings.BASE_URL,
        prepareHeaders: (headers, api)=>{
            const token = localStorage.getItem("token");
            token && headers.append("Authorization", "Bearer " + token);
        }
    }),
    tagTypes: ["ContactInfo"],
    endpoints: (builder) =>({
        getAllReceivedRequest : builder.query({
            query: () => ({url: "contactInfo"}),
            providesTags: ["ContactInfo"]
        }),
        sendRequest : builder.mutation({
            query: (data) => ({
                url: "contactInfo",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["ContactInfo"]
        }),
        updateRequestState: builder.mutation({
            query: ({requestId, newState})=>({
                url: `contactInfo/${requestId}+${newState}`,
                method: "PUT"
            }),
            invalidatesTags: ["ContactInfo"],
        }),
        deleteRequest: builder.mutation({
            query: (id)=>({
                url: `contactInfo/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["ContactInfo"]
        }),
    })
});

export const {
    useGetAllReceivedRequestQuery,
    useSendRequestMutation,
    useUpdateRequestStateMutation,
    useDeleteRequestMutation,
} = contactFormApi;

export default contactFormApi;
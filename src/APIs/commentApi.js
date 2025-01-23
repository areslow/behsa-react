import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiSettings } from "./apiSettings";
import { JWTToken } from "../Utilities/SD";

const commentApi = createApi({
    reducerPath: "commentApi",
    baseQuery: fetchBaseQuery({
        baseUrl: apiSettings.BASE_URL,
        prepareHeaders: (headers, api)=>{
            const token = localStorage.getItem(JWTToken);
            token && headers.append("Authorization", "Bearer " + token);
        }
    }),
    tagTypes: ["comments"],
    endpoints: (builder)=>({
        getPostComments: builder.query({
            query: (postId)=>({
                url: `Comment/${postId}`
            }),
            providesTags: ["comments"]
        }),
        createComment: builder.mutation({
            query: (data)=>({
                url: 'Comment',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["comments"]
        }),
        updateComment: builder.mutation({
            query: ({cmtId, updateRequest})=>({
                url: `Comment/${cmtId}`,
                method: "PUT",
                body: updateRequest
            }),
            invalidatesTags: ["comments"]
        }),
        deleteComment: builder.mutation({
            query: ({cmtId, appUser})=>({
                url: `Comment/${cmtId}`,
                method: "DELETE",
                body: appUser
            }),
            invalidatesTags: ["comments"]
        })
    })
});

export const {
    useGetPostCommentsQuery,
    useCreateCommentMutation,
    useUpdateCommentMutation,
    useDeleteCommentMutation,
} = commentApi;

export default commentApi;
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiSettings } from './apiSettings';
import { JWTToken } from "../Utilities/SD";

const { BASE_URL } = apiSettings;

const postApi = createApi({
    reducerPath: "postApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers)=>{
            const token = localStorage.getItem(JWTToken);
            token && headers.append("Authorization", "Bearer " + token);
        }
    }),
    tagTypes: ["PostItems"],
    endpoints: (builder)=>({
        getAllPosts: builder.query({
            query: ()=>({url: "Post"}),
            providesTags: ["PostItems"]
        }),
        getPostById: builder.query({
            query: (postId)=>({
                url: `Post/${postId}`,
            }),
            providesTags:["PostItems"]
        }),
        createPost: builder.mutation({
            query: (data)=>({
                url: "Post",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["PostItems"]
        }),
        editPost: builder.mutation({
            query: (data)=>({ // we send post id in data we're sending
                url: "Post",
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["PostItems"]
        }),
        togglePostLock: builder.mutation({
            query: (postId)=>({
                url: `Post/${postId}`,
                method: "PUT"
            }),
            invalidatesTags: ["PostItems"]
        }),
        deletePost: builder.mutation({
            query: (postId)=>({
                url: `Post/${postId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["PostItems"]
        })
    })
});

export const  {
    useGetAllPostsQuery,
    useGetPostByIdQuery,
    useCreatePostMutation,
    useEditPostMutation,
    useTogglePostLockMutation,
    useDeletePostMutation
} = postApi;

export default postApi


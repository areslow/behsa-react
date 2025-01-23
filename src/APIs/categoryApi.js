import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiSettings } from './apiSettings';
import { JWTToken } from "../Utilities/SD";

const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery: fetchBaseQuery({
        baseUrl: apiSettings.BASE_URL,
        prepareHeaders: (headers, api) =>{
            const token = localStorage.getItem(JWTToken);
            token && headers.append("Authorization", `Bearer ${token}`);
        }
    }),
    tagTypes: ["category"],
    endpoints: (builder) => ({
        getAllCategory: builder.query({
            query: ()=>({
                url:"Category"
            }),
            providesTags: ["category"],
        }),
        getCategoryById: builder.query({
            query: (catgId)=>({
                url: `Category/${catgId}`
            }),
            providesTags: ["category"]
        }),
        createCategory: builder.mutation({
            query:(category)=>({
                url:"Category",
                method: "POST",
                body: category,
            }),
            invalidatesTags: ["category"]
        }),
        updateCategory: builder.mutation({
            query: (category)=>({
                url: "Category",
                method: "PUT",
                body: category
            }),
            invalidatesTags: ["category"]
        }),
        deleteCategory: builder.mutation({
            query: (categoryId)=>({
                url: `Category/${categoryId}`,
                method: "DELETE",
            }),
            invalidatesTags:["category"]
        })
    })
});


export const {
    useGetAllCategoryQuery,
    useGetCategoryByIdQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation
} = categoryApi

export default categoryApi;
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiSettings } from "./apiSettings";
import { JWTToken } from "../Utilities/SD";

const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
        baseUrl: apiSettings.BASE_URL,
        prepareHeaders: (headers, api)=>{
            const token = localStorage.getItem(JWTToken);
            token && headers.append("Authorization", `Bearer ${token}`);
        }
    }),
    tagTypes:["product"],
    endpoints: (builder)=>({
        getAllProducts: builder.query({
            query: ()=>({ url: "Product" }),
            providesTags:["product"]
        }),
        getProductsByCategory: builder.query({
            query: (catgId)=>({
                url: `Product/${catgId}`
            }),
            providesTags: ["product"]
        }),
        getProductById: builder.query({
            query: (productId)=>({
                url: `Product/${productId}`
            }),
            providesTags: ["product"]
        }),
        createProduct: builder.mutation({
            query: (product)=>({
                url: "Product",
                method: "POST",
                body: product
            }),
            invalidatesTags:["product"]
        }),
        updateProduct: builder.mutation({
            query: (product)=>({
                url: "Product",
                method: "PUT",
                body: product
            }),
            invalidatesTags: ["product"]
        }),
        deleteProduct: builder.mutation({
            query: (productId)=>({
                url: `Product/${productId}`,
                method: "DELETE",
            }),
            invalidatesTags:["product"]
        })
    })
});


export const {
    useGetAllProductsQuery,
    useGetProductByIdQuery,
    useGetProductsByCategoryQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productApi

export default productApi;
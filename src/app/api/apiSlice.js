import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl : 'https://technotes-api-v0-nt2n.onrender.com/',
    credentials : "include",
    prepareHeaders : (headers , {getState}) => {
        const token = getState().auth.token

        if(token) headers.set("authorization" , `Bearer ${token}`)

        return headers
    }
})

const baseQuerywithReauth = async (args , api , extraOptions) => {
    let result = await baseQuery(args , api , extraOptions)
    if (result?.error?.status === 403){
        const refreshResult = await baseQuery('/auth/refresh' , api , extraOptions)

        if(refreshResult?.data) {
            api.dispatch(setCredentials({ ...refreshResult.data}))
            result = await baseQuery(args , api , extraOptions)
        }else{
            if(refreshResult?.errpr?.status === 403){
                refreshResult.error.data.message = "Login has expired"
            }
            return refreshResult
        }
    }
    return result
}
export const apiSlice = createApi({
    baseQuery : baseQuerywithReauth,
    tagTypes: ['Note' , 'User'],
    endpoints : builder => ({})
})
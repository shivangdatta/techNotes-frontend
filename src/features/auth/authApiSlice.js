import { apiSlice } from "../../app/api/apiSlice";
import { logOut, setCredentials } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        sendLogout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
                responseHandler: (response) => {
                    // Custom response handler for 204 No Content
                    if (response.status === 204) {
                        return {};
                    }
                    return response.json();
                }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    console.log('Logout query successful');
                    dispatch(logOut());
                    setTimeout(()=> {
                        dispatch(apiSlice.util.resetApiState());
                    } , 1000)
                } catch (err) {
                    console.error('Logout query failed:', err);
                }
            }
        }),
        refresh: builder.mutation({
            query: () => ({
                url: '/auth/refresh',
                method: 'GET',
            }),
            async onQueryStarted(arg , {dispatch , queryFulfilled}) {
                try{
                    const {data} = await queryFulfilled
                    console.log(data)
                    const {accessToken} = data
                    dispatch(setCredentials({accessToken}))
                }
                catch(err){
                    console.log(err)
                }
            }
        }),
    })
});

export const {
    useLoginMutation,
    useSendLogoutMutation,
    useRefreshMutation,
} = authApiSlice;

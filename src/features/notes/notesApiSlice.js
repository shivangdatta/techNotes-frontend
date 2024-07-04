import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const notesAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
});

const initialState = notesAdapter.getInitialState();

export const notesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getNotes: builder.query({
            query: () => '/notes/',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError;
            },
            transformResponse: responseData => {
                const loadedNotes = responseData.map(note => {
                    note.id = note._id;
                    return note;
                });
                return notesAdapter.setAll(initialState, loadedNotes);
            },
            providesTags: (result, err, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Note', id: 'List' },
                        ...result.ids.map(id => ({ type: 'Note', id }))
                    ];
                } else return [{ type: 'Note', id: 'LIST' }];
            }
        }),
        addNewNote : builder.mutation({
            query : initialNotesData => ({
                query : initialNotesData,
                url : '/notes',
                method : 'POST',
                body : {
                    ...initialNotesData
                }
            }),
            invalidatesTags : [
                {type : 'Note' , id : 'LIST'}
            ]
        }),
        updateNote : builder.mutation({
            query : initialNoteData => ({
                query : initialNoteData,
                url : '/notes/',
                method : 'PATCH',
                body : {
                    ...initialNoteData
                } 
            }),
            invalidatesTags : (result , error , args) => [
                {type : 'Note' , id : args.id}
            ]
        }),
        deleteNote : builder.mutation ({
            query : ({id}) => ({
                url : `/notes/`,
                method : 'DELETE',
                body : {id}
            }),
            invalidatesTags : (result , error , args) => [
                {type : 'Note' , id : args.id}
            ]
        })
    })
});

export const {
    useGetNotesQuery,
    useAddNewNoteMutation,
    useUpdateNoteMutation,
    useDeleteNoteMutation
} = notesApiSlice;

export const selectNotesResult = notesApiSlice.endpoints.getNotes.select();

const selectNotesData = createSelector(
    selectNotesResult,
    notesResult => notesResult?.data ?? initialState
);

export const {
    selectAll: selectAllNotes,
    selectById: selectNotesById,
    selectIds
} = notesAdapter.getSelectors(state => selectNotesData(state) ?? initialState);

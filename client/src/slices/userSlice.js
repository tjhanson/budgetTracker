import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import AuthService from "../services/auth.service";


const usersSlice = createSlice({
    name: 'users',
    initialState: {
        token: localStorage.getItem('token'),
        isAuthenticated:null,
        isLoading: false,
        user:null,
    },
    reducers:{
        userLoading: (state) => {
            state.isLoading = true
        },
        userLoaded: (state,{payload}) => {
            state.isAuthenticated = true
            state.isLoading = false
            state.user = payload
        },
        userLogin: (state,{payload}) => {
            localStorage.setItem('token', payload.accessToken)
            state.isAuthenticated = true
            state.isLoading = false
            state.user = {username: payload.username,roles: payload.roles,_id: payload._id}
        },
        userLogout: (state,{payload}) => {
            localStorage.removeItem('token')
            state.isAuthenticated = false
            state.isLoading = false
            state.user = null
            state.token = null
        },


    },
})




export default usersSlice.reducer

export const { userLogin,userLoaded,userLoading,userLogout } = usersSlice.actions


export const loginUser = (username,password) =>(dispatch) => {
    return AuthService.login(username, password).then(
        (response) => {
        dispatch(userLogin(response));
        return Promise.resolve()
        },
        (error) =>{
        console.log(error.response)
        return Promise.reject();
        });
    }
    export const registerUser = (username,password,projects) =>(dispatch) => {
        return AuthService.register(username, password,projects).then(
            (response) => {
            
            return Promise.resolve()
            },
            (error) =>{
            console.log(error.response)
            return Promise.reject();
            });
        }



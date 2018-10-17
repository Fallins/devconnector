import axios from 'axios'
import jwt_decode from 'jwt-decode'
import * as types from './types'

import setAuthToken from '../utils/setAuthToken'

import { clearCurrentProfile } from './profileActions'

// Register User
export const registeruser = (userData, history) => dispatch => {
    axios.post('/api/users/register', userData)
        .then(res => history.push('/login'))
        .catch(err => {
            console.log(err)
            dispatch({
                type: types.GET_ERRORS,
                payload: err.response.data
            })            
            
        })    
}

// Login - Get User Token
export const loginUser = userData => dispatch => {
    axios.post('/api/users/login', userData)
        .then(res => {
            // Save to localStorage
            const { token } = res.data

            // Set token to ls
            localStorage.setItem('jwtToken', token)

            // Set token to Auth header
            setAuthToken(token)

            // Decode token to get user data
            const decoded = jwt_decode(token)

            //Set currnet user
            dispatch(setCurrentUser(decoded))
        })
        .catch(err => {
            dispatch({
                type: types.GET_ERRORS,
                payload: err.response.data
            })            
            console.log(err.response.data)
        })  
}

// Set logged in user
export const setCurrentUser = decoded => ({
    type: types.SET_CURRENT_USER,
    payload: decoded
})

// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem('jwtToken')

    // Remove auth header for future requests(see utils/setAuthToken)
    setAuthToken(false)

    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}))

    // Clear user profile if had
    dispatch(clearCurrentProfile())
}
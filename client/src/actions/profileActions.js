import axios from 'axios'
import * as types from './types'

// Get current profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading())
    axios.get('/api/profile')
        .then(res => 
            dispatch({
                type: types.GET_PROFILE,
                payload: res.data
            })
        )
        .catch(err => {
            console.log(err)
            dispatch({
                type: types.GET_PROFILE,
                payload: {}
            })
        })
}

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
    axios.post('/api/profile', profileData)
        .then(res => history.push('/dashboard'))
        .catch(err => {
            console.log(err)
            dispatch({
                type: types.GET_ERRORS,
                payload: err.response.data
            })
        })
}

// Delete Account & profile
export const deleteAccount = () => dispatch => {
    if(window.confirm('Are you sure? This can NOT be undone!'))
        axios.delete('/api/profile')
            .then(res => (
                dispatch({
                    type: types.SET_CURRENT_USER,
                    payload: {}
                })
            ))
            .then(res => (
                dispatch({
                    type: types.CLEAR_CURRENT_PROFILE
                })
            ))
            .catch(err => {
                console.log(err)
                dispatch({
                    type: types.GET_ERRORS,
                    payload: err.response.data
                })
            })
}

// Add experience
export const addExperience = (expData, history) => dispatch => {
    axios.post('/api/profile/experience', expData)
        .then(res => history.push('/dashboard'))
        .catch(err => {
            console.log(err)
            dispatch({
                type: types.GET_ERRORS,
                payload: err.response.data
            })
        })
}

// Delete experience
export const deleteExperience = id => dispatch => {
    axios.delete(`/api/profile/experience/${id}`)
        .then(res => (
            dispatch({
                type: types.GET_PROFILE,
                payload: res.data
            })
        ))
        .catch(err => {
            console.log(err)
            dispatch({
                type: types.GET_ERRORS,
                payload: err.response.data
            })
        })
}

// Add education
export const addEducation = (eduData, history) => dispatch => {
    axios.post('/api/profile/education', eduData)
        .then(res => history.push('/dashboard'))
        .catch(err => {
            console.log(err)
            dispatch({
                type: types.GET_ERRORS,
                payload: err.response.data
            })
        })
}

// Delete education
export const deleteEducation = id => dispatch => {
    return axios.delete(`/api/profile/education/${id}`)
        .then(res => (
            dispatch({
                type: types.GET_PROFILE,
                payload: res.data
            })
        ))
        .catch(err => {
            console.log(err)
            dispatch({
                type: types.GET_ERRORS,
                payload: err.response.data
            })
        })
}

// Profile loading
export const setProfileLoading = () => {
    return {
        type: types.PROFILE_LOADING
    }
}

// Clear profile
export const clearCurrentProfile = () => ({
    type: types.CLEAR_CURRENT_PROFILE
})
import axios from 'axios'

import * as types from './types'

// Add Post
export const addPost = postData => dispatch => {
    dispatch(clearErrors())
    return axios.post('/api/posts', postData)
        .then(res => 
            dispatch({
                type: types.ADD_POST,
                payload: res.data
            })
        )
        .catch(err => {
            console.log(err)
            dispatch({
                type: types.GET_ERRORS,
                payload: err.response.data
            })            
            
        })
}

// Get Posts
export const getPosts = () => dispatch => {
    dispatch(setPostLoading())
    return axios.get('/api/posts')
        .then(res => 
            dispatch({
                type: types.GET_POSTS,
                payload: res.data
            })
        )
        .catch(err => {
            console.log(err)
            dispatch({
                type: types.GET_POSTS,
                payload: null
            })            
            
        })
}

// Delete Post
export const deletePost = id => dispatch => {
    return axios.delete(`/api/posts/${id}`)
        .then(res => 
            dispatch({
                type: types.DELETE_POST,
                payload: id
            })
        )
        .catch(err => {
            console.log(err)
            dispatch({
                type: types.GET_ERRORS,
                payload: err.response.data
            })
        })
}

// Add Like
export const addLike = id => dispatch => {
    return axios.post(`/api/posts/like/${id}`)
        .then(res => dispatch(getPosts()))
        .catch(err => {
            console.log(err)
            dispatch({
                type: types.GET_ERRORS,
                payload: err.response.data
            })
        })
}

// Remove Like
export const removeLike = id => dispatch => {
    return axios.post(`/api/posts/unlike/${id}`)
        .then(res => dispatch(getPosts()))
        .catch(err => {
            console.log(err)
            dispatch({
                type: types.GET_ERRORS,
                payload: err.response.data
            })
        })
}

// Get Post
export const getPost = id => dispatch => {
    dispatch(setPostLoading())
    return axios.get(`/api/posts/${id}`)
        .then(res => 
            dispatch({
                type: types.GET_POST,
                payload: res.data
            })
        )
        .catch(err => {
            console.log(err)
            dispatch({
                type: types.GET_POST,
                payload: null
            })            
            
        })
}

// Add Comment
export const addComment = (postId, commentData) => dispatch => {
    dispatch(clearErrors())
    return axios.post(`/api/posts/comment/${postId}`, commentData)
        .then(res => 
            dispatch({
                type: types.GET_POST,
                payload: res.data
            })
        )
        .catch(err => {
            console.log(err)
            dispatch({
                type: types.GET_ERRORS,
                payload: err.response.data
            })            
            
        })
}

// Delete Comment
export const deleteComment = (postId, commentId) => dispatch => {
    return axios.delete(`/api/posts/comment/${postId}/${commentId}`)
        .then(res => 
            dispatch({
                type: types.GET_POST,
                payload: res.data
            })
        )
        .catch(err => {
            console.log(err)
            dispatch({
                type: types.GET_ERRORS,
                payload: err.response.data
            })            
            
        })
}

// Set Loading State
export const setPostLoading = () => ({
    type: types.POST_LOADING
})

// Clear Errors
export const clearErrors = () => ({
    type: types.CLEAR_ERRORS
})
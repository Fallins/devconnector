import * as types from '../actions/types'

const initState = {
    posts: [],
    post: {},
    loading: false
}

export default (state = initState, action) => {
    switch(action.type) {
        case types.ADD_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            }
        case types.GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            }
        case types.DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload)
            } 
        case types.GET_POST:
            return {
                ...state,
                post: action.payload,
                loading: false
            }
        case types.POST_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state
    }
}
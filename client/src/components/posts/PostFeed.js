import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PostItem from './PostItems'

class PostFeed extends Component {
    render() {
        const { posts } = this.props

        return posts ? posts.map(post => <PostItem key={post._id} post={post}/>) : null
    }
}

PostFeed.propTypes = {
    posts: PropTypes.object.isRequired,
}

export default PostFeed
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import PostItem from '../posts/PostItems'
import Spinner from '../common/Spinner'
import CommentForm from './CommentForm'
import CommentFeed from './CommentFeed'
import { getPost } from '../../actions/postActions'
import { Link } from 'react-router-dom'

class Post extends Component {
    componentDidMount() {
        const { getPost, match: { params: {id}}} = this.props
        getPost(id)
    }

    render() {
        const { post, loading } = this.props.post
        let postContent

        if(post === null || loading || Object.keys(post).length === 0) {
            postContent = <Spinner />
        } else {
            postContent = (
                <div>
                    <PostItem post={post} showActions={false}/>
                    <CommentForm postId={post._id}/>
                    <CommentFeed postId={post._id} comments={post.comments}/>
                </div>
            )
            
        }
        return (
            <div className="post">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Link to="/feed" className="btn btn-light mb-3">
                                Back To Feed
                            </Link>
                            {postContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Post.propTypes = {
    post: PropTypes.object.isRequired,
    getPost: PropTypes.func.isRequired,
}

const mapS2P = state => ({
    post: state.post
})

export default connect(mapS2P, { getPost })(Post)
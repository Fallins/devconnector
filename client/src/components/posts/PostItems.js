import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import { deletePost, addLike, removeLike } from '../../actions/postActions'

class PostItems extends Component {
    onDeleteClick = () => {
        const { post: { _id }, deletePost } = this.props

        deletePost(_id)
    }

    onLikeClick = () => {
        const { post: { _id }, addLike } = this.props

        addLike(_id)
    }
    
    onUnLikeClick = () => {
        const { post: { _id }, removeLike } = this.props

        removeLike(_id)
    }

    findUserLike = (likes) => {
        const { auth } = this.props

        if(likes.some(like => like.user === auth.user.id)) {
            return true
        }

        return false
    }
    
    render() {
        const { post, auth, showActions } = this.props

        return (
            <div className="card card-body mb-3">
                <div className="row">
                    <div className="col-md-2">
                        <a href="profile.html">
                            <img className="rounded-circle d-none d-md-block"
                                src={post.avatar}
                                alt="avatar" />
                        </a>
                        <br />
                        <p className="text-center">{post.name}</p>
                    </div>
                    <div className="col-md-10">
                        <p className="lead">{post.text}</p>    
                        {
                            showActions && (
                                <span>               
                                    <button 
                                        onClick={this.onLikeClick}
                                        type="button"
                                        className="btn btn-light mr-1">
                                            <i className={classnames('fas fa-thumbs-up', {
                                                'text-info': this.findUserLike(post.likes),
                                            })}></i>
                                            <span className="badge badge-light">{post.likes.length}</span>
                                    </button>
                                    <button 
                                        onClick={this.onUnLikeClick}
                                        type="button"
                                        className="btn btn-light mr-1">
                                            <i className="text-secondary fas fa-thumbs-down"></i>
                                    </button>
                                    <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                                        Comments
                                    </Link>
                                    { post.user === auth.user.id ? (
                                        <button onClick={this.onDeleteClick} type="button" className="btn btn-danger mr-1">
                                            <i className="fas fa-times" />                            
                                        </button>) : null
                                    }
                                </span>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}
PostItems.defaultProps = {
    showActions: true
}

PostItems.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    showActions: PropTypes.bool
}

const mapS2P = state => ({
    auth: state.auth
})

export default connect(mapS2P, { deletePost, addLike, removeLike })(PostItems)
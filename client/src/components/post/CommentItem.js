import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteComment } from '../../actions/postActions'

class CommentItem extends Component {
    onDeleteClick = () => {
        const { comment: { _id }, deleteComment, postId } = this.props

        deleteComment(postId, _id)
    }

    render() {
        const { comment, postId, auth } = this.props
        
        return (
            <div className="card card-body mb-3">
                <div className="row">
                    <div className="col-md-2">
                        <a href="profile.html">
                            <img 
                                className="rounded-circle d-none d-md-block" 
                                src={comment.avatar} 
                                alt="avatar" />
                        </a>
                        <br />
                        <p className="text-center">{comment.name}</p>
                    </div>
                    <div className="col-md-10">
                        <p className="lead">{comment.text}</p>
                        { comment.user === auth.user.id ? (
                            <button onClick={this.onDeleteClick} type="button" className="btn btn-danger mr-1">
                                <i className="fas fa-times" />                            
                            </button>) : null
                        }
                    </div>
                </div>
            </div>
        )
    }
}

CommentItem.propTypes = {
    deleteComment: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
    comment: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
}

const mapS2P = state => ({
    auth: state.auth
})

export default connect(mapS2P, { deleteComment })(CommentItem)
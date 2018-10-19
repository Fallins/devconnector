import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import { addComment } from '../../actions/postActions'

class CommentForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            text: '',
            errors: {}
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.errors && nextProps.errors !== prevState.errors) {
            return {
                ...prevState,
                errors: nextProps.errors
            }
        }
        
        return null
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = (e) => {
        e.preventDefault()
        
        const { auth: { user }, postId, addComment } = this.props

        const newComment = {
            text: this.state.text,
            name: user.name,
            avatar: user.avatar
        }
        addComment(postId, newComment)
        this.setState({text: ''})
    }

    render() {
        const { text, errors } = this.state

        return (
            <div className="post-form mb-3">
                <div className="card card-info">
                    <div className="card-header bg-info text-white">
                        Make a comment...
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <TextAreaFieldGroup 
                                    className="form-control form-control-lg" 
                                    placeholder="Reply to post"
                                    name="text"
                                    value={text}
                                    onChange={this.onChange}
                                    error={errors.text} />
                            </div>
                            <button type="submit" className="btn btn-dark">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

CommentForm.propTypes = {
    auth: PropTypes.object.isRequired,
    addComment: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired,
}

const mapS2P = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapS2P, { addComment })(CommentForm)
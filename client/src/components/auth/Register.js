import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import TextFieldGroup from '../common/TextFieldGroup'
import { connect } from 'react-redux'
import { registeruser } from '../../actions/authActions'

class Register extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        }
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = (e) => {
        e.preventDefault()
        const { name, email, password, password2 } = this.state

        this.props.handleRegister({
            name, email, password, password2
        }, this.props.history)
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard')
        }
    }
    
    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.errors !== prevState.errors) {
            return {
                ...prevState,
                errors: nextProps.errors
            }
        }

        return null
    }

    render() {
        const { name, email, password, password2, errors } = this.state

        return (
            <div className="register">
                <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Sign Up</h1>
                        <p className="lead text-center">Create your DevConnector account</p>
                        <form onSubmit={this.onSubmit}>
                            <TextFieldGroup
                                type="text"
                                placeholder="Name"
                                name="name"
                                value={name}
                                onChange={this.onChange}
                                error={errors.name} />
                            <TextFieldGroup
                                type="email"
                                placeholder="Email Address"
                                name="email"
                                value={email}
                                onChange={this.onChange}
                                error={errors.email} 
                                info="This site uses Gravatar so if you want a profile image, use a Gravatar email"/>
                            <TextFieldGroup
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={password}
                                onChange={this.onChange}
                                error={errors.password} />
                            <TextFieldGroup
                                type="password"
                                placeholder="Confirm Password"
                                name="password2"
                                value={password2}
                                onChange={this.onChange}
                                error={errors.password2} />
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                        </form>
                    </div>
                </div>
                </div>
            </div>
        )
  }
}

Register.propTypes = {
    handleRegister: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
}

const mapS2P = (state) => ({
    auth: state.auth,
    errors: state.errors
})

const mapD2P = (dispatch) => {
    return {
        handleRegister: (userData, history) => dispatch(registeruser(userData, history)),
    }
}

export default connect(mapS2P, mapD2P)(withRouter(Register))
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextFieldGroup from '../common/TextFieldGroup'
import { loginUser } from '../../actions/authActions'

class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = (e) => {
        e.preventDefault()
        const { email, password } = this.state

        this.props.handleLogin({ email, password })
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard')
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.auth.isAuthenticated) {
            nextProps.history.push('/dashboard')
        }

        if(nextProps.errors !== prevState.errors) {
            return {
                ...prevState,
                errors: nextProps.errors
            }
        }

        return null
    }

    render() {
        const { email, password, errors } = this.state
        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <p className="lead text-center">Sign in to your DevConnector account</p>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    type="email"
                                    placeholder="Email Address"
                                    name="email"
                                    value={email}
                                    onChange={this.onChange}
                                    error={errors.email} />
                                <TextFieldGroup
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={password}
                                    onChange={this.onChange}
                                    error={errors.password} />
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
}

const mapS2P = state => ({
    auth: state.auth,
    errors: state.errors
})

const mapD2P = dispatch => ({
    handleLogin: (loginData) => dispatch(loginUser(loginData))
})

export default connect(mapS2P, mapD2P)(Login)
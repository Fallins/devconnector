import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'

class Navbar extends Component {
  constructor(props) {
    super(props)
  }

  handleLogout = () => {
    const { handleLogout } = this.props
    window.location.href = '/'
    handleLogout()
  }

  render() {
    const { isAuthenticated, user } = this.props.auth

    const AuthLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a href="#" className="nav-link" onClick={this.handleLogout}>
            <img src={user.avatar} style={{width: '25px', marginRight: '5px'}} alt={user.name} title="You must have a Gravatar connected to your email to display an image" />
            Logout
          </a>
        </li>        
      </ul>
    )

    const GuestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">Sign Up</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
      </ul>
    )

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">DevConnector</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">Developers</Link>
              </li>
            </ul>

            { isAuthenticated ? AuthLinks : GuestLinks }
          </div>
        </div>
      </nav>
    )
  }
}

Navbar.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapS2P = state => ({
  auth: state.auth
})

const mapD2P = dispatch => ({
  handleLogout: () => dispatch(logoutUser())
})


export default connect(mapS2P, mapD2P)(Navbar)
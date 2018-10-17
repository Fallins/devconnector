import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions'
import Spinner from '../common/Spinner'
import ProfileActions from './profileActions'
import Experience from './Experience'
import Education from './Education'

class Dashboard extends Component {
    componentDidMount() {
        this.props.getProfile()
    }

    onDeleteClick = (e) => {
        const { handleDelete } = this.props
        
        handleDelete()
    }

    render() {
        const { auth: { user }, profile: { profile, loading } } = this.props
        let dashboardContent

        if(profile === null || loading) 
            dashboardContent = <Spinner />
        else {
            // Check if logged in user has profile data
            if(Object.keys(profile).length > 0) {
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">
                            Welcome <Link to={`/profile/${profile.handle}`}>{ user.name }</Link>
                        </p>
                        <ProfileActions />
                        <Experience exp={profile.experience}/>
                        <Education edu={profile.education}/>
                        <div style={{ marginBottom: '60px'}} />
                        <button
                            onClick={this.onDeleteClick}
                            className="btn btn-danger">
                                Delete Account
                        </button>
                    </div>
                )
            } else {
                // User is logged in but has no profile
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">Welcome { user.name }</p>
                        <p>You have not yet setup a profile, please add some info</p>
                        <Link to='/create-profile' className='btn btn-lg btn-info'>
                            Create Profile
                        </Link>
                    </div>
                )
            }
        }
        return (
            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4">Dashboard</h1>
                            {dashboardContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    getProfile: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapS2P = state => ({
    profile: state.profile,
    auth: state.auth
})

const mapD2P = dispatch => ({
    getProfile: () => dispatch(getCurrentProfile()),
    handleDelete: () => dispatch(deleteAccount())
})
    

export default connect(mapS2P, mapD2P)(Dashboard)
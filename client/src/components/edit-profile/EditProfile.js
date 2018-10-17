import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import TextFieldGroup from '../common/TextFieldGroup'
import InputGroup from '../common/InputGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import SelectListGroup from '../common/SelectListGroup'
import { createProfile, getCurrentProfile } from '../../actions/profileActions'
import isEmpty from '../../validation/is-empty'

class EditProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            displaySocialInputs: false,
            handle: '',
            company: '',
            website: '',
            location: '',
            status: '',
            skills: '',
            githubusername: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            errors: {},
            profile: {}
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log("getDerivedStateFromProps")
        console.log({nextProps, prevState})
        let needUpdate = false
        const newState = {}

        if(nextProps.errors && nextProps.errors !== prevState.errors) {
            newState.errors = nextProps.errors
            needUpdate = true
        }

        if(nextProps.profile.profile && nextProps.profile !== prevState.profile) {
            
            const { profile } = nextProps.profile
            // use for check need update
            newState.profile = nextProps.profile

            // Bring skills array back to CSV
            const skillsCSV = profile.skills.join(',')
            newState.skills = skillsCSV

            // If profile field does not exist, make empty string
            newState.handle = !isEmpty(profile.handle) ? profile.handle : ''
            newState.company = !isEmpty(profile.company) ? profile.company : ''
            newState.website = !isEmpty(profile.website) ? profile.website : ''
            newState.location = !isEmpty(profile.location) ? profile.location : ''
            newState.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : ''
            newState.bio = !isEmpty(profile.bio) ? profile.bio : ''
            newState.status = !isEmpty(profile.status) ? profile.status : ''

            newState.social = !isEmpty(profile.social) ? profile.social : {}
            newState.twitter = !isEmpty(newState.social.twitter) ? profile.social.twitter : ''
            newState.facebook = !isEmpty(newState.social.facebook) ? profile.social.facebook : ''
            newState.linkedin = !isEmpty(newState.social.linkedin) ? profile.social.linkedin : ''
            newState.youtube = !isEmpty(newState.social.youtube) ? profile.social.youtube : ''
            newState.instagram = !isEmpty(newState.social.instagram) ? profile.social.instagram : ''
            
            needUpdate = true
        }
        
        return needUpdate ? {...prevState, ...newState} : null
    }

    componentDidMount() {
        const { getCurrentProfile } = this.props
        getCurrentProfile()
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = (e) => {
        e.preventDefault()
        const { 
            handle, company, website, location, status, skills, githubusername,
            bio, twitter, facebook, linkedin, youtube, instagram } = this.state
        const profileData = {
            handle, company, website, location, status, skills, githubusername,
            bio, twitter, facebook, linkedin, youtube, instagram
        }
        this.props.handleProfile(profileData, this.props.history)
    }

    render() {
        const { handle, status, company, website, location, 
            skills, githubusername, bio, displaySocialInputs, 
            errors, twitter, facebook, linkedin, youtube, instagram } = this.state

        let socialInputs

        if(displaySocialInputs) {
            socialInputs = (
                <div>
                    <InputGroup 
                        placeholder="Twitter Profile URL"
                        name="twitter" 
                        icon="fab fa-twitter"
                        value={twitter}
                        onChange={this.onChange}
                        error={errors.twitter} />

                    <InputGroup 
                        placeholder="Facebook Page URL"
                        name="facebook" 
                        icon="fab fa-facebook"
                        value={facebook}
                        onChange={this.onChange}
                        error={errors.facebook} />

                    <InputGroup 
                        placeholder="Linkedin Profile URL"
                        name="linkedin" 
                        icon="fab fa-linkedin"
                        value={linkedin}
                        onChange={this.onChange}
                        error={errors.linkedin} />

                    <InputGroup 
                        placeholder="Youtube Channel URL"
                        name="youtube" 
                        icon="fab fa-youtube"
                        value={youtube}
                        onChange={this.onChange}
                        error={errors.youtube} />

                    <InputGroup 
                        placeholder="Instagram Profile URL"
                        name="instagram" 
                        icon="fab fa-instagram"
                        value={instagram}
                        onChange={this.onChange}
                        error={errors.instagram} />
                </div>
            )
        }

        // Select options for status
        const options = [
            { label: '* Select Professional Status', value: 0},
            { label: 'Developer', value: 'Developer'},
            { label: 'Junior Developer', value: 'Junior Developer'},
            { label: 'Senior Developer', value: 'Senior Developer'},
            { label: 'Manager', value: 'Manager'},
            { label: 'Student or Learning', value: 'Student or Learning'},
            { label: 'Instructor or Teacher', value: 'Instructor or Teacher'},
            { label: 'Intern', value: 'Intern'},
            { label: 'Other', value: 'Other'},
        ]
        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">Go Back</Link>
                            <h1 className="display-4 text-center">Edit Your Profile</h1>
                            <small className="d-block pb-3">* = required fields</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup 
                                    placeholder="* Profile Handle"
                                    name="handle"
                                    value={handle}
                                    onChange={this.onChange} 
                                    error={errors.handle}
                                    info="A unique handle for your profile URL. Your full name, company name, nickname" />
                                <SelectListGroup 
                                    placeholder="Status"
                                    name="status"
                                    value={status}
                                    onChange={this.onChange} 
                                    error={errors.status}
                                    options={options}
                                    info="Give us an idea of where you are at in your career" />
                                <TextFieldGroup 
                                    placeholder="Company"
                                    name="company"
                                    value={company}
                                    onChange={this.onChange} 
                                    error={errors.company}
                                    info="Could be your own company or one you work for" />
                                <TextFieldGroup 
                                    placeholder="Website"
                                    name="website"
                                    value={website}
                                    onChange={this.onChange} 
                                    error={errors.website}
                                    info="Could be your own website or a company one" />
                                <TextFieldGroup 
                                    placeholder="Location"
                                    name="location"
                                    value={location}
                                    onChange={this.onChange} 
                                    error={errors.location}
                                    info="City or city & state suggested (eg. Boston, MA)" />
                                <TextFieldGroup 
                                    placeholder="* Skills"
                                    name="skills"
                                    value={skills}
                                    onChange={this.onChange} 
                                    error={errors.skills}
                                    info="Please use comma separated values (eg. HTML,CSS,JavaScript,Node)" />
                                <TextFieldGroup 
                                    placeholder="Github Username"
                                    name="githubusername"
                                    value={githubusername}
                                    onChange={this.onChange} 
                                    error={errors.githubusername}
                                    info="If you want your latest repos and a Github link, include your username" />
                                <TextAreaFieldGroup 
                                    placeholder="Short Bio"
                                    name="bio"
                                    value={bio}
                                    onChange={this.onChange} 
                                    error={errors.bio}
                                    info="Tell us a little about yourself" />

                                <div className="mb-3">
                                    <button 
                                        type="button"
                                        className="btn btn-light"
                                        onClick={() => {
                                            this.setState(prev => ({
                                                displaySocialInputs: !prev.displaySocialInputs
                                            }))
                                        }}>
                                        Add Social Network Links
                                    </button>
                                    <span className="text-muted">Optional</span>
                                </div>
                                {socialInputs}
                                <input className="btn btn-info btn-block mt-4" type="submit" value="Submit" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

EditProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    handleProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
}


const mapS2P = state => ({
    profile: state.profile,
    errors: state.errors
})

const mapD2P = dispatch => ({
    handleProfile: (data, history) => dispatch(createProfile(data, history)),
    getCurrentProfile: () => dispatch(getCurrentProfile())
})

export default connect(mapS2P, mapD2P)(EditProfile)
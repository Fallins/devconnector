import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import TextFieldGroup from '../common/TextFieldGroup'
import InputGroup from '../common/InputGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import SelectListGroup from '../common/SelectListGroup'
import { createProfile } from '../../actions/profileActions'

class CreateProfile extends Component {
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
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.errors) {
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
                            <h1 className="display-4 text-center">Create Your Profile</h1>
                            <p className="lead text-center">
                                Let's get some information to make your profile stand out
                            </p>
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

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    handleProfile: PropTypes.func.isRequired,
}


const mapS2P = state => ({
    profile: state.profile,
    errors: state.errors
})

const mapD2P = dispatch => ({
    handleProfile: (data, history) => dispatch(createProfile(data, history))
})

export default connect(mapS2P, mapD2P)(CreateProfile)
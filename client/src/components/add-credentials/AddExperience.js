import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import { addExperience } from '../../actions/profileActions'

class AddExperience extends Component {
    constructor(props) {
        super(props)

        this.state = {
            company: '',
            title: '',
            location: '',
            from: '',
            to: '',
            current: false,
            description: '',
            errors: {},
            disabled: false,
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
        const {  company, title, location, from, to, description, current } = this.state
        const expData = {
            company, title, location, from, to, description, current
        }
        this.props.handleExperience(expData, this.props.history)
    }

    onCheck = (e) => {
        this.setState(prevState => ({
            current: !prevState.current,
            disabled: !prevState.disabled
        }))
    }

    render() {
        const { company, title, location, from, to, description, disabled, current, errors } = this.state

        return (
            <div className="add-experience">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">Go Back</Link>
                            <h1 className="display-4 text-center">Add Experience</h1>
                            <p className="lead text-center">Add and job or position that you have had in the past or current</p>
                            <small className="d-block pb-3">* = required field</small>

                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup 
                                    placeholder="Company"
                                    name="company"
                                    value={company}
                                    onChange={this.onChange} 
                                    error={errors.company} />
                                <TextFieldGroup 
                                    placeholder="* Job Title"
                                    name="title"
                                    value={title}
                                    onChange={this.onChange} 
                                    error={errors.title} />
                                <TextFieldGroup 
                                    placeholder="Location"
                                    name="location"
                                    value={location}
                                    onChange={this.onChange} 
                                    error={errors.location} />

                                <h6>From Date</h6>
                                <TextFieldGroup 
                                    type="date"
                                    placeholder="from"
                                    name="from"
                                    value={from}
                                    onChange={this.onChange} 
                                    error={errors.from} />
                                
                                <h6>To Date</h6>
                                <TextFieldGroup 
                                    type="date"
                                    placeholder="to"
                                    name="to"
                                    value={to}
                                    onChange={this.onChange} 
                                    error={errors.to}
                                    disable={disabled ? 'disabled' : ''}/>

                                <div className="form-check mb-4">
                                    <input 
                                        id="current"
                                        className="form-check-input"
                                        type="checkbox" 
                                        name="current" 
                                        value={current} 
                                        checked={current}
                                        onChange={this.onCheck}/>
                                    <label htmlFor="current" className="form-check-label">Currnet Job</label>
                                </div>

                                <TextAreaFieldGroup                                     
                                    placeholder="Job Description"
                                    name="description"
                                    value={description}
                                    onChange={this.onChange} 
                                    error={errors.description}
                                    info="Tell us about the position"/>

                                <input type="submit" value="Submit" className="btn btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

AddExperience.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    handleExperience: PropTypes.func.isRequired,
}

const mapS2P = state => ({
    profile: state.profile,
    errors: state.errors,    
})

const mapD2P = dispatch => ({
    handleExperience: (experience, history) => dispatch(addExperience(experience, history))
})

export default connect(mapS2P, mapD2P)(AddExperience)
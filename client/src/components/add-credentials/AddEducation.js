import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import { addEducation } from '../../actions/profileActions'

class AddEducation extends Component {
    constructor(props) {
        super(props)

        this.state = {
            school: '',
            degree: '',
            fieldofstudy: '',
            fieldofstudy: '',
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
        const {  school, degree, fieldofstudy, from, to, description, current } = this.state
        const eduData = {
            school, degree, fieldofstudy, from, to, description, current
        }
        this.props.handleEducation(eduData, this.props.history)
    }

    onCheck = (e) => {
        this.setState(prevState => ({
            current: !prevState.current,
            disabled: !prevState.disabled
        }))
    }

    render() {
        const { school, degree, fieldofstudy, from, to, description, disabled, current, errors } = this.state

        return (
            <div className="add-education">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">Go Back</Link>
                            <h1 className="display-4 text-center">Add Education</h1>
                            <p className="lead text-center">Add any school, bootcamp, etc that you have attended</p>
                            <small className="d-block pb-3">* = required field</small>

                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup 
                                    placeholder="* School"
                                    name="school"
                                    value={school}
                                    onChange={this.onChange} 
                                    error={errors.school} />
                                <TextFieldGroup 
                                    placeholder="* Degree or Certification"
                                    name="degree"
                                    value={degree}
                                    onChange={this.onChange} 
                                    error={errors.degree} />
                                <TextFieldGroup 
                                    placeholder="* Field Of Study"
                                    name="fieldofstudy"
                                    value={fieldofstudy}
                                    onChange={this.onChange} 
                                    error={errors.fieldofstudy} />

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
                                    placeholder="Program Description"
                                    name="description"
                                    value={description}
                                    onChange={this.onChange} 
                                    error={errors.description}
                                    info="Tell us about the program that you were in"/>

                                <input type="submit" value="Submit" className="btn btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

AddEducation.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    handleEducation: PropTypes.func.isRequired,
}

const mapS2P = state => ({
    profile: state.profile,
    errors: state.errors,    
})

const mapD2P = dispatch => ({
    handleEducation: (education, history) => dispatch(addEducation(education, history))
})

export default connect(mapS2P, mapD2P)(AddEducation)
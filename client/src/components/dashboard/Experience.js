import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { deleteExperience } from '../../actions/profileActions'

class Experience extends Component {

    onDeleteClick = id => {
        const { deleteExperience } = this.props

        deleteExperience(id)
    }

    render() {
        const { exp } = this.props
        const experience = exp.map(data => (
            <tr key={data._id}>
                <td>{data.company}</td>
                <td>{data.title}</td>
                <td>
                    <Moment format="YYYY/MM/DD">{data.from}</Moment>
                    {` - `}
                    {
                        data.to ? <Moment format="YYYY/MM/DD"></Moment> : "Now"
                    }
                    
                </td>
                <td>
                    <button className="btn btn-danger" onClick={this.onDeleteClick.bind(this, data._id)}>Delete</button>
                </td>
            </tr>
        ))

        return (
            <div>
                <h4 className="mb-4">Experience Credentials</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Title</th>
                            <th>Years</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {experience}
                    </tbody>
                </table>
            </div>
        )
    }
}

Experience.propTypes = {
    deleteExperience: PropTypes.func.isRequired,
}

const mapS2P = state => ({})
// const mapD2P = dispatch => ({
//     deleteExperience: () => dispatch(deleteExperience())
// })
export default connect(mapS2P, {deleteExperience})(Experience)
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { deleteEducation } from '../../actions/profileActions'

class Education extends Component {

    onDeleteClick = id => {
        const { deleteEducation } = this.props

        deleteEducation(id)
    }

    render() {
        const { edu } = this.props
        const education = edu.map(data => (
            <tr key={data._id}>
                <td>{data.school}</td>
                <td>{data.degree}</td>
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
                <h4 className="mb-4">Education Credentials</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>School</th>
                            <th>Degree</th>
                            <th>Years</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {education}
                    </tbody>
                </table>
            </div>
        )
    }
}

Education.propTypes = {
    deleteEducation: PropTypes.func.isRequired,
}

const mapS2P = state => ({})
// const mapD2P = dispatch => ({
//     deleteEducation: () => dispatch(deleteEducation())
// })
export default connect(mapS2P, {deleteEducation})(Education)
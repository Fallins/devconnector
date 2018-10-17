import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

const SelectListGroup = ({
     name, value, error, info, onChange, options
 }) => {
    const selectOptions = options.map(opt => (
        <option key={opt.label} value={opt.value}>
            {opt.label}
        </option>
    ))

    return (
        <div className="form-group">
            <select     
                type="select"            
                className={classnames('form-control form-control-lg',{
                    'is-invalid': error
                })}                
                name={name}
                value={value}                
                onChange={onChange} >
                    {selectOptions}
            </select>
            { info &&
                <small className="form-text text-muted">{info}</small>}
            { error && 
                (<div className="invalid-feedback">{error}</div>)}
        </div>
    )
}

SelectListGroup.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,    
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
}

export default SelectListGroup
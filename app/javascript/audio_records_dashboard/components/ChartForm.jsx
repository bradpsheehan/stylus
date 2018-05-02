import React from 'react'
import { connect } from 'react-redux'
import { Field } from 'redux-form'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import FormSubmissionButton from './FormSubmissionButton'
import { mapStateToProps, mapDispatchToProps} from '../containers/AudioRecordsDashboard'

export const renderSelect = ({ input, options, label, meta: { touched, error, asyncValidating }, ...rest }) => (
  <div className="form-group">
    <div className='select'>
      <label>{label}</label>
      <select {...input} {...rest} className={touched && error ? 'form-control error' : 'form-control'}>
        {options.map((opt) => { return <option value={opt.key} key={opt.key}>{opt.name}</option> })}
      </select>
    </div>
    <div className='field-error'>{touched && error && <span>{error}</span>}</div>
  </div>
)

const ChartForm = ({ artistOptions, handleChartChange }) => (
  <div className="col-md-3">
    <div style={{float: 'right'}}>
      <form>
        <Field label="Select Artist For Chart" name='artist_id' component={renderSelect} options={artistOptions} id='artist-id' />
      </form>
    </div>
  </div>
)

ChartForm.propTypes = {
}

let reduxFormDetails = {
  form: 'chartForm',
  enableReinitialize: true
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm(reduxFormDetails)(ChartForm))

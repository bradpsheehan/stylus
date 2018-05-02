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

const renderField = ({ input, label, type, placeholder, id, maxLength, meta: { touched, error, asyncValidating } }) => (
  <div className="form-group">
    <label>{label}</label>
    <input {...input} placeholder={placeholder} type={type} id={id} maxLength={maxLength} className={touched && error ? 'form-control error' : 'form-control'} />
    <div className='field-error'>{touched && error && <span>{error}</span>}</div>
  </div>
)

const renderTextField = ({ input, label, type, placeholder, id, maxLength, meta: { touched, error, asyncValidating } }) => (
  <div className="form-group">
    <label>{label}</label>
    <textarea {...input} placeholder={placeholder} type={type} id={id} maxLength={maxLength} className={touched && error ? 'form-control error' : 'form-control'} />
    <div className='field-error'>{touched && error && <span>{error}</span>}</div>
  </div>
)

const AudioRecordForm = ({ submitHandler,
                           crudAction,
                           handleSubmit,
                           submitting,
                           error,
                           selectedAudioRecord,
                           artistOptions }) => (
  <div className="col-md-3 form-container">
    {crudAction === 'create' && <h2>Add an Album</h2>}
    {crudAction === 'update' && <h2>Edit "{selectedAudioRecord.title}"</h2>}
    <div>
      <form onSubmit={handleSubmit(submitHandler)}>
        {crudAction === 'update' && <Field name='id' component='input' type="hidden" />}
        <Field label="Artist" name='artist_id' component={renderSelect} options={artistOptions} id='artist-id' />
        <p>or create new artist</p>
        <Field label="Artist Name" name='artist_name' component={renderField} id='artist-name' />

        <hr/>

        <Field id='title' label="Album Title" name='title' component={renderField} required />
        <Field id='released-on' label="Released On" name='released_on' component={renderField} type="date" />
        <Field id='record-condition' label="Record Condition" name='record_condition' component={renderTextField} />

        {error && <SubmissionErrorMsg error={error} />}
        <div className='form-row'>
          <div className='form-col form-col--full txt-center'>
            <FormSubmissionButton submitting={submitting} crudAction={crudAction} />
          </div>
        </div>
      </form>
    </div>
  </div>
)

AudioRecordForm.propTypes = {
  submitHandler: PropTypes.func.isRequired,
  crudAction: PropTypes.string.isRequired,
  submitting: PropTypes.bool,
  selectedAudioRecord: PropTypes.object
}

let reduxFormDetails = {
  form: 'audioRecordForm',
  enableReinitialize: true
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm(reduxFormDetails)(AudioRecordForm))

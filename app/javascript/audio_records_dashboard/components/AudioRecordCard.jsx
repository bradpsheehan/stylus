import React from 'react'
import PropTypes from 'prop-types'

const AudioRecordCard = ({ audioRecord, handleDelete, handleUpdate, selectedAudioRecord }) => {
  return (
    <div className="audio-record-card-container col-sm-12 col-md-3">
      <div className={selectedAudioRecord.id === audioRecord.id ? 'card audio-record-card active' : 'card audio-record-card'}>
        <div className="card-body">
          <h4>{ audioRecord.title }</h4>
          <p>{ audioRecord.released_on }</p>
          <p>{ audioRecord.record_condition }</p>
        </div>

        <div className="card-footer">
          <div className="row">
            <div className="col-md-6">
              <i onClick={ handleDelete } className="fa fa-trash" aria-hidden="true" />
            </div>
            <div className="col-md-6">
              <i onClick={ handleUpdate } className="fa fa-pencil" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

AudioRecordCard.propTypes = {
  audioRecord: PropTypes.object.isRequired,
  selectedAudioRecord: PropTypes.object
}

export default AudioRecordCard

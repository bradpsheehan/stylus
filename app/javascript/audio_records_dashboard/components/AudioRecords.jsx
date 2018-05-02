import React from 'react'
import PropTypes from 'prop-types'
import AudioRecordCard from './AudioRecordCard'

const AudioRecords = ({ audioRecords, handleDelete, handleUpdate, selectedAudioRecord }) => {
  const audioRecordCards = audioRecords.map(
    (audioRecord) => <AudioRecordCard
      key={audioRecord.id}
      audioRecord={audioRecord}
      handleDelete={handleDelete(audioRecord)}
      handleUpdate={handleUpdate(audioRecord)}
      selectedAudioRecord={selectedAudioRecord} />)
  return (
    <div className="row">
      { audioRecordCards }
    </div>
  )
}

AudioRecords.propTypes = {
  audioRecords: PropTypes.array.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  selectedAudioRecord: PropTypes.object
}

export default AudioRecords

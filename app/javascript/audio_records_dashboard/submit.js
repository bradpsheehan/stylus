import { SubmissionError } from 'redux-form'
import axios from 'axios'

export function createAudioRecord (values) {
  return axios.post('/audio_records', { audio_record: values }).catch((error) => {
    const messages = Object.assign(
      error.response.data.errors,
      { '_error': 'Something has gone wrong when communicating with the server. please check the error log.' },
    )

    throw new SubmissionError(messages)
  })
}

export function updateAudioRecord (values) {
  return axios.patch('/audio_records/' + values.id, { audio_record: values }).catch((error) => {
    const messages = Object.assign(
      error.response.data.errors,
      { '_error': 'Something has gone wrong when communicating with the server. please check the error log.' },
    )

    throw new SubmissionError(messages)
  })
}

export function deleteAudioRecord (values) {
  return axios.delete('/audio_records/' + values.id, { audio_record: values }).catch((error) => {
    const messages = Object.assign(
      error.response.data.errors,
      { '_error': 'Something has gone wrong when communicating with the server. please check the error log.' },
    )

    throw new SubmissionError(messages)
  })
}

export function fetchArtistChartData (artistId) {
  return axios.get('/chart_data/' + artistId).catch((error) => {
    const messages = Object.assign(
      error.response.data.errors,
      { '_error': 'Something has gone wrong when communicating with the server. please check the error log.' },
    )

    throw new SubmissionError(messages)
  })
}

export default createAudioRecord

import React from 'react'
import ReactDOM from 'react-dom'
// import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { Map } from 'immutable'

import AudioRecordsDashboard from '../audio_records_dashboard/containers/AudioRecordsDashboard'
import reducer from '../audio_records_dashboard/reducers/'

document.addEventListener('DOMContentLoaded', () => {
  const config = window.audioRecordDashConfig()

  let initialState = {
    root: Map({
      audioRecords: config.audioRecords,
      artists: config.artists,
      selectedAudioRecord: {},
      crudAction: 'create',
      chartSeriesData: config.artistChart.chartSeriesData,
      chartYears: config.artistChart.chartYears
      // chartSeriesData: [{name: 'test', data: [1, 4, 5]}],
      // chartYears: ['test', 'test2', 'test3']
    })
  }

  const store = createStore(reducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

  ReactDOM.render(
    <Provider store={store}>
      <AudioRecordsDashboard />
    </Provider>,
    document.body.appendChild(document.getElementById('audio-records-dashboard')),
  )
})

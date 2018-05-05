import { Map } from 'immutable'

export const initialState = Map({
  audioRecords: null,
  artists: null,
  crudAction: 'create',
  selectedAudioRecord: {},
  chartSeriesData: [],
  chartYears: []
})

export const ACTION_ADD_AUDIO_RECORD = 'ACTION_ADD_AUDIO_RECORD'
export const ACTION_UPDATE_AUDIO_RECORDS = 'ACTION_UPDATE_AUDIO_RECORDS'
export const ACTION_UPDATE_CRUD_ACTION = 'ACTION_UPDATE_CRUD_ACTION'
export const ACTION_UPDATE_SELECTED_AUDIO_RECORD = 'ACTION_UPDATE_SELECTED_AUDIO_RECORD'
export const ACTION_REMOVE_DELETED_AUDIO_RECORD = 'ACTION_REMOVE_DELETED_AUDIO_RECORD'
export const ACTION_UPDATE_CHART_SERIES_DATA = 'ACTION_UPDATE_CHART_SERIES_DATA'
export const ACTION_UPDATE_CHART_YEARS = 'ACTION_UPDATE_CHART_YEARS'

export const addAudioRecord = (newAudioRecord) => { return { type: ACTION_ADD_AUDIO_RECORD, newAudioRecord: newAudioRecord } }
export const updateAudioRecords = (updatedAudioRecord) => { return { type: ACTION_UPDATE_AUDIO_RECORDS, updatedAudioRecord: updatedAudioRecord } }
export const updateCrudAction = (crudAction) => { return { type: ACTION_UPDATE_CRUD_ACTION, crudAction: crudAction} }
export const updateSelectedAudioRecord = (audioRecord) => { return { type: ACTION_UPDATE_SELECTED_AUDIO_RECORD, selectedAudioRecord: audioRecord} }
export const removeDeletedAudioRecord = (audioRecord) => { return { type: ACTION_REMOVE_DELETED_AUDIO_RECORD, deletedAudioRecord: audioRecord} }
export const updateChartSeriesData = (chartData) => { return { type: ACTION_UPDATE_CHART_SERIES_DATA, updatedChartData: chartData} }
export const updateChartYears = (chartData) => { return { type: ACTION_UPDATE_CHART_YEARS, updatedChartData: chartData} }

const rootReducer = (state = initialState, action) => {
  let newState
  let audioRecords
  switch (action.type) {
    case ACTION_ADD_AUDIO_RECORD:
      audioRecords = state.get('audioRecords')
      newState = state.set('audioRecords', audioRecords.concat(action.newAudioRecord).sort((a, b) => {
        let nameA = a.title.toUpperCase()
        let nameB = b.title.toUpperCase()
        if (nameA < nameB) {
          return -1
        }
        if (nameA > nameB) {
          return 1
        }

        // names must be equal
        return 0
      }))
      break
    case ACTION_UPDATE_AUDIO_RECORDS:
      audioRecords = state.get('audioRecords')
      audioRecords = audioRecords.filter((record) => {
        return record.id !== action.updatedAudioRecord.id
      })

      newState = state.set('audioRecords', audioRecords.concat(action.updatedAudioRecord).sort((a, b) => {
        let nameA = a.title.toUpperCase()
        let nameB = b.title.toUpperCase()
        if (nameA < nameB) {
          return -1
        }
        if (nameA > nameB) {
          return 1
        }

        // names must be equal
        return 0
      }))
      break
    case ACTION_UPDATE_CRUD_ACTION:
      newState = state.set('crudAction', action.crudAction)
      break
    case ACTION_UPDATE_SELECTED_AUDIO_RECORD:
      newState = state.set('selectedAudioRecord', action.selectedAudioRecord)
      break
    case ACTION_REMOVE_DELETED_AUDIO_RECORD:
      audioRecords = state.get('audioRecords')
      audioRecords = audioRecords.filter((record) => {
        return record.id !== action.deletedAudioRecord.id
      })
      newState = state.set('audioRecords', audioRecords)
      break
    case ACTION_UPDATE_CHART_SERIES_DATA:
      newState = state.set('chartSeriesData', action.updatedChartData.chartSeriesData)
      break
    case ACTION_UPDATE_CHART_YEARS:
      newState = state.set('chartYears', action.updatedChartData.chartYears)
    default:
      newState = state
  }
  return newState
}

export default rootReducer

import React from 'react'
import { connect } from 'react-redux'
import AudioRecords from '../components/AudioRecords'
import AudioRecordForm from '../components/AudioRecordForm'
import ChartForm from '../components/ChartForm'
import { reduxForm, SubmissionError, reset, getFormValues } from 'redux-form'
import { createAudioRecord,
  updateAudioRecord,
  deleteAudioRecord,
  fetchArtistChartData
} from '../submit'
import {
  addAudioRecord,
  updateCrudAction,
  updateAudioRecords,
  updateSelectedAudioRecord,
  removeDeletedAudioRecord,
  updateChartSeriesData,
  updateChartYears
} from '../reducers/rootReducers'

export const mapStateToProps = (state) => {
  return {
    audioRecords: state.root.get('audioRecords'),
    artists: state.root.get('artists'),
    selectedAudioRecord: state.root.get('selectedAudioRecord'),
    crudAction: state.root.get('crudAction'),
    chartSeriesData: state.root.get('chartSeriesData'),
    chartYears: state.root.get('chartYears'),
    artistIdForChart: typeof state.form.chartForm !== 'undefined' ? state.form.chartForm.values.artist_id : null
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    addAudioRecord: (newAudioRecord) => {
      dispatch(addAudioRecord(newAudioRecord))
      dispatch(reset('audioRecordForm'))
    },
    updateAudioRecords: (updatedAudioRecord) => {
      dispatch(updateAudioRecords(updatedAudioRecord))
      dispatch(updateCrudAction('create'))
      dispatch(updateSelectedAudioRecord({}))
    },
    handleUpdate: (audioRecord) => {
      return () => {
        dispatch(updateCrudAction('update'))
        dispatch(updateSelectedAudioRecord(audioRecord))
      }
    },
    handleDelete: (audioRecord) => {
      return () => {
        alert(`Are you sure you want to delete "${audioRecord.title}"?`)
        dispatch(updateCrudAction('create'))
        dispatch(updateSelectedAudioRecord({}))
        dispatch(removeDeletedAudioRecord(audioRecord))
        deleteAudioRecord(audioRecord)
      }
    },
    updateChartData: (chartData) => {
      dispatch(updateChartSeriesData(chartData))
      dispatch(updateChartYears(chartData))
    }
  }
}

export class AudioRecordsDashboard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      submitting: false,
      crudAction: 'create'
    }
  }

  componentDidMount () {
    this.renderChart()
  }

  componentWillReceiveProps (nextProps) {
    // console.log(this.props.artistIdForChart !== nextProps.artistIdForChart)
    // console.log(this.props.artistIdForChart)
    // console.log(nextProps.artistIdForChart)
    // console.log(typeof nextProps.artistIdForChart !== 'object')
    (this.props.artistIdForChart !== null && this.props.artistIdForChart !== nextProps.artistIdForChart) && this.handleChartChange(nextProps.artistIdForChart)
  }

  submit = (vals) => {
    this.setState({ submitting: true })

    switch (this.props.crudAction) {
      case 'create':
        createAudioRecord(vals).then((res) => {
          this.setState({ submitting: false }, () => {
            this.props.addAudioRecord(res.data.audio_record)
          })
        }).catch((err) => {
          this.setState({submitting: false})
          throw new SubmissionError(err.errors)
        })
        break
      case 'update':
        updateAudioRecord(vals).then((res) => {
          this.setState({ submitting: false }, () => {
            this.props.updateAudioRecords(res.data.audio_record)
          })
        }).catch((err) => {
          this.setState({submitting: false})
          throw new SubmissionError(err.errors)
        })
        break
    }
  }

  renderChart = () => {
    Highcharts.chart('chart', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Albums Released by Year'
      },
      xAxis: {
        categories: this.props.chartYears
      },
      yAxis: {
        min: 0,
        allowDecimals: false,
        title: {
          text: 'Albums Released'
        },
        stackLabels: {
          enabled: false,
        }
      },
      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>'
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: true,
            color: 'white'
          }
        }
      },
      series: this.props.chartSeriesData
    })
  }

  handleChartChange = (id) => {
    console.log('id',id)
    fetchArtistChartData(id).then((res) => {
      console.log('res data', res.data.chart_data)
      this.setState(() => {
        this.props.updateChartData(res.data.chart_data)
      })
      this.renderChart()
    }).catch((err) => {
      this.setState({submitting: false})
      throw new SubmissionError(err.errors)
    })
  }

  render () {
    const { audioRecords, handleDelete, handleUpdate, selectedAudioRecord, crudAction } = this.props
    let artistOptions = this.props.artists.map((artist) => { return { key: artist.id, name: artist.name } })
    artistOptions.unshift({key: null, name: 'Select an Artist'})

    return (
      <div className="container">
        <div className="row">
          <AudioRecordForm
            submitHandler={this.submit}
            artistOptions={artistOptions}
            crudAction={crudAction}
            selectedAudioRecord={selectedAudioRecord}
            initialValues={crudAction === 'update' ? selectedAudioRecord : {}} />

          <div className="col-md-9">
            <ChartForm artistOptions={artistOptions}
                       initialValues={{artist_id: 1}}
                       handleChartChange={this.handleChartChange} />
            <div id="chart" className="chart"></div>
          </div>
        </div>

        <hr/>

        <AudioRecords
          audioRecords={audioRecords}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          selectedAudioRecord={selectedAudioRecord} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioRecordsDashboard)

import React, { useState } from 'react'
import firebase from './Firebase'
import { useListVals } from 'react-firebase-hooks/database'

import { Line } from 'react-chartjs-2'
import { ChartOptions } from 'chart.js'
import 'chartjs-plugin-colorschemes'

interface SensorData {
  light: number
  temperature: number
  temperatureCelsius: number
  timestamp: number
}

function SensorChart (): JSX.Element {
  const [dataCount, setDataCount] = useState(12)

  const ref = firebase.database().ref('sensor')
    .child('environment')
    .orderByChild('timestamp')
    .limitToLast(dataCount)
  const [sensorData, loading, error] = useListVals<SensorData>(ref)

  if (loading) {
    return <div className='Loading'>Loading...</div>
  }

  if (error != null) {
    return <div>Error: {error}</div>
  }

  if (sensorData == null) {
    return <div>No data</div>
  }

  // TODO: improve these codes
  const timestampList = sensorData.map(item => item.timestamp)
  const lightList = sensorData.map(item => item.light)
  const temperatureList = sensorData.map(item => item.temperatureCelsius)

  const data: any = {
    labels: timestampList,
    datasets: [
      {
        label: '明るさ',
        yAxisID: 'light',
        data: lightList,
        fill: true,
        lineTension: false
      },
      {
        label: '室温',
        yAxisID: 'temperature',
        data: temperatureList
      }
    ]
  }
  const options: ChartOptions = {
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          displayFormats: {
            minute: 'HH:mm'
          }
        }
      }],
      yAxes: [{
        id: 'light',
        position: 'left',
        scaleLabel: {
          display: true,
          labelString: '明るさ（電圧値≦1023）'
        },
        ticks: {
          suggestedMin: 0,
          suggestedMax: 1023
        }
      }, {
        id: 'temperature',
        position: 'right',
        scaleLabel: {
          display: true,
          labelString: '室温（摂氏）'
        },
        ticks: {
          suggestedMin: 10,
          suggestedMax: 30
        }
      }]
    }
  }

  return (
    <div className='SensorChart'>
      <div className='chart'>
        <Line data={data} options={options} />
      </div>
      <button onClick={() => setDataCount(12)}>3h</button>
      <button onClick={() => setDataCount(12*2)}>6h</button>
      <button onClick={() => setDataCount(12*4)}>12h</button>
      <button onClick={() => setDataCount(12*8)}>24h</button>
      <button onClick={() => setDataCount(12*8*3)}>3d</button>
      <button onClick={() => setDataCount(12*8*7)}>7d</button>
      <button onClick={() => setDataCount(12*8*7*2)}>2w</button>
      <button onClick={() => setDataCount(12*8*7*4)}>4w</button>
    </div>
  )
}

export default SensorChart

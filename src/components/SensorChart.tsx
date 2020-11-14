import React from 'react';
import firebase from './Firebase';
import {Line} from 'react-chartjs-2';
import {ChartOptions} from 'chart.js';
import 'chartjs-plugin-colorschemes';

interface SensorData {
  light: number;
  temperature: number;
  temperatureCelsius: number;
  timestamp: number;
}

interface State {
  isLoading: boolean;
  sensorData?: SensorData[];
}

class SensorChart extends React.Component<{}, State> {
  state: State = {
    isLoading: true
  }

  componentDidMount() {
    // DEVELOPER: check permission to read
    firebase.database()
      .ref('sensor')
      .child('environment')
      .orderByChild('timestamp')
      .limitToLast(12)
      .on('value', snapshot => {
        let sensorData = snapshot.val();

        this.setState({
          isLoading: false,
          sensorData: sensorData
        });
      });
  }

  render() {
    let sensorData = this.state.sensorData;
    if (! sensorData) {
        return (
          <div className="Loading">
            Loading...
          </div>
        );
    }

    // TODO: improve these codes
    let sensorDataEntries = Object.entries(sensorData);
    let timestampList = sensorDataEntries.map(([_, item]) => item.timestamp);
    let lightList = sensorDataEntries.map(([_, item]) => item.light);
    let temperatureList = sensorDataEntries.map(([_, item]) => item.temperatureCelsius);

    let data: any = {
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
    let options: ChartOptions = {
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            displayFormats: {
              minute: 'HH:mm',
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
        },{
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
      <div className="SensorChart">
        <Line data={data} options={options} />
      </div>
    );
  }
}

export default SensorChart;

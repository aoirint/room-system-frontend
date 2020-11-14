import React from 'react';
import SensorChart from './SensorChart';

class Home extends React.Component<{}, {}> {

  componentDidMount() {
  }

  render() {
    return (
      <div className="Home">
        <SensorChart />
      </div>
    );
  }
}

export default Home;

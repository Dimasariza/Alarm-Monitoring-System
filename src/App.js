import './App.css';
import Frame from './Components/Frame/frame.js';
import EngineDataManager from './Components/DataComponents/EngineControls/EngineDataManager';
import GPSDataControl from './Components/DataComponents/GPSControls/gpsDataControl';

function App() {

  const mainEngine = new EngineDataManager();
  const auxEngine = new EngineDataManager();
  const GPSData = new GPSDataControl();

  return (
    <Frame mainEngine={mainEngine} auxEngine={auxEngine} GPSData={GPSData}/>
  );
}

export default App;

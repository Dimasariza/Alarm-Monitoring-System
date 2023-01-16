import './App.css';
import Frame from './Components/Frame/frame.js';
import EngineDataManager from './Components/DataComponents/EngineControls/EngineDataManager';

function App() {

  const mainEngine = new EngineDataManager();
  const auxEngine = new EngineDataManager();

  return (
    <Frame mainEngine={mainEngine} auxEngine={auxEngine}/>
  );
}

export default App;

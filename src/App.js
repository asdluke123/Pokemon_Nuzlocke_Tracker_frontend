import './App.css';
import {Route, Routes} from 'react-router'
import Games from './pages/Games';
import Runs from './pages/Runs';
import RunDetail from './pages/RunDetails';
function App() {
  return (
    <div className="App">

      <main>
        <Routes>
          <Route path = '/' element={<Games />} />
          <Route path = '/runs/:gameId/' element = {<Runs />} />
          <Route path = 'runs/:gameId/run/:runId' element = {<RunDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

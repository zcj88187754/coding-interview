import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Portal from './portal';
import './normalize.css';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Portal /> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

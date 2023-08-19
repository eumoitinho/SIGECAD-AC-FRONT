import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import PublicRoute from './routes/PublicRoute';
import ProtectedRoute from './routes/ProtectedRoute';
import LoginCoord from './docente/LoginCoord';
import Home from './discente/pages/Home';
import HomeCoord from './docente/HomeCoord';
import Login from './discente/pages/Login';
import CorrectionArea from './docente/CorrectionArea';


function App() {
  return (
    <div className="App">
     <BrowserRouter>
        <Routes>
          <Route path='/' element= {<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/homecoord' element= {<ProtectedRoute><HomeCoord/></ProtectedRoute>} />
          <Route path='/Login' element={<PublicRoute><Login /></PublicRoute>} />
          <Route path='/LoginCoord' element={<PublicRoute><LoginCoord /></PublicRoute>} />
          <Route path='/CorrectionArea/:cpf' element={<ProtectedRoute><CorrectionArea /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

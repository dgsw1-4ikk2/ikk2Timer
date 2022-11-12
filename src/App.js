import './App.css';
import {Route,Routes} from 'react-router-dom';
import Timer from './pages/Timer';
import Login from './pages/Login';
import Ranking from './pages/Ranking';
import Error from './pages/Error';
import Home from './Home';
import Layout from './Layout';
import SignUp from './pages/SignUp';
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='/timer' element={<Timer />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/SignUp' element={<SignUp />}/>
          <Route path='/rank' element={<Ranking />}/>
        </Route>
        <Route path='*' element={<Error/>}/>
      </Routes> 
    </div>
  )
}

export default App;

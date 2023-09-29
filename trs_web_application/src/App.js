import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Dashboard from './screens/Dashboard';
import AuthScreen from './screens/AuthScreen';
import Header from './components/Header';

function App() {
   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <div className="App">
      <Header />
      <main className='main'>
        <Router>
          <Routes>
            <Route
              path="/"
              element={isLoggedIn ? <Dashboard /> : <AuthScreen />}
            />
          </Routes>
        </Router>
      </main>
    </div>
  );
}

export default App;

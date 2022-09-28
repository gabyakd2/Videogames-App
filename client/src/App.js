import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage.jsx'
import Home from './components/Home'
import CreateGame from './components/CreateGame';
import Detail from './components/Detail'


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path='/' component={LandingPage} />
        <Route path='/home' component={Home} />
        <Route path='/create' component={CreateGame} />
        <Route exact path='/videogame/:id' render={({ match }) => <Detail id={match.params.id} />} />
      </div>
    </BrowserRouter>    
  );
}

export default App;

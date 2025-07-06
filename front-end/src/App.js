import logo from './logo.svg';
import './App.css';

import SampleComponent from './components/sample';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <p>
          Welcome to React - Python boilerplate!
        </p>    

        {/* load sample component    */}
        <SampleComponent />
      </header>
    </div>
  );
}

export default App;

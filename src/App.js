import './App.css';
import { GoogleSignIn } from './components/google-sign-in.component';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <GoogleSignIn />
      </header>
    </div>
  );
}

export default App;

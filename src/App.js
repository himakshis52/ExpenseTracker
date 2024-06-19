import './App.css';
import Home from './LandingPage/Home';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <SnackbarProvider >
      <div>
        <Home />
      </div>
    </SnackbarProvider>
  );
}

export default App;

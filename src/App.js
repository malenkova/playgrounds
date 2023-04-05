import './App.css';
import MapComponent from './components/MapComponent';
import playgroundsList from './data/playgrounds';

function App() {
  return (
    <>
      <header>

      </header>
      <main>
        <h1>Playgrounds</h1>
        <MapComponent playgrounds={ playgroundsList} />
      </main>
      <footer>

      </footer>
    </>
  );
}

export default App;

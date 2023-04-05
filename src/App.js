import './App.css';
import Map from './components/Map';
import playgroundsList from './data/playgrounds';

function App() {
  return (
    <>
      <header>

      </header>
      <main>
        <h1>Playgrounds</h1>
        <Map playgrounds={playgroundsList} />
      </main>
      <footer>

      </footer>
    </>
  );
}

export default App;

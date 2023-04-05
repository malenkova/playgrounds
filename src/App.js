import './App.css';
import Map from './components/Map';
import PlaygroundsList from './components/PlaygroundsList';
import playgroundsList from './data/playgrounds';

function App() {
  return (
    <>
      <header>

      </header>
      <main>
        <h1>Playgrounds</h1>
        <Map playgrounds={playgroundsList} />
        <PlaygroundsList playgrounds={playgroundsList} />
      </main>
      <footer>

      </footer>
    </>
  );
}

export default App;

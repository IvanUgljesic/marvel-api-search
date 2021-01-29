import './App.css';

//components
import Header from './components/Header';
import SearchBox from './components/SearchBox';
import SearchResults from './components/SearchResults';

const App = () => {
  return (
    <div className="App">
      <Header />
      <SearchBox />
      <SearchResults />
    </div>
  );
}

export default App;

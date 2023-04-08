import { SearchComponent } from './components/SearchComponent';
import { ResultsComponent } from './components/ResultsComponent';
import useDatabase from './hooks/useDatabase';
import styles from './App.module.css';

function App() {

  const {
    searchString, 
    initialSearch, 
    onSearchStringChange, 
    removeFromMemory, 
    possibleResults, 
    search, 
    searchResults
  } = useDatabase();

  return (
    <>
      { searchResults.length === 0 && !initialSearch ? (
        <div className={styles.SearchComponent}>
          <SearchComponent 
            searchString = {searchString}
            onSearchStringChange = {onSearchStringChange}
            possibleResults = {possibleResults}
            search = {search}
            removeFromMemory = {removeFromMemory}
          />
        </div>
      ) : (
        <ResultsComponent 
          searchString={searchString} 
          onSearchStringChange={onSearchStringChange} 
          possibleResults={possibleResults} 
          search={search} 
          searchResults = {searchResults} 
        />
      )}
    </>
  );
}

export default App;

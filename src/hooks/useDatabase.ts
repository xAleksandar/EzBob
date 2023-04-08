import { useState } from "react"
import PossibleResultsType from "../types/PossibleResultsType"
import useMockedResults from "./useMockedResults"
import ResultType from "../types/ResultType";

const useDatabase = () => {

    const { possibleMockedResults, results } = useMockedResults();
    const [searchString, setSearchString] = useState('');
    const [possibleResults, setPossibleResults] = useState <PossibleResultsType[]> ([]);
    const [searchResults, setSearchResults] = useState <ResultType[]> ([]);
    const [initialSearch, setInitialSearch] = useState(false);


    // Reflect changes on the keyword
    // Return Possible results for the used keyword

    const onSearchStringChange = (newSearchString:string) => {
        setSearchString(newSearchString)
        setPossibleResults([])
        const _possibleResults: PossibleResultsType[] = [];
        for (let i = 0; i < possibleMockedResults.length; i++) {
            if (possibleMockedResults[i].toLowerCase().startsWith(newSearchString.toLowerCase()) && _possibleResults.length < 10) {
                
                // Check if user has already opened that page by checking browser's local storage.
                // Set opened to true in case he did.
                
                const _opened = localStorage.getItem(possibleMockedResults[i]) === 'true'

                // And then update the possible results.

                _possibleResults.push({
                    title: possibleMockedResults[i],
                    opened: _opened,
                    id: i
                })
            }
        }

        setPossibleResults(_possibleResults);
    }

    // Update user's localstorage and reload possibleResults

    const removeFromMemory = (_string: string) => {
        localStorage.setItem(_string, 'false');

        let _possibleResults = possibleResults;

        for (let i = 0; i < _possibleResults.length; i++) {
            if (_possibleResults[i].title.toLowerCase() === _string.toLowerCase()) {
                _possibleResults[i].opened = false;
            }
        }

        setPossibleResults({... _possibleResults});
        return _possibleResults;
    }

    // Main search query.

    const search = async (_searchString:string) => {
        
        // Update localstorage.

        localStorage.setItem(_searchString, 'true');

        // At this place we could implement complex logic that
        // determines the keyword to search for, based on the user input.
        
        // For the ease of setting up and sharing the project,
        // i will hardcode the keyword by looking which one of
        // the three keywords (React, Japan, Transmission) is 
        // included in the user input.

        let keyword = '';
        if (_searchString.toLowerCase().includes("react")) {
            keyword = "react";
        } else if (_searchString.toLowerCase().includes("japan")) {
            keyword = "japan";
        } else if (_searchString.toLowerCase().includes("transmission")) {
            keyword = 'transmission';
        } else {
            keyword = _searchString.toLowerCase();
        }
    
        // Here i return all the results.
        // Normally, the best practice would
        // implement an api call to backend service
        // which examines any kind of database and
        // returns the results.

        // For Frontend part, See: https://github.com/xAleksandar/Marketplace/blob/a2bcf310ea7154c0effc05da71e7f73156a1f7f3/src/hooks/us%D0%B5FetchItems.tsx#L41-L69
        
        // For Backend example, Look at: https://github.com/xAleksandar/Marketplace/blob/Typescript-Edition/Backend/index.js
        // And also: https://github.com/xAleksandar/Marketplace/blob/a2bcf310ea7154c0effc05da71e7f73156a1f7f3/Backend/components/mongoDB.js#L102-L105

        // Again, for the ease of sharing, i have just hardcoded some (results).

        // Adding some Timeout to simulate database latency.
        await new Promise(r => setTimeout(r, 2000));

        const _results: ResultType[] = [];

        for (let i = 0; i < results.length; i++) {
            if (results[i].Title.toLowerCase().includes(keyword)) {
                _results.push({
                    Title: results[i].Title,
                    Link: results[i].Link,
                    Date: results[i].Date,
                    Displayed_Link: results[i].Displayed_Link,
                    Comment: results[i].Comment,
                    Keywords: results[i].Keywords,
                    Id: i
                    
                })
            }
        }

        setSearchResults(_results);
        setInitialSearch(true);
    }

    return{
        searchString,
        initialSearch,
        possibleResults,
        onSearchStringChange,
        removeFromMemory,
        search,
        searchResults
    }

}

export default useDatabase;
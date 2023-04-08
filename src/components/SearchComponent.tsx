import { useState, useRef, useEffect } from 'react';
import { ClockSvg } from './SVG/ClockSvg';
import { ZoomSvg } from './SVG/ZoomSvg';

import PossibleResultsType from '../types/PossibleResultsType';
import styles from './CSS/SearchComponent.module.css';

export const SearchComponent = ({ 
        searchString, 
        onSearchStringChange, 
        possibleResults, 
        search,
        removeFromMemory 
    } : {
        searchString: string, 
        onSearchStringChange: ({}:string) => void, 
        possibleResults: PossibleResultsType[], 
        search: ({}:string) => void,
        removeFromMemory: ({}:string) => PossibleResultsType[]
    }) => {
    
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    
    // Auto focus input element on page refresh.

    useEffect(() => {
        if (inputRef.current) {
        inputRef.current.focus();
        }
    }, []);


    // Used to manage input element.
    // Shows results whether element
    // is focused and hidding results
    // while it is not.

    const focused = async () => {
        await new Promise(r => setTimeout(r, 100));
        setIsFocused(!isFocused);
    }

    const handleInputChange = (event: any) => {
        onSearchStringChange(event.currentTarget.value);
    };

    return (
        <>
        <div className={styles.SearchBanner}>
            EzBob Search
        </div>
        <div className={styles.SearchBar}>
            <div className={styles.SearchBarLine}>
                <input 
                    className={styles.SearchForm} 
                    type="text"
                    ref={inputRef}
                    value={searchString}
                    onFocus={() => {focused()}}
                    onBlur={() => {focused()}} 
                    onChange={handleInputChange} 
                    placeholder="search"
                />
                <svg className={styles.RemoveSearchBtn} focusable="false" onClick={() => {onSearchStringChange("")}} xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
            </div>

            { searchString.length > 1 && true && possibleResults.length > 1 ? (
                <div className={styles.PossibleResults}>
                    {possibleResults.map(result => 
                        <li key={result.id}>
                            {result.opened? (
                                <div className={styles.ResultBody}>
                                    <button className={styles.OpenedResult} onClick={() => {
                                            onSearchStringChange(result.title);
                                            search(result.title);
                                        }}>
                                        <ClockSvg />
                                        {result.title.substring(0,40)}
                                    </button>
                                    <button className={styles.RemoveResultBtn} onClick={() => {
                                        possibleResults = removeFromMemory(result.title)
                                        
                                    }}> remove </button>
                                </div>
                            ) : (
                                <button className={styles.Result} onClick={() => {
                                        onSearchStringChange(result.title);
                                        search(result.title);
                                    }}>
                                    <ZoomSvg />
                                    {result.title.substring(0,40)}
                                </button>
                            )}
                        </li>
                    )}
                </div>
            ) : (
                <>
                </>
            )}
   
        </div>
        <button className={styles.SearchBtn} onClick={() => {search(searchString)}}>Search</button> 
        </>
    );
}
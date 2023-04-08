import { useState } from 'react';
import PossibleResultsType from '../types/PossibleResultsType';
import styles from './CSS/LineSearchComponent.module.css';

import { ClockSvg } from './SVG/ClockSvg';
import { ZoomSvg } from './SVG/ZoomSvg';

export const LineSearchComponent = ({
    searchString, 
    onSearchStringChange, 
    possibleResults, 
    search
} : {
    searchString: string, 
    onSearchStringChange: (x:string) => void, 
    possibleResults: PossibleResultsType[], 
    search: (x:string) => void
}) => {
    
    const [isFocused, setIsFocused] = useState(false);

    const handleInputChange = (event: any) => {
        onSearchStringChange(event.currentTarget.value);
    };

    const focused = async () => {
        await new Promise(r => setTimeout(r, 100));
        setIsFocused(!isFocused);
    }

    return (
        <>
            <div className={styles.Logo}>
                EzBob Search
            </div>
            <div className={styles.SearchFormBody}>
                <input 
                    className={styles.SearchForm} 
                    type="text"
                    value={searchString}
                    onFocus={() => {focused()}}
                    onBlur={() => {focused()}}
                    onChange={handleInputChange} 
                    placeholder="search"
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                          search(searchString)
                        }
                    }}
                    
                />
                <svg className={styles.RemoveSearchBtn} focusable="false" onClick={() => {onSearchStringChange("")}} xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>


                {possibleResults.length > 1 && isFocused && searchString.length > 0 ? (
                    <div className={styles.Results}>
                        {possibleResults.map(result => 
                            <li key={result.id}>
                                {result.opened ? (
                                    <button className={styles.OpenedResult} onClick={() => {
                                        onSearchStringChange(result.title);
                                        search(result.title);
                                    }}>
                                    <ClockSvg />
                                    {result.title.substring(0,20)}
                                    </button>
                                ) : (
                                    <button className={styles.Result} onClick={() => {
                                        onSearchStringChange(result.title);
                                        search(result.title);
                                    }}>
                                    <ZoomSvg />
                                    {result.title.substring(0,20)}
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
        </>
    );
}
import PossibleResultsType from "../types/PossibleResultsType";
import styles from './CSS/ResultsComponent.module.css';
import ResultType from "../types/ResultType";

import { LineSearchComponent } from "./LineSearchComponent";

export const ResultsComponent = ({
    searchString, 
    onSearchStringChange, 
    possibleResults, 
    search, 
    searchResults
} : {
    searchString: string, 
    onSearchStringChange: (x:string) => void, 
    possibleResults: PossibleResultsType[],
    search: (x:string) => void, 
    searchResults: ResultType[]
}) => {
    
    return (
        <>
            <div className={styles.LineSearchComponent}>
                <LineSearchComponent searchString={searchString} onSearchStringChange={onSearchStringChange} possibleResults={possibleResults} search={search} />
            </div>
            <div className={styles.Results}>
                {searchResults.length > 0 ? (
                    <>
                        {searchResults.map(result =>
                            <li key={result.Id}>
                                <div className={styles.Result}>
                                    <div className={styles.ResultTitle}>
                                        <a href={result.Link}>{result.Title}</a>
                                    </div>
                                    <div className={styles.ResultInfo}>
                                        <div className={styles.ResultDate}>
                                            {result.Date}
                                        </div>
                                        {result.Displayed_Link}
                                    </div>
                                    <div className={styles.ResultBody}>
                                        {result.Comment}
                                    </div>
                                </div>
                            </li>
                        )}
                    </>
                ) : (
                    <div className={styles.ZeroResults}>
                        Couldn't find any results for your search.
                    </div>
                )}
            </div>
        </>
    );
}
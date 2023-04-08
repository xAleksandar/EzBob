import ResultType from "../types/ResultType";
import Japan_results from "../mockedData/Japan_results.json";
import ReactJS_results from "../mockedData/ReactJS_results.json";
import CarTransmission_results from "../mockedData/car transmission_results.json";

import ReactJS_possibleResults from "../mockedData/ReactJS_possibleResults.json";
import Japan_possibleResults from "../mockedData/Japan_possibleResults.json";

const useMockedResults = () => {

    const possibleMockedResults: string[] = [];
    const results: ResultType[] = [];

    for (let i = 0; i < ReactJS_possibleResults.length; i++) {
        possibleMockedResults.push(ReactJS_possibleResults[i].title)
    }

    for (let i = 0; i < Japan_possibleResults.length; i++) {
        possibleMockedResults.push(Japan_possibleResults[i].title)
    }

    for (let i = 0; i < Japan_results.length; i++) {
        const title = Japan_results[i].title ? Japan_results[i].title : "Not Found"
        const link = Japan_results[i].link ? Japan_results[i].link : "Not Found"
        const date = Japan_results[i].date ? Japan_results[i].date! : "5 мар. 2023 г."        
        const displayLink = Japan_results[i].displayed_link ? Japan_results[i].displayed_link : "Not Found"
        const comment = Japan_results[i].snippet ? Japan_results[i].snippet : "Not Found"
        const keywords = Japan_results[i].snippet_highlighted_words ? Japan_results[i].snippet_highlighted_words : ["Not Found"]
        
        results.push({
            "Title": title,
            "Link": link,
            "Date": date,
            "Displayed_Link": displayLink,
            "Comment": comment,
            "Keywords": keywords,
            "Id": i
        })    
    }

    for (let i = 0; i < ReactJS_results.length; i++) {
        const title = ReactJS_results[i].title ? ReactJS_results[i].title : "Not Found"
        const link = ReactJS_results[i].link ? ReactJS_results[i].link : "Not Found"
        const date = ReactJS_results[i].date ? ReactJS_results[i].date! : "5 мар. 2023 г."        
        const displayLink = ReactJS_results[i].displayed_link ? ReactJS_results[i].displayed_link : "Not Found"
        const comment = ReactJS_results[i].snippet ? ReactJS_results[i].snippet : "Not Found"
        const keywords = ReactJS_results[i].snippet_highlighted_words ? ReactJS_results[i].snippet_highlighted_words! : ["Not Found"]
        
        results.push({
            "Title": title,
            "Link": link,
            "Date": date,
            "Displayed_Link": displayLink,
            "Comment": comment,
            "Keywords": keywords,
            "Id": i,
        })    
    }

    for (let i = 0; i < CarTransmission_results.length; i++) {
        const title = CarTransmission_results[i].title ? CarTransmission_results[i].title : "Not Found"
        const link = CarTransmission_results[i].link ? CarTransmission_results[i].link : "Not Found"
        const date = CarTransmission_results[i].date ? CarTransmission_results[i].date! : "5 мар. 2023 г."        
        const displayLink = CarTransmission_results[i].displayed_link ? CarTransmission_results[i].displayed_link : "Not Found"
        const comment = CarTransmission_results[i].snippet ? CarTransmission_results[i].snippet! : "Not Found"
        const keywords = CarTransmission_results[i].snippet_highlighted_words ? CarTransmission_results[i].snippet_highlighted_words! : ["Not Found"]
        
        results.push({
            "Title": title,
            "Link": link,
            "Date": date,
            "Displayed_Link": displayLink,
            "Comment": comment,
            "Keywords": keywords,
            "Id": i
        })    
    }

    return {
        possibleMockedResults,
        results
    }
}

export default useMockedResults;
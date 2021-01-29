import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPage } from '../actions/marvel';

//components
import CharacterList from './CharacterList';


const useStateWithLocalStorage = localStorageKey => {
    let temp = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    const [value, setValue] = useState(temp);
   
    useEffect(() => {
      localStorage.setItem(localStorageKey, JSON.stringify(value));
    }, [value]);
   
    return [value, setValue];
};

const SearchResults = () => { 
    const dispatch = useDispatch();
    const marvel = useSelector(state => state.marvel);
    const [searchResults, setSearchResults] = useState({bookmark: true, results: [], total: 0});
    const [bookmarkedChars, setBookmarkedChars] = useStateWithLocalStorage('marvel');
    const page = useSelector(state => state.marvel.page);
    const handlePage = (event, val) => {     
        dispatch(setPage(val));
    };

    useEffect(() => {
        marvel && setSearchResults(marvel);
    },[marvel]);

    const handleBookmark = (char) => {
        let bookmarked = [...bookmarkedChars, char];
        setBookmarkedChars(bookmarked);
    }

    const handleDelete = (charToDelete) => {
        let currentChars = [...bookmarkedChars.filter(char => char !== charToDelete)];
        setBookmarkedChars(currentChars);
    }
    return (
        <div className="search-results">
            <CharacterList
                bookmarkedCharacter={bookmarkedChars}
                bookmark={searchResults.bookmark}
                searchResults={searchResults.results}
                handleBookmark={handleBookmark} 
                handleDelete={handleDelete}
                total={searchResults.total}
                page={page}
                handlePage={handlePage}
            />
        </div>
    )
}

export default SearchResults;

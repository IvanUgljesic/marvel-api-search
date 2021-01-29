import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters, setPage } from '../actions/marvel';

//RxJS
import { debounceTime, tap, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

const SearchBox = () => {
    const dispatch = useDispatch();
    const page = useSelector(state => state.marvel.page);
    const [search, setSearch] = useState('');
    const [onSearch$] = useState(()=>new Subject());

    useEffect(() => {
      const subscription = onSearch$.pipe(
        debounceTime(400),
        distinctUntilChanged(),
        tap(a => a())
      ).subscribe();
    }, [onSearch$]);

    useEffect(() => {
      onSearch$.next(() => dispatch(fetchCharacters(search, page)))
    }, [page])

    const handleChange = (e) => {
      let input = e.target.value
      dispatch(setPage(1));
      setSearch(input);
      onSearch$.next(() => dispatch(fetchCharacters(input, page)));
    }

    return (
        <div className="search-box">
            <input type="text" className="input-field" placeholder="character name starts with..." onChange={handleChange}/>
        </div>
    )
}

export default SearchBox;

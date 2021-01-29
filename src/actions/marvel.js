import md5 from 'md5';

export const fetchCharacters = (input, page) => dispatch => {    
    
    let ts = Date.now();
    let myPrivate = process.env.REACT_APP_MARVEL_PRIVATE_API_KEY;
    let myPublic = process.env.REACT_APP_MARVEL_PUBLIC_API_KEY;
    let hash = md5(ts + myPrivate + myPublic);
    let offset = (page-1) * 20;
    const url = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${input}&offset=${offset}&ts=${ts}&apikey=${myPublic}&hash=${hash}`;
    if(input !== ''){
        fetch(url)
            .then(response => response.json())
            .then(response => {
                let data = response.data;
                dispatch({ type: 'FETCH_CHARACTERS', payload: { results:[...data.results], bookmark: false, total: data.total }});    
            })
            .catch(err => console.log(err));  
    } else {
        dispatch({ type: 'EMPTY_INPUT', payload:{results: [], bookmark:true, total: 0 }})
    }
    
}

export const setPage = (page) => dispatch => {
    dispatch({type:'SET_PAGE', payload:page})
}

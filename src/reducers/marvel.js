
const marvel = (initState = {bookmark: true, results:[], total: 0, page:1}, action) => {
  switch (action.type) {
    case 'FETCH_CHARACTERS':  
      return {
        ...initState,
        ...action.payload
      }
    case 'EMPTY_INPUT':
      return {
        ...initState,
        ...action.payload
      }
    case 'SET_PAGE':
      return {
        ...initState,
        page: action.payload
      }
    default:
    return initState;
  }
}

export default marvel;
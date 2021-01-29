import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

//icons
import { BsBookmarkCheck, BsBookmarkDash, BsBookmarkPlus } from 'react-icons/bs';

const useStyles = makeStyles((theme) => ({
    root: {
        color: 'white',
      '& > *': {
        marginTop: theme.spacing(2),
      },
      '& .MuiPaginationItem-page': {
          color: '#f9b916'
      },
      '& .MuiPagination-ul': {
        justifyContent: 'center',
      },
      '& .MuiPaginationItem-page.Mui-selected': {
          border: '1px solid #f9b916'
      }
    },
}));


const CharacterList = ({ searchResults, bookmark, handleBookmark, handleDelete, bookmarkedCharacter, page, handlePage, total }) => {
    const classes = useStyles();
    let totalResults = bookmark ? bookmarkedCharacter.length:total;
    let charactersToShow = bookmark ? bookmarkedCharacter.slice((page-1)*20, page * 20):searchResults;
    return (
        <>
        <div className="Grid" style={{display: charactersToShow.length ? '':'none'}}>
            {
                charactersToShow.map(char => {
                    return (
                        <div className="Card" key={char.id}>
                            <div className="Picture"
                                style={{
                                height: '100%',
                                backgroundImage: `url(${char.thumbnail.path}.${char.thumbnail.extension})`,
                                backgroundSize: !(char.thumbnail.path).includes('image_not_available')? 'cover':'100% 100%',
                                backgroundPosition: 'top',
                                borderRadius: 'inherit',
                                backgroundRepeat: 'no-repeat',
                                }}
                            >
                                <div className="Card-gradient-overlay">
                                    <div className="card-top">
                                        <h1>{char.name}</h1>
                                    </div>
                                    <div className="card-bot">
                                        {
                                          bookmark ?                                            
                                            <BsBookmarkDash size={32} className="bookmark-btn-plus" onClick={() => handleDelete(char)}/>
                                            :
                                            <>
                                            {
                                            bookmarkedCharacter.map(x => x.id).includes(char.id) ? 
                                                <BsBookmarkCheck size={32} className="bookmark-btn-check"/> 
                                                : 
                                                <BsBookmarkPlus size={32} className="bookmark-btn-plus" onClick={() => handleBookmark(char)}/>
                                            }
                                            </>  
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        {
            charactersToShow.length &&
            <div className={classes.root}>
                <Pagination count={Math.ceil(totalResults/20)} page={page} onChange={handlePage}/>
            </div>
        }
        {
            !charactersToShow.length && 
            <div className="search-info" style={{display: !charactersToShow.length ? '':'none'}}><h3>{bookmark ? 'no bookmarked characters':'no results for given input'}</h3></div>
        }
        </>
    )
}

export default CharacterList;

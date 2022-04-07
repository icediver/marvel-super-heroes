import './comicsList.scss';
// import uw from '../../resources/img/UW.png';
// import xMen from '../../resources/img/x-men.png';
import useMarvelService from '../../services/MarvelService';
import { useState, useEffect, useRef } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMesage from '../erorrMesage/ErrorMesage';
import { Link } from 'react-router-dom';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(true);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {loading, error, getAllComics} = useMarvelService();
    
    useEffect(() => {
        onRequest(offset, true)
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllComics(offset)
            // .then(item => console.log(item))
            .then(onComicsLoaded)
            
    };

    const onComicsLoaded = (newComicsList) => {
        let ended = false;
        if(newComicsList.length < 8) {
            ended= true;
        }
        
        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setNewItemLoading(setNewItemLoading => false);
        setOffset(offset => (offset + 8));
        setComicsEnded(comicsEnded => ended);
    };
    
    const itemRefs = useRef([]);

    const focusOnComics = (id) => {

        itemRefs.current.forEach(el => {
            el.classList.remove('comics__item_selected');
        });

        itemRefs.current[id].classList.add('comics__item_selected');
        itemRefs.current[id].focus();
    
    };
    function dataListOfComics  (list) {
        if (list.length > 0) {
        const Arr  = list.map((el, i)=> {
            return (
                <li 
                    ref={el => itemRefs.current[i] = el}
                    className="comics__item"
                    key={i} 
                    onClick={() => {                            
                        focusOnComics(i)                            
                        }}>
                    <Link  to={`/comics/${el.id}`}>
                        <img src={el.thumbnail} alt={el.title} className="comics__item-img"/>
                        <div className="comics__item-name">{el.title}</div>
                        <div className="comics__item-price">{el.prices}</div>
                    </Link>
                </li>
            )
        })

        return Arr;
        }
        
    }

    const newArr =  dataListOfComics(comicsList);

    const erorrMesage = error ? <ErrorMesage/> : null
    const spinner = loading && !newItemLoading ? <Spinner/> : null

    return (
        <div className="comics__list">
            <ul className="comics__grid">                
                {erorrMesage}
                {spinner}
                {newArr}
            </ul>
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': comicsEnded ? 'none' : 'block'}}
                onClick={() => {
                    onRequest(offset)
                    
                    }}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;
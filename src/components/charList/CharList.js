import './charList.scss';
import Spinner from '../spinner/Spinner';
import ErrorMesage from '../erorrMesage/ErrorMesage';
// import abyss from '../../resources/img/abyss.jpg';
import { useState, useEffect, useRef } from 'react';
import MarvelService from '../../services/MarvelService';
import PropTypes from 'prop-types';

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(true);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);
        
    const marvelService = new MarvelService();

    useEffect(() => {
        onRequest();
    }, []);

    const onRequest = (offset) => {
        onCharListLoading();
        marvelService.getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError);
    };

    const onCharListLoading = (chars) => {        
            setNewItemLoading(true);
    };
    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if(newCharList.length<9) {
            ended= true;
        }
        
        setCharList(charList => [...charList, ...newCharList]);
        setLoading(loading => false);
        setNewItemLoading(setNewItemLoading => false);
        setOffset(offset => (offset + 9));
        setCharEnded(charEnded => ended);
    };
    const onError = () => {
        
        setError(true);
        setLoading(loading => false);
    };
    const itemRefs = useRef([]);

    // setRef = (ref) => {
        
    //     this.itemRefs.push(ref);
    // }
    const focusOnChar = (id) => {

        itemRefs.current.forEach(el => {
            el.classList.remove('char__item_selected');
        });

        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    
    };
    function dataListOfCharacters  (list) {

        if (list.length > 0) {
            const Arr  = list.map((el, i)=> {            
                const imgStyle = el.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" 
                ? {'objectFit' : 'unset'} : {'objectFit': 'cover'};
                return (
                    <li 
                        ref={el => itemRefs.current[i] = el}
                        tabIndex={0}
                        className="char__item" 
                        key={el.id} 
                        onClick={() => {
                            props.onCharSelected(el.id)
                            focusOnChar(i)
                            
                            }}
                            onKeyPress={(e) => {
                                if (e.key === ' ' || e.key === "Enter") {

                                    props.onCharSelected(el.id);
                                    focusOnChar(i);
                                }
                            }}>
                        <img src={el.thumbnail} alt={el.name} style={imgStyle}/>
                        <div className="char__name">{el.name}</div>
                    </li>);
            })
            
            return Arr;
        }
    }
    
    
    // console.log(this.props.onCharSelected);
    const newArr =  dataListOfCharacters(charList);
    
    const erorrMesage = error ? <ErrorMesage/> : null
    const spinner = loading ? <Spinner/> : null
    const content = !(loading || error) ? newArr : null;  
    return (
        <div className="char__list">
            <ul className="char__grid">                    
                {erorrMesage}
                {spinner}
                {content}
                {/* <li className="char__item char__item_selected"> */}
            </ul>
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick={() => {
                    onRequest(offset)
                    
                    }}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
    
}
CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
};

export default CharList;
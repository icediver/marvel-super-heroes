import './charList.scss';
import Spinner from '../spinner/Spinner';
import ErrorMesage from '../erorrMesage/ErrorMesage';
import { Transition, TransitionGroup } from 'react-transition-group';
// import abyss from '../../resources/img/abyss.jpg';
import { useState, useEffect, useRef } from 'react';
import useMarvelService from '../../services/MarvelService';
import PropTypes from 'prop-types';



const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(true);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);
    
        
    const {loading, error, getAllCharacters} = useMarvelService();

    
    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllCharacters(offset)
            .then(onCharListLoaded)
    };

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if(newCharList.length<9) {
            ended= true;
        }
        
        setCharList(charList => [...charList, ...newCharList]);
        setNewItemLoading(setNewItemLoading => false);
        setOffset(offset => (offset + 9));
        setCharEnded(charEnded => ended);
    };
    const itemRefs = useRef([]);

    const focusOnChar = (id) => {

        itemRefs.current.forEach(el => {
            el.classList.remove('char__item_selected');
        });

        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    
    };

    const duration = 200;

    const defaultStyle = {
        transition: `opacity ${duration}ms ease-in-out`,
        opacity: 0,
    }

    const transitionStyles = {
        // entering: { opacity: 0 },
        entered:  { opacity: 1 },
        exiting:  { opacity: 0 },
        exited:  { opacity: 0 },
    };
    
    function dataListOfCharacters  (list) {

        // if (list.length > 0) {
            
        const Arr  = list.map((el, i)=> {            
            const imgStyle = el.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" 
            ? {'objectFit' : 'unset'} : {'objectFit': 'cover'};
            
            return (
                <Transition key={el.id}  timeout={duration}>
                    {state => (
                        <li 
                            style={{
                                ...defaultStyle,
                                ...transitionStyles[state]
                            }}
                            ref={el => itemRefs.current[i] = el}
                            tabIndex={0}
                            className="char__item"                                
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
                        </li>
                    )}
                </Transition>

                );

        })
        
        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {Arr}
                </TransitionGroup>
            </ul>
        )

            // return Arr;
        // }
    }
    
    
    const newArr =  dataListOfCharacters(charList);
    
    const erorrMesage = error ? <ErrorMesage/> : null
    const spinner = loading && !newItemLoading ? <Spinner/> : null

    
    return (
        <div className="char__list">
                                
                {erorrMesage}
                {spinner}
                {newArr}
                {/* <li className="char__item char__item_selected"> */}
            
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
import './charList.scss';
import Spinner from '../spinner/Spinner';
import ErrorMesage from '../erorrMesage/ErrorMesage';
// import abyss from '../../resources/img/abyss.jpg';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import PropTypes from 'prop-types';

class CharList extends Component {
    
    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
        charEnded: false
    }
    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }
    onCharListLoading = (chars) => {
        this.setState(
            { 
                newItemLoading: true
            })
    }
    onCharListLoaded = (newCharList) => {
        let ended = false;
        if(newCharList.length<9) {
            ended= true;
        }

        this.setState(({offset, charList}) => ({                
                charList: [...charList, ...newCharList], 
                loading: false,
                newItemLoading: false,
                offset: offset + 9,
                charEnded: ended
            }))
    }
    onError = () => {
        this.setState(
            {
                loading: false,
                error: true
            })
    }
    itemRefs = [];

    setRef = (ref) => {
        
        this.itemRefs.push(ref);
    }
    focusOnChar(id) {

        this.itemRefs.forEach(el => {
            el.classList.remove('char__item_selected');
        });

        this.itemRefs[id].classList.add('char__item_selected');
        this.itemRefs[id].focus();
       
    }
    dataListOfCharacters = (list) => {

        if (list.length > 0) {
            const Arr  = list.map((el, i)=> {            
                const imgStyle = el.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" 
                ? {'objectFit': 'contain', 'transform': 'translate(-15px, -30px)'} : {'objectFit': 'cover'};
                return (
                    <li 
                        ref={this.setRef}
                        tabIndex={0}
                        className="char__item" 
                        key={el.id} 
                        onClick={() => {
                            this.props.onCharSelected(el.id)
                            this.focusOnChar(i)
                            
                            }}
                            onKeyPress={(e) => {
                                if (e.key === ' ' || e.key === "Enter") {

                                    this.props.onCharSelected(el.id);
                                    this.focusOnChar(i);
                                }
                            }}>
                        <img src={el.thumbnail} alt={el.name} style={imgStyle}/>
                        <div className="char__name">{el.name}</div>
                    </li>);
            })
            
            return Arr;
        }
    }
    
    
    render() {
        const {charList, loading, error, newItemLoading, offset, charEnded} = this.state;
        // console.log(this.props.onCharSelected);
        const newArr =  this.dataListOfCharacters(charList);
        
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
                        this.onRequest(offset)
                        
                        }}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}
CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
};

export default CharList;
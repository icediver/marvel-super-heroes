import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import './charInfo.scss';
import Spinner from '../spinner/Spinner';
import ErrorMesage from '../erorrMesage/ErrorMesage';
import Skeleton  from '../skeleton/Skeleton'
// import thor from '../../resources/img/thor.jpeg';
import MarvelService from '../../services/MarvelService';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
        
    const marvelService = new MarvelService();

    // useEffect(() => {
    //     updateChar();
    // }, []);

    useEffect(() => {
        updateChar();
    }, [props.charId]);

    const updateChar = () => {
        const {charId} = props;
        if (!charId) {
            return;
        }
        onCharLoading();
        marvelService
        .getCharacter(charId)            
        .then(onCharLoaded)
        // .then(el => console.log(el))
        .catch(onError)
    }
    const onCharLoaded = (char) => {
            setChar(char);
            setLoading(false);
    }
    const onCharLoading = () => {

        setLoading(true);
        
    }
    const onError = () => {

        setLoading(false);
        setError(true);
        
    }
    const skeleton = char || loading || error ? null : <Skeleton/>
    const erorrMesage = error ? <ErrorMesage/> : null
    const spinner = loading ? <Spinner/> : null
    const content = !(loading || error || !char) ? <View char={char}/> : null;
    return (
        <div className="char__info">
            {skeleton}
            {erorrMesage}
            {spinner}
            {content}

        </div>
    )
}
const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    const style = thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ? {'objectFit': 'fill'} : {}
        return(
            <>
            <div className="char__basics">
                    {/* <img src={thumbnail} alt={name} style={style}/> */}
                    <img src={thumbnail} alt={name} style={style}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">{description}</div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {   
                        (comics.length > 0) ? 
                            comics.map((item, i) => {   
                            return (
                                <li className="char__comics-item" key={i}>
                                    {item.name}
                                </li>                               
                            ) 
                            
                            }) : (
                                <li className="char__comics-item">
                                    There is no comics with this character
                                </li>                               
                            ) 
                    }
                    
                    
                    
                </ul>
            </>
    )
}
CharInfo.propTypes = {
    charId: PropTypes.number
}
export default CharInfo;
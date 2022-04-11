import AppBanner from "../appBanner/AppBanner";
import { useParams, Link } from 'react-router-dom';
import RandomChar from "../randomChar/RandomChar";
import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMesage from '../erorrMesage/ErrorMesage';
import useMarvelService from '../../services/MarvelService';
import { Helmet } from "react-helmet";


const noPicUrl = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";


const SingleCharacter =() => {
  const {charId} = useParams();
  // console.log(charId);
  const [char, setChar] = useState(null);
        
    const {error, loading, getCharacter, clearError} = useMarvelService();

    
    useEffect(() => {
        updateChar();
    }, []);

    const updateChar = () => {
        
        clearError();
        getCharacter(charId)   
        // .then(el => console.log(el))         
        .then(onCharLoaded)
    }
    const onCharLoaded = (char) => {
            setChar(char);
    }
  const erorrMesage = error ? <ErrorMesage/> : null
  const spinner = loading ? <Spinner/> : null
  const content = !(loading || error || !char) ? <View char={char}/> : null;
  return (
    <>
      <AppBanner/>
      {erorrMesage}
      {spinner}
      {content}
    </>
  )
}

const View = ({char}) => {
  const {name, allDescription, thumbnail, homepage, wiki} = char;
  const imgStyle = thumbnail === noPicUrl ? {'objectFit': 'contain'} : {'objectFit': 'cover'};
  return (
      <div className="randomchar__block"
        style={{
          'padding-left': 0,
          'grid-template-columns': '1fr 3fr'
        }}>
          <Helmet>
            <meta
              name="description"
              content={`${name} character page`}
            />
          <title>{name} character page</title>
          </Helmet>
          <img src={thumbnail}  alt="Random character" className="randomchar__bigimg" 
          style={imgStyle}/>
          <div className="randomchar__info">
              <p className="randomchar__name">{name}</p>
              <p className="randomchar__descr">{allDescription}</p>
              <div className="randomchar__btns">
                  <a href={homepage} className="button button__main">
                      <div className="inner">Homepage</div>
                  </a>
                  <a href={wiki} className="button button__secondary">
                      <div className="inner">Wiki</div>
                  </a>
              </div>
          </div>
      </div>
  )
}
export default SingleCharacter;
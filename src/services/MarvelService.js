import {useHttp} from '../hooks/http.hook'


const useMarvelService = () => {

  const {loading, request, error, clearError} = useHttp();
  const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  const _apiKey = 'apikey=e84e15ad94b233f8751af5efa017fbf9';
  const _baseOffset = 210;
  const _comicsOffset = 0;

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformCharacter);
  }
  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  }
  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description  ? `${char.description.slice(0, 210)} (...)` : 'No Description',
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
      

    }
  }
  const getAllComics = async (offset = _comicsOffset) => {
    const res = await request(`${_apiBase}comics?limit=8&&offset=${offset}&${_apiKey}`);    
    return res.data.results.map(_transformComics);
  }
  const getComic = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);    
    return _transformComics(res.data.results[0]);
  }
  const _transformComics = (comics) => {
    return {
      id: comics.id,
      title: comics.title,
      description: comics.description  ? `${comics.description.slice(0, 210)} (...)` : 'No Description',
      thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
      homepage: comics.urls[0].url,
      prices: !(comics.prices[0].price === 0) ? ` ${comics.prices[0].price}$` : '',
      pages: comics.pageCount,
      language: comics.textObjects.length > 0 ? comics.textObjects[0].language : 'none'
    }
  }
  return {loading, error,clearError, getAllCharacters, getCharacter, getAllComics, getComic}
}

export default useMarvelService;
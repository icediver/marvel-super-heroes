import { useState } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import './FindCharacter.scss';
import Spinner from '../spinner/Spinner';
import ErrorMesage from '../erorrMesage/ErrorMesage';
import useMarvelService from '../../services/MarvelService';
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';



const CharacterPageBtn = (props) => {
    
    return (
        <>
            <button className="button button__secondary">                                
                <div className="inner">
                    <Link to={`/character/${props.char.id}`}>
                        To page
                    </Link>
                </div>                            
            </button>
            
        </>
    )
}
const SearchedForm = () =>{
    return (
        <>
            <h3>Or find character by name</h3>
            <Field 
                name="charName" 
                className="char__find_input" 
                placeholder="Enter Name"/>

            <button className="button button__main" type="submit">
                <div className="inner">FIND</div>
            </button>
        </>
    )
}

const FindCharacter = () => {

    const {error, loading, clearError, getCharacterByName} = useMarvelService();
    const [char, setChar] = useState(null);
    const [charError, setCharError] = useState(null);
    

    const updateChar = (name) => {
        clearError();
        getCharacterByName(name)            
        .then(onCharLoaded)
    }
    const onCharLoaded = (char) => {
        setChar(char)
        char ?  setCharError(null) : setCharError(<h4 className='alert'>The character was not found. Check the name and try again</h4>)
        
}
    
    const erorrMesage = error ? <ErrorMesage/> : null
    const spinner = loading ? <Spinner/> : null
    // const content = !(loading || error) ? <View /> : null;
    
    return (
        <>   
            {erorrMesage}
            <Formik           
            
                initialValues={{charName: ""}}
                validationSchema={Yup.object({
                    charName: Yup.string()
                    .required('Обязательное поле!')
                })}
                onSubmit={({charName}) => {
                    updateChar(charName)
                    }}>  
                <Form className="form">
                <div className="char__find">    
                    <SearchedForm/>      
                    {
                        (char)  ? (
                            <>
                                <CharacterPageBtn char={char}/>
                                <h4 className='founded'>There is! Visit {char.charName} page?</h4>
                            </>
                            
                        ) : charError
                    }
                </div>
                </Form>
        </Formik>     
            {spinner}

        </>
    )
}

FindCharacter.propTypes = {
    charId: PropTypes.number
}
export default FindCharacter;
import { lazy, Suspense } from "react";
import AppHeader from "../appHeader/AppHeader";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom' 
// import { MainPage, ComicsPage,  SingleComicPage } from "../pages";
// import Page404 from "../pages/404";
import Spinner from "../spinner/Spinner";

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'));
const SingleCharacter = lazy(() => import('../pages/SingleCharacter'));


const App = () =>  {

    
    return (
        <Router>
            <div className="app">
            <AppHeader/>
            <main>
                <Suspense fallback={<Spinner/>}>
                    {/* <RandomChar updateDataList={this.updateDataList}/>  */}
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>                    
                        <Route path="/comics" element={<ComicsPage/>}/>    
                        <Route path="/comics/:comicId" element={<SingleComicPage/>}/>    
                        <Route path="/character/:charId" element={<SingleCharacter/>}/>    

                        <Route path="*" element={<Page404/>}/>
                        
                                            
                    </Routes>
                {/* <SingleComic/> */}
                </Suspense>
            </main>
        </div>
        </Router>
    )
}



export default App;
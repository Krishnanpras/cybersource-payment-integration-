
import './App.css';
import MyForm from './Firstpage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './First.css';
import userContext from './context';
import Second from './Second';
import Third from './Third';




function App() {
  return (
    
   <BrowserRouter>
        <userContext.Provider value={{data:null}}>
         
        
          <Routes> 
         <Route  path='/' element={<MyForm />}/>
         <Route path='/hi' element={<Second />}/>
        <Route path='/last' element={<Third/>}/>
          </Routes>
        </userContext.Provider>
      </BrowserRouter>

    
  );
}

export default App;

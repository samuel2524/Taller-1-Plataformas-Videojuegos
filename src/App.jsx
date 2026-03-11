import { BrowserRouter,Routes,Route } from 'react-router-dom';
// import { useEffect } from 'react';
// import { supabase } from "./lib/supaBaseCliente";
import './index.css'
import Register from './Pages/Register'
import Login from './Pages/Login';
import Principal from './Pages/PaginaPrincipal';


function App() {
   

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/PaginaPrincipal' element = {<Principal></Principal>}/>
        <Route path='/Register' element={<Register></Register>}/>
        <Route path='/Login' element={<Login></Login>}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App

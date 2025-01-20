
import Nav from './component/Nav';
import Footer from './component/Footer';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home';
import Lost from './pages/Lost'
import ReportLost from './pages/ReportLost';
import Found from './pages/Found';
import ReportFound from './pages/ReportFound';
import Profile from './pages/Profile';
import { FormDataProvider } from './context/FormdataContext';
import NewFoundFormdata from './context/NewFoundFormdata';
import Create from './pages/Create';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      


  
      <FormDataProvider>
        <NewFoundFormdata>

      

   
<BrowserRouter>
   <Nav/>
 
<Routes>

<Route path='/' index element={<Home/>} />

<Route path='lost' element={<Lost/>}/>
<Route path='reportlost' element={<ReportLost/>}/>

<Route path='found' element={<Found/>}/>
<Route path='reportfound' element={<ReportFound/>}/>
<Route path='profile' element={<Profile/>}/>
<Route path='create' element={<Create/>}/>
<Route path='login' element={<Login/>}/>


</Routes>
   <Footer/>
</BrowserRouter>

</NewFoundFormdata>
</FormDataProvider>

    </div>
  );
}

export default App;

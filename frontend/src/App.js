
import Nav from './component/Nav';
import Footer from './component/Footer';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home';
import Lost from './pages/Lost'
import ReportLost from './pages/ReportLost';
import Found from './pages/Found';
import ReportFound from './pages/ReportFound';
import Profile from './pages/Profile';

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


</Routes>
   <Footer/>
</BrowserRouter>

</NewFoundFormdata>
</FormDataProvider>


    </div>
  );
}

export default App;

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import Home from './Pages/Home/Home/Home';
import Header from './Pages/Shared/Header/Header';
import Login from './Pages/Login/Login/Login';
import Register from './Pages/Login/Register/Register';
import AuthProvider from './context/AuthProvider';
import NotFound from './Pages/Shared/404/NotFound';
import Home from './components/Home/Home';
import Buses from './components/Buses/Buses';
import Profile from './components/Profile/Profile';
import AddBus from './components/Admin/AddBus/addBus';
import MakeAdmin from './components/MakeAdmin/MakeAdmin';

function App() {
  return (
    <div className="App">

      <AuthProvider>

        <BrowserRouter>
          <Header></Header>
          <Switch>



            <Route exact path="/">
            <Home/>
            </Route>
            <Route exact path="/makeAdmin">
            <MakeAdmin></MakeAdmin>
            </Route>

            <Route exact path="/home">
              <Home></Home>
            </Route>
          
            <Route exact path="/login">
              <Login></Login>
            </Route>
            
            <Route path="/bus">
            <Buses />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path='/admin/addBus'>
            <AddBus />
          </Route>


            <Route exact path="/register">
              <Register></Register>
            </Route>

      



      


            <Route  path="*">
             <NotFound></NotFound>          
               </Route>


          </Switch>

          {/* <Footer></Footer> */}

        </BrowserRouter>


      </AuthProvider>



    </div>
  );
}

export default App;

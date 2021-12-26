import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './Pages/Shared/Header/Header';
import Login from './Pages/Login/Login/Login';
import Register from './Pages/Login/Register/Register';
import AuthProvider from './context/AuthProvider';
import NotFound from './Pages/Shared/404/NotFound';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import AddBus from './components/Admin/AddBus/addBus';
import MakeAdmin from './components/MakeAdmin/MakeAdmin';
import Buses from './components/Buses/Buses';
import Payment from './components/Payment/Payment';
import Record from './components/Record/Record';

function App() {
  return (
    <div className="App">
       <head>
        <title>BUS ROUTE TRACKER</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300&display=swap" rel="stylesheet" />
      </head>

      <AuthProvider>

        <BrowserRouter>
          <Header></Header>
          <Switch>



            <Route exact path="/">
            <Home/>
            </Route>
            <Route exact path="/bus">
            <Buses/>
            </Route>
            <Route exact path="/makeAdmin">
            <MakeAdmin></MakeAdmin>
            </Route>

            <Route exact path="/home">
              <Home></Home>
            </Route>
            <Route exact path="/record">
              <Record></Record>
            </Route>
          
            <Route exact path="/login">
              <Login></Login>
            </Route>
            
           
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path='/payment/:id'>
            <Payment />
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

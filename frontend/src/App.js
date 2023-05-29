import './App.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {Route,Link,Switch } from 'react-router-dom'
import MovieList from './Components/Movielist';
import Login from './Components/Login';
import AddReview from './Components/AddReview';
import Movie from './Components/Movie';
import { useState } from 'react';
function App() {
  const [user,setUser] = useState(null)

  async function loginUser(user=null){
    setUser(user)
  }

  async function logoutUser() {
    setUser(null)
  }
  return (
    <div className='App'>
     <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Movies Review</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link >
              <Link to={"/movies"}>Movies</Link>
            </Nav.Link>
            <Nav.Link>
              {user? (
                <a href="" onClick={logoutUser}>Logout</a>
              ):<Link to={"/login"}>Login</Link>}
            </Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>

    <Switch>
      <Route  path={"/movies"} component={MovieList}/>
      <Route path={"/movies/:id/review"} render={(props)=><AddReview {...props} user={user}/>}></Route>
      <Route path={"/movies/:id/"} render={(props)=><Movie {...props} user={user}/>}></Route>
      <Route path={"/login"}  render={(props)=><Login {...props} login={loginUser}/>}></Route>
    </Switch>

    </div>
  );
}

export default App;

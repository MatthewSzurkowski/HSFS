import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// NavDropdown
import { Container, Navbar, Nav} from 'react-bootstrap'
import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
import Home from './pages/Home';
import Files from './pages/Files';



function App() {
  return (
    <div className='font-sen'>
      <Router>
        <Navbar className="navbarToggle" bg="light" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">HSFS</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/files">Files</Nav.Link>
                {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown> */}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Routes>
          <Route path='/home' element={<Home/>} />
          <Route path='/' element={<Home/>} />
          <Route path='/files' element={<Files/>} />
        </Routes>
      </Router>
      {/* <ul>
        <div className='UniSeachNavTitle'>
          <h2 className='t9'>T9</h2>
        </div>
        <h2 className='UniSeachNavTitle'>UniSearch</h2>
        <li></li>>
      </ul> */}
      {/* <div className='container'>
        <DisplayContainer/>
      </div> */}
    </div>
  );
}

export default App;

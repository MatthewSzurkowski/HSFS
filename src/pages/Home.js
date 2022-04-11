import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import "./styles/Common.css";

function Home() {
  return (
      <Container>
        <h1 className="page-title">Home</h1>
        <div className='homepage-img-container'>
          <img src="https://i.imgur.com/agdn9rn.png"/>
        </div>
      </Container>
  );
}

export default Home;

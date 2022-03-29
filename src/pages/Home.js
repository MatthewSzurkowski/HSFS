import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import "./styles/Common.css";

function Home() {
  return (
      <Container>
        <h2 className="page-title">Home</h2>
        <div><h3>This is the homepage</h3></div>
      </Container>
  );
}

export default Home;

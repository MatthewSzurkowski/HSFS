import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import "./styles/Common.css";
import "./styles/Files.css";
import FileViewer from "../components/FileViewer";

function Files() {
    
  return (
      <Container>
        <h2 className="page-title">Files</h2>
        <div className='file-viewer-container'>
            <FileViewer/>
        </div>
      </Container>
  );
}

export default Files;

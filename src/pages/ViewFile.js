import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import "./styles/Common.css";
import ViewMyFile from "../components/ViewMyFile";

function ViewFile() {
  return (
      <Container>
        <h2 className="page-title">View Files</h2>
        <div><h3>View Files!</h3></div>
        <ViewMyFile/>
      </Container>
  );
}

export default ViewFile;

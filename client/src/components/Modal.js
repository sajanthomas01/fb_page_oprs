import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function ModalViewer({ show, handleClose, modalInfo, initiatePageUpdate }) {
  const [name, setName] = React.useState(modalInfo.name);
  const [about, setAbout] = React.useState(modalInfo.about);

  const handleSubmit=(e)=>{
    e.preventDefault();
    initiatePageUpdate(name, about, modalInfo.id)
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update {modalInfo.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" placeholder="Change name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Form.Text className="text-muted">
              Enter new name for page
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAbout">
            <Form.Label>About</Form.Label>
            <Form.Control type="about" placeholder="Change about"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
            <Form.Text className="text-muted">
              Enter new about for page
            </Form.Text>
          </Form.Group>
          <p> Remember that <b>"pages_manage_metadata permission"</b> needs <b>app review to be used</b>,
            without app review this update function wont work, all the code for this update stuff has been
            done in the backend</p>
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
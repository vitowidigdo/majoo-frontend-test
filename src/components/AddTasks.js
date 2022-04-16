import React from "react";
import { Col, Row, Button, Form, Modal, Table } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import { TasksContext } from "context/tasks";
import ResultModal from "components/ResultModal";

function AddTasks(props) {
  const { add, setAdd } = props;
  const { thisState, updateTask } = React.useContext(TasksContext);

  const handleCloseAdd = (prev) => setAdd({ ...prev, modal: false });
  const handleCloseResult = (prev) => setResult({ ...prev, modal: false });

  const [result, setResult] = React.useState({
    modal: false,
    resultText: "",
    postEdited: {},
  });

  const [taskValue, setTaskValue] = React.useState({
    id: "",
    title: "",
    description: "",
    status: "",
    createdAt: "",
  });

  function handleSubmit() {
    updateTask(taskValue);
    setResult((prev) => ({
      ...prev,
      resultText: "Success Edit Tasks!",
      modal: true,
      taskEdited: thisState?.task,
    }));
  }

  async function resetForm() {
    setTaskValue({
      id: "",
      title: "",
      description: "",
      status: "",
      createdAt: "",
    });
  }

  function handleIdChange(event) {
    console.log(event.target);
    setTaskValue((prev) => ({ ...prev, id: event.target.value }));
  }

  function handleTitleChange(event) {
    setTaskValue((prev) => ({ ...prev, title: event.target.value }));
  }

  function handleDescChange(event) {
    setTaskValue((prev) => ({ ...prev, description: event.target.value }));
  }

  function handleStatusChange(event) {
    setTaskValue((prev) => ({ ...prev, status: event.target.value }));
  }
  const handleClose = () => setResult((prev) => ({ ...prev, modal: false }));

  return (
    <>
      <Modal show={add.modal} onHide={handleClose} className="">
        <Modal.Header closeButton>
          <Modal.Title>Edit Tasks</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            maxHeight: "calc(100vh - 210px)",
            overflowY: "auto",
          }}
        >
          <Form
            style={{
              width: "max-content",
            }}
            onSubmit={() => handleSubmit()}
          >
            <Row>
              <Form.Group as={Col} controlId="id" className="mb-3">
                <Form.Label>ID</Form.Label>
                <Col sm="10">
                  <Form.Control
                    placeholder="ID"
                    onChange={handleIdChange}
                    value={taskValue.id}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Col} controlId="title" className="mb-3">
                <Form.Label>Title</Form.Label>
                <Col sm="10">
                  <Form.Control
                    placeholder="Title"
                    onChange={handleTitleChange}
                    value={taskValue.title}
                  />
                </Col>
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col} controlId="description" className="mb-3">
                <Form.Label>Description</Form.Label>
                <Col sm="10">
                  <Form.Control
                    placeholder="Description"
                    onChange={handleDescChange}
                    value={taskValue.description}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Col} controlId="status" className="mb-3">
                <Form.Label>Status</Form.Label>
                <Col sm="10">
                  <Form.Control
                    placeholder="Status"
                    onChange={handleStatusChange}
                    value={taskValue.status}
                  />
                </Col>
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            type="submit"
            onClick={() => handleSubmit()}
          >
            Save
          </Button>
          <Button variant="danger" onClick={() => resetForm()}>
            Cancel
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <ResultModal result={result} handleCloseResult={handleCloseResult} />
    </>
  );
}

export default AddTasks;

import React from "react";
// import { Link } from "react-router-dom";
import {
  Container,
  Button,
  Table,
  Modal,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import endpoint from "utils/endpoint";
import { TasksContext } from "context/tasks";

import Header from "components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import AddTasks from "components/AddTasks";
import TableTasks from "components/TableTasks";
import ResultModal from "components/ResultModal";

function Home() {
  const { thisState, updateTask } = React.useContext(TasksContext);

  async function getTasks() {
    const url = endpoint.api;
    try {
      fetch(url, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => updateTask(json));
    } catch (error) {
      console.error(error);
    }
  }
  const [selectedPost, setSelectedPost] = React.useState(null);

  const [taskValue, setTaskValue] = React.useState({
    id: "",
    title: "",
    description: "",
    status: "",
    createdAt: "",
  });

  React.useEffect(() => {
    getTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    setTaskValue({
      id: selectedPost?.id,
      title: selectedPost?.title,
      description: selectedPost?.description,
      status: Number(selectedPost?.status),
      // createdAt: new Date(),
    });
  }, [selectedPost]);

  const [openModal, setOpenModal] = React.useState(false);

  const [result, setResult] = React.useState({
    modal: false,
    resultText: "",
    taskEdited: {},
  });

  const [add, setAdd] = React.useState({
    modal: false,
    resultText: "",
    taskEdited: {},
  });
  const handleClose = () => setOpenModal(false);

  const handleCloseResult = () =>
    setResult((prev) => ({ ...prev, modal: false }));

  const handleOpenAdd = () => setAdd((prev) => ({ ...prev, modal: true }));

  const asc = () => {
    thisState?.task.sort(function compare(a, b) {
      var dateA = new Date(a.createdAt);
      var dateB = new Date(b.createdAt);
      return dateB - dateA;
    });
  };

  const desc = () => {
    thisState?.task.sort(function compare(a, b) {
      var dateA = new Date(a.createdAt);
      var dateB = new Date(b.createdAt);
      return dateA - dateB;
    });
  };

  const openEditTask = (selectedPost) => {
    setSelectedPost(selectedPost);
    setOpenModal(true);
  };

  function handleSubmit() {
    const updatedData = thisState?.task?.map((obj) => {
      if (obj.id === taskValue.id) {
        return {
          ...obj,
          title: taskValue.title,
          description: taskValue.description,
          status: taskValue.status,
          // createdAt: taskValue.createdAt,
        };
      } else return obj;
    });
    updateTask(updatedData);
    setResult((prev) => ({
      ...prev,
      resultText: "Success Edit Tasks!",
      modal: true,
      taskEdited: thisState?.task,
    }));
    setOpenModal(false);
  }

  async function deleteUserTasks(task) {
    if (!task.status) {
      const newTasks = thisState?.task?.filter((item) => item.id !== task.id);
      updateTask(newTasks);
      setResult((prev) => ({
        ...prev,
        resultText: !task.status
          ? "Success Delete Tasks!"
          : "Failed Delete Tasks!",
      }));
      setOpenModal(false);
      setResult((prev) => ({ ...prev, modal: true }));
    } else {
      setOpenModal(false);
      setResult((prev) => ({ ...prev, modal: true }));
      setResult((prev) => ({
        ...prev,
        resultText: "Task Status is Done, So It Cannot be Delete!",
      }));
    }
  }

  async function resetForm() {
    setTaskValue({
      id: selectedPost?.id,
      title: selectedPost?.title,
      description: selectedPost?.description,
      status: selectedPost?.status,
      createdAt: new Date(),
    });
  }

  function handleIdChange(event) {
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

  return (
    <Container>
      {/*  Site header */}
      <Header />
      <Button variant="primary" onClick={() => handleOpenAdd()}>
        Add Task
      </Button>

      <TableTasks
        statusDone={false}
        openEditTask={openEditTask}
        deleteUserTasks={deleteUserTasks}
        asc={asc}
        desc={desc}
      />
      <Modal show={openModal} onHide={handleClose} className="">
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
                    disabled
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

      <TableTasks
        statusDone={true}
        openEditTask={openEditTask}
        deleteUserTasks={deleteUserTasks}
        asc={asc}
        desc={desc}
      />
      <AddTasks add={add} setAdd={setAdd} />
      <ResultModal result={result} handleCloseResult={handleCloseResult} />
    </Container>
  );
}

export default Home;

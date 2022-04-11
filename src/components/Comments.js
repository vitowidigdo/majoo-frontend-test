import React from "react";
// import { Link } from "react-router-dom";
import {
  Container,
  Table,
  Button,
  Modal,
  Form,
  Col,
  Row,
} from "react-bootstrap";
import endpoint from "utils/endpoint";
import { PostsContext } from "context/posts";

import Header from "components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";

import AddComments from "./AddComments";

function Comments() {
  const { thisState, updateComments } = React.useContext(PostsContext);
  const [openModal, setOpenModal] = React.useState(false);

  const [result, setResult] = React.useState({
    modal: false,
    resultText: "",
    postEdited: {},
  });

  const [selectedPost, setSelectedPost] = React.useState(null);
  const handleClose = () => setOpenModal(false);

  const handleCloseResult = (prev) => setResult({ ...prev, modal: false });
  const { id } = useParams();

  async function getPostsComments() {
    const url = endpoint.comments;
    try {
      fetch(`${url}?postId=${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => updateComments(json));
    } catch (error) {
      console.error(error);
    }
  }

  React.useEffect(() => {
    getPostsComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.postEdited, result.resultText]);

  const openEditComments = (selectedPost) => {
    setSelectedPost(selectedPost);
    setOpenModal(true);
  };

  const handleOpenAdd = (prev) => setAdd({ ...prev, modal: true });

  const [add, setAdd] = React.useState({
    modal: false,
    resultText: "",
    postEdited: {},
  });

  const { handleSubmit, getFieldProps, values, resetForm } = useFormik({
    initialValues: {
      id: selectedPost?.id ? selectedPost?.id : "",
      postId: selectedPost?.postId ? selectedPost?.postId : "",
      name: selectedPost?.name ? selectedPost?.name : "",
      email: selectedPost?.email ? selectedPost?.email : "",
      body: selectedPost?.body ? selectedPost?.body : "",
    },
    enableReinitialize: true,
    onSubmit: (values, { setSubmitting }) => {
      const url = endpoint.comments;
      setSubmitting(true);
      fetch(`${url}/${values?.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          id: values.id,
          postId: values.postId,
          name: selectedPost?.name,
          email: selectedPost?.email,
          body: values.body,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => {
          setResult((prev) => ({
            ...prev,
            resultText: response.ok
              ? "Success Edit Comments!"
              : "Edit Comments Failed!",
          }));
          return response.json();
        })
        .then((json) => {
          console.log(json);
          setResult((prev) => ({
            ...prev,
            postEdited: json,
            modal: true,
          }));
          setOpenModal(false);
        });
    },
  });

  async function deleteComments(commentId) {
    const url = `${endpoint.comments}/${commentId}`;
    try {
      fetch(url, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => {
          setResult((prev) => ({
            ...prev,
            resultText:
              response.status === 200
                ? "Success Delete Comments!"
                : "Failed Delete Comments!",
          }));
        })
        .then(() => {
          setOpenModal(false);
          setResult((prev) => ({ ...prev, modal: true }));
        });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container>
      {/*  Site header */}
      <Header />
      <Button variant="primary" onClick={handleOpenAdd}>
        Add Comment
      </Button>
      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>Comments ID</th>
            <th>Comments postId</th>
            <th>Comments Name</th>
            <th>Comments Body</th>
            <th>Comments Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {thisState?.comments?.map((comment) => {
            return (
              <React.Fragment key={comment.id}>
                <tr className="mt-3">
                  <td>{comment.id}</td>

                  <td>{comment.postId}</td>

                  <td>{comment.name}</td>

                  <td style={{ width: "25%" }}>{comment.body}</td>

                  <td>{comment.email}</td>

                  <td>
                    <Button
                      variant="outline-info"
                      onClick={() => openEditComments(comment)}
                    >
                      Edit
                    </Button>
                    <Button
                      style={{ marginLeft: "5px" }}
                      variant="outline-danger"
                      onClick={() => deleteComments(comment.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
                <Modal show={openModal} onHide={handleClose} className="">
                  <Modal.Header closeButton>
                    <Modal.Title>{selectedPost?.title}</Modal.Title>
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
                      onSubmit={handleSubmit}
                    >
                      <Row>
                        <Form.Group as={Col} controlId="id" className="mb-3">
                          <Form.Label>ID</Form.Label>
                          <Col sm="10">
                            <Form.Control
                              placeholder="ID"
                              {...getFieldProps("id")}
                              value={values?.id}
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group
                          as={Col}
                          controlId="postId"
                          className="mb-3"
                        >
                          <Form.Label>Posts ID</Form.Label>
                          <Col sm="10">
                            <Form.Control
                              placeholder="Posts ID"
                              {...getFieldProps("postId")}
                              value={values?.postId}
                            />
                          </Col>
                        </Form.Group>
                      </Row>

                      <Row>
                        <Form.Group as={Col} controlId="name" className="mb-3">
                          <Form.Label>Comments Name</Form.Label>
                          <Col sm="10">
                            <Form.Control
                              placeholder="Name"
                              {...getFieldProps("name")}
                              value={values?.name}
                              disabled
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group as={Col} controlId="body" className="mb-3">
                          <Form.Label>Body</Form.Label>
                          <Col sm="10">
                            <Form.Control
                              placeholder="Body"
                              {...getFieldProps("body")}
                              value={values?.body}
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group as={Col} controlId="email" className="mb-3">
                          <Form.Label>Email</Form.Label>
                          <Col sm="10">
                            <Form.Control
                              placeholder="Email"
                              {...getFieldProps("email")}
                              value={values?.email}
                              disabled
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
                      onClick={handleSubmit}
                    >
                      Save
                    </Button>

                    <Button variant="danger" type="submit" onClick={resetForm}>
                      Cancel
                    </Button>

                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </React.Fragment>
            );
          })}
          <Modal show={result.modal} onHide={handleCloseResult}>
            <Modal.Header closeButton />
            <Modal.Body>
              {result.resultText}
              {result.resultText === "Success Edit Comments!" && (
                <Table striped bordered hover responsive className="mt-3">
                  <thead>
                    <tr>
                      <th>Comment ID</th>
                      <th>Comment postId</th>
                      <th>Comment Name</th>
                      <th>Comment Body</th>
                      <th>Comments Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="mt-3">
                      <td>{result?.postEdited?.id}</td>

                      <td>{result?.postEdited?.postId}</td>

                      <td>{result?.postEdited?.name}</td>

                      <td style={{ width: "25%" }}>
                        {result?.postEdited?.body}
                      </td>

                      <td>{result?.postEdited?.email}</td>
                    </tr>
                  </tbody>
                </Table>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseResult}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </tbody>
      </Table>
      <AddComments add={add} setAdd={setAdd} />
    </Container>
  );
}

export default Comments;

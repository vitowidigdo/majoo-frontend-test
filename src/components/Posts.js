import React from "react";
import { Link } from "react-router-dom";
import {
  Col,
  Container,
  Row,
  Button,
  Table,
  Form,
  Modal,
} from "react-bootstrap";
import endpoint from "utils/endpoint";
import { PostsContext } from "context/posts";
import { useFormik } from "formik";

import Header from "components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";

import AddPost from "./AddPost";

function Posts() {
  const { thisState, updatePosts } = React.useContext(PostsContext);

  const [openModal, setOpenModal] = React.useState(false);

  const [result, setResult] = React.useState({
    modal: false,
    resultText: "",
    postEdited: {},
  });

  const [add, setAdd] = React.useState({
    modal: false,
    resultText: "",
    postEdited: {},
  });

  const [selectedPost, setSelectedPost] = React.useState(null);

  const handleClose = () => setOpenModal(false);

  const handleCloseResult = (prev) => setResult({ ...prev, modal: false });

  const handleOpenAdd = (prev) => setAdd({ ...prev, modal: true });

  const { id } = useParams();
  async function getUserPosts() {
    const url = endpoint.posts,
      params = { userId: id };

    let query = Object.keys(params)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
      .join("&");
    try {
      fetch(`${url}?` + query, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => updatePosts(json));
    } catch (error) {
      console.error(error);
    }
  }

  React.useEffect(() => {
    getUserPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.postEdited, result.resultText]);

  const openEditPosts = (selectedPost) => {
    setSelectedPost(selectedPost);
    setOpenModal(true);
  };

  const { handleSubmit, getFieldProps, values, resetForm } = useFormik({
    initialValues: {
      id: selectedPost?.id ? selectedPost?.id : "",
      userId: selectedPost?.userId ? selectedPost?.userId : "",
      title: selectedPost?.title ? selectedPost?.title : "",
      body: selectedPost?.body ? selectedPost?.body : "",
    },
    enableReinitialize: true,
    onSubmit: (values, { setSubmitting }) => {
      const url = `${endpoint.posts}/${values?.id}`;
      setSubmitting(true);
      fetch(url, {
        method: "PATCH",
        body: JSON.stringify({
          id: values.id,
          title: values.title,
          body: values.body,
          userId: values.userId,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => {
          setResult((prev) => ({
            ...prev,
            resultText: response.ok
              ? "Success Edit Posts!"
              : "Edit Posts Failed!",
          }));
          return response.json();
        })
        .then((json) => {
          setResult((prev) => ({
            ...prev,
            postEdited: json,
            modal: true,
          }));
          setOpenModal(false);
        });
    },
  });
  async function deleteUserPosts(postId) {
    const url = `${endpoint.posts}/${postId}`;

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
                ? "Success Delete Posts!"
                : "Failed Delete Posts!",
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
    <>
      <Container>
        {/*  Site header */}
        <Header />
        <Button variant="primary" onClick={handleOpenAdd}>
          Add Post
        </Button>
        <Table striped bordered hover responsive className="mt-3">
          <thead>
            <tr>
              <th>Posts ID</th>
              <th>Posts UserId</th>
              <th>Posts Title</th>
              <th>Posts Body</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {thisState?.posts?.map((post) => {
              return (
                <React.Fragment key={post.id}>
                  <tr className="mt-3">
                    <td>{post.id}</td>

                    <td>{post.userId}</td>

                    <td>{post.title}</td>

                    <td style={{ width: "25%" }}>{post.body}</td>

                    <td>
                      <Link to={`/comments/${post?.id}`}>
                        <Button variant="outline-primary">Comments</Button>
                      </Link>
                      <Button
                        style={{ marginLeft: "4px" }}
                        variant="outline-info"
                        onClick={() => openEditPosts(post)}
                      >
                        Edit Posts
                      </Button>

                      <Button
                        style={{ marginTop: "4px" }}
                        variant="outline-danger"
                        onClick={() => deleteUserPosts(post.id)}
                      >
                        Delete Posts
                      </Button>
                    </td>
                  </tr>
                  <Modal show={openModal} onHide={handleClose} className="">
                    <Modal.Header closeButton>
                      <Modal.Title>Test Titles</Modal.Title>
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
                            controlId="userId"
                            className="mb-3"
                          >
                            <Form.Label>User ID</Form.Label>
                            <Col sm="10">
                              <Form.Control
                                placeholder="User ID"
                                {...getFieldProps("userId")}
                                value={values?.userId}
                              />
                            </Col>
                          </Form.Group>
                        </Row>

                        <Row>
                          <Form.Group
                            as={Col}
                            controlId="title"
                            className="mb-3"
                          >
                            <Form.Label>Title</Form.Label>
                            <Col sm="10">
                              <Form.Control
                                placeholder="Title"
                                {...getFieldProps("title")}
                                value={values?.title}
                              />
                            </Col>
                          </Form.Group>

                          <Form.Group
                            as={Col}
                            controlId="body"
                            className="mb-3"
                          >
                            <Form.Label>Body</Form.Label>
                            <Col sm="10">
                              <Form.Control
                                placeholder="Body"
                                {...getFieldProps("body")}
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
                      <Button variant="danger" onClick={() => resetForm()}>
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
                {result.resultText === "Success Edit Posts!" && (
                  <Table striped bordered hover responsive className="mt-3">
                    <thead>
                      <tr>
                        <th>Posts ID</th>
                        <th>Posts UserId</th>
                        <th>Posts Title</th>
                        <th>Posts Body</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="mt-3">
                        <td>{result?.postEdited?.id}</td>

                        <td>{result?.postEdited?.userId}</td>

                        <td>{result?.postEdited?.title}</td>

                        <td style={{ width: "25%" }}>
                          {result?.postEdited?.body}
                        </td>
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
        <AddPost add={add} setAdd={setAdd} />
      </Container>
    </>
  );
}

export default Posts;

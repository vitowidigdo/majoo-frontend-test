import React from "react";
import { Col, Row, Button, Form, Modal, Table } from "react-bootstrap";
import endpoint from "utils/endpoint";
import { useFormik } from "formik";

import "bootstrap/dist/css/bootstrap.min.css";

function AddPost(props) {
  const { add, setAdd } = props;

  const handleCloseAdd = (prev) => setAdd({ ...prev, modal: false });
  const handleCloseResult = (prev) => setResult({ ...prev, modal: false });

  const [result, setResult] = React.useState({
    modal: false,
    resultText: "",
    postEdited: {},
  });

  const { handleSubmit, getFieldProps, values, resetForm } = useFormik({
    initialValues: {
      id: "",
      userId: "",
      title: "",
      body: "",
    },
    enableReinitialize: true,
    onSubmit: (values, { setSubmitting }) => {
      const url = `${endpoint.posts}`;
      setSubmitting(true);
      fetch(url, {
        method: "POST",
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
              ? "Success Add Posts!"
              : "Add Posts Failed!",
          }));
          return response.json();
        })
        .then((json) => {
          resetForm();
          setResult((prev) => ({
            ...prev,
            postEdited: json,
            modal: true,
          }));
          setAdd((prev) => ({
            ...prev,
            modal: false,
          }));
        });
    },
  });

  return (
    <>
      <Modal show={add.modal} onHide={handleCloseAdd}>
        <Modal.Header closeButton />
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
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

              <Form.Group as={Col} controlId="userId" className="mb-3">
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
              <Form.Group as={Col} controlId="title" className="mb-3">
                <Form.Label>Title</Form.Label>
                <Col sm="10">
                  <Form.Control
                    placeholder="Title"
                    {...getFieldProps("title")}
                    value={values?.title}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Col} controlId="body" className="mb-3">
                <Form.Label>Body</Form.Label>
                <Col sm="10">
                  <Form.Control placeholder="Body" {...getFieldProps("body")} />
                </Col>
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="secondary" onClick={handleCloseAdd}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={result.modal} onHide={handleCloseResult}>
        <Modal.Header closeButton />
        <Modal.Body>
          {result.resultText}
          {result.resultText === "Success Add Posts!" && (
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

                  <td style={{ width: "25%" }}>{result?.postEdited?.body}</td>
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
    </>
  );
}

export default AddPost;

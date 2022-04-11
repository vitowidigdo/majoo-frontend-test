import React from "react";
import { Col, Row, Button, Form, Modal, Table } from "react-bootstrap";
import endpoint from "utils/endpoint";
import { useFormik } from "formik";

import "bootstrap/dist/css/bootstrap.min.css";

function AddComments(props) {
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
      postId: "",
      email: "",
      body: "",
      name: "",
    },
    enableReinitialize: true,
    onSubmit: (values, { setSubmitting }) => {
      const url = `${endpoint.comments}`;
      setSubmitting(true);
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          id: values.id,
          email: values.email,
          body: values.body,
          postId: values.postId,
          name: values.name,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => {
          setResult((prev) => ({
            ...prev,
            resultText: response.ok
              ? "Success Add Comments!"
              : "Add Comments Failed!",
          }));
          return response.json();
        })
        .then((json) => {
          console.log(json);
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

              <Form.Group as={Col} controlId="postId" className="mb-3">
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
                  />
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
          {result.resultText === "Success Add Comments!" && (
            <Table striped bordered hover responsive className="mt-3">
              <thead>
                <tr>
                  <th>Comments ID</th>
                  <th>Comments Post ID</th>
                  <th>Comments Name</th>
                  <th>Comments Body</th>
                  <th>Comments Email</th>
                </tr>
              </thead>
              <tbody>
                <tr className="mt-3">
                  <td>{result?.postEdited?.id}</td>

                  <td>{result?.postEdited?.postId}</td>

                  <td>{result?.postEdited?.name}</td>

                  <td style={{ width: "25%" }}>{result?.postEdited?.body}</td>

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
    </>
  );
}

export default AddComments;

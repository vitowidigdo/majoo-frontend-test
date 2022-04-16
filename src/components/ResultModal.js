import React from "react";
import { Button, Modal, Table } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

function ResultModal(props) {
  const { result, handleCloseResult } = props;

  return (
    <Modal show={result.modal} onHide={handleCloseResult}>
      <Modal.Header closeButton />
      <Modal.Body>
        {result.resultText}
        {/* {result.resultText === "Success Edit Tasks!" && (
          <Table striped bordered hover responsive className="mt-3">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              <tr className="mt-3">
                <td>{result?.taskEdited?.id}</td>

                <td>{result?.taskEdited?.title}</td>

                <td style={{ width: "25%" }}>
                  {result?.taskEdited?.description}
                </td>

                <td>{result?.taskEdited?.status}</td>

                <td>{result?.taskEdited?.createdAt}</td>
              </tr>
            </tbody>
          </Table>
        )} */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseResult}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ResultModal;

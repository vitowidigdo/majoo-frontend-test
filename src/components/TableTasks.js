import React from "react";
// import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { TasksContext } from "context/tasks";

function Comments(props) {
  const { thisState } = React.useContext(TasksContext);
  const { statusDone, openEditTask, deleteUserTasks, asc, desc } = props;
  return (
    <>
      {statusDone ? (
        <Table striped bordered hover responsive className="mt-3">
          <thead>
            Status Done
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {thisState?.task
              ?.filter((data) => data?.status)
              ?.map((task) => {
                return (
                  <React.Fragment key={task.id}>
                    <tr className="mt-3">
                      <td>{task.id}</td>

                      <td>{task.title}</td>

                      <td>{task.description}</td>

                      <td>{task.status}</td>

                      <td>{task.createdAt}</td>

                      <td
                        colSpan={2}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Button
                          variant="outline-primary"
                          onClick={() => openEditTask(task)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline-danger"
                          onClick={() => deleteUserTasks(task)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })
              .sort(asc)}
          </tbody>
        </Table>
      ) : (
        <Table striped bordered hover responsive className="mt-3">
          <thead>
            Status Not Done
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {thisState?.task
              ?.filter((data) => !data?.status)
              ?.map((task) => {
                return (
                  <React.Fragment key={task.id}>
                    <tr className="mt-3">
                      <td>{task.id}</td>

                      <td>{task.title}</td>

                      <td>{task.description}</td>

                      <td>{task.status}</td>

                      <td>{task.createdAt}</td>

                      <td
                        colSpan={2}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Button
                          variant="outline-primary"
                          onClick={() => openEditTask(task)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline-danger"
                          onClick={() => deleteUserTasks(task)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })
              .sort(desc)}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default Comments;

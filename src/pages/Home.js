import React from "react";
import { Link } from "react-router-dom";
import { Container, Button, Table } from "react-bootstrap";
import endpoint from "utils/endpoint";
import { PostsContext } from "context/posts";

import Header from "components/Header";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  const { thisState, updateUsers } = React.useContext(PostsContext);

  async function getUsers() {
    const url = endpoint.users;
    try {
      fetch(url, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => updateUsers(json));
    } catch (error) {
      console.error(error);
    }
  }

  React.useEffect(() => {
    getUsers();
  }, []);

  return (
    <Container>
      {/*  Site header */}
      <Header />
      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Website</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {thisState?.users?.map((user) => {
            return (
              <tr className="mt-3" key={user.id}>
                <td>{user.name}</td>

                <td>{user.username}</td>

                <td>{user.website}</td>

                <td>{user.email}</td>

                <td>{user.phone}</td>

                <td
                  colSpan={2}
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <td>
                    <Link to={`/posts/${user?.id}`}>
                      <Button variant="outline-primary">Posts</Button>{" "}
                    </Link>
                  </td>

                  <td>
                    <Link to={`/albums/${user?.id}`}>
                      <Button variant="outline-info">Albums</Button>{" "}
                    </Link>
                  </td>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}

export default Home;

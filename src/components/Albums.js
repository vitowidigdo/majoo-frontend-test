import React from "react";
import { Container, Modal, Button, Table } from "react-bootstrap";
import endpoint from "utils/endpoint";

import Header from "components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";

function Albums() {
  const [albums, setUserAlbums] = React.useState(null);

  const [photos, setAlbumPhotos] = React.useState(null);

  const [openPhotosModal, setOpenPhotosModal] = React.useState(false);

  const [albumTitles, setAlbumTitles] = React.useState("");

  const handleClose = () => setOpenPhotosModal(false);

  const [isLoading, setLoading] = React.useState(false);

  const { id } = useParams();

  async function getUserAlbums() {
    const url = endpoint.albums;
    try {
      fetch(id ? `${url}?userId=${id}` : `${url}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => setUserAlbums(json));
    } catch (error) {
      console.error(error);
    }
  }

  React.useEffect(() => {
    getUserAlbums();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getAlbumPhotos(albumId) {
    setLoading(true);
    try {
      fetch(`${endpoint.albums}/${albumId}/photos`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          setLoading(false);
          setAlbumPhotos(json);
          setOpenPhotosModal(true);
        });

      ////////////////////////////////////////////////////////////////////

      fetch(`${endpoint.albums}/${albumId}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => setAlbumTitles(json.title));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container>
      {/*  Site header */}
      <Header />
      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>Albums ID</th>
            <th>Albums UserId</th>
            <th>Albums Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {albums?.map((album) => {
            return (
              <React.Fragment key={album.id}>
                <tr className="mt-3">
                  <td>{album.id}</td>

                  <td>{album.userId}</td>

                  <td>{album.title}</td>

                  <td
                    colSpan={2}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Button
                      onClick={
                        !isLoading
                          ? () => {
                              getAlbumPhotos(album.id);
                            }
                          : null
                      }
                      variant="outline-primary"
                    >
                      {isLoading ? "Loading…" : "See Album Photos"}
                    </Button>{" "}
                  </td>
                </tr>
                <Modal show={openPhotosModal} onHide={handleClose} className="">
                  <Modal.Header closeButton>
                    <Modal.Title>{albumTitles}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body
                    style={{
                      maxHeight: "calc(100vh - 210px)",
                      overflowY: "auto",
                    }}
                  >
                    {
                      // album.id === photos?.[0]?.albumId &&
                      photos?.map((photo) => {
                        // console.log(album);
                        return (
                          <a href={`${photo?.url}`} key={photo.id}>
                            <img
                              src={photo?.thumbnailUrl}
                              alt=""
                              style={{ paddingTop: "20px" }}
                            />
                            <div>
                              <strong>ID: </strong> {photo?.id}
                            </div>
                            <div>
                              <strong>Album ID: </strong> {photo?.albumId}
                            </div>
                            <div>
                              <strong>Title: </strong> {photo?.title}
                            </div>
                          </a>
                        );
                      })
                    }
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </React.Fragment>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}

export default Albums;

import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Table from "react-bootstrap/Table";
import { useQuery, useMutation } from '@apollo/client';

import SideBar from "./components/SideBar.js";
import { GET_CONNECTED_FB_PAGES } from "./queries/index.js";
import { UPDATE_FB_PAGE } from "./mutations/index.js";
import { snackBarAlert } from "./utils.js";
import TableRow from "./components/TableRow.js";
import Modal from "./components/Modal.js";

export default function Dashboard({ userInfo }) {
  // gql mutation + query
  const { loading, error, data } = useQuery(GET_CONNECTED_FB_PAGES, {
    variables: { fbUserId: userInfo.userId, accessToken: userInfo.token }
  });
  const [updateFbPage, { data: updatedData, loading: updateLoading, error: updateError }] = useMutation(UPDATE_FB_PAGE);
  const [show, setShow] = React.useState(false);

  // state
  const [modalInfo, setModalInfo] = React.useState();

  React.useEffect(() => {
    if (data?.getConnectedFbPages?.error) {
      snackBarAlert("error", data?.getConnectedFbPages?.message);
    }
  }, [data?.getConnectedFbPages?.error, data?.getConnectedFbPages?.message])

  React.useEffect(() => {
    if (updatedData?.updateFbPage?.error) {
      snackBarAlert("error", updatedData?.updateFbPage?.message);
    }
  }, [updatedData?.updateFbPage?.error, updatedData?.updateFbPage?.message])


  // functions 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateFb = (pageInfo) => {
    setModalInfo(pageInfo);
    if (pageInfo) {
      handleShow();
    }
  }

  const initiatePageUpdate = (name, about, pageId) => {
    updateFbPage({
      variables: {
        "updateFbPageAccessToken": userInfo.token,
        "updateFbPagePageId": pageId,
        "updateFbPageName": name,
        "updateFbPageAbout": about
      }
    });
  }


  if (loading) return 'Fetching...';
  if (error) return `Submission error! ${error}`;

  return (
    <Container fluid>
      {show && (
        <Modal
          show={show}
          handleClose={handleClose}
          modalInfo={modalInfo}
          initiatePageUpdate={initiatePageUpdate} />
      )}
      <Row>
        <Col xs lg="2" id="sidebar-wrapper">
          <SideBar />
        </Col>
        <Col lg="10" style={{ padding: 0 }}>
          <Row id="sidebar-header" className="base-header">
            <DropdownButton id="dropdown-basic-button" title="San Jose, CA">
              <Dropdown.Item href="#/action-1">Kerala</Dropdown.Item>
            </DropdownButton>
          </Row>
          <Row style={{ margin: "2rem" }}>
            <Table hover bordered style={{ margin: 0 }}>
              <thead>
                <tr>
                  <th style={{
                    textAlign: "center", fontSize: "2rem",
                    fontWeight: '400',
                    background: "#eef5f4"
                  }}>Listings</th>
                </tr>
              </thead>
            </Table>
            <Table hover bordered style={{ textAlign: "center" }}>
              <thead>
                <tr>
                  <th></th>
                  <th>Source</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Rating</th>
                  <th>Listed</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <TableRow data={data} updateFb={updateFb} />
                <tr>
                  <td></td>
                  <td>Google</td>
                  <td> ABC Dental</td>
                  <td>2101 California St</td>
                  <td>1111111111</td>
                  <td>3/5</td>
                  <td>Yes</td>
                  <td> ✔️</td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td>Yelp</td>
                  <td> ABC Dental</td>
                  <td>2101 California St</td>
                  <td>1111111111</td>
                  <td>3/5</td>
                  <td>Yes</td>
                  <td> ✔️</td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td>Yahoo</td>
                  <td> ABC Dental</td>
                  <td>2101 California St</td>
                  <td>1111111111</td>
                  <td>3/5</td>
                  <td>Yes</td>
                  <td>✔️</td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td>Foursquare</td>
                  <td> ABC Dental</td>
                  <td>2101 California St</td>
                  <td>1111111111</td>
                  <td>3/5</td>
                  <td>Yes</td>
                  <td> ✔️</td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
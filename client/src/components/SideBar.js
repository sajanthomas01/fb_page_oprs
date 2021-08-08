import React from "react";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';

const SideBar = () => {

  return (
    <div className="sidebar">

      <Row id="sidebar-header">
        FB PAGE TEST
      </Row>
      <Row>
        <Nav className="d-md-block"
          activeKey="/home"
          onSelect={selectedKey => alert(`selected ${selectedKey}`)}
        >
          <Nav.Item>
            <Nav.Link href="/home"><i className="fa fa-home"></i>Dashboard</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-1"><i className="fa fa-cog"></i>Website</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2"><i className="fa fa-cog"></i>Visitors</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2"><i className="fa fa-star"></i>Reviews</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2"><i className="fa fa-list"></i>Listings</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2"><i className="fa fa-calendar"></i>Appointments</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2"><i className="fa fa-cog"></i>Settings</Nav.Link>
          </Nav.Item>
        </Nav>
      </Row>

    </div>
  );
};
export default SideBar
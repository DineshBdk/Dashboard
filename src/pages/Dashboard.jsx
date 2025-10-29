import { Container, Row, Col } from "react-bootstrap";
import { NavbarComp } from "../components/NavbarComp";
import { Sidebar } from "../components/Sidebar";
import {Cards} from "../components/Cards";
import { AssetDetails } from "../components/AssetDetails";
import { AssetDataTable } from "../components/AssetDataTable";

export const Dashboard = () => {
  return (
    <>
      <NavbarComp />
      <Container fluid>
        <Row>
          <Col xs={12} md={2} className="p-0">
            <Sidebar />
          </Col>
          
        <Col xs={12} md={10} className="p-4 bg-light">
            <Cards />
            <AssetDetails />
            <AssetDataTable/>
        </Col>
        </Row>
      </Container>
    </>
  );
};

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Table, Spinner, Alert } from "react-bootstrap";
import axios from "axios";

export const AssetDetails = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const res = await axios.post(
          "http://mailpointapi.chenduratechnology.com/api/Asset/GetAssetDataDashboard",
          {
            CompanyKey: "0",
            CityKey: 0,
            SiteKey: 0,
            CreatedUserKey: 1022,
            CreatedBy: "Vigramraj",
          },
          {
            headers: {
              TokenVal: "JOKvcOEV3kgVtNryyByRRo++k4Bkixts",
              "Content-Type": "application/json",
            },
          }
        );

        const result = res.data?.data?.Result || [];
        result.forEach(arr => {
          if (arr[0]?.AssetCode && arr[0]?.AssetName) setAssets(arr);
        });
      }
      catch (err) {
        console.error(err);
        setError("Failed to fetch asset details");
      }
      finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, []);

  if (loading)
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    );

  if (error) return <Alert variant="danger">{error}</Alert>;

  if (assets.length === 0)
    return <Alert variant="warning">No asset details found</Alert>;

return (
    <Container fluid>
      <Card className="shadow-sm border-0 mb-3">
        <Card.Header className="fw-bold">
          Asset Details
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive size="sm">
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Category</th>
                <th>Group</th>
                <th>Employee</th>
                <th>Company</th>
                <th>Value (₹)</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((item, index) => (
                <tr key={index}>
                  <td>{item.AssetCode}</td>
                  <td>{item.AssetName}</td>
                  <td>{item.AssetCategoryName}</td>
                  <td>{item.AssetGroupName}</td>
                  <td>{item.EmployeeName}</td>
                  <td>{item.vCompanyName}</td>
                  <td>{item.Value}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

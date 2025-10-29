import React, { useState, useEffect } from "react";
import { Row, Col, Card, Spinner, Alert, Container } from "react-bootstrap";
import axios from "axios";

export const Cards = () => {
    const [assetsByCompany, setAssetsByCompany] = useState([]);
    const [assetsByStatus, setAssetsByStatus] = useState([]);
    const [assetsByCategory, setAssetsByCategory] = useState([]);
    const [topAssets, setTopAssets] = useState([]);
    const [purchaseTrend, setPurchaseTrend] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
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
        setAssetsByCompany(result[1]?.[0] ? [result[1][0]] : []);
        setAssetsByStatus(result[0]?.[0] ? [result[0][0]] : []);
        setAssetsByCategory(result[3] || []);
          
    result.forEach(arr => {
        if (arr[0]?.AssetName && arr.length <= 10) setTopAssets(arr);
        if (arr[0]?.MonthName && arr[0]?.TotalPurchaseValue) setPurchaseTrend(arr);
    });


    }
      catch (err) {
        console.error(err);
        setError("Failed to load data");
    }
      finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    );

  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container fluid>
      <h4 className="mb-3">Dashboard Summary</h4>
      <Card className="mb-4 shadow-sm border-0">
        <Card.Header className="bg-primary text-white fw-bold">
          Assets by Company
        </Card.Header>
        <Card.Body>
          <Row>
            {assetsByCompany.length > 0 ? (
              assetsByCompany.map((item, index) => (
                <Col key={index} md={5} sm={6} xs={12}>
                  <Card className="text-center shadow-sm border-0 mb-3">
                    <Card.Body>
                      <Card.Title>{item.vCompanyName}</Card.Title>
                      <h3 className="text-success">{item.AssetCount}</h3>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <Alert variant="warning">No company data found</Alert>
            )}
          </Row>
        </Card.Body>
          </Card>
          
      <Card className="mb-4 shadow-sm border-0">
        <Card.Header className="bg-success text-white fw-bold">
          Assets by Status
        </Card.Header>
        <Card.Body>
          {assetsByStatus.length > 0 ? (
            <Row>
              {Object.entries(assetsByStatus[0]).map(([key, val], i) => (
                <Col key={i} md={3} sm={6} xs={12}>
                  <Card className="text-center shadow-sm border-0 mb-3">
                    <Card.Body>
                      <Card.Title>{key}</Card.Title>
                      <h3 className="text-primary">{val}</h3>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <Alert variant="warning">No status data found</Alert>
          )}
        </Card.Body>
      </Card>

    <Card className="mb-4 shadow-sm border-0">
        <Card.Header className="bg-warning text-dark fw-bold">
          Assets by Category
        </Card.Header>
        <Card.Body>
          <Row>
            {assetsByCategory.length > 0 ? (
              assetsByCategory.map((cat, i) => (
                <Col key={i} md={3} sm={6} xs={12}>
                  <Card className="text-center shadow-sm border-0 mb-3">
                    <Card.Body>
                      <Card.Title>{cat.AssetCategoryName}</Card.Title>
                      <h3 className="text-danger">{cat.AssetCount}</h3>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <Alert variant="warning">No category data found</Alert>
            )}
          </Row>
        </Card.Body>
          </Card>
          
  <Row>
  <Col md={6}>
    <Card className="shadow-sm border-0 mb-4">
      <Card.Header className="bg-info text-white fw-bold">
        Purchase Value Trend
      </Card.Header>
      <Card.Body>
        {purchaseTrend.length > 0 ? (
          <ul className="list-group">
            {purchaseTrend.map((item, i) => (
              <li key={i} className="list-group-item d-flex justify-content-between">
                <span>{item.MonthName}</span>
                <strong>₹{item.TotalPurchaseValue}</strong>
              </li>
            ))}
          </ul>
        ) : (
          <Alert variant="warning">No trend data found</Alert>
        )}
      </Card.Body>
    </Card>
  </Col>

  <Col md={6}>
    <Card className="shadow-sm border-0 mb-4">
      <Card.Header className="bg-secondary text-white fw-bold">
        Top 10 Expensive Assets
      </Card.Header>
      <Card.Body>
        {topAssets.length > 0 ? (
          <ul className="list-group">
            {topAssets.map((item, i) => (
              <li key={i} className="list-group-item d-flex justify-content-between">
                <span>{item.AssetName}</span>
                <strong>₹{item.PurchaseValue}</strong>
              </li>
            ))}
          </ul>
        ) : (
          <Alert variant="warning">No expensive assets found</Alert>
        )}
      </Card.Body>
    </Card>
  </Col>
</Row>
    
    </Container>
  );
};
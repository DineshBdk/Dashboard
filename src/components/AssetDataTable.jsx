import React, { useState, useEffect } from "react";
import { Table, Container, Spinner, Alert, Form, Row, Col, Button } from "react-bootstrap";
import axios from "axios";

export const AssetDataTable = () => {
  const [assets, setAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchText, setSearchText] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const res = await axios.post(
          "http://mailpointapi.chenduratechnology.com/api/Asset/GetAssetList",
          {
            AssetKey: 0,
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

        const data = res.data?.data || [];
        setAssets(data);
        setFilteredAssets(data);
      }
      catch (err) {
        setError("Failed to load asset list");
      }
      finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, []);


  useEffect(() => {
    let filtered = assets.filter( (item) =>
        item.AssetName?.toLowerCase().includes(searchText.toLowerCase()) ||
        item.AssetCategoryName?.toLowerCase().includes(searchText.toLowerCase())
    );

  
    if (sortField) {
      filtered.sort((a, b) => {
        const valA = a[sortField] ?? "";
        const valB = b[sortField] ?? "";
        if (valA < valB) return sortOrder === "asc" ? -1 : 1;
        if (valA > valB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    setFilteredAssets(filtered);
    setCurrentPage(1);
  }, [searchText, assets, sortField, sortOrder]);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentAssets = filteredAssets.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredAssets.length / itemsPerPage);

  if (loading)
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    );

  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container fluid>
      <h4 className="mb-3">Asset Data Table</h4>

      
      <Row className="mb-3">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Search by Name or Category"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Col>

        <Col md={4}>
          <Form.Select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}>
            <option value="">Sort By</option>
            <option value="AssetID">Asset ID</option>
            <option value="AssetName">Asset Name</option>
            <option value="AssetCategoryName">Category</option>
            <option value="AssetStatus">Status</option>
            <option value="CreatedDate">Created Date</option>
          </Form.Select>
        </Col>
      </Row>

  
      <Table striped bordered hover responsive>
        <thead className="bg-dark text-white">
          <tr>
            <th>Asset ID</th>
            <th>Asset Name</th>
            <th>Category</th>
            <th>Status</th>
            <th>Created Date</th>
          </tr>
        </thead>
        <tbody>
          {currentAssets.map((item, i) => (
            <tr key={i}>
              <td>{item.AssetID}</td>
              <td>{item.AssetName}</td>
              <td>{item.AssetCategoryName}</td>
              <td>{item.AssetStatus}</td>
              <td>{item.CreatedDate}</td>
            </tr>
          ))}
        </tbody>
      </Table>


      <div className="d-flex justify-content-between align-items-center">
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <div>
          <Button
            className="me-2"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </Button>
          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </Container>
  );
};


import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Table, Card, Button, Badge, Form, Alert } from 'react-bootstrap';
import { FaCalendarAlt, FaChartLine, FaSyncAlt } from 'react-icons/fa';

const API_URL = process.env.REACT_APP_API_URL;

export default function Ticktesagent() {
  const [token, setToken] = useState("");
  const [reclamtion, setReclamtion] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTiktes, setSelectedTicktes] = useState(null);
  const [allagent, setAgent] = useState([]);
  const [valeurPredict, setValeurPredict] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const status = ["open", "Closed", "In progress"];
  const statusColors = {
    "open": "primary",
    "Closed": "success",
    "In progress": "warning",
    "termine": "danger"
  };

  const getData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/agent/alltickts`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReclamtion(res.data);
    } catch (error) {
      console.log("Error fetching tickets:", error);
      setError("Failed to load tickets");
    } finally {
      setLoading(false);
    }
  };

  const allgent = async () => {
    try {
      const res = await axios.get(`${API_URL}/agent/allagent`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAgent(res.data);
    } catch (error) {
      console.log("Error fetching agents:", error);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const a = JSON.parse(user);
      setToken(a.token);
    }
  }, []);

  useEffect(() => {
    if (token) {
      getData();
      allgent();
    }
  }, [token]);

  const handechange = async (e, id) => {
    const newstatus = { "status": e.target.value };
    try {
      await axios.post(`${API_URL}/agent/ticket/status/${id}`, newstatus, {
        headers: { Authorization: `Bearer ${token}` }
      });
      getData();
    } catch (error) {
      console.log("Error updating status:", error);
      setError("Failed to update ticket status");
    }
  };

  const datepredict = useRef();
  const handlpredict = async () => {
    const datelewle = datepredict.current.value;
    if (!datelewle) {
      setError("Please select a date first");
      return;
    }

    const [year, month, day] = datelewle.split("-");
    const date = `${day}-${month}-${year}`;
    const datep = { "date": date };

    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/agent/predict`, datep, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setValeurPredict(res.data);
    } catch (error) {
      console.error(error);
      setError("Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="mb-0">
              <FaCalendarAlt className="me-2 text-primary" />
              Ticket Management
            </h2>
            <Button variant="outline-primary" onClick={getData}>
              <FaSyncAlt className="me-2" />
              Refresh
            </Button>
          </div>

          <div className="d-flex align-items-center mb-4">
            <Form.Control
              type="date"
              ref={datepredict}
              className="me-2"
              style={{ maxWidth: '200px' }}
            />
            <Button variant="primary" onClick={handlpredict} disabled={loading}>
              <FaChartLine className="me-2" />
              {loading ? 'Predicting...' : 'Predict'}
            </Button>
          </div>

          {valeurPredict && (
            <Alert variant="info" className="d-flex align-items-center">
              <FaChartLine className="me-2" />
              Predicted tickets for selected date: <strong className="ms-2">{valeurPredict.prediction}</strong>
            </Alert>
          )}

          {error && <Alert variant="danger">{error}</Alert>}
        </Card.Body>
      </Card>

      <Card className="shadow-sm">
        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table hover className="mb-0">
              <thead className="bg-light">
                <tr>
                  <th>Agent</th>
                  <th>User Email</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Change Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </td>
                  </tr>
                ) : reclamtion.map((u) => (
                  <tr key={u.id} className={u.status === "termine" ? "table-danger" : ""}>
                    <td>{u.user_AGENT?.nom || 'Unassigned'}</td>
                    <td>{u.user_id.email}</td>
                    <td className="text-truncate" style={{ maxWidth: '200px' }} title={u.description}>
                      {u.description}
                    </td>
                    <td>
                      <Badge bg={statusColors[u.status] || "secondary"}>
                        {u.status}
                      </Badge>
                    </td>
                    <td>
                      <Form.Select
                        size="sm"
                        value={u.status}
                        onChange={(e) => handechange(e, u.id)}
                      >
                        {status.map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </Form.Select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
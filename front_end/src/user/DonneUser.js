import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = process.env.REACT_APP_API_URL;

export default function DashboardSummary() {
    const [allTickets, setAllTickets] = useState([]);
    const [token, setToken] = useState("");
    const [stats, setStats] = useState({
        total: 0,
        resolved: 0,
        inProgress: 0,
        rejected: 0
    });

    useEffect(() => {
        const fetchTokenAndTickets = async () => {
            const user = localStorage.getItem("user");
            if (user) {
                const userData = JSON.parse(user);
                setToken(userData.token);

                try {
                    const res = await axios.get(`${API_URL}/user/alltickts`, {
                        headers: {
                            Authorization: `Bearer ${userData.token}`,
                        },
                    });
                    setAllTickets(res.data);
                    calculateStats(res.data);
                } catch (error) {
                    console.error("Error fetching tickets:", error);
                }
            }
        };

        fetchTokenAndTickets();
    }, []);

    const calculateStats = (tickets) => {
        setStats({
            total: tickets.length,
            resolved: tickets.filter(t => t.status?.toLowerCase() === 'resolved').length,
            inProgress: tickets.filter(t => t.status?.toLowerCase() === 'in progress').length,
            rejected: tickets.filter(t => t.status?.toLowerCase() === 'rejected').length
        });
    };

    const getStatusBadge = (status) => {
        const statusColors = {
            open: "primary",
            pending: "warning",
            resolved: "success",
            'in progress': "info",
            rejected: "danger",
            closed: "secondary"
        };
        return (
            <Badge bg={statusColors[status?.toLowerCase()] || "dark"} className="text-capitalize">
                {status}
            </Badge>
        );
    };

    return (
        <div className="container py-4">
            {/* Summary Cards */}
            <div className="row g-4 mb-4">
                <div className="col-md-3">
                    <div className="card text-white bg-primary h-100 shadow-sm border-0">
                        <div className="card-body">
                            <h5 className="card-title">🎫 Total Tickets</h5>
                            <p className="card-text display-6">{stats.total}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-white bg-success h-100 shadow-sm border-0">
                        <div className="card-body">
                            <h5 className="card-title">✅ Resolved</h5>
                            <p className="card-text display-6">{stats.resolved}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-white bg-info h-100 shadow-sm border-0">
                        <div className="card-body">
                            <h5 className="card-title">⚙️ In Progress</h5>
                            <p className="card-text display-6">{stats.inProgress}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-white bg-danger h-100 shadow-sm border-0">
                        <div className="card-body">
                            <h5 className="card-title">❌ Rejected</h5>
                            <p className="card-text display-6">{stats.rejected}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ticket Cards */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">📋 Recent Tickets</h2>
            </div>

            <div className="row g-4">
                {allTickets.map((ticket) => (
                    <div key={ticket.id} className="col-md-4 col-lg-3">
                        <div className="card h-100 shadow-sm border-0">
                            <div className="card-body d-flex flex-column">
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                    <h5 className="card-title mb-0 text-truncate">{ticket.title}</h5>
                                    {getStatusBadge(ticket.status)}
                                </div>
                                <p className="card-text text-muted small flex-grow-1">
                                    {ticket.description.length > 100 
                                        ? `${ticket.description.substring(0, 100)}...` 
                                        : ticket.description}
                                </p>
                                <small className="text-muted mt-auto">
                                    Created: {new Date(ticket.created_at).toLocaleDateString()}
                                </small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
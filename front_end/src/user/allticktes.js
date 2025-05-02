import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal, Button, Badge } from 'react-bootstrap';
import { FaComment, FaTimes, FaSave } from 'react-icons/fa';

const API_URL = process.env.REACT_APP_API_URL;

export default function AllTickets() {
    const [showModal, setShowModal] = useState(false);
    const [selectedTicketId, setSelectedTicketId] = useState(null);
    const [allTickets, setAllTickets] = useState([]);
    const [token, setToken] = useState("");
    const [comment, setComment] = useState("");
    const [isLoading, setIsLoading] = useState(false);

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
                } catch (error) {
                    console.error("Error fetching tickets:", error);
                    alert("Failed to load tickets. Please try again.");
                }
            }
        };

        fetchTokenAndTickets();
    }, []);

    const handleAddComment = async () => {
        if (!comment.trim()) {
            alert("Please enter a comment");
            return;
        }

        setIsLoading(true);
        try {
            await axios.post(`${API_URL}/user/ticket_comments`, {
                ticket_id: selectedTicketId,
                message: comment
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setShowModal(false);
            setComment("");
            // Optionally refresh the tickets list here
        } catch (error) {
            console.error("Error adding comment:", error);
            alert("Failed to add comment. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const getStatusBadge = (status) => {
        const statusColors = {
            open: "primary",
            pending: "warning",
            resolved: "success",
            closed: "secondary"
        };
        return (
            <Badge bg={statusColors[status.toLowerCase()] || "info"} className="text-capitalize">
                {status}
            </Badge>
        );
    };

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">📋 Tickets List</h2>
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
                                <div className="d-flex justify-content-between align-items-center">
                                    <small className="text-muted">
                                        {new Date(ticket.created_at).toLocaleDateString()}
                                    </small>
                                    <button 
                                        className="btn btn-sm btn-outline-primary"
                                        onClick={() => {
                                            setSelectedTicketId(ticket.id);
                                            setShowModal(true);
                                        }}
                                        title="Add comment"
                                    >
                                        <FaComment />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Comment Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <textarea
                        className="form-control"
                        rows="4"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Enter your comment here..."
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        <FaTimes className="me-1" /> Cancel
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={handleAddComment}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                        ) : (
                            <FaSave className="me-1" />
                        )}
                        Save Comment
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
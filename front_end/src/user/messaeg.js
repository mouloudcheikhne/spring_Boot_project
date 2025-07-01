import React, { useEffect, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './message.css';

const API_URL = process.env.REACT_APP_API_URL;

export default function Message() {
  const [allTickets, setAllTickets] = useState([]);
  const [token, setToken] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const messageInputRef = useRef();

  // Charger token + tickets au chargement
  useEffect(() => {
    const fetchTokenAndTickets = async () => {
      const user = localStorage.getItem("user");
      if (user) {
        const parsedUser = JSON.parse(user);
        setToken(parsedUser.token);
        try {
          const res = await axios.get(`${API_URL}/user/alltickts`, {
            headers: { Authorization: `Bearer ${parsedUser.token}` },
          });
          setAllTickets(res.data);
        } catch (error) {
          console.error("Error fetching tickets:", error);
        }
      }
    };
    fetchTokenAndTickets();
  }, []);

  // Charger messages pour un ticket sélectionné
  const fetchMessages = async (ticket) => {
    try {
      const res = await axios.get(`${API_URL}/user/hhhh/${ticket.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Envoyer message
  const handleSendMessage = async () => {
    if (!messageInputRef.current.value.trim()) return;
    try {
      await axios.post(`${API_URL}/user/ticket_comments`, {
        ticket_id: selectedTicket.id,
        message: messageInputRef.current.value,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchMessages(selectedTicket);
      messageInputRef.current.value = "";
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Filtrer les tickets selon la recherche
  const filteredTickets = allTickets.filter((ticket) =>
    ticket.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container-fluid message-container">
      <div className="row h-100">
        {/* Sidebar */}
        <div className="col-3 sidebar p-3 d-flex flex-column">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search tickets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="tickets-list flex-grow-1 overflow-auto">
            {filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="user-box mb-2 p-2"
                onClick={() => {
                  setSelectedTicket(ticket);
                  fetchMessages(ticket);
                }}
                style={{ cursor: "pointer" }}
              >
                <strong>{ticket.user_id.username}</strong>
                <p className="text-muted small mb-0">{ticket.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="col-9 chat-area d-flex flex-column">
          <div className="chat-header p-3 border-bottom">
            <h5>{selectedTicket ? selectedTicket.user_id.username : "Select a ticket"}</h5>
          </div>

          <div className="chat-body flex-grow-1 p-3 overflow-auto">
            {Array.isArray(messages) && messages.length > 0 ? (
              messages.map((msg, index) => {
                const isReceived = msg.differenceuser;
                return (
                  <div
                    key={index}
                    className={`message-bubble ${isReceived ? 'received' : 'sent'}`}
                  >
                    {msg.message}
                  </div>
                );
              })
            ) : (
              <p className="text-muted">No messages yet.</p>
            )}
          </div>

          <div className="chat-footer p-3 border-top d-flex">
            <input
              type="text"
              ref={messageInputRef}
              className="form-control me-2"
              placeholder="Type a message..."
              disabled={!selectedTicket}
            />
            <button
              className="btn btn-primary"
              onClick={handleSendMessage}
              disabled={!selectedTicket}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

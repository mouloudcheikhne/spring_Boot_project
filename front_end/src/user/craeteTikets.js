import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;

export default function CreateTickets() {
  const [token, setToken] = useState("");
  const [agents, setAgents] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({
    title: null,
    description: null,
    user_agent: null
  });
  const [showSuccess, setShowSuccess] = useState(false);
  
  const formRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTokenAndAgents = async () => {
      const user = localStorage.getItem("user");
      if (user) {
        const userData = JSON.parse(user);
        setToken(userData.token);

        try {
          const res = await axios.get(`${API_URL}/user/agent`, {
            headers: {
              Authorization: `Bearer ${userData.token}`,
            },
          });
          setAgents(res.data);
        } catch (error) {
          console.error("Error fetching agents:", error);
          alert("Failed to load agents list. Please try again later.");
        }
      }
    };

    fetchTokenAndAgents();
  }, []);

  const validateForm = () => {
    const errors = {};
    const formData = new FormData(formRef.current);
    
    if (!formData.get('title')?.trim()) {
      errors.title = "Title is required";
    }
    
    if (!formData.get('description')?.trim()) {
      errors.description = "Description is required";
    } else if (formData.get('description').trim().length < 20) {
      errors.description = "Description should be at least 20 characters";
    }
    
    if (!formData.get('user_agent')) {
      errors.user_agent = "Please select an agent";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    const formData = new FormData(formRef.current);
    const ticket = {
      title: formData.get('title'),
      description: formData.get('description'),
      user_agent: formData.get('user_agent')
    };

    try {
      await axios.post(`${API_URL}/user/ticket`, ticket, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setShowSuccess(true);
      setTimeout(() => {
        navigate("/tickets");
      }, 1500);
    } catch (error) {
      console.error("Error creating ticket:", error);
      alert(error.response?.data?.message || "Failed to create ticket. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">🎫 Créer un Ticket</h5>
            </div>
            
            {showSuccess && (
              <div className="alert alert-success m-3">
                Ticket créé avec succès! Redirection en cours...
              </div>
            )}
            
            <div className="card-body">
              <form ref={formRef} onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Titre*</label>
                  <input 
                    type="text" 
                    className={`form-control ${formErrors.title ? 'is-invalid' : ''}`}
                    id="title" 
                    name="title" 
                    placeholder="Entrez le titre du ticket" 
                  />
                  {formErrors.title && (
                    <div className="invalid-feedback">{formErrors.title}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description*</label>
                  <textarea 
                    className={`form-control ${formErrors.description ? 'is-invalid' : ''}`}
                    id="description" 
                    name="description" 
                    rows="4" 
                    placeholder="Décrivez le problème en détail (minimum 20 caractères)..."
                  ></textarea>
                  {formErrors.description && (
                    <div className="invalid-feedback">{formErrors.description}</div>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="agent" className="form-label">Affecter à*</label>
                  <select 
                    className={`form-select ${formErrors.user_agent ? 'is-invalid' : ''}`}
                    id="agent" 
                    name="user_agent"
                  >
                    <option value="">-- Sélectionner un agent --</option>
                    {agents.map((ag, index) => (
                      <option key={index} value={ag.id}>{ag.nom || ag.email}</option>
                    ))}
                  </select>
                  {formErrors.user_agent && (
                    <div className="invalid-feedback">{formErrors.user_agent}</div>
                  )}
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary me-md-2"
                    onClick={() => navigate("/tickets")}
                  >
                    Annuler
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Envoi en cours...
                      </>
                    ) : (
                      "Envoyer le Ticket"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
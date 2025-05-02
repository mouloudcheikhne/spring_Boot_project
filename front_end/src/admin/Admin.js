import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

export default function Admin() {
  const API_URL = process.env.REACT_APP_API_URL;
  const [token, setToken] = useState("");
  const [predict, setPredict] = useState([]);
  const datepredict = useRef();

  const handlpredict = async () => {
    const datelewle = datepredict.current.value;
    const [year, month, day] = datelewle.split("-");
    const date = `${day}-${month}-${year}`;

    const datep = { date };

    try {
      const res = await axios.post(`${API_URL}/admin/predict_tout_agent`, datep, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(res.data);
      setPredict(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const a = JSON.parse(user);
      setToken(a.token);
    }
  }, []);

  return (
    <div className="container mt-4">
      <h2>Prédiction pour tous les agents</h2>
      <div className="mb-3">
        <input type="date" ref={datepredict} className="form-control w-25 d-inline-block me-2" />
        <button onClick={handlpredict} className="btn btn-outline-primary">Prédire</button>
      </div>

      {predict && predict.length > 0 && (
        <table className="table table-striped mt-4">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ID Agent</th>
              <th scope="col">Prédiction</th>
            </tr>
          </thead>
          <tbody>
            {predict.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.agent}</td>
                <td>{item.prediction.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {predict && predict.length === 0 && (
        <div className="alert alert-info mt-4">Aucune donnée de prédiction disponible pour la date sélectionnée.</div>
      )}
    </div>
  );
}

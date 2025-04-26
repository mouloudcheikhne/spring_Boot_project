
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
export default function Ticktesagent() {
      const [token, setToken] = useState("");
      const [reclamtion, setReclamtion] = useState([]);
      const [showModal, setShowModal] = useState(false);
        const [selectedTiktes, setSelectedTicktes] = useState(null);
      const[allagent,setAgent]=useState([]);
    const status=["open","finich","en attent"];
    const getData = async () => {
        try {
          const res = await axios.get(`${API_URL}/agent/alltickts`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setReclamtion(res.data);
          console.log(res.data);
        } catch (error) {
          console.log("eror l e donne pas gab9ou: " + error);
        }
      };
      const allgent=async()=>{
        try {
          const res = await axios.get(`${API_URL}/admin/allagent`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log("donne est:"+res.data);
          setAgent(res.data);
        } catch (error) {
          console.log("eror l e donne pas gab9ou: " + error);
        }
      }
  
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
        console.log(allagent);
      }
    }, [token]);

    const updateTicktes=async(id)=>{
      const newticktes={
        "status":"hh",
       
      }
      console.log(newticktes);
        // http://localhost:8099/admin/changereclamtion/2

        try {
            await axios.post(`${API_URL}/admin/tickes/update/${id}`,newticktes, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            console.log("tickes est update  ");
            setShowModal(false);

            getData();
           
          } catch (error) {
            console.log("error ticktes pas update: " + error);
          }
        console.log(id);
    }
    const handechange =async (e,id) => {
        console.log("Nouveau statut sélectionné :", e.target.value+"  id :"+id);
        const newstatus={
            "status":e.target.value,
           
          }
          console.log(newstatus);
            // http://localhost:8099/admin/changereclamtion/2
    
            try {
                await axios.post(`${API_URL}/agent/ticket/status/${id}`,newstatus, {
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                });
                console.log("tickes est change status  ");
                setShowModal(false);
    
                getData();
               
              } catch (error) {
                console.log("error ticktes change status: " + error);
              }
          
      };
      const [valeurPredict,setValeurPredict]=useState();
      const datepredict=useRef();
      const handlpredict = async () => {
        console.log(datepredict.current.value);
        const datelewle = datepredict.current.value; 
    
        
        const [year, month, day] = datelewle.split("-");
        const date = `${day}-${month}-${year}`;
    
        const datep = {
            "date": date
        };
    
       
    
        try {
            const res = await axios.post(`${API_URL}/agent/predict`, datep, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // console.log(res.data);
            setValeurPredict(res.data)

        } catch (error) {
            console.error(error);
        }
    }
    
  return (
    <>
        <input type='date' ref={datepredict} />
        <button onClick={handlpredict} className='btn btn-outline-primary'>predict</button>
        {valeurPredict && <p>valeur de tickte dans cette jour est{valeurPredict.prediction} </p>}
          <h1 className="mt-5">Liste des ticktes</h1>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Nom Agent</th>
            <th>Email user</th>
            <th>Description</th>
            <th>Etat</th>
            <th>change satus</th>
           
          </tr>
        </thead>
        <tbody>
          {reclamtion.map((u) => (
            <tr key={u.id} style={{ backgroundColor: u.status == "termine" ? 'red' : 'white' }}>
             <td>{u.user_AGENT?.nom}</td>
              <td>{u.user_id.email}</td>
              <td>{u.description}</td>
              <td>{u.status}</td>
              <td>
              <select  className="form-control mb-3" onChange={(e)=>{handechange(e,u.id)}}>
              {status.map((r)=>{
                          return <option value={r}>{r}</option>
                        })}

                      </select>
              </td>
             
            </tr>
          ))}
        </tbody>
      </table>

        
   
    </>
  )
}

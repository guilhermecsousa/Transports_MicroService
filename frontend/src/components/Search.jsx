import React, { useState } from "react";
import "../index.css";
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from "react-router-dom"

export default function Search() {

    let navigate = useNavigate();

    const [values, setValues] = useState({
        trackingNumber: ""
    });
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = (event) => {
        setValues({...values, trackingNumber: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitted(true);
    }

    return ( 
        <div>
            <h2 style={{marginBottom:"20px"}}>Encontre a sua encomenda aqui:</h2>
            <div class="form-container">
                <form class="register-form" onSubmit={handleSubmit}>
                    <div class="row">
                        <input
                            onChange={handleInputChange}
                            value={values.trackingNumber}
                            id="Tracking number"
                            class="form-field"
                            type="text"
                            placeholder="Tracking number"
                            name="tracking"
                        />
                        <button class="form-field" type="submit"><FaSearch /></button>
                    </div>
                    {submitted && !values.trackingNumber ? setSubmitted(false) : null}
                    {submitted && values.trackingNumber ? navigate('./package='+values.trackingNumber) : null}
                </form>
            </div>    
        </div>
        
    );
  }

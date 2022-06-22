import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './Package.css';
import './Tracker.css';
import './Steps.css';
import { FiArrowRightCircle } from 'react-icons/fi';
import { FaRegStickyNote } from 'react-icons/fa';
import { RiTruckLine } from 'react-icons/ri';
import { GiCardboardBoxClosed,  GiConfirmed} from 'react-icons/gi';
import { useNavigate } from "react-router-dom"

export default function Package() {
  
  let {trackingNumber} = useParams();
  let request = 'http://transportes-beira-mar.k3s/package='+trackingNumber
  const [result, setResult] = useState([]);
  const message = async () => {
    try{
      let res = await axios.get(request);
      let result = res.data;
      setResult(result);
    }catch(e){
      Home()
    }
  };
  
  useEffect(() => {
    message()
  }, [])

  let var1 = "step completed", var2 = "step", var3 = "step", var4 = "step"
  let status = result.status
  if(status==="A levantar a encomenda"){
    var1=var2="step completed"
  }else if(status==="Em trânsito"){
    var1=var2=var3="step completed"
  }else if(status==="Entregue"){
    var1=var2=var3=var4="step completed"
  }

  let navigate = useNavigate();
  function Home() {
    navigate('/')
  }

    return(
      <div>
        <div class="infosa">
          <div class="title">Encomenda</div><div></div><div class="firstbody">#{trackingNumber}</div>
        </div>
        <div class="info">
          <div class="subtitle" style={{marginTop:"20px"}}>Origem</div><FiArrowRightCircle class="arrow" style={{marginTop:"25px"}}/><div class="body" style={{marginTop:"20px"}}>{result.origin}</div>
          <div class="subtitle">Destino</div><FiArrowRightCircle class="arrow"/><div class="body">{result.destination}</div>
          <div class="subtitle">Items</div><FiArrowRightCircle class="arrow"/><div class="body">{result.items} items</div>
          <div class="subtitle">Transporte</div><FiArrowRightCircle class="arrow"/><div class="body">{result.shipping}</div>
          <div class="subtitle">Estado</div><FiArrowRightCircle class="arrow"/><div class="body">{result.status}</div>
        </div>

        <div class="tracker">
          <div class="card mb-3"style={{borderColor:'#ffffff'}}>          
            <div class="card-body">
              <div class="steps d-flex flex-wrap flex-sm-nowrap justify-content-between padding-top-2x padding-bottom-1x">
                <div class={var1}>
                  <div class="step-icon-wrap">
                    <div class="step-icon"><FaRegStickyNote class="yolo"/></div>
                  </div>
                  <h4 class="step-title">Pedido de transporte recebido</h4>
                </div>
                <div class={var2}>
                  <div class="step-icon-wrap">
                    <div class="step-icon"><GiCardboardBoxClosed class="yolo"/></div>
                  </div>
                  <h4 class="step-title">A levantar a encomenda</h4>
                </div>
                <div class={var3}>
                  <div class="step-icon-wrap">
                    <div class="step-icon"><RiTruckLine class="yolo"/></div>
                  </div>
                  <h4 class="step-title">Em trânsito</h4>
                </div>
                <div class={var4}>
                  <div class="step-icon-wrap">
                    <div class="step-icon"><GiConfirmed class="yolo"/></div>
                  </div>
                  <h4 class="step-title">Entregue</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button class="btno" onClick={Home}>Fazer nova pesquisa</button>
      </div>
    )
}

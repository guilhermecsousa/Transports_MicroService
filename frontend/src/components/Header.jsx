import React from "react";
import './Header.css';
import { RiTruckLine } from 'react-icons/ri';
import {ReactComponent as ReactLogo} from '../images/pt.svg';

export default function Header() {
    return(
        <div className="header">
            <h1 class="element1"><RiTruckLine /></h1>
            <h2 class="element2">Transportes Beira-Mar</h2>
            <div class="element3"><ReactLogo/></div>
        </div>
    )
}
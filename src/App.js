import React, { useEffect, useState, useRef } from "react";
import { ThemeProvider } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import  Navbar  from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/footer";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import * as s from "./styles/globalStyles";
import Home from "./pages/HomePage/Home";
import Fonts from "./styles/fontStyles";
import ReactGA from 'react-ga';
ReactGA.initialize('G-3X4313YHG0');
const theme = {
  colors: {
    body:'#000',
    textColor:'#5fcde4',
  }
}



function App() {
  return (

    <s.Body theme={theme}>
    <Fonts/>
      <Router>
        <Home/>
      </Router>
    </s.Body>
  );
}

export default App;

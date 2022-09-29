import React, { Component } from "react";
import Home from "./HomeComponent";
import Header from "./HeaderComponent";
import Menu from "./MenuComponent";
//import DishDetail from "./DishDetailComponent";
import Footer from "./FooterComponent";
import { DISHES } from "../shared/dishes";
import { Routes, Route, Navigate } from "react-router-dom";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
    };
  }

  render() {
    return (
      <div>
        <Header />
        <Routes>
          <Route path="/home" element={<Home/>} />
          <Route path="/menu" element={<Menu dishes={this.state.dishes} />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
        <Footer />
      </div>
    );
  }
}

export default Main;

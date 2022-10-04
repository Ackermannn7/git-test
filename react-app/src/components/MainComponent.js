import React, { Component } from "react";
import Home from "./HomeComponent";
import Header from "./HeaderComponent";
import Menu from "./MenuComponent";
import Contact from "./ContactComponent";
import DishDetail from "./DishDetailComponent";
import Footer from "./FooterComponent";
import { DISHES } from "../shared/dishes";
import { COMMENTS } from "../shared/comments";
import { LEADERS } from "../shared/leaders";
import { PROMOTIONS } from "../shared/promotions";
import { Routes, Route, Navigate } from "react-router-dom";

// function DishWithId({ match }){
//   return (
//     <DishDetail
//       dish={
//         this.state.dishes.filter(
//           (dish) => dish.id === parseInt(match.params.dishId, 10)
//         )[0]
//       }
//       comment={this.state.comments.filter(
//         (comment) => comment.dishId === parseInt(match.params.dishId, 10)
//       )}
//     />
//   );
// }

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      leaders: LEADERS,
      promotions: PROMOTIONS,
    };
  }

  render() {
    return (
      <div>
        <Header />
        <Routes>
          <Route
            path="/home"
            element={
              <Home
                dish={this.state.dishes.filter((dish) => dish.featured)[0]}
                promotion={
                  this.state.promotions.filter((promo) => promo.featured)[0]
                }
                leader={
                  this.state.leaders.filter((leader) => leader.featured)[0]
                }
              />
            }
          />
          <Route path="/menu" element={<Menu dishes={this.state.dishes} />} />
          <Route
            path="/menu/:dishId"
            element={
              <DishDetail
                dishes={this.state.dishes}
                comments={this.state.comments}
              />
            }
          ></Route>
          <Route path="/contactus" element={<Contact />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
        <Footer />
      </div>
    );
  }
}

export default Main;

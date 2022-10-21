import React, { Component } from "react";
import Home from "./HomeComponent";
import Header from "./HeaderComponent";
import Menu from "./MenuComponent";
import Contact from "./ContactComponent";
import DishDetail from "./DishDetailComponent";
import Footer from "./FooterComponent";
import About from "./AboutComponent";
import { Routes, Route, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import {
  postComment,
  fetchDishes,
  fetchComments,
  fetchPromos,
} from "../redux/ActionCreators";
import { actions } from "react-redux-form";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) => {
    dispatch(postComment(dishId, rating, author, comment));
  },
  fetchDishes: () => {
    dispatch(fetchDishes());
  },
  resetFeedbackForm: () => {
    dispatch(actions.reset("feedback"));
  },
  fetchComments: () => {
    dispatch(fetchComments());
  },
  fetchPromos: () => {
    dispatch(fetchPromos());
  },
});

class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
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
                dish={
                  this.props.dishes.dishes.filter((dish) => dish.featured)[0]
                }
                dishesLoading={this.props.dishes.isLoading}
                dishesErrMess={this.props.dishes.errMess}
                promotion={
                  this.props.promotions.promotions.filter(
                    (promo) => promo.featured
                  )[0]
                }
                promosLoading={this.props.promotions.isLoading}
                promosErrMess={this.props.promotions.errMess}
                leader={
                  this.props.leaders.filter((leader) => leader.featured)[0]
                }
              />
            }
          />
          <Route
            path="/aboutus"
            element={<About leaders={this.props.leaders} />}
          />
          <Route path="/menu" element={<Menu dishes={this.props.dishes} />} />
          <Route
            path="/menu/:dishId"
            element={
              <DishDetail
                dishes={this.props.dishes.dishes}
                isLoading={this.props.dishes.isLoading}
                errMess={this.props.dishes.errMess}
                comments={this.props.comments.comments}
                commentsErrMess={this.props.comments.errMess}
                postComment={this.props.postComment}
              />
            }
          ></Route>
          <Route
            path="/contactus"
            element={
              <Contact resetFeedbackForm={this.props.resetFeedbackForm} />
            }
          />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
        <Footer />
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);

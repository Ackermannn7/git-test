import React, { Component } from "react";
import Home from "./HomeComponent";
import Header from "./HeaderComponent";
import Menu from "./MenuComponent";
import Contact from "./ContactComponent";
import DishDetail from "./DishDetailComponent";
import Footer from "./FooterComponent";
import About from "./AboutComponent";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import {
  postComment,
  postFeedback,
  fetchDishes,
  fetchComments,
  fetchPromos,
  fetchLeaders,
} from "../redux/ActionCreators";
import { actions } from "react-redux-form";
import { TransitionGroup, CSSTransition } from "react-transition-group";

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
  postFeedback: (
    firstName,
    lastName,
    telNum,
    email,
    agree,
    contactType,
    message
  ) => {
    dispatch(
      postFeedback(
        firstName,
        lastName,
        telNum,
        email,
        agree,
        contactType,
        message
      )
    );
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
  fetchLeaders: () => {
    dispatch(fetchLeaders());
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
    this.props.fetchLeaders();
  }

  render() {
    return <RoutePage {...this.props} />;
  }
}
function RoutePage(props) {
  const location = useLocation();
  return (
    <div>
      <Header />
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="page" timeout={300}>
          <Routes>
            <Route
              path="/home"
              element={
                <Home
                  dish={props.dishes.dishes.filter((dish) => dish.featured)[0]}
                  dishesLoading={props.dishes.isLoading}
                  dishesErrMess={props.dishes.errMess}
                  promotion={
                    props.promotions.promotions.filter(
                      (promo) => promo.featured
                    )[0]
                  }
                  promosLoading={props.promotions.isLoading}
                  promosErrMess={props.promotions.errMess}
                  leader={
                    props.leaders.leaders.filter((leader) => leader.featured)[0]
                  }
                  leadersLoading={props.leaders.isLoading}
                  leadersErrMess={props.leaders.errMess}
                />
              }
            />
            <Route
              path="/aboutus"
              element={
                <About
                  leaders={props.leaders}
                  leadersLoading={props.leaders.isLoading}
                  leadersErrMess={props.leaders.errMess}
                />
              }
            />
            <Route path="/menu" element={<Menu dishes={props.dishes} />} />
            <Route
              path="/menu/:dishId"
              element={
                <DishDetail
                  dishes={props.dishes.dishes}
                  isLoading={props.dishes.isLoading}
                  errMess={props.dishes.errMess}
                  comments={props.comments.comments}
                  commentsErrMess={props.comments.errMess}
                  postComment={props.postComment}
                />
              }
            ></Route>
            <Route
              path="/contactus"
              element={<Contact resetFeedbackForm={props.resetFeedbackForm} />}
            />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
      <Footer />
    </div>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);

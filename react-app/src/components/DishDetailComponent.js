import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Col,
  Row,
} from "reactstrap";
import { Link, useParams } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from "./LoadingComponent";
import { baseURL } from "../shared/baseURL";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
    };

    this.toggleCommentModal = this.toggleCommentModal.bind(this);
    this.handleCommentSubmuit = this.handleCommentSubmuit.bind(this);
  }

  toggleCommentModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleCommentSubmuit(values) {
    this.props.postComment(
      this.props.dishId,
      values.rating,
      values.author,
      values.comment
    );
  }

  render() {
    return (
      <React.Fragment>
        <Button outline onClick={this.toggleCommentModal}>
          <span className="fa fa-comments fa-lg"> Submit Comment</span>
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleCommentModal}>
          <ModalHeader toggle={this.toggleCommentModal}>
            Submit Comment
          </ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleCommentSubmuit(values)}>
              {/* rating */}
              <Row className="form-group">
                <Label htmlFor="rating" md={12}>
                  Rating
                </Label>
                <Col md={12}>
                  <Control.select
                    model=".rating"
                    className="form-control"
                    name="rating"
                    id="rating"
                    validators={{
                      required,
                    }}
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      required: "Required",
                    }}
                  ></Errors>
                </Col>
              </Row>

              {/* author  */}
              <Row className="form-group">
                <Label htmlFor="author" md={12}>
                  Your Name
                </Label>
                <Col md={12}>
                  <Control.text
                    model=".author"
                    id="author"
                    name="author"
                    placeholder="Author"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      required: "Required",
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must be less than 16 characters",
                    }}
                  />
                </Col>
              </Row>

              {/* comment */}
              <Row className="form-group">
                <Label htmlFor="comment" md={12}>
                  Your Feedback
                </Label>
                <Col md={12}>
                  <Control.textarea
                    model=".comment"
                    id="comment"
                    name="comment"
                    rows="6"
                    className="form-control"
                    validators={{
                      required,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      required: "Required",
                    }}
                  />
                </Col>
              </Row>

              {/* submit button */}
              <Row className="form-group">
                <Col>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

function RenderDish({ dish }) {
  if (dish != null)
    return (
      <div className="col-12 col-md-5 m-1">
        <Card>
          <CardImg top src={baseURL + dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  else return <div></div>;
}

function RenderComments({ comments, postComment, dishId }) {
  if (comments == null) {
    return <div></div>;
  }
  const comms = comments.map((comment) => {
    return (
      <li key={comment.id}>
        <p>{comment.comment}</p>
        <p>
          -- {comment.author}, &nbsp;
          {new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit",
          }).format(new Date(comment.date))}
        </p>
      </li>
    );
  });

  return (
    <div className="col-12 col-md-5 m-1">
      <h4>Comments</h4>
      <ul className="list-unstyled">{comms}</ul>
      <CommentForm dishId={dishId} postComment={postComment} />
    </div>
  );
}

const DishDetail = ({ dishes, comments, postComment, isLoading, errMess }) => {
  let params = useParams();
  const currentDish = dishes.filter(
    (dish) => dish.id === parseInt(params.dishId, 10)
  )[0];
  const currentComments = comments.filter(
    (comment) => comment.dishId === parseInt(params.dishId, 10)
  );
  if(isLoading){
    return(
      <div className="container">
        <div className="row">
          <Loading/>
        </div>
      </div>
    );
  }
  else if(errMess){
    return(
      <div className="container">
        <div className="row">
          <h4>{errMess}</h4>
        </div>
      </div>
    );
  }
  else if (currentDish == null) return <div></div>;
  else
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/home">Home</Link>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>

            <BreadcrumbItem active>{currentDish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{currentDish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderDish dish={currentDish} />
          <RenderComments
            comments={currentComments}
            postComment={postComment}
            dishId={currentDish.id}
          />
        </div>
      </div>
    );
};

export default DishDetail;

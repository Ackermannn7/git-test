import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link, useParams } from "react-router-dom";

function RenderDish({ dish }) {
  if (dish != null)
    return (
      <div className="col-12 col-md-5 m-1">
        <Card>
          <CardImg top src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  else return <div></div>;
}

function RenderComments({ comments }) {
  if (comments == null) {
    return <div></div>;
  }
  const comms = comments.map((comment) => {
    return (
      <li key={comment.id}>
        <p>{comment.comment}</p>,
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
    </div>
  );
}

const DishDetail = ({ dishes, comments }) => {
  let params = useParams();
  const currentDish = dishes.filter(
    (dish) => dish.id === parseInt(params.dishId, 10)
  )[0];
  const currentComments = comments.filter(
    (comment) => comment.dishId === parseInt(params.dishId, 10)
  );
  if (currentDish == null) return <div></div>;
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
          <RenderComments comments={currentComments} />
        </div>
      </div>
    );
};

export default DishDetail;

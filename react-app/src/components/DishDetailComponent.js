import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";



  function RenderDish({dish}) {
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
    else return (<div></div>);
  }

  function RenderComments({comments}) {
    if (comments == null) {
      return (<div></div>);
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

  const DishDetail = (props) => {
    const dish = props.dish;
    if (dish == null) return (<div></div>);
    else return (
      <div className="container">
        <div className="row">
          <RenderDish dish={props.dish}/>
          <RenderComments comments={props.dish.comments}/>
        </div>
      </div>
    );
  }

export default DishDetail;

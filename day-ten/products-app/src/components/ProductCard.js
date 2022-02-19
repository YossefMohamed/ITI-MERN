import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';

{/* <Link to={`/products/${props.data.id}`} > */}


function ProductCard(props) {
  return (
    <Link to={`/products/${props.data.id}`} >
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={props.data.image} />

            <Card.Body>
                <Card.Title>{props.data.name}</Card.Title>
                <Card.Text>
                    {props.data.description}
                </Card.Text>
            </Card.Body>

            <ListGroup className="list-group-flush">
                <ListGroupItem>Reviews : {props.data.reviews}/5 </ListGroupItem>
                <ListGroupItem>Price : {props.data.price}$ </ListGroupItem>
            </ListGroup>

            <Card.Body>
                <Button variant="primary">Add to cart</Button>
            </Card.Body>
        </Card>
    </Link>
  )
}

export default ProductCard
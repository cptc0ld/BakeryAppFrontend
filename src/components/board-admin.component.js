import React, {Component} from "react";
import FormAddProduct from "./add.product.component";
import {Badge, Col, Container, ListGroup, Row} from "react-bootstrap";
import FormAddIngredient from "./add.ingredient.component";
import ProductService from "../services/product.service";

export default class BoardUser extends Component {

    constructor(props) {
        super(props);
        this.handleAddProductShow = this.handleAddProductShow.bind(this)
        this.handleAddProductHide = this.handleAddProductHide.bind(this)
        this.handleAddIngredientShow = this.handleAddIngredientShow.bind(this)
        this.handleAddIngredientHide = this.handleAddIngredientHide.bind(this)
        this.handleViewAllProducts = this.handleViewAllProducts.bind(this)
        this.handleViewAllIngredients = this.handleViewAllIngredients.bind(this)
        this.state = {
            "showAddProduct": false,
            "showAddIngredient": false,
            isIngredientsPresent: false
        }
    }

    handleAddProductShow() {
        if (!this.state.showAddProduct) {
            this.setState({
                "showAddProduct": true
            })
        }
    }

    handleAddProductHide() {
        if (this.state.showAddProduct) {
            this.setState({
                "showAddProduct": false
            })
        }
    }

    handleAddIngredientShow() {
        if (!this.state.showAddIngredient) {
            this.setState({
                "showAddIngredient": true
            })
        }
    }

    handleAddIngredientHide() {
        if (this.state.showAddIngredient) {
            this.setState({
                "showAddIngredient": false
            })
        }
    }

    handleViewAllProducts() {
        this.props.history.push('/home');
        window.location.reload();
    }

    handleViewAllIngredients() {
        this.props.history.push(`/ingredients`);
        window.location.reload();
    }

    componentDidMount() {
        ProductService.getIngredients().then(
            response => {
                if (response.length > 0) {
                    this.setState({
                        isIngredientsPresent: true
                    });
                } else {
                    this.setState({
                        isIngredientsPresent: false
                    });
                }
            },
            error => {
                this.setState({
                    content:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    render() {
        return (
            <Container>
                <Row className="text-center p-5 bg-dark rounded-2">
                    <h1 className="text-light">Admin panel</h1>
                </Row>
                <Row className="justify-content-center mb-5 mt-5 p-5 bg-light">
                    <h1 className="text-center pb-5">Manage Inventory</h1>
                    <Col md={5} className="p-5">
                        <h5 className="text-center">
                            Add to inventory
                        </h5>
                        <ListGroup>
                            {this.state.isIngredientsPresent && (
                                <ListGroup.Item className="text-center" action onClick={this.handleAddProductShow}>
                                    Add product
                                </ListGroup.Item>
                            )}
                            < ListGroup.Item className="text-center" action onClick={this.handleAddIngredientShow}>
                                Add ingredient
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={5} className="p-5">
                        <h5 className="text-center">
                            View inventory
                        </h5>
                        <ListGroup>
                            <ListGroup.Item className="text-center" action onClick={this.handleViewAllProducts}>
                                View all products
                            </ListGroup.Item>
                            <ListGroup.Item className="text-center" action onClick={this.handleViewAllIngredients}>
                                View all ingredient
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>


                <FormAddProduct show={this.state.showAddProduct} onHide={this.handleAddProductHide}/>
                <FormAddIngredient show={this.state.showAddIngredient} onHide={this.handleAddIngredientHide}/>
            </Container>

        );
    }
}
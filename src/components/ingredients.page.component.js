import React, {Component} from "react";

import ProductService from "../services/product.service";
import {Col, Container, Row} from "react-bootstrap";
import IngredientCardComponent from "./ingredient.card.component";

export default class IngredientsPageComponent extends Component {
    constructor(props) {
        super(props);
        this.handleIngredientClick = this.handleIngredientClick.bind(this)
        this.state = {
            error: "",
            ingredients: []
        };
    }

    handleIngredientClick(e) {
        this.props.history.push(`/ingredient/${e}`);
        window.location.reload();
    }

    componentDidMount() {
        ProductService.getIngredients().then(
            response => {
                this.setState({
                    ingredients: response
                });
            },
            error => {
                this.setState({
                    error:
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
                    <h1 className="text-light">Ingredients</h1>
                </Row>

                <Row className="bg-light mb-5 mt-5 p-5">
                    {this.state.ingredients.map((ingredient) => (
                        <Col>
                            <IngredientCardComponent ingredient={ingredient} onClick={this.handleIngredientClick}/>
                        </Col>
                    ))}
                </Row>
            </Container>
        );
    }
}

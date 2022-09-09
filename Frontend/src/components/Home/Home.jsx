import React, { Component } from 'react';
import AppContext from '../../context/AppContext';
import withRouter from '../withRouter';
import CartIcon from '../CartIcon';
import Container from '../Container';
import Header from '../Header';
import './Home.css';
import { capitalize } from '../../utils';

class Home extends Component {
    componentWillMount = () => {
        const { params } = this.props;
        const { category } = params;
        if (!category) {
            return;
        }

        this.context.handleCategoryChange(category);
    };

    componentDidUpdate(prevProps, prevState) {
        console.log(this.props, '||||||||||');
        const { params: currentPropsParams } = this.props;
        const { category: currentCategory } = currentPropsParams;
        const { params: prevPropsParams } = prevProps;
        const { category: previousCategory } = prevPropsParams;

        if (previousCategory === currentCategory) {
            return;
        }

        this.context.handleCategoryChange(currentCategory);
    }

    render() {
        return (
            <AppContext.Consumer>
                {(context) => (
                    <>
                        <Header />

                        <Container>
                            {context.currentCategory && (
                                <h1>{capitalize(context.currentCategory)}</h1>
                            )}
                            <div className="products">
                                {context.products.map((product) => (
                                    <div key={product.id} className="product">
                                        <img
                                            className="product-image"
                                            src={product.gallery?.at(0)}
                                            alt={product.name}
                                        />
                                        <p className="product-name">
                                            {product.name}
                                        </p>
                                        <p className="product-price">
                                            {context.getProductPrice(product)}
                                        </p>
                                        <button
                                            className="add-to-cart"
                                            title={
                                                product.inStock
                                                    ? 'Add to cart'
                                                    : 'Out of stock'
                                            }
                                            disabled={!product.inStock}
                                            onClick={() => {
                                                context.addToCart(product);
                                            }}
                                        >
                                            <CartIcon />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </Container>
                    </>
                )}
            </AppContext.Consumer>
        );
    }
}

Home.contextType = AppContext;

export default withRouter(Home);

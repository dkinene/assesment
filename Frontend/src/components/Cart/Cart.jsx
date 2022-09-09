import React, { Component } from 'react';
import AppContext from '../../context/AppContext';
import Container from '../Container';
import Header from '../Header';
import './Cart.css';

class Cart extends Component {
    getCartTotal = () => {
        const { cart, currentCurrency } = this.context;
        let total = 0;
        for (const product of cart) {
            const productPrice = this.context.getProductPrice(product, true);
            const priceAsNumber = Number(productPrice.replace(/[^\d.]+/, '')).toFixed(2);
            total += parseFloat(priceAsNumber);
        }

        return `${currentCurrency}${Number(total).toFixed(2)}`;
    }

    increaseProductQuantity = (product) => {
        const { cart } = this.context;
        const productIndex = cart.findIndex((p) => p.id === product.id);
        product.quantity++;
        cart.splice(productIndex, 1, product)
        this.context.updateCart(cart);
    }

    decreaseProductQuantity = (product) => {
        const { cart } = this.context;
        const productIndex = cart.findIndex((p) => p.id === product.id);
        product.quantity--;
        if (product.quantity <= 0) {
            cart.splice(productIndex, 1);
        } else {
            cart.splice(productIndex, 1, product);
        }
        this.context.updateCart(cart);
    }

    render() {
        return (
            <AppContext.Consumer>
                {(context) => (
                    <>
                        <Header />

                        <Container>
                            <h1>My bag: {context.cart.length} {context.cart.length === 1 ? 'Item' : 'Items'}</h1>
                            <div className='cart-products'>
                                {context.cart.map((product) => (
                                    <div key={product.id} className="cart-product">
                                        <div className="product-details">
                                            <button onClick={() => this.increaseProductQuantity(product)}>+</button>
                                            <p>{product.name}</p>
                                            <p className='product-price'>{context.getProductPrice(product, true)}</p>
                                            <div className="product-attributes" style={{ marginBottom: '1em' }}>
                                                {product.attributes.map((attribute) => (
                                                    <div key={attribute.id} className="attribute">
                                                        <p className="attribute-name">{attribute.name}:</p>
                                                        <div className="attribute-items">
                                                            {attribute.items.map((item) => (
                                                                <button
                                                                    key={item.id}
                                                                    style={{
                                                                        display: 'inline-block',
                                                                        marginRight: '0.2em',
                                                                        backgroundColor: (attribute.id === 'Color' ? item.value : null),
                                                                        padding: (attribute.id === 'Color' ? '0.5em' : null),
                                                                    }}
                                                                >
                                                                    {attribute.id === 'Color' ? '' : item.value}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <button onClick={() => this.decreaseProductQuantity(product)}>-</button>
                                        </div>
                                        <div className="product-image">
                                            <img src={product.gallery?.at(0)} alt={product.name} style={{ maxWidth: '15em' }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="cart-total">
                                <p>
                                    <span className='label'><strong>Total</strong>: </span>
                                    <span className="total">{this.getCartTotal()}</span>
                                </p>
                            </div>
                            <div className="cart-bag">
                                <button>View Bag</button>&nbsp;<button>Checkout</button>
                            </div>
                        </Container>
                    </>
                )}
            </AppContext.Consumer>
        );
    }
}

Cart.contextType = AppContext;

export default Cart;

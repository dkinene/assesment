import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import { capitalize } from '../../utils';
import CartIcon from '../CartIcon';
import './Header.css';

class Header extends Component {
    render() {
        return (
            <AppContext.Consumer>
                {(context) => (
                    <header>
                        <div className="header">
                            <div className="navigartion">
                                <div className="item-container ">
                                    {context.categories.map((category) => (
                                        <div
                                            key={category.name}
                                            className="nav-item"
                                        >
                                            <NavLink
                                                to={`/${category.name}`}
                                                active
                                            >
                                                {capitalize(category.name)}
                                            </NavLink>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="actions">
                                <select
                                    name="currencies"
                                    id="currencies"
                                    onChange={(e) => {
                                        context.handleCurrencyChange(
                                            e.target.value
                                        );
                                    }}
                                >
                                    {context.currencies.map((currency) => (
                                        <option
                                            key={currency.symbol}
                                            value={currency.symbol}
                                        >
                                            {currency.label}
                                        </option>
                                    ))}
                                </select>
                                <div className="cart-container">
                                    <Link to={'/cart'}>
                                        <CartIcon />
                                    </Link>
                                </div>
                                <div className="baloon">
                                    {context.cart.length}
                                </div>
                            </div>
                        </div>
                    </header>
                )}
            </AppContext.Consumer>
        );
    }
}

export default Header;

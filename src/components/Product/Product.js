import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import React from 'react';
import './Product.css';


const Product = (props) => {
    
    const {handlerAddToCart, product} = props;

    // console.log(product.id)

    const {name, img, seller, price, ratings} = props.product;
    return (
        <div className='product'>
            <img src={img} alt="" />
            <div className='product-info'>
                <p className='product-name'>{name}</p>
                <p>Price: ${price}</p>
                <p>Seller: {seller}</p>
                <p>Ratings: {ratings} Stars</p>
            </div>
            <button onClick={() => handlerAddToCart(product)} className='btn-cart'>
                <p className='btn-text'>Add to Cart</p>
                <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
            </button>
        </div>
    );
};

export default Product;
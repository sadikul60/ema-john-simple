import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    
    // console.log(products)

    

    const handlerAddToCart = (selectProduct) => {
        // console.log(selectProduct);
        let newCart = [];

        const exists = cart.find(product => product.id === selectProduct.id);
        if(!exists){
            selectProduct.quantity = 1;
            newCart = [...cart, selectProduct];
        }
        else{
            const rest = cart.filter(product => product.id !== selectProduct.id);
            exists.quantity = exists.quantity +1;
            newCart = [...rest, exists];
        }
        setCart(newCart);
       addToDb(selectProduct.id);
    }

    useEffect(() =>{
        fetch('products.json')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[]);

    useEffect(() => {
        const storedCart = getStoredCart();
        const saveCart = [];
        for(const id in storedCart){
            const addedProduct = products.find(product => product.id === id);
            if(addedProduct){
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                saveCart.push(addedProduct);
            }
        }
        setCart(saveCart)

    }, [products])
    
    return (
        <div className='shop-container'>
            <div className="products-container">
            {
                products.map(product => <Product 
                    product={product}
                    key={product.id}
                    handlerAddToCart={handlerAddToCart}
                    ></Product>)
            }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;
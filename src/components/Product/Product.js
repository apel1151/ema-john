import React from 'react';
import { Link } from 'react-router-dom';
import './Product.css';

const Product = (props) => {

    console.log(props);

     const {img, name, seller, price, stock, key} = props.product;
    return (
        <div className='product'>

            <div>
                 <img src={img} alt=""/>
            </div>


            <div className='product-details'>
                     <h3><Link to ={"/product/" + key}>{name}</Link></h3>
                     <br/>
                     <p><small>by: {seller}</small></p>
                     <p>${price}</p>
                     
                     <p><small>Only {stock} in stock. Order soon...</small></p>
                     <br/>
                     {props.showAddToCart === true && <button onClick={() =>props.handleAddProduct(props.product)} className='main-button'>Add to cart</button>}
                     <br/>
                     <br/>

            </div>

            
        </div>
    );
};

export default Product;
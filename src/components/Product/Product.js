import React from 'react';
import './Product.css';

const Product = (props) => {

    // console.log(props);

     const {img, name, seller, price, stock} = props.product;
    return (
        <div className='product'>

            <div>
                 <img src={img} alt=""/>
            </div>


            <div>
                     <h1 style={{color:'blue'}}>{name}</h1>
                     <br/>
                     <p><small>by: {seller}</small></p>
                     <p>${price}</p>
                     
                     <p><small>Only {stock} in stock. Order soon...</small></p>
                     <br/>
                     <button onClick={() =>props.handleAddProduct(props.product)} className='main-button'>Add to cart</button>
            </div>

            
        </div>
    );
};

export default Product;
import React from 'react';

const ReviewItem = (props) => {

    const {name, quantity, img, key, price} = props.product;
    const removeProduct = props.removeProduct;
    console.log(props)

    const reviewItemStyle={
        borderBottom:'2px solid gray',
        marginLeft: '10px',
        marginBottom: '70px',
        width: '60%',
        borderRight: '2px solid lightGray'
        

    };

    const reviewContaier={
        display: 'flex'
    }
    return (
        <div style={reviewContaier}>

             <div className="image">
                       <img src={img} alt=""/>
             </div>

             <div style={reviewItemStyle}>
                        
                        <h3>Item-name:    <span style={{color:'blue'}}>{name}</span></h3>
                        <h5>Quantity:     <span style={{color:'blue'}}>{quantity} </span> </h5>
                        <small>Price: {'$'+ price}</small><br/><br/>
                        <button onClick={() =>removeProduct(key)} className='main-button'>Remove</button>
                        <br/><br/>
            
              </div>




        </div>
    );
};

export default ReviewItem;
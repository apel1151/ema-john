import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import './Shipment.css';

const Shipment = () => {
            const { register, handleSubmit, watch, formState: { errors } } = useForm();
            const [loggedInUser, setLoggedInUser] = useContext(UserContext);
            const onSubmit = data =>{

                console.log('form submitted' , data);
                const savedCart = getDatabaseCart();
                const orderDetails = {...loggedInUser, products: savedCart, shipment: data , orderTime: new Date() }
                fetch('http://localhost:5000/addOrder', {
                        method: 'POST',
                        headers: {
                                'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(orderDetails)
                })
                .then(res => res.json())
                .then( data => {
                        processOrder();
                        if(data){
                        alert('Your order placed successfully');
                        }
                      
                })
        
        };
        
            console.log(watch("example")); 
            return (
            
            <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
                    <input defaultValue={loggedInUser.name} {...register("name", { required: true })} placeholder='Your name' />
                    {errors.name && <span className="error">Name is required</span>}

                    <input defaultValue={loggedInUser.email} {...register("email", { required: true })} placeholder='Your email' />
                    {errors.email && <span className="error">Email is required</span>}

                    <input {...register("address", { required: true })} placeholder='Your address' />
                    {errors.address && <span className="error">Address is required</span>}

                    <input {...register("phone", { required: true })}  placeholder='Your phone'/>
                    {errors.phone && <span className="error">Phone is required</span>}

                    <input type="submit" />
            </form>

            );
};

export default Shipment;
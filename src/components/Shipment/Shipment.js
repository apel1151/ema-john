import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';

const Shipment = () => {
            const { register, handleSubmit, watch, formState: { errors } } = useForm();
            const onSubmit = data => console.log(data);
        
            console.log(watch("example")); 
            return (
            
            <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
                    <input {...register("name", { required: true })} placeholder='Your name' />
                    {errors.name && <span className="error">Name is required</span>}

                    <input {...register("email", { required: true })} placeholder='Your email' />
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
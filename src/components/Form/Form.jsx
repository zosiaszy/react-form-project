import React from "react";
import { useState, useRef } from "react";
import emailjs from '@emailjs/browser';



const Form = () => {
    const formRef = useRef();
    const [form, setForm] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { value, name } = e.target;
        setForm({...form, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        emailjs.sendForm(
            'your_service_id',    
            'your_template_id',   
            form.current,
            'your_public_key'     
        )
        .then(() => {
            setLoading(false);
            alert('Thank you for yor message');
       
            setForm({
                name: '',
                email: '',
                message: '',
              })
        
            }, (error) => {
              setLoading(false);
              console.log(error);
              alert('something went wrong')
            })
        }

    return(
        <div>
            <form
                 ref={formRef}
                 onSubmit={handleSubmit}
                 className="formBorder"
            >
                <label className="flex flex-col">
                    <span className="text-white font-medium mb-4">
                    Your name
                    </span>
                <input 
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="What's your name?"
                className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
                />

            </label>
            <label className="flex flex-col">
                <span className="text-white font-medium mb-4">
                Your Email
                </span>
            <input 
                type="text"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="What's your email?"
                className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
                />

            </label>
            <label className="flex flex-col">
                <span className="text-white font-medium mb-4">
                Your Message
                </span>
            <textarea 
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What do you want to say?"
                className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
                />

            </label>
            <button
                type="submit"
                className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl"
            >
                {loading ? 'Sending...' : 'Send'}

            </button>


            </form>
        </div>


    )
}

export default Form;
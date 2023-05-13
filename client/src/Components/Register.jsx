import React, { useState } from 'react'
import signup from "../assets/signup.jpg"
import logo from "../assets/logo.png"
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import "../Styles/Register.css"

function Register() {

    const navigate = useNavigate()

    const [registerData, setregisterData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        picturePath: "",
        location: "",
        occupation: ""
    })

    const [image, setimage] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        handleImageUpload()

        await axios.post("http://localhost:5000/api/register", {
            firstName: registerData.firstName,
            lastName: registerData.lastName,
            email: registerData.email,
            password: registerData.password,
            location: registerData.location,
            occupation: registerData.occupation,
            picturePath: registerData.picturePath
        })

        // console.log(data)
        navigate("/home")
    }

    const handleImageUpload = async (e) => {

        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "socioscape")
        data.append("cloud_name", "digqsa0hu")

        await fetch("https://api.cloudinary.com/v1_1/digqsa0hu/image/upload", {
            method: "post",
            body: data
        }).then((res) => res.json()).then((data) => {
            setregisterData({...registerData, picturePath:data.url})
        }).catch((err) => {
            console.log(err.message)
        })
    }

    return (
        <div>
            <div className='signup-form-div'>
                <div className="register-image">
                    <img src={signup} alt="" />
                </div>
                <div className='register-second'>
                    <div className='welcome-register'>
                        <p className='welcome-text'>Welcome to</p>
                        <img src={logo} alt="" />
                    </div>
                    <form className="register-form">
                        <div className='names'>
                            <input
                                type="text"
                                placeholder='Enter your First Name'
                                name='firstName'
                                value={registerData.firstName}
                                onChange={(e) => setregisterData({ ...registerData, firstName: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder='Enter your Last Name'
                                name='lastName'
                                value={registerData.lastName}
                                onChange={(e) => setregisterData({ ...registerData, lastName: e.target.value })}
                            />
                        </div>
                        <div className="email">
                            <input
                                type="text"
                                placeholder='Enter email'
                                name='email'
                                value={registerData.email}
                                onChange={(e) => setregisterData({ ...registerData, email: e.target.value })}
                            />
                        </div>
                        <div className="password">
                            <input
                                type="password"
                                placeholder='Enter Password'
                                name='password'
                                value={registerData.password}
                                onChange={(e) => setregisterData({ ...registerData, password: e.target.value })}
                            />
                        </div>
                        <div className="extra">
                            <input
                                type="text"
                                placeholder='Enter Location'
                                name='location'
                                value={registerData.location}
                                onChange={(e) => setregisterData({ ...registerData, location: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder='Enter Occupation'
                                name='occupation'
                                value={registerData.occupation}
                                onChange={(e) => setregisterData({ ...registerData, occupation: e.target.value })}
                            />
                        </div>
                        <div>

                            <input type="file" name='image' onChange={(e) => setimage(e.target.files[0])} />

                        </div>
                        <div className="registerbtn">
                            <button
                                type='submit'
                                onClick={handleSubmit}
                                className='register-button'
                            >Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
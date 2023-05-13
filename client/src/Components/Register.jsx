import React, { useState } from 'react'
import signup from "../assets/signup.jpg"
import logo from "../assets/logo.png"
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import Dropzone from 'react-dropzone'
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

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = await axios.post("http://localhost:5000/api/register", {
            firstName: registerData.firstName,
            lastName: registerData.lastName,
            email: registerData.email,
            password: registerData.password,
            location: registerData.location,
            occupation: registerData.occupation,
            picturePath: registerData.picturePath.name
        })

        console.log(data)
        navigate("/home")
    }

    // const handleSubmit = async (e) => {
    //     e.preventDefault()

    //     const formData = new FormData()
    //     formData.append("firstName",registerData.firstName)
    //     formData.append("lastName",registerData.lastName)
    //     formData.append("email",registerData.email)
    //     formData.append("password",registerData.password)
    //     formData.append("location",registerData.location)
    //     formData.append("occupation",registerData.occupation)
    //     formData.append("picturePath", registerData.picturePath.name)

    //     console.log(registerData.picturePath.name)

    //     const response = await axios.post("http://localhost:5000/api/register", {
    //         formData
    //     })
    // }

    const handleImageUpload = (e) => {
        // console.log(e.target.files[0])
        setregisterData({ ...registerData, picturePath: e.target.files[0] })
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
                        {/* <div className="drop-photo"> */}
                        <div>
                            {/* <Dropzone name="image" multiple={false}
                                onDrop={acceptedFiles =>
                                    setregisterData({ ...registerData, picturePath: acceptedFiles[0].name})}
                            >
                                {({ getRootProps, getInputProps }) => (
                                    <section>
                                        <div {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            <p>{registerData.picturePath === "" ? "Choose File" : registerData.picturePath}</p>
                                        </div>
                                    </section>
                                )}
                            </Dropzone> */}

                            <input type="file" name='image' onChange={handleImageUpload} />

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
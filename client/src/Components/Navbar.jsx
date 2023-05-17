import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setLogout } from '../States'
import { useNavigate } from 'react-router-dom'
import logo from "../assets/logo.png"
import "../Styles/Navbar.css"
import { motion } from 'framer-motion'

function Navbar() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)

    const [search, setsearch] = useState("")

    const name = `${user.firstName}`

    return (
        <div>
            <motion.div
                transition={{ duration: 0.8 }}
                initial={{ opacity: 0, y: "-400px" }}
                animate={{ opacity: 1, y: "0px" }}
                exit={{ opacity: 0, y: "-400px" }}
                className="navbar">
                <div className='first'>
                    <div>
                        <img src={logo} alt="company-logo" onClick={() => { navigate("/") }} />
                    </div>
                    <div>
                        <input
                            type="text"
                            className='search-bar'
                            value={search}
                            onChange={(e) => setsearch(e.target.value)}
                            placeholder='Search Posts...'
                        />
                        <i className="fa fa-search"></i>
                    </div>
                </div>
                <div className="second">
                    <div className="name-area">
                        <div className="active"></div>
                        {name}
                    </div>
                    <button onClick={() => dispatch(setLogout())}>Logout</button>
                </div>
            </motion.div>
        </div>
    )
}

export default Navbar
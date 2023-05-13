import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setLogin } from '../States'

function Login() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })

    return (
        <div>
            sfs 
        </div>
    )
}

export default Login
import React from 'react'
import "../Styles/LogoutModal.css"
import { useDispatch } from 'react-redux'
import { setLogout } from '../States'

function LogoutModal({ modal, toggleModal }) {

    if(modal){
        document.body.classList.add('active-modal')
    }
    else{
        document.body.classList.remove("active-modal")
    }

    const dispatch = useDispatch()

    return (
        <div>

            <div className="modal">
                <div className="overlay">
                    <div className="modal-content">
                        <div className="logout-modal">
                            <span>Are You sure,You want to logout?</span>
                            <div className="logoutbtns">
                                <button className='yes-btn' onClick={() => dispatch(setLogout())}>Yes</button>
                                <button className='cancel-btn' onClick={toggleModal}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default LogoutModal
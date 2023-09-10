import React from 'react'
import { makeStyles } from '@mui/styles'


function Index() {
    return (
        <div>
            <div>
                <div>
                    <img
                        src="https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80"
                        alt="Person"
                        width="275"
                        height="275"
                        style={{borderRadius:'100%'}}
                    />
                </div>
                <h2>Fullname</h2>
                <h3>Position</h3>
                <p>Email</p>
            </div>

            <div>
                <button>Edit Profile</button>
                <p>Reports</p>
                <p>Recent Activity</p>
            </div>
        </div>
    )
}

export default Index
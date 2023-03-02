import React from 'react'
import LogInAdmin from '../Section-2/LogInAdmin'
import WeekTable from './WeekTable'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button'
import {Link} from 'react-router-dom'
// import ButtonGroup from '@material-ui/core/ButtonGroup'



function overdueLinkAdmin() {
    return (
        <div>
                <div className="main-login-admin-weektable-section">
                        <div className="overdue-arrowback-logo">
                        <Link to="/">
                            <Button color="primary" variant="outlined">
                                <ArrowBackIcon fontSize="large" className="arrow-back-logo" />
                            </Button>

                        </Link>
                           
                        </div>
                        <div className="overdue-weektable-section">
                                 <WeekTable className="overdue-week-table"/>
                           
                        </div>
                        <div className="overdue-login-admin">
                            <LogInAdmin />
                        </div>
                </div>
                <div className="practice-section">

                </div>
        </div>
    )
}

export default overdueLinkAdmin

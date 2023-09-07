import React from 'react'
import LogInAdmin from '../../../Section-2/LogInAdmin'
import WeekTable from '../../../Common/WeekTable';
import WeekTable from '../../../Common/WeekTable';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
// import ButtonGroup from '@mui/material/ButtonGroup'



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
                    <WeekTable className="overdue-week-table" />

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

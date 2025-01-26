import React from 'react'
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import '../../App.css'
function WeekTable() {
    return (
        <div className="week-table-container">
            <div className="week-table-container-items">
                <div className="date-section">
                    <WatchLaterIcon fontSize="large"  className="date-logo-item" />
                    
                </div>
                <div className="week-section">
                        <div className="week-items">
                            <h1>Mon</h1>
                            <p>9</p>
                        </div>
                        <div className="week-items">
                            <h1>Tue</h1>
                            <p>10</p>
                        </div>
                        <div className="week-items">
                            <h1>Wed</h1>
                            <p>11</p>
                        </div>
                        <div className="week-items">
                            <h1>Thu</h1>
                            <p>12</p>
                        </div>
                        <div className="week-items">
                            <h1>Fri</h1>
                            <p>13</p>
                        </div>
                        <div className="week-items">
                            <h1>Sat</h1>
                            <p>14</p>
                        </div>
                        <div className="week-items">
                            <h1>Sun</h1>
                            <p>15</p>
                        </div>

                </div>
                <div className="calender-section">
                    <CalendarTodayIcon fontSize="large" className="calender-logo-item"/>

                </div>
            </div>
                
        </div>
    )
}

export default WeekTable

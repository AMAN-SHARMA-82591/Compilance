/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import Compilance_items from './Compilance-items'
import { NavLink } from 'react-router-dom'
import "../../App.css"
import OverdueBoxComponent from './OverdueBoxComponent'
function Home() {
  return (
    <div className="home">
      <div className="home-section">
        <div className="home-section-1">
          <NavLink className="overdue-items-section" to="/overdue">
            <OverdueBoxComponent background="rgb(233, 82, 63)" h1="8" title="Overdue" width="180px" />
          </NavLink>
          <NavLink className="overdue-items-section" to="/upcoming">
            <OverdueBoxComponent background="#6773fd" h1="5" title="Upcoming" width="180px" />
          </NavLink>
          <NavLink className="overdue-items-section" to="/inprogress">
            <OverdueBoxComponent background="#f8b84a" h1="10" title="In Progress" width="180px" />
          </NavLink>
          <NavLink className="overdue-items-section" to="/total">
            <OverdueBoxComponent background="#1da193" h1="15" title="Total" width="180px" />
          </NavLink>


        </div>
        <div className="home-section-2 active">
          <div className="home-sec-2-item-1">
            <h1>Recently Missed</h1>
            <div className="home-sec-viewall-sec">
              <h1>View All &gt;</h1>
            </div>
          </div>
          <div className="compilance-container-small">
            <Compilance_items top="-50px" right="-320px" className="compilance-small-item" width="45%" />
            <Compilance_items top="-50px" right="-320px" className="compilance-small-item" width="45%" />
            <Compilance_items top="-70px" right="-320px" className="compilance-small-item" width="45%" />
            <Compilance_items top="-70px" right="-320px" className="compilance-small-item" width="45%" />
          </div>

        </div>
      </div>
    </div>
  )
}

export default Home

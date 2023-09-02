import React from 'react'
import { Switch, Route } from 'react-router-dom'
import '../../App.css'
import Donut from './Donut';
import People from './People';
import RecentlyAdded from './RecentlyAdded';

function Root() {
  return (
    <div className="section-2">
      <Donut />
      <People />
      <RecentlyAdded />
    </div>
  )
}

export default Root

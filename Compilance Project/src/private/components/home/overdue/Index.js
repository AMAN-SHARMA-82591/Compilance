import React from 'react'
import '../../App.css'
import FilterOverdue from '../../../Section-1/FilterOverdue'
import OverdueLinkAdmin from './OverdueLinkAdmin'
import OverdueTable from './OverdueTable'

function Index() {
    return (
        <div className="overdue-section">
            <OverdueLinkAdmin />
            <FilterOverdue background="rgb(233, 82, 63)" width="250px" h1="8" title="Index" />
            <OverdueTable />
        </div>
    )
}

export default Index

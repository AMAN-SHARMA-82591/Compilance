import React from 'react'
import FilterOverdue from './FilterOverdue'
import OverdueLinkAdmin from './OverdueLinkAdmin'
import OverdueTable from './OverdueTable'
function Upcoming() {
    return (
        <div>
            <OverdueLinkAdmin />
            <FilterOverdue background="#6773fd" h1="5" title="Upcoming" width="250px" />
            <OverdueTable />
        </div>
    )
}

export default Upcoming

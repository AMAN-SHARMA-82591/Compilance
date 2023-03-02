import React from 'react'
import FilterOverdue from './FilterOverdue'
import OverdueLinkAdmin from './OverdueLinkAdmin'
import OverdueTable from './OverdueTable'

function InProgress() {
    return (
        <div>
            <OverdueLinkAdmin />
            <FilterOverdue background="#f8b84a" h1="10" title="In Progress"  width="250px" />
            <OverdueTable />
        </div>
    )
}

export default InProgress

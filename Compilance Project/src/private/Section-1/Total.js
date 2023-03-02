import React from 'react'
import FilterOverdue from './FilterOverdue'
import OverdueLinkAdmin from './OverdueLinkAdmin'
import OverdueTable from './OverdueTable'

function Total() {
    return (
        <div>
            <OverdueLinkAdmin />
            <FilterOverdue background="#1da193" h1="15" title="Total"  width="250px"/>
            <OverdueTable />
        </div>
    )
}

export default Total

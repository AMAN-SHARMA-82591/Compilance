import React from 'react'
import FilterOverdue from '../overdue/FilterOverdue'
import OverdueLinkAdmin from './OverdueLinkAdmin'
import OverdueTable from './OverdueTable'

function Index() {
    return (
        <div>
            <OverdueLinkAdmin />
            <FilterOverdue background="#1da193" h1="15" title="Total"  width="250px"/>
            <OverdueTable />
        </div>
    )
}

export default Index

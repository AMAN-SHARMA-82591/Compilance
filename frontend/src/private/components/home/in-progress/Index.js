import React from 'react'
import OverdueLinkAdmin from './OverdueLinkAdmin'
import OverdueTable from './OverdueTable'
import FilterOverdue from '../overdue/FilterOverdue';

function Index() {
    return (
        <div>
            <OverdueLinkAdmin />
            <FilterOverdue background="#f8b84a" h1="10" title="In Progress" width="250px" />
            <OverdueTable />
        </div>
    )
}

export default Index

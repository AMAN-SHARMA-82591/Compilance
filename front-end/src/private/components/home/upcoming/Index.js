import React from 'react'
import FilterOverdue from '../../home/overdue/FilterOverdue';
import OverdueLinkAdmin from './OverdueLinkAdmin'
import OverdueTable from './OverdueTable'
function Index() {
    return (
        <div>
            <OverdueLinkAdmin />
            <FilterOverdue background="#6773fd" h1="5" title="Upcoming" width="250px" />
            <OverdueTable />
        </div>
    )
}

export default Index

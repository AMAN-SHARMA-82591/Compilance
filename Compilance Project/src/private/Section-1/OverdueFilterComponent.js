import React from 'react'
import Button from '@material-ui/core/Button'

function OverdueFilterComponent() {
    return (
        <div className="overdue-filter-component">
            <div className="filter-text-item">
                    <h1>Filter</h1>
            </div>
            <div className="filter-button-item">
                    <Button color="primary" variant="outlined">High Risk</Button>
                    <Button color="primary" variant="outlined">Medium</Button>
                    <Button color="primary" variant="outlined">Low</Button>
            </div>
        </div>
    )
}

export default OverdueFilterComponent

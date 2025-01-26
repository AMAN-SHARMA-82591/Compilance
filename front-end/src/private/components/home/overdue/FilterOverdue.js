import React from 'react'
import OverdueBoxComponent from './OverdueBoxComponent'
import OverdueFilterComponent from './OverdueFilterComponent'
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

function FilterOverdue(props) {
    return (
        <div className="filter-overdue-section">
                <OverdueBoxComponent width={props.width} background={props.background} h1={props.h1} title={props.title} />
                <OverdueFilterComponent />
                <div className="filter-search-section" >
                        <Button className="button-filtered-comp" variant="outlined" color="primary">
                                <SearchIcon />
                        </Button>
                        <TextField label="Search" variant="outlined" />
                </div>
        </div>
    )
}

export default FilterOverdue

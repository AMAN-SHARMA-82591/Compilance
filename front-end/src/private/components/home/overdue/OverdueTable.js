import React from 'react'
import OverdueTableContent from './OverdueTableContent'

function OverdueTable() {
    return (
        <div className="overdue-table-section">
            <table className="overdue-table-cont">
                <tr>
                    <th>Compilance</th>
                    <th>Progress</th>
                    <th>Law</th>
                    <th>Risk</th>
                </tr>
                <OverdueTableContent t1="Hello all my name is aman sharma" color="error" t2="Hello" t3="All" t4="ClassRoom" />
                <OverdueTableContent color="primary" t1="Hello all my name is aman sharma" t2="Hello" t3="All" t4="ClassRoom" />
                <OverdueTableContent color="error"  t1="Hello all my name is aman sharma" t2="Hello" t3="All" t4="ClassRoom" />
                <OverdueTableContent color="primary" t1="Hello all my name is aman sharma" t2="Hello" t3="All" t4="ClassRoom" />

            </table>
        </div>
    )
}

export default OverdueTable

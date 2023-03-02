import React from 'react'
import DescriptionIcon from '@material-ui/icons/Description';
function OverdueTableContent(props) {
    return (
        <>
                <tr className="overdue-table-cont-items">
                    <td className="table-data-cont-1"><DescriptionIcon fontSize="large" color={props.color} /> <p>{props.t1}</p></td>
                    <td>{props.t2}</td>
                    <td>{props.t3}</td>
                    <td>{props.t4}</td>
                </tr>

        </>
    )
}

export default OverdueTableContent

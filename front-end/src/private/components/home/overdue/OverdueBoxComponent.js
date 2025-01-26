import React from 'react'

function OverdueBoxComponent(props) {
    return (
        <div>
             <div style={{backgroundColor: props.background,width:props.width}} className="home-sec-item-1">
                                        <h1>{props.h1}</h1>
                                        <p>{props.title}</p>
            </div>
        </div>
    )
}

export default OverdueBoxComponent

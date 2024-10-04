import React,{useState,useEffect,useRef} from 'react'
import '../../App.css'

import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CompilanceDropDownMenu from './CompilanceDropDownMenu';
function CompilanceItems(props) {
    const [drop,setDrop] = useState(false)

    let compilanceDropDown= useRef(null)
    useEffect(() =>{
        let handler = (event) =>{
            if(!compilanceDropDown.current.contains(event.target)){
                setDrop(false)
            }
        }
        document.addEventListener('mousedown',handler);
        return () =>{
            document.removeEventListener('mousedown',handler)
        }
    })
    return (
        <div  ref={compilanceDropDown}   style={{width:props.width}} className="compilance-small-item-sec">
            <div className="comp-logo">
                <ViewHeadlineIcon style={{ color: "#6773fd" }} fontSize="large" />
            </div>
            <div className="comp-text">
                <h1>Compilance-1</h1>
            </div>
            <div className="comp-more-items-logo comp-more-push">
                <MoreVertIcon onClick={()=> setDrop(!drop)} fontSize="large" style={{ color:"rgb(56, 55, 55)" }}/>
            </div>

            <div className="compilance-drop-down-menu-sec">
                    {
                        drop?<CompilanceDropDownMenu top={props.top} right={props.right} />:null
                    }
            </div>
        </div>
    )
}

export default CompilanceItems
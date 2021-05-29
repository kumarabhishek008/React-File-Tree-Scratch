import React,{useState,useEffect} from 'react';
import { CaretRightFill, CaretDownFill } from 'react-bootstrap-icons';

const Folder = (props) => {
    const { folderName, data, setData } = props;
    const [open, setOpen] = useState(false);
    const handleClickFolder = (flag) => {
        setOpen(!open);
        setData(flag?{...data,collapsed:false}:{...data,collapsed:true});
    }
    // useEffect(() => {
    //     if(open){

    //     }
    // }, [open])
    return (
        <div id={`folder-${folderName}`}>
            {
                <p onClick={()=>handleClickFolder(open?0:1)}><span>{open?<CaretDownFill/>:<CaretRightFill/>}</span>{folderName}</p>
            }
            
        </div>
    )
}

export default Folder

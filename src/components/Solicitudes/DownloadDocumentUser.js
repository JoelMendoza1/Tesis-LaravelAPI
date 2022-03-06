import React from "react";
import {Button} from "antd";
import {FileOutlined} from "@ant-design/icons";
import {API} from "../../services/API";

export default function DownloadDocumentUser(props){
    const onDownload=()=>{
        console.log(props.id)
    }
    return(
        <div>
            <Button
                shape="circle"
                style={{background:'transparent', borderColor:'transparent'}}
                icon={<FileOutlined />}
                title="Descargar documento"
                target="_blank"
                href={"http://localhost:8000/storage"+props.document.substring(6)}
                //href={API+`users/${props.id}/document`}
                onClick={onDownload}
            />
        </div>
        )
}
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
                style={{backgroundColor:"primary"}}
                icon={<FileOutlined />}
                title="Descargar documento"
                href={API+`users/${props.id}/document`}
                onClick={onDownload}
            />
        </div>
        )
}
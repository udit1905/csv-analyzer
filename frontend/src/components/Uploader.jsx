import React, { useState, useEffect } from 'react'
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import CSVDisplay from './CSVDisplay';

const { Dragger } = Upload;


const Uploader = ({ file, setFile }) => {

    const props = {
        name: 'csv_file',
        accept: ".csv",
        multiple: false,
        showUploadList: false,
        action: 'http://localhost:8000/api/uploadcsv/',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
                setFile(info.file.originFileObj)
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);

        },
    };

    useEffect(() => {
        console.log("csv: ", file)
    }, [file])

    return (
        <div>
            {!file ? <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag  to this area to upload CSV data file</p>
                <p className="ant-upload-hint">
                    Analyse CSV data using english language text prompt. (Rows X Cols should not exceed 600)
                </p>
            </Dragger> : <CSVDisplay csv={file} setCSV={setFile} />}
        </div>
    )
}

export default Uploader
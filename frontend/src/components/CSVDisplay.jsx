import React, { useState } from 'react'
import { Table, Button, } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import Papa from 'papaparse'

const CSVDisplay = ({ csv, setCSV }) => {
    const [csvData, setCSVData] = useState([]);
    useState(() => {
        Papa.parse(csv, {
            complete: (result) => {
                setCSVData(result.data);
            },
            header: true, // Set this to true if your CSV file has a header row
        });
    }, [])

    const columns = Object.keys(csvData[0] || {}).map(columnName => ({
        title: columnName,
        dataIndex: columnName,
        key: columnName,
    }));



    return (
        <div>
            <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span>Data Table Preview</span>
                    <Button type='primary' onClick={() => setCSV(null)} icon={<CloseCircleOutlined />} danger>{csv.name}</Button>
                </div>
                <Table dataSource={csvData} columns={columns} style={{ height: "40vh", overflow: "scroll", border: "2px solid grey", marginTop: "1rem" }} />
            </div>
        </div>
    )
}

export default CSVDisplay
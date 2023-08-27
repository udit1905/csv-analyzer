import React, { useState } from 'react'
import { Input, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';

const Chatbot = ({ file }) => {
    const [query, setQuery] = useState('');
    const handleQueryChange = (e) => {
        setQuery(e.target.value);
    }
    const [conversation, setConversation] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSendQuery = async () => {
        if (!query) return;
        setConversation(conversation => [...conversation, { role: 'user', content: query }]);
        setLoading(true)
        const response = await fetch('http://localhost:8000/api/analysecsv/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                filename: file?.name,
                query: query
            }),
        });
        setQuery('')
        const data = await response.json();
        setLoading(false)
        setConversation(conversation => [...conversation, { role: 'assistant', content: data.assistant_reply }]);
    }
    return (
        <div style={{ height: "45vh", overflow: "scroll", border: "2px solid grey", position: 'relative', marginTop: "1rem" }}>
            <div>ChatBot</div>
            <div style={{ padding: "1rem" }} >
                {conversation.map(({ role, content }, index) => (
                    <div style={role === 'user' ?
                        { textAlign: "left", padding: "5px" } : { textAlign: "left", background: "rgb(230, 230, 230)", padding: "5px" }
                    } key={index}>{content}</div>
                ))
                }
                {loading && <div>Generating...</div>}
                {conversation.toString() ? <div style={{ height: "2rem" }}></div> : <div style={{ height: "30vh" }}></div>}

            </div>
            <div style={{ display: 'flex', alignItems: 'center', position: "sticky", bottom: "1rem", left: "3rem", right: "3rem", margin: "0 1rem" }}>
                <Input
                    placeholder="Type your query..."
                    value={query}
                    onChange={handleQueryChange}
                    onPressEnter={handleSendQuery}
                    style={{ marginRight: '8px' }}
                />
                <Button
                    type="primary"
                    shape="circle"
                    icon={<SendOutlined />}
                    onClick={handleSendQuery}
                />
            </div>
        </div >
    )
}

export default Chatbot
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Microlink from '@microlink/react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Item {
    id: number;
    content: string;
}

interface Stack {
    id: number;
    title: string;
    description: string;
    items: Item[];
}

const StackPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [stack, setStack] = useState<Stack | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStack = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/stacks/${id}`);
                setStack(res.data);
            } catch (err) {
                console.error('Error fetching stack:', err);
            }
        };

        fetchStack();
    }, [id]);

    const deleteStack = async () => {
        try {
            await axios.delete(`http://localhost:8000/api/stacks/${id}`);
            navigate('/');
        } catch (err) {
            console.error('Error deleting stack:', err);
        }
    };

    if (!stack) return <div>Loading...</div>;

    return (
        <div>
            <h2>{stack.title}</h2>
            <p>{stack.description}</p>
            <ul>
                {stack.items.map(item => (
                    <li key={item.id}>
                        <Microlink url={item.content} />
                    </li>
                ))}
            </ul>
            <button className="delete-stack-button" onClick={deleteStack}>Delete Stack</button>
        </div>
    );
};

export default StackPage;

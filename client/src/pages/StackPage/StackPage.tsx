import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Microlink from '@microlink/react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './StackPage.css';
import EditStackModal from '../../components/EditStackModal/EditStackModal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

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
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
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

    const cautionDeleteStack = () => {
        // TODO
    };

    const shareStack = () => {
        navigator.clipboard.writeText(`${window.location.origin}/stack/${id}`);
        toast('Stack link copied to clipboard!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
        });
    }

    if (!stack) return <div>Loading...</div>;

    return (
        <div className="stack-page">
            <div className="stack-info">
                <h2>{stack.title}</h2>
                <p>{stack.description}</p>
            </div>
            <ToastContainer />
            <div className="button-group">
                <EditIcon className="edit-stack-button" onClick={() => setEditModalOpen(true)}></EditIcon>
                <hr></hr>
                <SendIcon className="share-stack-button" onClick={shareStack}></SendIcon>
                <hr></hr>
                <DeleteIcon className = "delete-stack-button" onClick={deleteStack}></DeleteIcon>
            </div>
            <EditStackModal
                open={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                stack={stack}
                onSave={setStack}
            />
            <div className="stack-items">
                <ul>
                    {stack.items.map(item => (
                        <li key={item.id}>
                            <Microlink url={item.content} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default StackPage;

import React, { useEffect, useState, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './StackPage.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

const EditStackModal = React.lazy(() => import('../../components/EditStackModal/EditStackModal'));
const DeleteStackConfirmationModal = React.lazy(() => import('../../components/DeleteStackConfirmationModal/DeleteStackConfirmationModal'));
const LinkRenderer = React.lazy(() => import('../../components/LinkRenderer'));

interface Item {
    id: number;
    content: string;
}

interface Stack {
    uuid: string;
    title: string;
    description: string;
    items: Item[];
}

const StackPage: React.FC = () => {
    const { uuid } = useParams<{ uuid: string }>();
    const [stack, setStack] = useState<Stack | null>(null);
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
    const [deleteStackModalOpen, setDeleteStackModalOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStack = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/stacks/${uuid}`);
                setStack(res.data);
            } catch (err) {
                console.error('Error fetching stack:', err);
            }
        };

        fetchStack();
    }, [uuid]);

    const deleteStack = async () => {
        try {
            await axios.delete(`http://localhost:8000/api/stacks/${uuid}`);
            navigate('/');
        } catch (err) {
            console.error('Error deleting stack:', err);
        }
    };

    const confirmDeleteStack = () => {
        setDeleteStackModalOpen(true);
    }

    const handleConfirmDeleteStack = async () => {
        setDeleteStackModalOpen(false);
        await deleteStack();
    }

    const shareStack = () => {
        navigator.clipboard.writeText(`${window.location.origin}/stack/${uuid}`);
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
                <DeleteIcon className = "delete-stack-button" onClick={confirmDeleteStack}></DeleteIcon>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <EditStackModal
                    open={editModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    stack={stack}
                    onSave={setStack}
                />
                <DeleteStackConfirmationModal
                    open={deleteStackModalOpen}
                    onClose={() => setDeleteStackModalOpen(false)}
                    onConfirm={handleConfirmDeleteStack}
                />
                <div className="stack-items">
                    {stack.items.map(item => (
                        <LinkRenderer url={item.content} />
                    ))}
                </div>
            </Suspense>
        </div>
    );
};

export default StackPage;

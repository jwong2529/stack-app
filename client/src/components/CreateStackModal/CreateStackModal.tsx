import React, { FC, useState } from 'react';
import Modal from 'react-modal';
import './CreateStackModal.css';

interface ModalProps {
    show: boolean;
    handleClose: () => void;
    addStack: (stack: { title: string; description: string; items: { type: string; content: string }[] }) => void;
}

const CreateStackModal: FC<ModalProps> = ({ show, handleClose, addStack }) => {
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [links, setLinks] = useState<string[]>([]);
    const [linkInput, setLinkInput] = useState('');

    const handleAddLink = () => {
        if (linkInput.trim()) {
            setLinks([...links, linkInput]);
            setLinkInput('');
        }
    };
    
    const handleCreateStack = () => {
        if (title.trim() && description.trim() && links.length > 0) {
            const items = links.map(link => ({ type: 'link', content: link}));
            addStack({ title, description, items });
            setTitle('');
            setDescription('');
            setLinks([]);
            handleClose();
        }
    };

    const handleCloseModal = () => {
        setTitle('');
        setDescription('');
        setLinks([]);
        setLinkInput('');
        handleClose();
    }

    if (!show) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={handleCloseModal}>
                    &times;
                </span>
                <h2>Create New Stack</h2>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Stack Title"
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Stack Description"
                />
                <div className="links-container">
                    <input 
                        type="text"
                        value={linkInput}
                        onChange={(e) => setLinkInput(e.target.value)}
                        placeholder="Enter link"
                    />
                    <button onClick = {handleAddLink}>Add to Link</button>
                    <ul className="links-list">
                        {links.map((link, index) =>(
                            <li key={index}>{link}</li>
                        ))}
                    </ul>
                </div>
                <button onClick={handleCreateStack}>Create Stack</button>
            </div>
        </div>
    );
}

export default CreateStackModal;
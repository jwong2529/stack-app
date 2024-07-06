import React, { useState } from 'react';
import CreateStackModal from '../CreateStackModal/CreateStackModal';
import './NewStackButton.css';

interface Stack {
    title: string;
    description: string;
    links: string[];
}

const NewStackButton: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [stacks, setStacks] = useState<Stack[]>([]);

    const handleOpen = () => {
        setShowModal(true);
    }

    const handleClose = () => {
        setShowModal(false);
    }

    const addStack = (stack: Stack) => {
        setStacks([...stacks, stack])
    }

    return (
        <div className="StackButton">
            <button onClick={handleOpen} className="new-stack-button">
                Create new stack
            </button>
            <CreateStackModal show={showModal} handleClose={handleClose} addStack={addStack}/>
        </div>
    );
};

export default NewStackButton;
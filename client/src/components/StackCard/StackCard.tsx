import React from 'react';
import './StackCard.css';

interface Item {
    type: string;
    content: string;
}

interface Stack {
    id: number;
    title: string;
    description: string;
    items: Item[];
}

interface StackCardProps {
    stack: Stack;
}

const StackCard: React.FC<StackCardProps> = ({ stack }) => {
    return (
        <div className="stack-card">
            <div className="stack-card-title">{stack.title}</div>
        </div>
    )
}

export default StackCard;
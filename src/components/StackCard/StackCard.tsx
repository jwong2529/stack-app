import React from 'react';
import './StackCard.css';

interface Stack {
    title: string;
    description: string;
    links: string[];
}

interface StackCardProps {
    stack: Stack;
}

const StackCard: React.FC = () => {
    return (
        <div className="stack-card">
            <div className="stack-card-title">Leetcode</div>
        </div>
    )
}

export default StackCard;
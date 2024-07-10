import React from 'react';
import { Link } from 'react-router-dom';
import './StackCard.css';
import LinkIcon from '@mui/icons-material/Link';

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

    const copyStackURLToClipboard = () => {
        const stackLink = `${window.location.origin}/stack/${stack.id}`;
        navigator.clipboard.writeText(stackLink).then(() => {
            alert('Link copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    };

    return (
        <div>
            <Link to={`${window.location.origin}/stack/${stack.id}`} style={{ textDecoration: 'none', color: 'inherit'}}>
                <div className="stack-card">
                    <div className="link-icon">
                        <LinkIcon onClick={copyStackURLToClipboard}></LinkIcon>
                    </div>
                    <div className="stack-card-title">{stack.title}</div>
                </div>
            </Link>
        </div>
    )
}

export default StackCard;
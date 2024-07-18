import React from 'react';
import { Link } from 'react-router-dom';
import './StackCard.css';
import LinkIcon from '@mui/icons-material/Link';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Item {
    type: string;
    content: string;
}

interface Stack {
    uuid: string;
    title: string;
    description: string;
    items: Item[];
}

interface StackCardProps {
    stack: Stack;
}

const StackCard: React.FC<StackCardProps> = ({ stack }) => {

    const copyStackURLToClipboard = () => {
        navigator.clipboard.writeText(`${window.location.origin}/stack/${stack.uuid}`);
        toast('Stack link copied to clipboard!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
        });
    };

    const handleLinkIconClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        event.preventDefault();
        copyStackURLToClipboard();
    }

    return (
        <div>
            <ToastContainer />
            <Link to={`/stack/${stack.uuid}`} style={{ textDecoration: 'none', color: 'inherit'}}>
                <div className="stack-card">
                    <div className="link-icon">
                        <LinkIcon onClick={handleLinkIconClick}></LinkIcon>
                    </div>
                    <div className="stack-card-title">{stack.title}</div>
                </div>
            </Link>
        </div>
    )
}

export default StackCard;
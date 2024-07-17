import React, { FC, useState } from 'react';
import { Modal, Box, Button, TextField, IconButton, Typography, List, ListItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ModalProps {
    show: boolean;
    handleClose: () => void;
    addStack: (stack: { title: string; description: string; items: { type: string; content: string }[] }) => void;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    maxHeight: '60vh',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    overflowY: 'auto',
};

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
        <Modal 
            open={show} 
            onClose={(_, reason) => {
                if (reason !== "backdropClick") {
                    handleCloseModal();
                }
            }}
        >
            <Box sx={style}>
                <IconButton
                    aria-label="close"
                    onClick={handleCloseModal}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <h2>Create New Stack</h2>
                <TextField
                    label="Stack Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    sx={{ p: 0, marginBottom: 2 }}
                />
                <TextField
                    label="Stack Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                    rows={4}
                    multiline
                    sx={{ p: 0, m: 0 }}
                />
                <Box sx={{display: 'flex', alignItems: 'center', marginTop: 2}}>
                    <TextField
                        label="Enter link"
                        value={linkInput}
                        onChange={(e) => setLinkInput(e.target.value)}
                        fullWidth
                        multiline
                        sx={{ p: 0, m: 0 }}
                    />
                    <span></span>
                    <Button variant="contained" color="primary" onClick={handleAddLink} sx={{ marginLeft: 2 }}>
                        Add Link
                    </Button>
                </Box>
                <List>
                    {links.map((link, index) => (
                        <ListItem key={index}>
                            {link}
                        </ListItem>
                    ))}
                </List>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCreateStack}
                    sx={{ marginTop: 2 }}
                    fullWidth
                >
                    Create Stack
                </Button>
            </Box>
        </Modal>
    );
}

export default CreateStackModal;
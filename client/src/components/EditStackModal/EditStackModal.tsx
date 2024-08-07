import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';

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

interface EditStackModalProps {
    open: boolean;
    onClose: () => void;
    stack: Stack;
    onSave: (updatedStack: Stack) => void;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    maxHeight: '70vh',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
    overflowY: 'auto', 
};

const ModalContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const Paper = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),

    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '80%',
    maxWidth: '500px',
}));

const DeleteIconStyled = styled(DeleteIcon)({
    cursor: 'pointer',
    marginLeft: '8px',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
        transform: 'scale(1.2)',
    },
});

const ItemSection = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(0.5),
}));

const ItemRow = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: '8px',
    borderRadius: '4px',
    marginBottom: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
});

const ItemContent = styled('span')({
    display: 'flex',
    flexWrap: 'wrap',
    wordBreak: 'break-word',
    flex: '1',
});

const NewItemSection = styled('div')(({ theme }) => ({
    // marginTop: theme.spacing(2),
}));

const ButtonsSection = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2),
}));

const EditStackModal: React.FC<EditStackModalProps> = ({ open, onClose, stack, onSave }) => {
    const [editedStack, setEditedStack] = useState<Stack>(stack);
    const [newItemContent, setNewItemContent] = useState<string>('');

    const handleDeleteItem = (itemId: number) => {
        setEditedStack({
            ...editedStack,
            items: editedStack.items.filter(item => item.id !== itemId),
        });
    };

    const handleAddItem = () => {
        if (newItemContent.trim() === '') return;
        const newItem = { id: Date.now(), content: newItemContent };
        setEditedStack({
            ...editedStack,
            items: [...editedStack.items, newItem],
        });
        setNewItemContent('');
    };

    const handleSaveChanges = async () => {
        try {
            await axios.put(`http://localhost:8000/api/stacks/${stack.uuid}`, editedStack);
            onSave(editedStack);
            onClose();
        } catch (err) {
            console.error('Error saving stack changes:', err);
        }
    };

    return (
        <Modal 
            open={open} 
            onClose={(_, reason) => {
                if (reason !== "backdropClick") {
                    onClose();
                }
            }}
        >
            <ModalContainer>
                <Paper sx={style}>
                    <h2>Edit Stack</h2>
                    <TextField
                        label="Title"
                        value={editedStack.title}
                        onChange={(e) => setEditedStack({ ...editedStack, title: e.target.value })}
                        fullWidth
                        multiline
                        sx={{ p: 0, m: 0 }}
                    />
                    <TextField
                        label="Description"
                        value={editedStack.description}
                        onChange={(e) => setEditedStack({ ...editedStack, description: e.target.value })}
                        fullWidth
                        multiline
                        sx={{ p: 0, m: 0 }}
                    />
                    <ItemSection>
                        {editedStack.items.map(item => (
                            <ItemRow key={item.id}>
                                <ItemContent>{item.content}</ItemContent>
                                <DeleteIconStyled onClick={() => handleDeleteItem(item.id)} />
                            </ItemRow>
                        ))}
                    </ItemSection>
                    <NewItemSection>
                        <TextField
                            label="Add new link"
                            value={newItemContent}
                            onChange={(e) => setNewItemContent(e.target.value)}
                            fullWidth
                            multiline
                            sx={{ p: 0, m: 0 }}                         
                        />
                        <Button onClick={handleAddItem} color="primary" variant="contained" style={{ marginTop: '10px' }}>
                            Add Link
                        </Button>
                    </NewItemSection>
                    <ButtonsSection>
                        <Button onClick={onClose} color="secondary" variant="contained">
                            Cancel
                        </Button>
                        <Button onClick={handleSaveChanges} color="primary" variant="contained">
                            Save Changes
                        </Button>
                    </ButtonsSection>
                </Paper>
            </ModalContainer>
        </Modal>
    );
};

export default EditStackModal;

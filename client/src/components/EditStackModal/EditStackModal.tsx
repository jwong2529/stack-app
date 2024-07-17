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
    id: number;
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
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '80%',
    maxWidth: '500px',
}));

const DeleteIconStyled = styled(DeleteIcon)({
    cursor: 'pointer',
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
            await axios.put(`http://localhost:8000/api/stacks/${stack.id}`, editedStack);
            onSave(editedStack);
            onClose();
        } catch (err) {
            console.error('Error saving stack changes:', err);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <ModalContainer>
                <Paper>
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
                                <span>{item.content}</span>
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

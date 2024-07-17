import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const ModalContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const Paper = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '80%',
    maxWidth: '500px',
    textAlign: 'center',
}));

interface DeleteConfirmationModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteStackConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ open, onClose, onConfirm }) => {
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
                <Paper>
                    <h2>Confirm deletion</h2>
                    <p>Are you sure you want to delete this stack? This action cannot be undone.</p>
                    <Button onClick={onClose} color="secondary" variant="contained" style={{ marginRight: '10px'}}>
                        Cancel
                    </Button>
                    <Button onClick={onConfirm} color="primary" variant="contained">
                        Confirm
                    </Button>
                </Paper>
            </ModalContainer>
        </Modal>
    );
};

export default DeleteStackConfirmationModal;
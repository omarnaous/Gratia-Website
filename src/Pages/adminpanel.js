import React from 'react';
import { Button, Typography, Container, Box, Paper } from '@mui/material';
import Navbar from '../Components/Navbar';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useState } from 'react';
import ImageSelectionPage from '../Components/ImageSelection';

const AdminPanel = ({ onClose }) => {
    const formContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60vh',
    };

    const buttonContainerStyle = {
        display: 'flex',
        flexDirection: 'column', // Change to 'column'
        alignItems: 'center', // Center the buttons horizontally
        padding: '16px',
        borderRadius: '8px',
        backgroundColor: '#f0f0f0',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    };

    const buttonStyle = {
        width: '20vw', // Set button width to 100% for full width
        marginBottom: '8px', // Add margin between buttons
    };

    const handleSignOut = () => {
        auth.signOut(); // Sign out when the button is clicked
        onClose();
    };

    const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage dialog open/close

    const handleOpenDialog = () => {
        setIsDialogOpen(true); // Open the dialog when this function is called
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false); // Close the dialog when this function is called
    };

    return (
        <div>
            <div style={formContainerStyle}>
                <Container maxWidth="xs">
                    <form>
                        <Typography variant="h4" align="center" gutterBottom>
                            Admin Panel
                        </Typography>
                        <Paper elevation={3} style={buttonContainerStyle}>
                            <Link to="/AddP">
                                <Button variant="outlined" style={buttonStyle}>
                                    ADD NEW PRODUCTS
                                </Button>
                            </Link>
                            <Link to="/AddCategory">
                                <Button variant="outlined" style={buttonStyle}>
                                    ADD NEW CATEGORY
                                </Button>
                            </Link>
                            <Link >
                                <Button variant="outlined" style={buttonStyle} onClick={handleOpenDialog}>
                                    EDIT BANNER
                                </Button>
                            </Link>

                            {/* Render the ImageSelectionPage with the open state and close function */}
                            <ImageSelectionPage open={isDialogOpen} handleClose={handleCloseDialog} />
                            <Link to="/EditProducts">
                                <Button variant="outlined" style={buttonStyle}>
                                    EDIT PRODUCTS
                                </Button>
                            </Link>

                            <Button variant="outlined" color="info" style={buttonStyle}>
                                ORDERS
                            </Button>
                            <Button variant="outlined" color="info" style={buttonStyle} onClick={handleSignOut}>
                                SIGN OUT
                            </Button>

                        </Paper>
                    </form>
                </Container>
            </div>
        </div>
    );
};

export default AdminPanel;

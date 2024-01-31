import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { Button, Typography, Container, Paper, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Addproducts from './Addproducts';
import AddCategory from './AddCategory';
import MyBannerEdit from './EditBanner';
import EditCategory from './EditCategory';
import UserOrders from './userorders';
import { db } from '../firebase';
import {
    doc,
    setDoc,
  } from 'firebase/firestore'; 

const AdminPanel = ({ onClose, isAdminPanel }) => {
    const buttonContainerStyle = {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '16px',
        borderRadius: '8px',
        backgroundColor: '#f0f0f0',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    };

    const buttonStyle = {
        width: '300px', // Set a fixed width for all buttons
        marginBottom: '15px',
        backgroundColor: '#fff',
        border: '1px solid black',
    };

    const typographyStyle = {
        color: 'black',
        fontSize: '1.2rem',
    };

    const handleSignOut = () => {
        auth.signOut();
        onClose();
    };

    const [isAddProductsOpen, setIsAddProductsOpen] = useState(false);

    const handleOpenDialog = () => {
        setIsAddProductsOpen(true);
    };

    const hadnleCloseAddProducts = () => {
        setIsAddProductsOpen(false);
    };

    const [isAddCAtegory, setisAddCategory] = useState(false);

    const handleCategoryDialog = () => {
        setisAddCategory(true);
    };

    const handleCategoryClose = () => {
        setisAddCategory(false);
    };

    const [isEditBanner, setEditBanner] = useState(false);

    const handleEditBannerOpen = () => {
        setEditBanner(true);
    };

    const handleEditBannerClose = () => {
        setEditBanner(false);
    };

    const [isEditCategoryOpen, setEditCategoryOpen] = useState(false);
    const openEditCat = () => {
        setEditCategoryOpen(true);
    };

    // Function to close the AdminPanel dialog
    const closeEditCat = () => {
        setEditCategoryOpen(false);
    };

    const [isDeleteBannerOpen, setDeleteBannerOpen] = useState(false);

    const handleDeleteBannerOpen = () => {
        setDeleteBannerOpen(true);
    };

    const handleDeleteBannerClose = () => {
        setDeleteBannerOpen(false);
    };

    const updateBanner = async () => {
        try {
            const bannerRef = doc(db, 'Banner', 'Banner');
            await setDoc(
                bannerRef,
                {
                    url: '', // Replace with your Firestore field name
                },
                { merge: true }
            );
            alert('Banner deleted successfully!');
            handleDeleteBannerClose();
        } catch (error) {
            console.error('Error updating banner:', error);
        }
    };

    return (
        <div>
            <div style={buttonContainerStyle}>
                <div maxWidth="xs">
                    <form>
                        <h1 style={{ textAlign: 'center', margin: '10px' }}>
                            {isAdminPanel ? 'Admin Panel' : 'Account Details'}
                        </h1>
                        <Paper elevation={3} style={buttonContainerStyle}>
                            {isAdminPanel && (
                                <>
                                    <Button variant="outlined" style={buttonStyle} onClick={handleOpenDialog}>
                                        <Typography style={typographyStyle}>ADD NEW PRODUCTS</Typography>
                                    </Button>
                                    <Link to="/EditProducts">
                                        <Button variant="outlined" style={buttonStyle}>
                                            <Typography style={typographyStyle}>EDIT PRODUCTS</Typography>
                                        </Button>
                                    </Link>
                                    <Button variant="outlined" style={buttonStyle} onClick={handleCategoryDialog}>
                                        <Typography style={typographyStyle}>ADD NEW CATEGORY</Typography>
                                    </Button>
                                    <Button variant="outlined" style={buttonStyle} onClick={openEditCat}>
                                        <Typography style={typographyStyle}>Edit Categories</Typography>
                                    </Button>
                                    <Button variant="outlined" style={buttonStyle} onClick={handleEditBannerOpen}>
                                        <Typography style={typographyStyle}>EDIT BANNER IMAGE</Typography>
                                    </Button>
                                    <Button variant="outlined" style={buttonStyle} onClick={handleDeleteBannerOpen}>
                                        <Typography style={typographyStyle}>DELETE BANNER IMAGE</Typography>
                                    </Button>
                                </>
                            )}
                           <UserOrders />
                            <Button variant="outlined" color="info" style={buttonStyle} onClick={handleSignOut}>
                                <Typography style={typographyStyle}>SIGN OUT</Typography>
                            </Button>
                        </Paper>
                        {isAdminPanel && (
                            <>
                                <Dialog open={isAddProductsOpen} onClose={hadnleCloseAddProducts}>
                                    <Addproducts />
                                    <DialogActions>
                                        <Button onClick={hadnleCloseAddProducts} color="primary">
                                            Close
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                                <Dialog open={isAddCAtegory} onClose={handleCategoryClose}>
                                    <AddCategory />
                                    <DialogActions>
                                        <Button onClick={handleCategoryClose} color="primary">
                                            Close
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                                <Dialog open={isEditBanner} onClose={handleEditBannerClose}>
                                    <MyBannerEdit />
                                    <DialogActions>
                                        <Button onClick={handleEditBannerClose} color="primary">
                                            Close
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                                <Dialog open={isEditCategoryOpen} onClose={closeEditCat}>
                                    <EditCategory />
                                    <DialogActions>
                                        <Button onClick={closeEditCat} color="primary">
                                            Close
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                                <Dialog open={isDeleteBannerOpen} onClose={handleDeleteBannerClose}>
                                    {/* Create a component or content for deleting the banner */}
                                    <DialogTitle>Delete Banner</DialogTitle>
                                    <DialogContent>
                                        <Typography>
                                            Are you sure you want to delete the banner?
                                        </Typography>
                                        {/* You can add additional content here if needed */}
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleDeleteBannerClose} color="primary">
                                            Cancel
                                        </Button>
                                        <Button onClick={updateBanner} color="primary">
                                            Delete
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;

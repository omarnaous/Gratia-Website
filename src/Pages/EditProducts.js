import React, { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ProductCard from '../Components/media_card';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { auth, db } from '../firebase';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton'; // Import IconButton
import EditIcon from '@mui/icons-material/Edit'; // Import EditIcon
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { setDoc } from 'firebase/firestore';

// Import Material-UI components that were missing
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 450,
      md: 600,
      lg: 900,
      xl: 1200,
      tablet: 768,
    },
  },
});

const ContainerBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3%;
`;

const ContentBox = styled.div`
  width: 75%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h3`
  color: black;
  font-weight: bold;
  text-align: center;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const CardBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
`;

const DeleteButton = styled(Button)`
  background-color: red;
  color: white;
  margin-top: 10px;
  width: 1vw;
  margin: 10px;
`;

const Row = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-evenly;
`;

export default function EditProduct() {
  const [productsData, setProductsData] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    id: '',
    productName: '',
    productPrice: '',
    category: '',
    description: '',
    images: [],
  });
  const [originalProduct, setOriginalProduct] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const data = [];

        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });

        setProductsData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (documentId) => {
    try {
      // Delete the document from Firestore
      await deleteDoc(doc(db, 'products', documentId));

      // Update the local state by removing the deleted item
      setProductsData((prevData) =>
        prevData.filter((item) => item.id !== documentId)
      );
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  const handleOpenEditDialog = (product) => {
    setEditedProduct({
      id: product.id,
      productName: product.productName,
      productPrice: product.productPrice,
      category: product.category,
      description: product.description,
      images: product.images,
    });
    setOriginalProduct(product);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleSaveEdit = async (product) => {
    try {
      const productRef = doc(db, 'products', editedProduct.id);

      await setDoc(
        productRef,
        {
          productName: editedProduct.productName,
          productPrice: editedProduct.productPrice,
          category: product.category,
          description: editedProduct.description,
          images: product.images,
        },
        { merge: true }
      );

      handleCloseEditDialog();
      window.location.reload(); // Reload the window after saving
    } catch (error) {
      console.error('Error editing document:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <ContainerBox>
        <ContentBox>
          <ThemeProvider theme={theme}>
            <Grid container spacing={2}>
              {productsData.map((product, index) => (
                <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={index}>
                  <CardBox>
                    <Link to={`/Detail?index=${index}`}>
                      <ProductCard height="40vh" image={product.images[0]} />
                    </Link>
                    <Title>{product.productName}</Title>
                    <Title>{product.productPrice}</Title>
                    <Title>{product.category.categoryName}</Title>
                    <Row>
                      <IconButton
                        onClick={() => handleOpenEditDialog(product)}
                        color="primary"
                        aria-label="edit"
                      >
                        <EditIcon />
                      </IconButton>
                      <DeleteButton
                        variant="contained"
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </DeleteButton>
                    </Row>
                  </CardBox>
                </Grid>
              ))}
            </Grid>
          </ThemeProvider>
        </ContentBox>
      </ContainerBox>

      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            label="Product Name"
            fullWidth
            margin="normal"
            value={editedProduct.productName}
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, productName: e.target.value })
            }
          />
          <TextField
            label="Product Price"
            fullWidth
            margin="normal"
            value={editedProduct.productPrice}
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, productPrice: e.target.value })
            }
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={editedProduct.description}
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, description: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleSaveEdit(originalProduct)} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

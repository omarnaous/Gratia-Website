import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CancelIcon from '@mui/icons-material/Cancel';

const MenuContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 80%;
  height: 100vh;
  background-color: white;
  box-shadow: -5px 0 10px rgba(0, 0, 0, 0.2);
  z-index: 1;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-right: 10px;
`;

const Title = styled.h1`
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const ListContainer = styled.div`
  flex: 1;
  width: 100%;
  margin: 10px;
  overflow-y: scroll;
`;

const MenuItemContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  margin-bottom: 10px;
  overflow: hidden;
`;

const MenuItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  margin-right: 10px;
`;

const MenuItemInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const MenuItemName = styled.h2`
  font-weight: bold;
  margin: 0;
`;

const MenuItemPrice = styled.h3`
  margin: 0;
`;

const MenuMobile = ({ onClose, menuItems }) => {
  return (
    <MenuContainer>
      <Header>
        <Title>MENU</Title>
        <CloseButton onClick={onClose}>
          <CancelIcon />
        </CloseButton>
      </Header>
      <ListContainer>
        {menuItems.length === 0 ? (
          <p>The menu is empty.</p>
        ) : (
          menuItems.map((menuItem) => (
            <MenuItemContainer key={menuItem.itemId}>
              <MenuItemImage src={menuItem.image} alt="" />
              <MenuItemInfo>
                <MenuItemName>{menuItem.name}</MenuItemName>
                <MenuItemPrice>${menuItem.price}</MenuItemPrice>
              </MenuItemInfo>
            </MenuItemContainer>
          ))
        )}
      </ListContainer>
    </MenuContainer>
  );
};

export default MenuMobile;

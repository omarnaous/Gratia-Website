import styled from "styled-components";
export const MenuContainer = styled.div`
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
 
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-right: 10px;
`;

export const Title = styled.h1`
  margin: 0;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

export const ListContainer = styled.div`
  flex: 1;
  width: 100%;
  margin: 10px;
  overflow-y: scroll;
`;

export const MenuItemContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  margin-bottom: 10px;
  overflow: hidden;
  display: flex;
  align-items: center;
  a {
    text-decoration: none;
    color: black;
  }
`;

export const MenuItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

export const MenuItemName = styled.h2`
  font-weight: bold;
  margin: 0;
`;

export const MenuItemPrice = styled.h3`
  margin: 0;
`;
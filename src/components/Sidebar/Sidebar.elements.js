import styled from "styled-components";
import {FaTimes} from "react-icons/fa";


export const SidebarContainer = styled.aside`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #0d0d0d;
    z-index: 999;
    transition: 0.3s all ease-in-out;
    display: grid;
    align-items: center;
    opacity:${({isOpen}) => (isOpen ? '100%' : '0')};
    top:${({isOpen}) => (isOpen ? '0' : '-100%')};

`;

export const CloseIcon = styled(FaTimes)`
    color: #fff;
`;

export const Icon = styled.div`
    position: absolute;
    top: 1.2rem;
    right: 1.5rem;
    background: transparent;
    font-size:2rem;
    cursor: pointer;
    outline: none;
`;
// dir: ~/quangminh-smart-border/frontend/src/components/layout/Header/SearchModal.tsx
'use client';

import { RiSearchLine, RiCloseLine } from 'react-icons/ri';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 15vh;
  z-index: 2000;
`;

const SearchBox = styled(motion.div)`
  width: 100%;
  max-width: 600px;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 20px 60px 20px 20px;
  font-size: 24px;
  border-radius: 8px;
  border: none;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} // Đóng khi click ra ngoài
        >
          <SearchBox 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()} // Ngăn việc đóng khi click vào search box
          >
            <SearchInput type="text" placeholder="Tìm kiếm dịch vụ, tin tức..." autoFocus />
            <CloseButton onClick={onClose}><RiCloseLine /></CloseButton>
          </SearchBox>
        </Overlay>
      )}
    </AnimatePresence>
  );
}
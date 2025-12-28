// dir: frontend/src/components/shared/FaqItem.tsx
'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { RiAddLine, RiSubtractLine } from 'react-icons/ri';
import { motion, AnimatePresence } from 'framer-motion';

const FaqItemWrapper = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Question = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
  
  .icon {
    font-size: 20px;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const AnswerPanel = styled(motion.div)`
  overflow: hidden;
  
  p {
    padding: 0 0 24px 0;
    font-size: 15px;
    line-height: 1.7;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

interface FaqItemProps {
  question: string;
  answer: string;
}

export default function FaqItem({ question, answer }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = `faq-panel-${question.replace(/\s+/g, '-')}`; 

  return (
    <FaqItemWrapper>
      <Question 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span>{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="icon"
        >
          {isOpen ? <RiSubtractLine /> : <RiAddLine />}
        </motion.div>
      </Question>
      <AnimatePresence initial={false}>
        {isOpen && (
          <AnswerPanel
            id={panelId}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <p>{answer}</p>
          </AnswerPanel>
        )}
      </AnimatePresence>
    </FaqItemWrapper>
  );
}
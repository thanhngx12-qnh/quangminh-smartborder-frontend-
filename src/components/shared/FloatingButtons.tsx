// dir: frontend/src/components/shared/FloatingButtons.tsx
'use client';

import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { RiPhoneFill, RiMailFill, RiFacebookCircleFill, RiArrowUpSLine } from 'react-icons/ri';
import { SiZalo } from "react-icons/si";
import { sendGTMEvent } from '@next/third-parties/google'; // <-- IMPORT HÀM CHÍNH CHỦ

// --- Styled Components (Giữ nguyên) ---
const FabContainer = styled.div` position: fixed; bottom: 30px; right: 30px; z-index: 999; display: flex; flex-direction: column; align-items: flex-end; gap: 12px; @media (max-width: 576px) { bottom: 20px; right: 20px; gap: 10px; } `;
const FabButton = styled(motion.a)<{ $isPrimary?: boolean }>` display: flex; align-items: center; justify-content: center; width: 50px; height: 50px; border-radius: 50%; border: none; cursor: pointer; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); transition: all 0.2s ease-out; font-size: 24px; text-decoration: none; ${({ $isPrimary, theme }) => $isPrimary ? css` background-color: ${theme.colors.accent}; color: ${theme.colors.white}; &:hover { transform: scale(1.1); box-shadow: 0 6px 16px rgba(255, 0, 0, 0.3); } ` : css` background-color: ${theme.colors.surface}; color: ${theme.colors.primary}; &:hover { background-color: ${theme.colors.primary}; color: ${theme.colors.white}; } `} `;
const ScrollToTopButton = styled(motion.button)` display: flex; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: 50%; border: 1px solid ${({ theme }) => theme.colors.border}; background-color: ${({ theme }) => theme.colors.surface}; color: ${({ theme }) => theme.colors.textSecondary}; cursor: pointer; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); font-size: 24px; margin-bottom: 8px; &:hover { background-color: ${({ theme }) => theme.colors.primary}; color: ${({ theme }) => theme.colors.white}; border-color: ${({ theme }) => theme.colors.primary}; } `;
const ButtonWrapper = styled(motion.div)` position: relative; `;
const Tooltip = styled(motion.div)` position: absolute; top: 50%; right: calc(100% + 12px); transform: translateY(-50%); background-color: rgba(0,0,0,0.8); color: white; padding: 6px 10px; border-radius: 4px; font-size: 12px; font-weight: 500; white-space: nowrap; pointer-events: none; `;

// --- KHÔNG CÒN DECLARE GLOBAL NỮA ---

interface FabActionProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  delay: number;
  isPrimary?: boolean;
  target?: string;
  eventName: string;
}

const FabAction = ({ href, icon, label, delay, isPrimary, target, eventName }: FabActionProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleTrackingClick = () => {
    // SỬ DỤNG HÀM CHUẨN CỦA GOOGLE
    sendGTMEvent({
      event: 'contact_click',
      contact_method: eventName,
      page_location: typeof window !== 'undefined' ? window.location.href : ''
    });
  };

  return (
    <ButtonWrapper
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 300, damping: 20 }}
    >
      <FabButton 
        href={href} 
        aria-label={label}
        $isPrimary={isPrimary}
        target={target || '_self'}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        onClick={handleTrackingClick}
      >
        {icon}
      </FabButton>
      <AnimatePresence>
        {isHovered && (
          <Tooltip initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
            {label}
          </Tooltip>
        )}
      </AnimatePresence>
    </ButtonWrapper>
  );
};

export default function FloatingButtons() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) setIsVisible(true);
    else setIsVisible(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  
  const actions =[
    { href: 'tel:0963320335', icon: <RiPhoneFill />, label: 'Hotline: 0963.320.335', isPrimary: true, eventName: 'hotline_call' },
    { href: 'https://zalo.me/1564601831220674638', icon: <SiZalo />, label: 'Chat Zalo', target: '_blank', eventName: 'zalo_chat' },
    { href: 'https://facebook.com/talunglogistics.11', icon: <RiFacebookCircleFill style={{ color: '#1877F2' }} />, label: 'Facebook Fanpage', target: '_blank', eventName: 'facebook_message' },
    { href: 'mailto:info@talunglogistics.com', icon: <RiMailFill />, label: 'Gửi Email', eventName: 'email_send' },
  ];

  return (
    <FabContainer>
      <AnimatePresence>
        {isVisible && (
          <ButtonWrapper initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
            <ScrollToTopButton onClick={scrollToTop}>
              <RiArrowUpSLine />
            </ScrollToTopButton>
          </ButtonWrapper>
        )}
      </AnimatePresence>
      {actions.slice().reverse().map((action, index) => (
         <FabAction
            key={action.label}
            href={action.href}
            icon={action.icon}
            label={action.label}
            delay={(actions.length - index) * 0.05}
            isPrimary={action.isPrimary}
            target={action.target}
            eventName={action.eventName}
        />
      ))}
    </FabContainer>
  );
}
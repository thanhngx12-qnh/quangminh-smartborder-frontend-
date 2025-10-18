// dir: ~/quangminh-smart-border/frontend/src/components/shared/FloatingButtons.tsx
'use client';

import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { RiPhoneFill, RiMailFill, RiWechatFill, RiMessage3Fill, RiArrowUpSLine } from 'react-icons/ri';

// --- Styled Components ---

const FabContainer = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 16px;
`;

const FabButton = styled(motion.a)<{ $isPrimary?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease-out;

  font-size: 24px;
  text-decoration: none;

  // Style cho nút chính (nếu có) và các nút phụ
  ${({ $isPrimary, theme }) => 
    $isPrimary 
    ? css`
      background-color: ${theme.colors.accent};
      color: ${theme.colors.white};
      &:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
      }
    `
    : css`
      background-color: ${theme.colors.surface};
      color: ${theme.colors.textSecondary};
      border: 1px solid ${theme.colors.border};
      &:hover {
        background-color: ${theme.colors.background};
        color: ${theme.colors.accent};
      }
    `}
`;

const ScrollToTopButton = styled(motion.button)`
  // Style giống hệt FabButton nhưng là thẻ <button>
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-size: 24px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const ButtonWrapper = styled(motion.div)`
  position: relative; // Cần thiết để định vị tooltip
`;

const Tooltip = styled(motion.div)`
  position: absolute;
  top: 50%;
  right: calc(100% + 12px); // Cách nút 12px về bên trái
  transform: translateY(-50%);
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  pointer-events: none; // Cho phép click xuyên qua tooltip
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

// --- Component con cho từng nút ---
interface FabActionProps {
  href: string;
  icon: React.ReactNode;
  label: string; // Thêm label cho tooltip
  delay: number;
  target?: string;
}

const FabAction = ({ href, icon, label, delay, target }: FabActionProps) => {
  const [isHovered, setIsHovered] = useState(false);
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
        target={target || '_self'}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
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

// --- Main Component ---
export default function FloatingButtons() {
  const [isVisible, setIsVisible] = useState(false);

  // Logic để hiện/ẩn nút "Back to Top"
  const toggleVisibility = () => {
    if (window.scrollY > 300) { // Hiện ra sau khi cuộn xuống 300px
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Cuộn mượt mà!
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);
  
  // Danh sách các nút hành động
  const actions = [
    { href: 'tel:+84123456789', icon: <RiPhoneFill />, label: 'Gọi Hotline' },
    { href: 'mailto:info@quangminh.vn', icon: <RiMailFill />, label: 'Gửi Email' },
    { href: 'https://zalo.me/yourzalonumber', icon: <RiMessage3Fill />, label: 'Nhắn tin Zalo', target: '_blank' },
    { href: '#', icon: <RiWechatFill />, label: 'Liên hệ WeChat' },
  ];

  return (
    <FabContainer>
      <AnimatePresence>
        {isVisible && (
          <ButtonWrapper
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <ScrollToTopButton onClick={scrollToTop}>
              <RiArrowUpSLine />
            </ScrollToTopButton>
          </ButtonWrapper>
        )}
      </AnimatePresence>
      
      {actions.reverse().map((action, index) => ( // Dùng reverse để animation bung ra từ dưới lên
         <FabAction
            key={action.label}
            href={action.href}
            icon={action.icon}
            label={action.label}
            delay={(actions.length - index) * 0.05} // Tinh chỉnh delay
            target={action.target}
        />
      ))}
    </FabContainer>
  );
}
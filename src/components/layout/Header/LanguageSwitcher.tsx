// dir: ~/quangminh-smart-border/frontend/src/components/layout/Header/LanguageSwitcher.tsx
'use client';

import { useState, useRef } from 'react';
import { usePathname, useRouter } from '@/navigation';
import { useLocale } from 'next-intl';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { RiArrowDownSLine, RiTranslate2 } from 'react-icons/ri';

interface LanguageSwitcherProps {
  variant?: 'full' | 'icon'; 
}

const SwitcherWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  z-index: 1011; 

  @media (max-width: 992px) {
    // Để LanguageSwitcher trong MobileSettings không có margin/padding thừa
    padding: 0;
    margin: 0;
  }
`;

const CurrentLangButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font-family: inherit;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px;
  border-radius: 6px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1); // Giữ cho dark mode
  }
  
  // Điều chỉnh hover cho light mode
  ${({ theme }) => theme.name === 'light' && `
    &:hover {
      background-color: ${theme.colors.surface};
    }
  `}


  // Chỉnh lại kích thước icon khi dùng variant="icon"
  svg {
    font-size: 24px; // Kích thước icon mặc định cho cả desktop (nếu dùng icon) và mobile
  }
`;

const CurrentLangFlag = styled.span`
  font-size: 18px;
`;

const CurrentLangCode = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

const Dropdown = styled(motion.div)`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 180px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 8px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
  z-index: 1012;
`;

const DropdownItem = styled.button<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 10px 16px;
  background: ${({ theme, $isActive }) => $isActive ? theme.colors.surface : 'none'};
  font-weight: ${({ $isActive }) => $isActive ? '600' : '500'};
  border: none;
  cursor: pointer;
  text-align: left;
  font-size: 14px;
  color: inherit;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.surface};
  }
`;

const DropdownFlag = styled.span`
  font-size: 18px;
`;

const locales = [
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'zh', name: '中文 (Simplified)', flag: '🇨🇳' },
];

export default function LanguageSwitcher({ variant = 'full' }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  const changeLocale = (locale: string) => {
    router.push(pathname, { locale });
    setIsOpen(false);
  };

  const currentLangDetails = locales.find(l => l.code === currentLocale);

  return (
    <SwitcherWrapper onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <CurrentLangButton aria-label="Change language">
        {variant === 'full' ? (
          <>
            <CurrentLangFlag>{currentLangDetails?.flag}</CurrentLangFlag>
            <CurrentLangCode>{currentLangDetails?.code.toUpperCase()}</CurrentLangCode>
            <RiArrowDownSLine />
          </>
        ) : (
          <RiTranslate2 /> 
        )}
      </CurrentLangButton>
      
      <AnimatePresence>
        {isOpen && (
          <Dropdown
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {locales.map(locale => (
              <DropdownItem 
                key={locale.code} 
                onClick={() => changeLocale(locale.code)}
                $isActive={currentLocale === locale.code}
              >
                <DropdownFlag>{locale.flag}</DropdownFlag>
                <span>{locale.name}</span>
              </DropdownItem>
            ))}
          </Dropdown>
        )}
      </AnimatePresence>
    </SwitcherWrapper>
  );
}
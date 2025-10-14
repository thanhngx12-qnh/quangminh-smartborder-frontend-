// dir: ~/quangminh-smart-border/frontend/src/components/layout/Header/LanguageSwitcher.tsx
'use client';

import { usePathname, useRouter } from '@/navigation';
import { useLocale } from 'next-intl';
import { useState, useRef } from 'react'; 
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const SwitcherWrapper = styled.div`
  position: relative;
`;

const CurrentLang = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Dropdown = styled(motion.div)`
  position: absolute;
  top: 120%;
  right: 0;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  z-index: 10;
`;

const DropdownItem = styled.button`
  display: block;
  width: 100%;
  padding: 12px 20px;
  background: none;
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

const locales = [
  { code: 'vi', name: 'Tiếng Việt (VI)', flag: '🇻🇳' },
  { code: 'en', name: 'English (EN)', flag: '🇬🇧' },
  { code: 'zh', name: '中文 (ZH)', flag: '🇨🇳' },
];

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  
  // SỬA LỖI Ở ĐÂY: Sử dụng timer để quản lý việc đóng menu
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200); // Cho người dùng 200ms để di chuyển chuột vào dropdown
  };

  const changeLocale = (locale: string) => {
    router.push(pathname, { locale });
    setIsOpen(false);
  };

  const currentLangDetails = locales.find(l => l.code === currentLocale);

  return (
    // Gắn các sự kiện mới
    <SwitcherWrapper onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <CurrentLang>
        {currentLangDetails?.flag} {currentLangDetails?.code.toUpperCase()}
      </CurrentLang>
      <AnimatePresence>
        {isOpen && (
          <Dropdown
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {locales.map(locale => (
              <DropdownItem key={locale.code} onClick={() => changeLocale(locale.code)}>
                {locale.flag} {locale.name}
              </DropdownItem>
            ))}
          </Dropdown>
        )}
      </AnimatePresence>
    </SwitcherWrapper>
  );
}
// dir: ~/quangminh-smart-border/frontend/src/components/layout/Header/SearchModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useDebounce } from '@/hooks/useDebounce';
import { useSearch } from '@/hooks/useSearch';
import { RiCloseLine, RiLoader4Line, RiArticleLine, RiBriefcaseLine } from 'react-icons/ri';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/navigation';

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
  max-width: 550px;
  position: relative;

  @media (max-width: 600px) {
    margin: 0 16px;
  }
`;

const SearchInputWrapper = styled.div`
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 16px 50px 16px 16px;
  font-size: 20px;
  border-radius: 8px;
  border: none;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
  }

  @media (max-width: 600px) {
    font-size: 18px;
    padding: 14px 45px 14px 14px;
  }
`;

const InputIconWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  font-size: 24px;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;

  @media (max-width: 600px) {
    font-size: 22px;
  }
`;

const spin = keyframes` to { transform: rotate(360deg); } `;
const Spinner = styled(RiLoader4Line)`
  animation: ${spin} 1s linear infinite;
`;

const SearchResults = styled(motion.div)`
  margin-top: 16px;
  max-height: 60vh;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
`;

const ResultGroup = styled.div`
  padding: 8px 0;
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
  }
  h3 {
    padding: 8px 16px;
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textMuted};
    text-transform: uppercase;
  }
`;

const ResultItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  color: ${({ theme }) => theme.colors.text};
  transition: background-color 0.2s ease;
  
  svg {
    font-size: 18px;
    color: ${({ theme }) => theme.colors.textSecondary};
    flex-shrink: 0;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const NoResults = styled.div`
  padding: 40px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 400);
  const locale = useLocale();
  const t = useTranslations('Search');
  
  const { results, isLoading } = useSearch(debouncedSearchTerm, locale);
  
  useEffect(() => {
    if (!isOpen) setSearchTerm('');
  }, [isOpen]);
  
  const hasResults = results && (results.services?.length > 0 || results.news?.length > 0);
  const showNoResults = !isLoading && debouncedSearchTerm.length >= 2 && !hasResults;

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <SearchBox 
            initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -50, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <SearchInputWrapper>
              <SearchInput 
                type="text" placeholder={t('placeholder')} autoFocus 
                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              />
              <InputIconWrapper>
                {isLoading ? <Spinner /> : <RiCloseLine onClick={onClose} style={{cursor: 'pointer'}} />}
              </InputIconWrapper>
            </SearchInputWrapper>
            
            {(hasResults || showNoResults) && results && (
              <SearchResults
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {showNoResults && <NoResults>{t('noResults')}</NoResults>}
                
                {results.services?.length > 0 && (
                  <ResultGroup>
                    <h3>{t('services')}</h3>
                    {results.services.map(service => {
                      const translation = service.translations[0]; 
                      if (!translation) return null;
                      
                      return (
                        <ResultItem key={`s-${service.id}`} href={`/services/${translation.slug}`} as="a" onClick={onClose}>
                            <RiBriefcaseLine /> {translation.title}
                        </ResultItem>
                      );
                    })}
                  </ResultGroup>
                )}
                
                {results.news?.length > 0 && (
                  <ResultGroup>
                    <h3>{t('news')}</h3>
                    {results.news.map(newsItem => {
                      const translation = newsItem.translations[0]; 
                      if (!translation) return null;

                      return (
                        <ResultItem key={`n-${newsItem.id}`} href={`/news/${translation.slug}`} as="a" onClick={onClose}>
                            <RiArticleLine /> {translation.title}
                        </ResultItem>
                      );
                    })}
                  </ResultGroup>
                )}
              </SearchResults>
            )}
          </SearchBox>
        </Overlay>
      )}
    </AnimatePresence>
  );
}
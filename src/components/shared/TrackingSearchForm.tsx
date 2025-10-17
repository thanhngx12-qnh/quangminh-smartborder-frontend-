// dir: ~/quangminh-smart-border/frontend/src/components/shared/TrackingSearchForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import { RiSearchLine, RiLoader4Line } from 'react-icons/ri';
import { spin } from '@/styles/animations'; // Sẽ tạo file animations sau

// Style tương tự TrackingWidget cũ, nhưng là component độc lập
const SearchFormWrapper = styled.form`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 8px;
  border-radius: 8px;
  width: 100%;
  max-width: 500px; // Tăng kích thước
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

  input {
    flex-grow: 1;
    border: none;
    background: transparent;
    padding: 8px 12px;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.text};
    &:focus { outline: none; }
    &::placeholder { color: ${({ theme }) => theme.colors.textMuted}; }
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 24px;
    color: ${({ theme }) => theme.colors.primary};
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s ease;
    &:hover { color: ${({ theme }) => theme.colors.accent}; }
    &:disabled { cursor: not-allowed; }
  }
`;

const Spinner = styled(RiLoader4Line)`
  animation: ${spin} 1s linear infinite;
`;

interface TrackingFormProps {
  onSearch: (awbs: string) => void; // Hàm callback khi submit
  defaultValue?: string;
  isLoading?: boolean;
}
type FormData = { awbs: string };

export default function TrackingSearchForm({ 
  onSearch, 
  defaultValue = '', 
  isLoading = false 
}: TrackingFormProps) {
  const t = useTranslations('TrackingPage');
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: { awbs: defaultValue }
  });

  const onSubmit = (data: FormData) => {
    // Chỉ gọi callback nếu có dữ liệu
    if (data.awbs && data.awbs.trim() !== '') {
      onSearch(data.awbs.trim());
    }
  };

  return (
    <SearchFormWrapper onSubmit={handleSubmit(onSubmit)}>
      <input 
        type="text" 
        placeholder={t('trackingPlaceholder')}
        {...register('awbs')}
      />
      <button type="submit" aria-label="Track Shipment" disabled={isLoading}>
        {isLoading ? <Spinner /> : <RiSearchLine />}
      </button>
    </SearchFormWrapper>
  );
}
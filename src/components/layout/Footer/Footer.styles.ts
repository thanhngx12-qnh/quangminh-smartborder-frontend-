// dir: frontend/src/components/layout/Footer/Footer.styles.ts
'use client';
import styled, { keyframes } from 'styled-components';
import { Link } from '@/navigation';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const FooterWrapper = styled.footer`
  background-color: ${({ theme }) => theme.colors.footer.bg};
  color: ${({ theme }) => theme.colors.footer.text};
  padding-top: 80px;
  padding-bottom: 40px;
  animation: ${fadeIn} 0.5s ease-out;
`;

export const FooterContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  // Layout linh hoạt: 4 cột cho desktop
  grid-template-columns: repeat(4, 1fr); 
  gap: 40px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr); // 2 cột cho tablet
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr; // 1 cột cho mobile
    text-align: center;
    padding: 0 16px;
  }
`;

export const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  h3 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 18px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.white}; // Tiêu đề trắng
    margin-bottom: 12px;
    text-transform: uppercase;
    position: relative;

    &::after {
      content: '';
      display: block;
      width: 40px;
      height: 3px;
      background-color: ${({ theme }) => theme.colors.accent};
      margin-top: 8px;
      border-radius: 2px;
      
      @media (max-width: 768px) {
        margin: 8px auto;
      }
    }
  }

  address {
    font-style: normal;
    font-size: 14px;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.footer.textSecondary};
  }
`;

export const Logo = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 24px;
  font-weight: 800;
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 12px;
  
  span {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;

  @media (max-width: 768px) {
    justify-content: center;
  }

  a {
    color: ${({ theme }) => theme.colors.white};
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.1);
    font-size: 20px;
    transition: all 0.3s ease;

    &:hover {
      background-color: ${({ theme }) => theme.colors.accent};
      transform: translateY(-3px);
    }
  }
`;

export const LinkList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const FooterLink = styled(Link)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.footer.textSecondary};
  transition: all 0.2s ease;
  position: relative;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    padding-left: 6px;
  }
`;

export const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;

  input, textarea {
    width: 100%;
    padding: 12px;
    border-radius: 6px;
    border: 1px solid transparent;
    background-color: rgba(255, 255, 255, 0.1); // Nền mờ trên footer tối
    color: ${({ theme }) => theme.colors.white};
    font-size: 14px;
    transition: all 0.2s ease;

    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }

    &:focus {
      outline: none;
      background-color: rgba(255, 255, 255, 0.15);
      border-color: ${({ theme }) => theme.colors.accent};
    }
  }

  textarea {
    min-height: 100px;
    resize: vertical;
  }
`;

export const FormError = styled.p`
  font-size: 12px;
  color: #ff6b6b; // Đỏ sáng dễ nhìn trên nền tối
  margin-top: 4px;
`;

export const FormSuccess = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.success};
  background-color: rgba(16, 185, 129, 0.1);
  padding: 16px;
  border-radius: 6px;
  text-align: center;
  border: 1px solid rgba(16, 185, 129, 0.3);
`;

export const LoadingOverlay = styled.div`
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  z-index: 10;
`;

// Map Wrapper trải dài full width ở dưới cùng của grid content (hoặc tách riêng)
export const MapWrapper = styled.div`
  grid-column: 1 / -1; // Chiếm toàn bộ chiều ngang grid
  width: 100%;
  height: 300px;
  border-radius: 12px;
  overflow: hidden;
  margin-top: 20px;
  border: 1px solid rgba(255,255,255,0.1);
  
  iframe {
    width: 100%;
    height: 100%;
    border: 0;
    filter: grayscale(20%) contrast(1.1); // Chỉnh màu map cho hợp tông tối
  }
`;

export const CopyrightBar = styled.div`
  background-color: rgba(0, 0, 0, 0.2); // Đậm hơn nền footer chút
  color: ${({ theme }) => theme.colors.footer.textSecondary};
  text-align: center;
  padding: 20px;
  margin-top: 60px;
  font-size: 13px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

export const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.footer.textSecondary};
  
  a {
    color: inherit;
    &:hover { color: ${({ theme }) => theme.colors.white}; }
  }

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.accent}; // Icon màu đỏ nổi bật
  flex-shrink: 0;
`;
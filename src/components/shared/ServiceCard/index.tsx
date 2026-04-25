// dir: frontend/src/components/shared/ServiceCard/index.tsx
'use client';

import styled from 'styled-components';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/navigation';
import { Service } from '@/types';
import { RiArrowRightLine } from 'react-icons/ri';

// --- Styled Components ---

const ImageBox = styled.div`
  position: relative;
  width: 100%;
  height: 220px; // Tăng chiều cao ảnh một chút
  overflow: hidden; // Để che phần ảnh bị zoom ra ngoài
  background-color: #eee;

  img {
    object-fit: cover;
    transition: transform 0.5s ease; // Hiệu ứng zoom mượt mà
  }
`;

const ContentBox = styled.div`
  padding: 24px;
  flex: 1; // Chiếm phần còn lại
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 12px;
  transition: color 0.3s ease;
  
  // Giới hạn 2 dòng tiêu đề
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Description = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.textSecondary}; 
  line-height: 1.6;
  margin-bottom: 20px;
  
  // Giới hạn 3 dòng mô tả để card đều nhau
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ReadMore = styled.div`
  margin-top: auto; // Đẩy xuống đáy
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.accent}; // Màu đỏ thương hiệu
  opacity: 0.8;
  transition: all 0.3s ease;

  svg {
    transition: transform 0.3s ease;
  }
`;

const CardWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  height: 100%; // Đảm bảo chiều cao full trong Grid
  background-color: ${({ theme }) => theme.colors.surface};     
  border-radius: 12px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  text-decoration: none;
  border-bottom: 3px solid transparent; // Chuẩn bị sẵn border

  &:hover {
    transform: translateY(-8px); // Nổi lên
    box-shadow: ${({ theme }) => theme.shadows.lg};
    border-bottom-color: ${({ theme }) => theme.colors.accent}; // Hiện line đỏ khi hover

    ${ImageBox} img {
      transform: scale(1.08); // Zoom ảnh
    }

    ${Title} {
      color: ${({ theme }) => theme.colors.accent}; // Tiêu đề chuyển đỏ
    }

    ${ReadMore} {
      opacity: 1;
      gap: 12px; // Dãn khoảng cách icon
      svg {
        transform: translateX(4px); // Mũi tên chạy sang phải
      }
    }
  }
`;

// --- Main Component ---
interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const locale = useLocale();
  const t = useTranslations('General'); // Giả sử có key 'readMore' trong Common, nếu chưa có thì dùng text cứng tạm
  
  const translation = service.translations?.find(t => t.locale === locale) || service.translations?.[0];

  if (!translation) {
    return null; // Không render nếu lỗi data để tránh vỡ giao diện
  }

  return (
    <CardWrapper href={`/services/${translation.slug}`} as="a">
      <ImageBox>
        <Image 
          src={service.coverImage || '/images/placeholder.jpg'} // Cập nhật đường dẫn placeholder chuẩn
          alt={translation.title} 
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </ImageBox>
      <ContentBox>
        <Title>{translation.title}</Title>
        <Description>{translation.shortDesc}</Description>
        <ReadMore>
          {/* Fallback text nếu chưa có i18n key */}
          <span>{t('viewAll')}</span> 
          <RiArrowRightLine />
        </ReadMore>
      </ContentBox>
    </CardWrapper>
  );
}
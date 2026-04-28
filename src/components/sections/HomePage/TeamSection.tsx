// dir: frontend/src/components/sections/HomePage/TeamSection.tsx
'use client';

import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import Image from 'next/image';
import { RiPhoneLine, RiMailLine } from 'react-icons/ri';
import { SiZalo } from 'react-icons/si'; // Sử dụng SiZalo theo yêu cầu
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';

const SectionWrapper = styled.section`
  padding: 20px 20px;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 50px;
  h2 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 32px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 12px;
  }
  .divider {
    width: 50px;
    height: 3px;
    background: ${({ theme }) => theme.colors.accent};
    margin: 0 auto;
  }
`;

const TeamGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const MemberGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GroupBadge = styled.span`
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.primary};
  padding: 4px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 30px;
`;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
`;

const MemberItem = styled.div`
  width: 200px;
  text-align: center;
  
  &:hover .img-box {
    transform: scale(1.05);
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const ImageBox = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 15px;
  border-radius: 50%;
  padding: 5px;
  border: 2px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s ease;
  overflow: hidden;

  img {
    border-radius: 50%;
    object-fit: cover;
  }
`;

const Name = styled.h4`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 4px;
  color: ${({ theme }) => theme.colors.text};
`;

const Role = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 12px;
  line-height: 1.3;
  min-height: 34px; /* Giữ layout đều khi text xuống dòng */
`;

const SocialLinkBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;

  a {
    font-size: 18px;
    color: ${({ theme }) => theme.colors.textMuted};
    transition: all 0.2s;
    &:hover {
      color: ${({ theme }) => theme.colors.accent};
      transform: translateY(-2px);
    }
    &.zalo-icon:hover { color: #0068FF; }
  }
`;

export default function TeamSection() {
  const t = useTranslations('Organization');

  // Dữ liệu Ban lãnh đạo
  const board = [
    { name: "Ông Nguyễn Văn A", role: t('roles.chairman'), img: "/team/boss-1.jpg" },
    { name: "Bà Trần Thị B", role: t('roles.ceo'), img: "/team/boss-2.jpg" },
    { name: "Ông Lê Văn C", role: t('roles.deputy_ceo'), img: "/team/boss-3.jpg" },
  ];

  // Dữ liệu Phòng Vận hành & Kinh doanh (Gộp lại cho gọn)
  const staff = [
    { name: "Trưởng phòng", role: t('roles.ops_manager'), img: "/team/ops-1.jpg", phone: "0963320335" },
    { name: "Phó phòng", role: t('roles.ops_deputy'), img: "/team/ops-2.jpg", phone: "0963320335" },
    { name: "Phó phòng PTTT", role: t('roles.market_dev'), img: "/team/sales-1.jpg", phone: "0963320335" },
    { name: "Phó phòng MKT", role: t('roles.marketing_cskh'), img: "/team/sales-2.jpg", phone: "0963320335" },
    { name: "Trưởng BP XNK", role: t('roles.im_ex_head'), img: "/team/sales-3.jpg", phone: "0963320335" },
    { name: "Trưởng BP NĐ", role: t('roles.domestic_sales_head'), img: "/team/sales-4.jpg", phone: "0963320335" },
  ];

  return (
    <SectionWrapper>
      <Container>
        <FadeInWhenVisible>
          <SectionHeader>
            <h2>{t('title')}</h2>
            <div className="divider" />
          </SectionHeader>
        </FadeInWhenVisible>

        <TeamGrid>
          {/* Khối Lãnh đạo cấp cao */}
          <MemberGroup>
            <GroupBadge>{t('groups.management')}</GroupBadge>
            <List>
              {board.map((m, i) => (
                <FadeInWhenVisible key={i} delay={i * 0.1}>
                  <MemberItem>
                    <ImageBox className="img-box">
                      <Image src={m.img} alt={m.name} fill />
                    </ImageBox>
                    <Name>{m.name}</Name>
                    <Role>{m.role}</Role>
                  </MemberItem>
                </FadeInWhenVisible>
              ))}
            </List>
          </MemberGroup>

          {/* Khối Nhân sự chủ chốt (Kinh doanh & Vận hành) */}
          <MemberGroup>
            <GroupBadge>{t('groups.sales')} & {t('groups.ops')}</GroupBadge>
            <List>
              {staff.map((m, i) => (
                <FadeInWhenVisible key={i} delay={i * 0.05}>
                  <MemberItem>
                    <ImageBox className="img-box">
                      <Image src={m.img} alt={m.name} fill />
                    </ImageBox>
                    <Name>{m.name}</Name>
                    <Role>{m.role}</Role>
                    <SocialLinkBox>
                      <a href={`tel:${m.phone}`} title="Call"><RiPhoneLine /></a>
                      <a href={`https://zalo.me/${m.phone}`} className="zalo-icon" target="_blank" title="Zalo"><SiZalo /></a>
                      <a href="mailto:info@talunglogistics.com" title="Email"><RiMailLine /></a>
                    </SocialLinkBox>
                  </MemberItem>
                </FadeInWhenVisible>
              ))}
            </List>
          </MemberGroup>
        </TeamGrid>
      </Container>
    </SectionWrapper>
  );
}
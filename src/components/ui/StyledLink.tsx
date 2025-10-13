// dir: ~/quangminh-smart-border/frontend/src/components/ui/StyledLink.tsx
'use client';

import styled from 'styled-components';
import { Link } from '@/navigation';

/**
 * Một component Link đã được style, giải quyết vấn đề type của 'href'.
 * Nó không có style mặc định, chỉ đơn giản là một wrapper an toàn về kiểu dữ liệu.
 * Chúng ta có thể dùng nó ở bất cứ đâu thay cho Link "trần".
 */
const StyledLink = styled(Link)``;

export default StyledLink;
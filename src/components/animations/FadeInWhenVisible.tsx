// // dir: ~/quangminh-smart-border/frontend/src/components/animations/FadeInWhenVisible.tsx
// 'use client';

// import { motion } from 'framer-motion';
// import { ReactNode } from 'react';

// interface FadeInWhenVisibleProps {
//   children: ReactNode;
//   delay?: number; // Thêm tùy chọn delay
// }

// export default function FadeInWhenVisible({ children, delay = 0 }: FadeInWhenVisibleProps) {
//   return (
//     <motion.div
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: true, amount: 0.3 }} // once: true -> chỉ chạy 1 lần; amount: 0.3 -> chạy khi 30% component hiện ra
//       transition={{ duration: 0.6, delay }}
//       variants={{
//         visible: { opacity: 1, y: 0 },
//         hidden: { opacity: 0, y: 50 }, // Bắt đầu từ vị trí thấp hơn 50px
//       }}
//     >
//       {children}
//     </motion.div>
//   );
// }

// dir: ~/quangminh-smart-border/frontend/src/components/animations/FadeInWhenVisible.tsx
'use client';

import { motion, MotionProps } from 'framer-motion';
import { ReactNode } from 'react';

// Kết hợp props của chúng ta và tất cả các props hợp lệ của motion.div
interface FadeInWhenVisibleProps extends MotionProps {
  children: ReactNode;
}

export default function FadeInWhenVisible({ children, ...props }: FadeInWhenVisibleProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 },
      }}
      {...props} // Truyền tất cả các props còn lại vào
    >
      {children}
    </motion.div>
  );
}
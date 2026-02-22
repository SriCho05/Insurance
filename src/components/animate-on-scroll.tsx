'use client';

import { motion, type Variants } from 'framer-motion';
import type { FC, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    className?: string;
    delay?: number;
    amount?: number;
}

const defaultVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

export const AnimateOnScroll: FC<Props> = ({ children, className, delay, amount = 0.2 }) => {
    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            variants={defaultVariants}
            transition={{ duration: 0.6, delay, ease: 'easeOut' }}
            viewport={{ once: true, amount }}
        >
            {children}
        </motion.div>
    );
};

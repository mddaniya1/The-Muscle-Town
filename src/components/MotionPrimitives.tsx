import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

/**
 * Exact Threshold (https://thresholdtemplate.framer.website/) motion tokens:
 * - Zero-bounce spring: { type: 'spring', bounce: 0, duration: 0.9 }
 * - Stagger increment: 0.06s (0, 0.06, 0.12, 0.18...)
 * - Hover/image ease: [0.2, 0, 0, 1]
 */
export const THRES_SPRING = {
  type: 'spring' as const,
  bounce: 0,
  duration: 0.9,
};

export const THRES_EASE = [0.2, 0, 0, 1] as const;

export const THRES_STAGGER = 0.06;

/** Hero immediate entrance wrapper matching Threshold's data-framer-appear-id steps */
export function HeroAppear({
  children,
  step = 0,
  keepVisibleOpacity = false,
  className = '',
}: {
  children: React.ReactNode;
  step?: number;
  keepVisibleOpacity?: boolean;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{
        opacity: keepVisibleOpacity ? 1 : 0.001,
        y: 18,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        ...THRES_SPRING,
        delay: step * THRES_STAGGER,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Scroll-triggered reveal for section headers, blocks, and cards */
export function ScrollReveal({
  children,
  index = 0,
  yOffset = 18,
  className = '',
}: {
  children: React.ReactNode;
  index?: number;
  yOffset?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0.001, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        ...THRES_SPRING,
        delay: Math.min(index, 5) * THRES_STAGGER,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Giant footer wordmark upward slide reveal (y: 36 -> 0, opacity: 0 -> 1) */
export function WordmarkReveal({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0.001, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        type: 'spring',
        bounce: 0,
        duration: 1.0,
        delay: 0.08,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

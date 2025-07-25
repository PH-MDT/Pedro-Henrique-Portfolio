'use client'

import { motion } from 'framer-motion'
import { ComponentProps } from 'react';

type TechBagdeProps = ComponentProps<typeof motion.span> & {
    name: string;
}


export const TechBadge = ({ name, ...props }: TechBagdeProps) => {
    return (
        <motion.span className="text-cyan-400 bg-cyan-900/80 text-sm py-1 px-3 rounded-lg"
        {...props}
        >
            {name}
        </motion.span>
    )

}
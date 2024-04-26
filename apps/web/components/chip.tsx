'use client';

import React from 'react';

interface BadgeProps {
    label: string;
    onClick?: () => void;
}

export const Badge: React.FC<BadgeProps> = ({ label, onClick }) => {
    return (
        <span onClick={onClick} className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">{label}</span>
    );
};
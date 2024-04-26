'use client';

import React, { useState } from 'react';

interface ToggleProps {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
}

export const Toggle: React.FC<ToggleProps> = ({ checked, onChange }) => {
    const [isChecked, setIsChecked] = useState(checked || false);

    const handleToggle = () => {
        const newChecked = !isChecked;
        setIsChecked(newChecked);
        if (onChange) {
            onChange(newChecked);
        }
    };

    return (
        <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={isChecked} onChange={handleToggle} value="" className="sr-only peer" />
            <div className="
                relative
                w-11
                h-6
                bg-gray-200
                peer-focus:outline-none
                peer-focus:ring-4
                peer-focus:ring-green-500
                dark:peer-focus:ring-green500
                rounded-full
                peer
                dark:bg-gray-700
                peer-checked:after:translate-x-full
                rtl:peer-checked:after:-translate-x-full
                peer-checked:after:border-white
                after:content-['']
                after:absolute
                after:top-[2px]
                after:start-[2px]
                after:bg-white
                after:border-gray-300
                after:border
                after:rounded-full
                after:h-5
                after:w-5
                after:transition-all
                dark:border-gray-600
                peer-checked:bg-green500"
            />
        </label>
    );
};
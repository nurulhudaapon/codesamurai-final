'use client';

import toast, { ToastOptions, Toaster } from 'react-hot-toast';
import { Icon } from './icon';

export const ToastInitializer = () => {
    return <Toaster />;
};

const defaultConfig: ToastOptions = {
    position: 'bottom-center',
    className: 'text-sm',
};

const success = (message: string, config: ToastOptions) => {
    return toast(message, {
        ...defaultConfig,
        icon: <div className='p-1 rounded-full bg-green-600 text-white'><Icon name='Check' size='sm' /></div>,
        duration: 2000,
        ...config,
    });
};
const error = (message: string, config: ToastOptions) => {
    return toast(message, {
        ...defaultConfig,
        icon: <div className='p-1 rounded-full bg-red-600 text-white'><Icon name='Cross' size='sm' /></div>,
        duration: 3000,
        ...config,
    });
};

export const notify = Object.assign(toast, {
    success,
    error,
});

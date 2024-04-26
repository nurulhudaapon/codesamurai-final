import { authOptions } from '@/app/api/auth/config';
import { getServerSession } from 'next-auth';

export const getServerAuthSession = () => getServerSession(authOptions);

"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Tabs = ({ isAdmin }) => {
    const pathname = usePathname();

    return (
        <>
            {!isAdmin && <h1 className='text-primary text-center text-5xl'>
                Profile    
            </h1>}
            {isAdmin && (
                <div className="flex gap-2 tabs justify-center">
                    <Link className={pathname === '/profile' ? 'active' : ''} href={'/profile'}>Profile</Link>
                    <Link className={pathname === '/categories' ? 'active' : ''} href={'/categories'}>Categories</Link>
                    <Link className={pathname.includes('/menu-items') ? 'active' : ''} href={'/menu-items'}>Menu Items</Link>
                    <Link className={pathname === '/users' ? 'active' : ''} href={'/users'}>Users</Link>
                </div>
            )}
        </>
    );
};

export default Tabs;
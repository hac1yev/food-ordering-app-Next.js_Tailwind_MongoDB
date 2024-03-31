'use client';

import Right from "@/components/icons/Right";
import Tabs from "@/components/layout/Tabs";
import useProfile from "@/hooks/useProfile";
import Link from "next/link";
import { useEffect, useState } from "react";

const MenuItemsPage = () => {
    const { fetching, isAdmin } = useProfile();
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(data => setMenuItems(data.menuItems))
        });
    }, []);

    if(fetching) {
        return <p className="text-center mt-8">Loading...</p>
    }

    if(!isAdmin) {
        return <p className="text-center mt-8">You are not an Admin!</p>
    }

    return (
        <section className="mt-8 max-w-md mx-auto">
            <Tabs isAdmin={true} />
            <div className="mt-8">
                <Link className="button" href={'menu-items/new'}>
                    Create new menu items
                    <Right />
                </Link>
            </div>
            <div>
                <h2 className="text-sm text-gray-500 mt-8">Edit menu item:</h2>
                <div className="grid grid-cols-3 gap-2">
                    {menuItems.map((item) => (
                        <Link href={`/menu-items/edit/${item._id}`} className="mb-1 text-center" key={1}>
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MenuItemsPage;
'use client';

import Tabs from "@/components/layout/Tabs";
import useProfile from "../hooks/useProfile";

const MenuItemsPage = () => {
    const { fetching, isAdmin } = useProfile();

    if(fetching) {
        return <p className="text-center mt-8">Loading...</p>
    }

    if(!isAdmin) {
        return <p className="text-center mt-8">You are not an Admin!</p>
    }

    return (
        <section className="mt-8">
            <Tabs isAdmin={true} />
        </section>
    );
};

export default MenuItemsPage;
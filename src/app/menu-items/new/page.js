'use client';

import Tabs from "@/components/layout/Tabs";
import useProfile from "../../../hooks/useProfile";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import Right from "@/components/icons/Right";
import { redirect } from "next/navigation";

const NewMenuItemsPage = () => {
    const { fetching, isAdmin } = useProfile();
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [basePrice,setBasePrice] = useState('');
    const [redirectToItems,setRedirectToItems] = useState(false);

    const handleSubmitMenuItems = async (e) => {
        e.preventDefault();
        const data = { name, description, basePrice };
        
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(response.ok) {
                resolve();
            }else{
                reject();
            }
        });

        await toast.promise(savingPromise, {
            loading: 'Saving item...',
            success: 'Saved!',
            error: 'Error!',
        });

        setRedirectToItems(true);
    };

    if(redirectToItems) {
        redirect('/menu-items');
    }

    if(fetching) {
        return <p className="text-center mt-8">Loading...</p>
    }

    if(!isAdmin) {
        return <p className="text-center mt-8">You are not an Admin!</p>
    }

    return (
        <section className="mt-8">
            <Tabs isAdmin={true} />
            <div className="max-w-md mx-auto mt-8">
                <Link href={'/menu-items'} className="button">
                    Show all menu items
                    <Right />
                </Link>
            </div>
            <form className="mt-8 max-w-md mx-auto" onSubmit={handleSubmitMenuItems}>
                <div className="flex items-start gap-4">
                    <div>
                        Image
                    </div>
                    <div className="grow">
                        <label>Item name</label>
                        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />    
                        <label>Description</label>
                        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />    
                        <label>Base price</label>
                        <input type="text" placeholder="Base Price" value={basePrice} onChange={(e) => setBasePrice(e.target.value)} />   
                        <button type="submit">Save</button> 
                    </div> 
                </div>
            </form>
        </section>
    );
};

export default NewMenuItemsPage;
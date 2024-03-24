"use client";

import Tabs from "@/components/layout/Tabs";
import useProfile from "../hooks/useProfile";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CategoriesPage = () => {
    const { isAdmin, fetching } = useProfile();
    const [categoryName,setCategoryName] = useState("");
    const [categoryId,setCategoryId] = useState("");
    const [categories,setCategories] = useState(null);
    const [editedCategory,setEditedCategory] = useState(false) 

    const fetchCategories = async () => {
        await fetch('/api/categories').then(response => {
            response.json().then(data => {
                setCategories(data)
            })
        })
    };

    useEffect(() => {
        fetchCategories();
    }, []);


    const handleCategoryName = async (e) => {
        e.preventDefault();

        const creationPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/categories', {
                method: editedCategory ? 'PUT' : 'POST',
                body: JSON.stringify({name: categoryName, _id: categoryId}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setCategoryName('');
            await fetchCategories();
            if(response.ok) {
                resolve();
            }else{
                reject();
            }
        }); 

        await toast.promise(creationPromise, {
            loading: editedCategory ? 'Updating your category...' : 'Creating your new category...',
            success: editedCategory ? 'Category updated!' : 'Category created!',
            error: editedCategory ? 'Can not updated category!' : 'Can not created category!'
        });
    }

    if(fetching) {
        return <p className="text-center mt-8">Loading...</p>
    }

    if(!isAdmin) {
        return <p className="text-center mt-8">You are not an Admin!</p>
    }

    return (
        <section className="mt-8 max-w-lg mx-auto">
            <Tabs isAdmin={true} />
            <form className="mt-8" onSubmit={handleCategoryName}>
                <div className="flex gap-2 items-end">
                    <div className="grow">
                        <label>
                            {editedCategory ? 'Update category' : 'New category name'}
                        </label>
                        <input 
                            type="text"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                    </div>
                    <div className="pb-2 flex gap-2">
                        <button className="border border-primary" type="submit">
                            {editedCategory ? 'Update' : 'Create'}
                        </button>
                        <button type="button" onClick={() => {
                            setEditedCategory(false);
                            setCategoryName("");
                            setCategoryId("");
                        }}>
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
            <div>
                <h2 className="mt-8 text-sm text-gray-500">Existing categories</h2>
                {categories?.length > 0 && categories.map(category => (
                    <div className="bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center" key={category._id}>
                        <div className="grow">
                            {category.name}                   
                        </div>
                        <div className="flex gap-1">
                            <button type="button" onClick={() => {
                                setEditedCategory(true);
                                setCategoryName(category.name);
                                setCategoryId(category._id);
                            }}>
                                Edit
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CategoriesPage;
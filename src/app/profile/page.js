"use client"

import Tabs from "@/components/layout/Tabs";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProfilePage = () => {
    const { data: session, status, update } = useSession();
    const [userName,setUserName] = useState(session?.user?.name || "");
    const [pickedImage,setPickedImage] = useState(session?.user?.image || "");
    const [phone,setPhone] = useState('');
    const [streetAddress,setStreetAddress] = useState('');
    const [postalCode,setPostalCode] = useState('');
    const [city,setCity] = useState('');
    const [country,setCountry] = useState('');
    const [isAdmin,setIsAdmin] = useState(false);
    const [profileFetched,setProfileFetched] = useState(false);

    useEffect(() => {
        if(status === "authenticated") {
            setPickedImage(session?.user?.image);
            
            fetch('/api/profile').then(response => {
                response.json().then(data => {
                    setIsAdmin(data?.data?.admin);
                    setUserName(session?.user?.name || data?.data?.name);
                    setPhone(data?.data?.phone);
                    setStreetAddress(data?.data?.streetAddress);
                    setPostalCode(data?.data?.postalCode);
                    setCity(data?.data?.city);
                    setCountry(data?.data?.country);
                    setProfileFetched(true);
                });
            });
        }
    }, [status,session]);

    if(status === 'loading' || !profileFetched) {
        return <p className="text-center mt-8">Loading...</p>;
    }

    if(status === 'unauthenticated') {
        return redirect('/login');
    }

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        const savingPromise = new Promise(async (resolve,reject) => {
            const response = await fetch("/api/profile", {
                method: 'PUT',
                body: JSON.stringify({ 
                    name: userName, 
                    image: pickedImage,
                    streetAddress,
                    phone,
                    postalCode,
                    city,
                    country
                }),
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
            loading: 'Saving...',
            success: 'Profile saved!',
            error: 'Error',
        });

        update({ name: userName, image: pickedImage });
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        
        const fileReader = new FileReader();

        if(!file) {
            setPickedImage(null);
        }

        fileReader.onload = () => {
            setPickedImage(fileReader.result);
        }

        fileReader.readAsDataURL(file);
    }

    return (
        <section className="mt-8">
            <Tabs isAdmin={isAdmin} />
            <div className="max-w-xl mx-auto mt-8">
                <div className="flex gap-4">
                    <div>
                        <div className="flex flex-col mt-2 w-32 h-32 rounded-lg">
                            {!pickedImage && <p>There is no image.</p>}
                            {pickedImage && <Image 
                                className=" rounded-lg mb-1 object-cover" 
                                src={pickedImage} 
                                alt="avatar" 
                                width={200}
                                height={200}
                                priority
                                
                            />}
                            <label>
                                <input accept="image/png, image/jpeg" type="file" className="hidden" onChange={handleFileChange} />
                                <span className="text-black border border-gray-400 rounded-lg font-semibold cursor-pointer p-2 block text-center mt-2">Edit</span>
                            </label>
                        </div>
                    </div>
                    <form className="grow" onSubmit={handleProfileSubmit}>
                        <div>
                            <label htmlFor="username">Username</label>
                            <input 
                                id="username"
                                type="text" 
                                placeholder="First and last name" 
                                value={userName} 
                                onChange={(e) => setUserName(e.target.value)} 
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input id="email" type="email" disabled value={session?.user?.email} />
                        </div>
                        <div>
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input 
                                id="phoneNumber"
                                type="tel" 
                                placeholder="Phone number" 
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="streetAddress">Street address</label>
                            <input 
                                id="streetAddress"
                                type="text" 
                                placeholder="Street address" 
                                value={streetAddress}
                                onChange={e => setStreetAddress(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-between gap-2">
                            <div className="w-1/2">
                                <label htmlFor="city">City</label>
                                <input 
                                    id="city"
                                    type="text" 
                                    placeholder="City" 
                                    value={city}
                                    onChange={e => setCity(e.target.value)}
                                />
                            </div>
                            <div className="w-1/2">
                                <label htmlFor="postalCode">Postal code</label>
                                <input 
                                    id="postalCode"
                                    type="text" 
                                    placeholder="Postal code" 
                                    value={postalCode}
                                    onChange={e => setPostalCode(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="country">Country</label>
                            <input 
                                id="country"
                                type="text" 
                                placeholder="Country"
                                value={country}
                                onChange={e => setCountry(e.target.value)} 
                            />
                        </div>
                        <button type="submit">Save</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ProfilePage
import { useEffect, useState } from "react";

const useProfile = () => {
    const [isAdmin,setIsAdmin] = useState(false);
    const [fetching,setFetching] = useState(true);  

    useEffect(() => {
        const fetchAdmin = async () => {
            await fetch('/api/profile').then(response => {
                response.json().then(data => {
                    setIsAdmin(data?.data?.admin);
                    setFetching(false);
                })
            })
        };
        fetchAdmin();
    }, []);

    return { isAdmin, fetching };
};

export default useProfile;
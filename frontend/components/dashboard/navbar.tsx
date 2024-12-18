"use client";

import { useRouter } from 'next/navigation'; 
import { Button } from "../ui/button"
import { handleLogout } from "../../lib/api"
import { MdLogout } from "react-icons/md";

const NavBar = () => {
    const router = useRouter();

    const onSubmit = async () => {
        const success = await handleLogout();
        if (success) {
            router.push('/');
        } else {
            console.error('Logout failed');
        }
    };

    return (
        <div className='flex-none w-20 bg-black h-screen p-4'>
            <div className="">
                <Button variant="outline" onClick={onSubmit}>
                    <MdLogout />
                </Button>
            </div>
        </div>
    );
};

export default NavBar;

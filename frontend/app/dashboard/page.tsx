"use client";

import { useState, useEffect, createContext } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../components/context/auth-context';
import NavBar from '../../components/dashboard/navbar';
import Header from '../../components/dashboard/ds-header';
import OperationsTable from '@/components/dashboard/op-table';
import { fetchOperations } from "@/lib/api";
import { OperationWithMaterial } from '@/lib/types';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const fetchTableDataContext = createContext<() => void>(() => {});

const Dashboard = () => {
    const router = useRouter();
    const { isAuthenticated, isLoading } = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [data, setData] = useState<OperationWithMaterial[]>([]);

    useEffect(() => {
        //console.log('isAuthenticated:', isAuthenticated);

        if (!isAuthenticated && !isLoading) {
            router.push('/auth/login');
        }
    }, [isAuthenticated, isLoading, router]);

    useEffect(() => {
        fetchTableData();
    }, []);

    const fetchTableData = async () => {
        try {
          const combinedData = await fetchOperations();
          setData(combinedData);
          setLoading(false);
        } catch (error) {
          setError("Failed to fetch operations. Please try again.");
          setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <fetchTableDataContext.Provider value={fetchTableData}>
        <div className="flex">
            <NavBar />
            <div className='flex md:flex h-screen relative'>
                <Header />
                <OperationsTable data={data} loading={loading} error={error}/>
            </div>
            <ToastContainer position="bottom-right" autoClose={5000} />
        </div>
        </fetchTableDataContext.Provider>
    );
};

export default Dashboard;

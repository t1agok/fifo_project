import React, { useContext, useState } from "react";
import { AddOperation } from "./add-operation";
import { fetchTableDataContext } from "@/app/dashboard/page";
import { AddMaterial } from "./add-material";
import StockDialog from "./stock-dialog";
import { useStock } from "@/hooks/useStock";

const Header: React.FC = () => {
    const fetchTableData = useContext(fetchTableDataContext);
    const { stockData, loading, error, refetchStock } = useStock();
    
    const handleOperationAdded = async (newOperation: any) => {
        await fetchTableData();
        await refetchStock();
    };

    return (
        <div className="absolute h-15 w-full flex justify p-4">
            <div className="ml-10">
                <AddOperation onOperationAdded={handleOperationAdded} />
            </div>
            <div className="pl-5">
                <AddMaterial />
            </div>
            <div className="pl-5">
                <StockDialog 
                    data={stockData || []} 
                    loading={loading} 
                    error={error || ""}
                />
            </div>
        </div>
    );
}

export default Header
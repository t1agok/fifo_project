import React, { useContext, useState } from "react";
import { AddOperation } from "./add-operation";
import { fetchTableDataContext } from "@/app/dashboard/page";

const Header = () => {
    const fetchTableData = useContext(fetchTableDataContext);

    const handleOperationAdded = async (newOperation: any) => {
        await fetchTableData();
    };

    return (
        <div className="absolute h-15 w-full flex justify-between p-4 bg">
            <div className="ml-10">
                <AddOperation onOperationAdded={handleOperationAdded} />
            </div>
        </div>
    );
}

export default Header
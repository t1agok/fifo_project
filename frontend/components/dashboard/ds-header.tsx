"use client";

import React, { useContext } from "react";
import { AddOperation } from "./add-operation";
import { fetchTableDataContext } from "@/app/dashboard/page";
import { AddMaterial } from "./add-material";
import StockDialog from "./stock-dialog";
import { useStock } from "@/hooks/useStock";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlusCircle, Package, LineChart, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
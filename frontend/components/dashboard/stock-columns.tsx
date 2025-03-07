"use client";

import { ColumnDef } from "@tanstack/react-table";
import { StockInterface } from '@/lib/types';
import { useContext } from "react";
import { fetchTableDataContext } from "@/app/dashboard/page";

// Define the shape of your operations data
const formatDate = (dateString: string): string => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

// Define the columns for your table
export const columns: ColumnDef<StockInterface>[] = [
    {
        accessorKey: "code",
        header: () => <div className="text-center m-2 text-black font-semibold">Código</div>,
        cell: ({row}) => <div className="text-center text-black m-2">{row.original.code}</div>,
        enableColumnFilter: true,
    },
    {
        accessorKey: "quantity",
        header: () => <div className="text-center m-2 text-black font-semibold">Quantidade</div>,
        cell: ({row}) => <div className="text-center text-black m-2">{row.original.quantity}</div>,
        enableColumnFilter: true,
    },
    /*{
        accessorKey: "last_updated",
        header: () => <div className="text-center m-2 text-black font-semibold">Ultima movimentação</div>,
        cell: ({row}) => <div className="text-center text-black m-2">{formatDate(row.original.last_updated)}</div>
    },*/
    {
        accessorKey: "length",
        header: () => <div className="text-center m-2 text-black font-semibold">Comprimento</div>,
        cell: ({row}) => <div className="text-center text-black m-2">{row.original.length}</div>,
        enableColumnFilter: true,
    },  
    {
        accessorKey: "height",
        header: () => <div className="text-center m-2 text-black font-semibold">Largura</div>,
        cell: ({row}) => <div className="text-center text-black m-2">{row.original.height}</div>,
        enableColumnFilter: true,
    },
    {
        accessorKey: "thickness",
        header: () => <div className="text-center m-2 text-black font-semibold">Espessura</div>,
        cell: ({row}) => <div className="text-center text-black m-2">{row.original.thickness}</div>,
        enableColumnFilter: true,
    },    
    {
        accessorKey: "weight",
        header: () => <div className="text-center m-2 text-black font-semibold">Peso</div>,
        cell: ({row}) => <div className="text-center text-black m-2">{row.original.weight}</div>,
        enableColumnFilter: true,
    },
    {
        accessorKey: "location",
        header: () => <div className="text-center m-2 text-black font-semibold">Localização</div>,
        cell: ({row}) => <div className="text-center text-black m-2">{row.original.location}</div>,
        enableColumnFilter: true,
    },
];
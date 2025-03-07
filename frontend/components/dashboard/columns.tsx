"use client";

import { ColumnDef } from "@tanstack/react-table";
import { deleteOperation } from "@/lib/api";
import { FaTrash } from "react-icons/fa";
import { OperationWithMaterial } from '@/lib/types';
import { useContext } from "react";
import { fetchTableDataContext } from "@/app/dashboard/page";
import { toast } from 'react-toastify';
import { FilterFn } from "@tanstack/react-table";

// Custom filter function for material properties
const materialPropertyFilter: FilterFn<OperationWithMaterial> = (row, columnId, filterValue) => {
    const property = columnId;
    
    // Handle nested material properties
    if (property === 'code') {
      const value = row.original.material?.code;
      return value ? value.toLowerCase().includes(String(filterValue).toLowerCase()) : false;
    }
    
    if (property === 'thickness') {
      const value = row.original.material?.thickness;
      return value !== undefined ? value.toString().includes(String(filterValue)) : false;
    }
    
    if (property === 'height') {
      const value = row.original.material?.height;
      return value !== undefined ? value.toString().includes(String(filterValue)) : false;
    }
    
    if (property === 'lenght') { // Note: typo in your column definition
      const value = row.original.material?.length;
      return value !== undefined ? value.toString().includes(String(filterValue)) : false;
    }
    
    // Default case for direct properties
    const value = row.getValue(property);
    return value !== undefined && value !== null ? 
      String(value).toLowerCase().includes(String(filterValue).toLowerCase()) : 
      false;
  };

// Define the shape of your operations data
const formatDate = (dateString: string): string => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };
  
// Define the columns for your table
export const columns: ColumnDef<OperationWithMaterial>[] = [
    {
        accessorKey: "operation_type",
        header: () => <div className="text-center m-2 text-black font-semibold">Operação</div>,
        cell: ({row}) => {
            const operationType = row.original.operation_type;
            if (operationType === "entry") {
                return <div className="text-center text-green-600 font-medium m-2">Entrada</div>
            } else if (operationType === "exit") {
                return <div className="text-center text-red-500 font-medium m-2">Saída</div>
            } else {
                return <div className="text-center text-black m-2">{row.original.operation_type}</div>
            }
        },
        filterFn: 'equals',
    },
    {
        accessorKey: "nf",
        header: () => <div className="text-center m-2 text-black font-semibold">Nota Fiscal</div>,
        cell: ({row}) => <div className="text-center text-black m-2">{row.original.nf}</div>,
        enableColumnFilter: true,
    },
    {
        accessorKey: "code",
        header: () => <div className="text-center m-2 text-black font-semibold">Código</div>,
        cell: ({row}) => <div className="text-center text-black m-2">{row.original.material?.code}</div>,
        enableColumnFilter: true,
        filterFn: materialPropertyFilter,
    },
    {
        accessorKey: "date",
        header: () => <div className="text-center m-2 text-black font-semibold">Data</div>,
        cell: ({row}) => <div className="text-center text-black m-2">{formatDate(row.original.date)}</div>,
        enableColumnFilter: true,
    },    
    {
        accessorKey: "description",
        header: () => <div className="text-center m-2 text-black font-semibold">Observação</div>,
        cell: ({row}) => <div className="text-center text-black m-2">{row.original.observation}</div>,
        enableColumnFilter: true,
    },
    {
        accessorKey: "type",
        header: () => <div className="text-center m-2 text-black font-semibold">Tipo</div>,
        cell: ({row}) => <div className="text-center text-black m-2">{row.original.type}</div>,
        enableColumnFilter: true,
    },
    {
        accessorKey: "quantity",
        header: () => <div className="text-center m-2 text-black font-semibold">Quantidade</div>,
        cell: ({row}) => <div className="text-center text-black m-2">{row.original.quantity}</div>,
        enableColumnFilter: true,
    },
    {
        accessorKey: "local",
        header: () => <div className="text-center m-2 text-black font-semibold">Local</div>,
        cell: ({row}) => <div className="text-center text-black m-2">{row.original.location}</div>,
        enableColumnFilter: true,
    },
    {
        accessorKey: "thickness",
        header: () => <div className="text-center m-2 text-black font-semibold">Espessura</div>,
        cell: ({row}) => <div className="text-center text-black m-2">{row.original.material?.thickness}</div>,
        enableColumnFilter: true,
    },
    {
        accessorKey: "height",
        header: () => <div className="text-center m-2 text-black font-semibold">Largura</div>,
        cell: ({row}) => <div className="text-center text-black m-2">{row.original.material?.height}</div>,
        enableColumnFilter: true,
    },
    {
        accessorKey: "lenght",
        header: () => <div className="text-center m-2 text-black font-semibold">Comprimento</div>,
        cell: ({row}) => <div className="text-center text-black m-2">{row.original.material?.length}</div>,
        enableColumnFilter: true,
    },
];
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { deleteOperation } from "@/lib/api";
import { FaTrash } from "react-icons/fa";
import { OperationWithMaterial } from '@/lib/types';
import { useContext } from "react";
import { fetchTableDataContext } from "@/app/dashboard/page";
import { toast } from 'react-toastify';

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
        cell: ({row}) => <div className="text-center text-black m-2">{row.original.operation_type}</div>
    },
    {
        accessorKey: "nf",
        header: () => <div className="text-center m-2 text-black font-semibold">Nota Fiscal</div>,
        cell: ({row}) => <div className="text-center text-black m-2">{row.original.nf}</div>
    },
    {
        accessorKey: "code",
        header: () => <div className="text-center m-2 text-black font-semibold">Código</div>,
        cell: ({row}) => <div className="text-center text-black m-2">{row.original.material?.code}</div>
    },
    {
        accessorKey: "date",
        header: () => <div className="text-center m-2 text-black font-semibold">Data</div>,
        cell: ({row}) => <div className="text-center text-black m-2">{formatDate(row.original.date)}</div>
    },    
    {
        accessorKey: "description",
        header: () => <div className="text-center m-2 text-black font-semibold">Observação</div>,
        cell: ({row}) => <div className="text-center text-black m-2">{row.original.observation}</div>
    },
    {
        accessorKey: "type",
        header: () => <div className="text-center m-2 text-black font-semibold">Tipo</div>,
        cell: ({row}) => <div className="text-center text-black m-2">{row.original.type}</div>
    },
    {
        accessorKey: "quantity",
        header: () => <div className="text-center m-2 text-black font-semibold">Quantidade</div>,
        cell: ({row}) => <div className="text-center text-black m-2">{row.original.quantity}</div>
    },
    {
        accessorKey: "local",
        header: () => <div className="text-center m-2 text-black font-semibold">Local</div>,
        cell: ({row}) => <div className="text-center text-black m-2">{row.original.location}</div>
    },
    {
        accessorKey: "thickness",
        header: () => <div className="text-center m-2 text-black font-semibold">Espessura</div>,
        cell: ({row}) => <div className="text-center text-black m-2">{row.original.material?.thickness}</div>
    },
    {
        accessorKey: "height",
        header: () => <div className="text-center m-2 text-black font-semibold">Largura</div>,
        cell: ({row}) => <div className="text-center text-black m-2">{row.original.material?.height}</div>
    },
    {
        accessorKey: "lenght",
        header: () => <div className="text-center m-2 text-black font-semibold">Comprimento</div>,
        cell: ({row}) => <div className="text-center text-black m-2">{row.original.material?.length}</div>
    },
    {
        accessorKey: "remove",
        header: () => <div className="text-center m-2 text-black font-semibold"></div>,
        cell: ({ row }) => {
            const updateTable = useContext(fetchTableDataContext)
            console.log("Row Data:", row.original);
            return (
            <button onClick={async () => {
                const confirmed = window.confirm("Deseja excluir esta operação?");
                if (confirmed) {
                    const success: boolean = await deleteOperation(row.original.operation_id);
                    if (success) {
                        toast.success("Operação deletada!");
                        updateTable();
                    } else {
                        toast.error("Falha ao deletar a operação.");
                    }
                }
            }} className="text-red-400">
              <FaTrash className="flex justify-center"/>
            </button>
          );
        },
    },
];
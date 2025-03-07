"use client";

import React, { useEffect, useState, useContext } from "react";
import { 
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
 } from "@tanstack/react-table";

 import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { columns } from "./stock-columns"; // Adjust the path as necessary
import { Button } from "@/components/ui/button";
import { StockInterface } from "@/lib/types";

interface StockProps {
  data: StockInterface[];
  loading: boolean;
  error: string;
}

const OpenStock: React.FC<StockProps> = ({ data, loading, error }) => {

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        initialState: {
        pagination: {
            pageSize: 8,
        },
        },
    });

    if (loading) return <div>Loading...</div>; 
    if (error) return <div>{error}</div>;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="mt-20 m-10 rounded-md w-full">
                <Table>
                <TableHeader>
                    {table.getHeaderGroups().map(headerGroup => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                        <TableHead key={header.id}>
                            {header.isPlaceholder ? null : flexRender(
                            header.column.columnDef.header, 
                            header.getContext()
                            )}
                        </TableHead>
                        ))}
                    </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map(row => (
                    <TableRow key={row.id}>
                        {row.getVisibleCells().map(cell => (
                        <TableCell key={cell.id}>{flexRender(
                            cell.column.columnDef.cell, 
                            cell.getContext() 
                        )}</TableCell>
                        ))}
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                variant="outline"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                >
                Anterior
                </Button>
                <Button 
                variant="outline"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                >
                Próxima
                </Button>
            </div>
        </div>
    );
};

export default OpenStock;
"use client";

import React, { useState } from "react";
import { 
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    flexRender,
    ColumnFiltersState,
} from "@tanstack/react-table";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { columns } from "./stock-columns";
import { Button } from "@/components/ui/button";
import { StockInterface } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp, Filter, X } from "lucide-react";

interface StockDialogProps {
  data: StockInterface[];
  loading: boolean;
  error: string;
}

const StockDialog: React.FC<StockDialogProps> = ({ data, loading, error }) => {
    const [open, setOpen] = React.useState(false);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnFiltersChange: setColumnFilters,
        state: {
            columnFilters,
        },
        initialState: {
            pagination: {
                pageSize: 8,
            },
        },
    });

    const toggleFilters = () => {
        setIsFiltersExpanded(!isFiltersExpanded);
    };
  
    // Count active filters
    const activeFiltersCount = columnFilters.length;

    // Function to clear all filters
    const clearAllFilters = () => {
        table.resetColumnFilters();
    };

    if (loading) return <div>Loading...</div>; 
    if (error) return <div>{error}</div>;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="bg-black text-white">Estoque</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[80vw] max-h-[90vh] p-0 flex flex-col">
                <DialogHeader className="px-6 py-4 border-b">
                    <DialogTitle>Estoque de Materiais</DialogTitle>
                </DialogHeader>

                {/* Main content area with flex layout */}
                <div className="flex flex-col flex-1 overflow-hidden">
                    {/* Filters section - position: sticky */}
                    <div className="px-6 pt-4">
                        <Card className="shadow-sm">
                            <CardHeader 
                                className="flex flex-row items-center justify-between px-6 py-3 cursor-pointer"
                                onClick={toggleFilters}
                            >
                                <div className="flex items-center space-x-2">
                                    <Filter className="h-4 w-4 text-muted-foreground" />
                                    <CardTitle className="text-sm font-medium">
                                        Filtros
                                        {activeFiltersCount > 0 && (
                                            <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-semibold rounded-full bg-primary text-primary-foreground">
                                                {activeFiltersCount}
                                            </span>
                                        )}
                                    </CardTitle>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-[100px] flex justify-end">
                                        {activeFiltersCount > 0 && (
                                            <Button 
                                                variant="ghost" 
                                                size="sm" 
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevent toggle from firing
                                                    clearAllFilters();
                                                }}
                                                className="h-8 px-2 text-xs"
                                            >
                                                <X className="h-3 w-3 mr-1" />
                                                Limpar
                                            </Button>
                                        )}
                                    </div>
                                    <div className="flex-shrink-0 w-4">
                                        {isFiltersExpanded ? (
                                            <ChevronUp className="h-4 w-4 text-muted-foreground" />
                                        ) : (
                                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                        )}
                                    </div>
                                </div>
                            </CardHeader>
                            
                            {isFiltersExpanded && (
                                <CardContent>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                        <div>
                                            <label htmlFor="code-filter" className="text-sm font-medium">
                                                Código
                                            </label>
                                            <Input
                                                id="code-filter"
                                                placeholder="Filtrar por código"
                                                value={(table.getColumn('code')?.getFilterValue() as string) || ''}
                                                onChange={(e) => table.getColumn('code')?.setFilterValue(e.target.value)}
                                                className="mt-1"
                                            />
                                        </div>
                                        
                                        <div>
                                            <label htmlFor="location-filter" className="text-sm font-medium">
                                                Local
                                            </label>
                                            <Input
                                                id="location-filter"
                                                placeholder="Filtrar por local"
                                                value={(table.getColumn('location')?.getFilterValue() as string) || ''}
                                                onChange={(e) => table.getColumn('location')?.setFilterValue(e.target.value)}
                                                className="mt-1"
                                            />
                                        </div>
                                        
                                        <div>
                                            <label htmlFor="quantity-filter" className="text-sm font-medium">
                                                Quantidade
                                            </label>
                                            <Input
                                                id="quantity-filter"
                                                placeholder="Filtrar por quantidade"
                                                value={(table.getColumn('quantity')?.getFilterValue() as string) || ''}
                                                onChange={(e) => table.getColumn('quantity')?.setFilterValue(e.target.value)}
                                                className="mt-1"
                                            />
                                        </div>
                                    </div>
                                    
                                    <details className="mt-3">
                                        <summary className="cursor-pointer text-sm text-black font-medium">
                                            Filtros adicionais
                                        </summary>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-3">
                                            <div>
                                                <label htmlFor="thickness-filter" className="text-sm font-medium">
                                                    Espessura
                                                </label>
                                                <Input
                                                    id="thickness-filter"
                                                    placeholder="Filtrar por espessura"
                                                    value={(table.getColumn('thickness')?.getFilterValue() as string) || ''}
                                                    onChange={(e) => table.getColumn('thickness')?.setFilterValue(e.target.value)}
                                                    className="mt-1"
                                                />
                                            </div>
                                            
                                            <div>
                                                <label htmlFor="height-filter" className="text-sm font-medium">
                                                    Largura
                                                </label>
                                                <Input
                                                    id="height-filter"
                                                    placeholder="Filtrar por largura"
                                                    value={(table.getColumn('height')?.getFilterValue() as string) || ''}
                                                    onChange={(e) => table.getColumn('height')?.setFilterValue(e.target.value)}
                                                    className="mt-1"
                                                />
                                            </div>
                                            
                                            <div>
                                                <label htmlFor="length-filter" className="text-sm font-medium">
                                                    Comprimento
                                                </label>
                                                <Input
                                                    id="length-filter"
                                                    placeholder="Filtrar por comprimento"
                                                    value={(table.getColumn('length')?.getFilterValue() as string) || ''}
                                                    onChange={(e) => table.getColumn('length')?.setFilterValue(e.target.value)}
                                                    className="mt-1"
                                                />
                                            </div>
                                        </div>
                                    </details>

                                    <div className="mt-3 flex justify-end">
                                        <Button 
                                            variant="outline"
                                            size="sm"
                                            onClick={clearAllFilters}
                                            className="text-xs"
                                        >
                                            <X className="h-3 w-3 mr-1" />
                                            Limpar todos os filtros
                                        </Button>
                                    </div>
                                </CardContent>
                            )}
                        </Card>
                    </div>

                    {/* Table area - flex-1 to fill remaining space */}
                    <div className="flex-1 overflow-auto px-6 py-4">
                        <div className="border rounded-md">
                            <Table>
                                <TableHeader className="bg-muted/50 sticky top-0 z-10">
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
                                    {table.getRowModel().rows.length > 0 ? (
                                        table.getRowModel().rows.map(row => (
                                            <TableRow key={row.id}>
                                                {row.getVisibleCells().map(cell => (
                                                    <TableCell key={cell.id}>
                                                        {flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext()
                                                        )}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={columns.length} className="text-center py-4">
                                                Nenhum resultado encontrado
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>

                    {/* Footer - pagination controls */}
                    <div className="px-6 py-4 border-t mt-auto">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">
                                Página {table.getState().pagination.pageIndex + 1} de{" "}
                                {table.getPageCount()}
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => table.previousPage()}
                                    disabled={!table.getCanPreviousPage()}
                                >
                                    Anterior
                                </Button>
                                <Button 
                                    variant="outline"
                                    size="sm"
                                    onClick={() => table.nextPage()}
                                    disabled={!table.getCanNextPage()}
                                >
                                    Próxima
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default StockDialog;
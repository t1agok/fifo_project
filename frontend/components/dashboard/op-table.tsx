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

import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { columns } from "./columns";
import { OperationWithMaterial } from '@/lib/types';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Filter, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OperationsTableProps {
  data: OperationWithMaterial[];
  loading: boolean;
  error: string;
}

const OperationsTable: React.FC<OperationsTableProps> = ({ data, loading, error }) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
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

  if (loading) return (
    <div className="flex justify-center items-center h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
  
  if (error) return (
    <div className="bg-red-50 text-red-500 p-4 rounded-md shadow-sm">
      {error}
    </div>
  );

  return (
    <div className="flex flex-col w-full px-4 md:px-10">
      <Card className="mb-4 mt-16 md:mt-20 shadow-sm">
        <CardHeader 
          className="flex flex-row items-center justify-between px-6 py-4 cursor-pointer"
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
                <label htmlFor="operation-type-filter" className="text-sm font-medium">
                  Operação
                </label>
                <Select
                  value={(table.getColumn('operation_type')?.getFilterValue() as string) || ''}
                  onValueChange={(value) => 
                    table.getColumn('operation_type')?.setFilterValue(value === 'all' ? '' : value)
                  }
                >
                  <SelectTrigger id="operation-type-filter" className="mt-1">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="entry">Entrada</SelectItem>
                    <SelectItem value="exit">Saída</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="nf-filter" className="text-sm font-medium">
                  Nota Fiscal
                </label>
                <Input
                  id="nf-filter"
                  placeholder="Filtrar por NF"
                  value={(table.getColumn('nf')?.getFilterValue() as string) || ''}
                  onChange={(e) => table.getColumn('nf')?.setFilterValue(e.target.value)}
                  className="mt-1"
                />
              </div>
              
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
            </div>

            <details className="mt-3">
              <summary className="cursor-pointer text-sm text-black font-medium">
                Filtros adicionais
              </summary>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-3">
                <div>
                  <label htmlFor="type-filter" className="text-sm font-medium">
                    Tipo
                  </label>
                  <Input
                    id="type-filter"
                    placeholder="Filtrar por tipo"
                    value={(table.getColumn('type')?.getFilterValue() as string) || ''}
                    onChange={(e) => table.getColumn('type')?.setFilterValue(e.target.value)}
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
                    value={(table.getColumn('local')?.getFilterValue() as string) || ''}
                    onChange={(e) => table.getColumn('local')?.setFilterValue(e.target.value)}
                    className="mt-1"
                  />
                </div>
                
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
              </div>
            </details>
          </CardContent>
        )}
      </Card>

      <div className="rounded-md w-full shadow-sm border">
        <div className="overflow-x-auto rounded-md">
          <Table>
            <TableHeader className="bg-muted/50 sticky top-0 z-10">
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id} className="hover:bg-transparent">
                  {headerGroup.headers.map(header => (
                    <TableHead 
                      key={header.id} 
                      className="font-semibold text-foreground py-3"
                    >
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
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row, i) => (
                  <TableRow 
                    key={row.id}
                    className={`transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-muted/20'} hover:bg-muted/50`}
                  >
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id} className="py-3">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    Nenhum resultado encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 py-4">
        <div className="text-sm text-muted-foreground">
          Mostrando {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} até {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            data.length
          )} de {data.length} registros
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-sm font-medium">
            Página {table.getState().pagination.pageIndex + 1} de{' '}
            {table.getPageCount()}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OperationsTable;
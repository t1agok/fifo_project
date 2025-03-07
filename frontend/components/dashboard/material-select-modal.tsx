"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

type Material = { 
    material_id: number;
    code: string;
    thickness: number;
    height: number;
    length: number;
    weight: number;
    coe: string; 
};

interface MaterialSelectModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    materials: Material[];
    onSelect: (materialId: number) => void;
}

const MaterialSelectModal: React.FC<MaterialSelectModalProps> = ({
    open,
    onOpenChange,
    materials,
    onSelect
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    
    const filteredMaterials = materials.filter(
        material => material.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[700px] max-h-[80vh]">
                <DialogHeader>
                    <DialogTitle>Selecionar Material</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <Input
                        placeholder="Buscar por código..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="mb-4"
                    />
                    <ScrollArea className="h-[400px]">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Código</TableHead>
                                    <TableHead>Espessura</TableHead>
                                    <TableHead>Largura</TableHead>
                                    <TableHead>Comprimento</TableHead>
                                    <TableHead>Peso</TableHead>
                                    <TableHead>COE</TableHead>
                                    <TableHead>Ação</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredMaterials.map((material) => (
                                    <TableRow key={material.material_id}>
                                        <TableCell>{material.code}</TableCell>
                                        <TableCell>{material.thickness}</TableCell>
                                        <TableCell>{material.height}</TableCell>
                                        <TableCell>{material.length}</TableCell>
                                        <TableCell>{material.weight}</TableCell>
                                        <TableCell>{material.coe}</TableCell>
                                        <TableCell>
                                            <Button 
                                                variant="outline" 
                                                onClick={() => {
                                                    onSelect(material.material_id);
                                                    onOpenChange(false);
                                                }}
                                            >
                                                Selecionar
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </ScrollArea>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default MaterialSelectModal;
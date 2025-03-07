"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchMaterials, handleAddMaterial } from "@/lib/api";
import { useAuth } from "../context/auth-context";
import { toast } from 'react-toastify';
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

type Material = {
    material_id: number;
    code: string;
    thickness: number;
    height: number;
    length: number;
    weight: number;
    coe: string;
};

export const AddMaterial: React.FC = () => {
    const [formData, setFormData] = useState({
        code: "",
        thickness: "",
        height: "",
        length: "",
        weight: "",
        coe: "",
    });
    const [open, setOpen] = useState(false);
    const [materials, setMaterials] = useState<Material[]>([]);
    const [filteredMaterials, setFilteredMaterials] = useState<Material[]>([]);
    const { user } = useAuth();

    useEffect(() => {
        if (open) {
            const getMaterials = async () => {
                try {
                    const fetchedMaterials = await fetchMaterials();
                    if (fetchedMaterials) {
                        setMaterials(fetchedMaterials);
                        setFilteredMaterials(fetchedMaterials);
                    }
                } catch (error) {
                    console.error("Failed to fetch materials", error);
                }
            };
            getMaterials();
        }
    }, [open]);

    useEffect(() => {
        // Filter materials whenever form data changes
        filterMaterials();
    }, [formData, materials]);

    const filterMaterials = () => {
        const filtered = materials.filter(material => {
            // Convert all values to lowercase strings for comparison
            const codeMatch = material.code.toLowerCase().includes(formData.code.toLowerCase());
            
            // For numeric fields, only filter if the input has a value
            const thicknessMatch = !formData.thickness || 
                material.thickness.toString().includes(formData.thickness);
            
            const heightMatch = !formData.height || 
                material.height.toString().includes(formData.height);
            
            const lengthMatch = !formData.length || 
                material.length.toString().includes(formData.length);
            
            const weightMatch = !formData.weight || 
                material.weight.toString().includes(formData.weight);
            
            const coeMatch = !formData.coe || 
                material.coe.toString().toLowerCase().includes(formData.coe.toLowerCase());

            return codeMatch && thicknessMatch && heightMatch && 
                   lengthMatch && weightMatch && coeMatch;
        });

        setFilteredMaterials(filtered);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newMaterial = await handleAddMaterial(formData);
            if (newMaterial) {
                setOpen(false);
                toast.success("Material adicionado com sucesso");
            }
        } catch (error) {
            toast.error("Falha ao adicionar, tente novamente.")
        }
    };

    const handleSelectMaterial = (material: Material) => {
        // Pre-fill form with the selected material's data
        setFormData({
            code: material.code,
            thickness: material.thickness.toString(),
            height: material.height.toString(),
            length: material.length.toString(),
            weight: material.weight.toString(),
            coe: material.coe,
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button 
                    variant="outline" 
                    className="bg-black text-white w-full md:w-auto"
                >
                    Adicionar Material
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[90vw] md:max-w-[700px] max-h-[90vh] p-4">
                <DialogHeader>
                    <DialogTitle>
                        Adicionar Material
                    </DialogTitle>
                    <DialogDescription>
                        Forneça as informações do material ou filtre a lista existente.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="code">Código</Label>
                            <Input 
                                type="text" 
                                name="code" 
                                id="code" 
                                placeholder="Filtrar por código" 
                                onChange={handleChange} 
                                value={formData.code} 
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="thickness">Espessura</Label>
                            <Input 
                                type="text" 
                                name="thickness" 
                                id="thickness" 
                                placeholder="Filtrar por espessura" 
                                onChange={handleChange} 
                                value={formData.thickness} 
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="height">Comprimento</Label>
                            <Input 
                                type="text" 
                                name="height" 
                                id="height" 
                                placeholder="Filtrar por comprimento" 
                                onChange={handleChange} 
                                value={formData.height} 
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="length">Largura</Label>
                            <Input 
                                type="text" 
                                name="length" 
                                id="length" 
                                placeholder="Filtrar por largura" 
                                onChange={handleChange} 
                                value={formData.length} 
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="weight">Peso</Label>
                            <Input 
                                type="text" 
                                name="weight" 
                                id="weight" 
                                placeholder="Filtrar por peso" 
                                onChange={handleChange} 
                                value={formData.weight} 
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="coe">COE</Label>
                            <Input 
                                type="text" 
                                name="coe" 
                                id="coe" 
                                placeholder="Filtrar por COE" 
                                onChange={handleChange} 
                                value={formData.coe} 
                            />
                        </div>
                    </div>
                    
                    <div className="mt-4">
                        <h3 className="text-sm font-medium mb-2">Materiais ({filteredMaterials.length})</h3>
                        <div className="border rounded">
                            <ScrollArea className="h-[30vh] overflow-auto">
                                <div className="responsive-table-container">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Código</TableHead>
                                                <TableHead>Espessura</TableHead>
                                                <TableHead>Comprimento</TableHead>
                                                <TableHead>Largura</TableHead>
                                                <TableHead>Peso</TableHead>
                                                <TableHead>COE</TableHead>
                                                <TableHead>Ação</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {filteredMaterials.length > 0 ? (
                                                filteredMaterials.map((material) => (
                                                    <TableRow key={material.material_id}>
                                                        <TableCell>{material.code}</TableCell>
                                                        <TableCell>{material.thickness}</TableCell>
                                                        <TableCell>{material.height}</TableCell>
                                                        <TableCell>{material.length}</TableCell>
                                                        <TableCell>{material.weight}</TableCell>
                                                        <TableCell>{material.coe}</TableCell>
                                                        <TableCell>
                                                            <Button 
                                                                variant="ghost" 
                                                                size="sm"
                                                                onClick={() => handleSelectMaterial(material)}
                                                            >
                                                                Selecionar
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={7} className="text-center py-4">
                                                        Nenhum material encontrado
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </ScrollArea>
                        </div>
                    </div>
                </div>
                
                <DialogFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => setFormData({
                        code: "",
                        thickness: "",
                        height: "",
                        length: "",
                        weight: "",
                        coe: "",
                    })}>
                        Limpar
                    </Button>
                    <Button type="submit" onClick={handleSubmit}>
                        Adicionar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
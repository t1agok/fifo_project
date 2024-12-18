"use client";

import React, { useState, useEffect, useContext } from "react";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { fetchMaterials, handleAddOperation } from "@/lib/api";
import { useAuth } from "../context/auth-context";
import { fetchTableDataContext } from "@/app/dashboard/page";
import { toast } from 'react-toastify';

type Material = { 
    material_id: number;
    code: string;
    thickness: number;
    height: number;
    length: number;
    weight: number;
    coe: string; 
};

interface AddOperationProps {
     onOperationAdded: (newOperation: any) => void; 
}

export const AddOperation: React.FC<AddOperationProps> = ({ onOperationAdded }) => {
    const [formData, setFormData] = useState({
        operation_type: "",
        nf: "",
        observation: "",
        type: "",
        quantity: "",
        location: "",
    });
    const [materials, setMaterials] = useState<Material[]>([]);
    const [open, setOpen] = useState(false);
    const { user } = useAuth();
    const fetchTableData = useContext(fetchTableDataContext);

    console.log('User in AddOperation:', user);
    
    useEffect(() => {
        const getMaterials = async () => {
            const fetchedMaterials = await fetchMaterials();
            if (fetchedMaterials) {
                console.log('Setting materials:', fetchedMaterials);
                setMaterials(fetchedMaterials)
            }
        };
        getMaterials();
    }, []);

    useEffect(() => {
        console.log('Dialog open state:', open);
    }, [open]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => { 
        setFormData({ ...formData, [e.target.name]: e.target.value }); 
    };

    const handleSelectChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !user.user_id) {
            console.log("id:", user?.user_id);
            toast.error("Usuário não autenticado");
            return;
        }
        try {
            const newOperation = await handleAddOperation(formData, user.user_id);
            console.log('New operation:', newOperation);
            if (newOperation) {
                setOpen(false);
                onOperationAdded(newOperation);
                await fetchTableData();
                toast.success("Operação incluída");
            }
        } catch (error) {
            toast.error("Falha ao adicionar, tente novamente.")
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button variant="outline" className="bg-black text-white">Adicionar Operação</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
            <DialogTitle>Informações da Operação</DialogTitle>
            <DialogDescription>
                Forneça as informações da operação a ser adicionada.
            </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center">
                <Select name="operation_type" onValueChange={(value) => handleSelectChange("operation_type", value)}>
                    <SelectTrigger className="col-end-4 col-span-2">
                        <SelectValue placeholder="Tipo de Operação" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="entry">Entrada</SelectItem>
                        <SelectItem value="exit">Saída</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nf" className="text-right">
                Nota Fiscal
                </Label>
                <Input type="number" name="nf" id="nf" onChange={handleChange} className="col-span-2" />
            </div>
            <div className="grid grid-cols-4 items-center">
                <Select onValueChange={(value) => handleSelectChange("material_id", value)}>
                    <SelectTrigger  className="col-end-4 col-span-2">
                        <SelectValue placeholder="Escolha o Código" />
                    </SelectTrigger>
                    <SelectContent>
                        {materials.map((material) => (
                            <SelectItem key={material.material_id} value={material.material_id.toString()}>
                                {material.code}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="observation" className="text-right">
                Observação
                </Label>
                <Input name="observation" id="observation" onChange={handleChange} className="col-span-2" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                Tipo
                </Label>
                <Input id="type" name="type" onChange={handleChange} className="col-span-2" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">
                Quantidade
                </Label>
                <Input type="number" name="quantity" id="quantity" onChange={handleChange} className="col-span-2" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                Local
                </Label>
                <Input type="text" name="location" id="location" onChange={handleChange} className="col-span-2" />
            </div>
            </div>
            <DialogFooter>
            <Button type="submit" onClick={handleSubmit}>Adicionar</Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>
    );
}

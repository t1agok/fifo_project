export interface Material {
    material_id: number;
    code: string;
    thickness: number;
    height: number;
    length: number;
    weight: number;
    coe: string;
  }
  
  export interface Operation {
    operation_id: number;
    material_id: number;
    nf: number;
    quantity: number;
    observation: string;
    name: string;
    description: string;
    date: string;
    operation_type: string;
    type: string;
    location: string;
  }
  
  export type OperationWithMaterial = Operation & { material?: Material };
  
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

export interface StockInterface {
  stock_id: number;
  material_id: number;
  location: string;
  quantity: number;
  last_updated: string;
  code: string;
  height: number;
  length: number;
  weight: number;
  thickness: number;
}

export type OperationWithMaterial = Operation & { material?: Material };
  
// src/utils/api.ts
import axios from 'axios';
import { OperationWithMaterial, Operation, Material } from './types';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.withCredentials = true;

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', // Base URL for your API
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true // Include credentials
});

export const signupUser = async (userData: any) => {
  const response = await apiClient.post('/users/signup', userData);
  return response.data;
};

export const loginUser = async (credentials: any) => {
  const response = await apiClient.post('/users/login', credentials);
  return response.data;
};

export const checkAuth = async () => {
  try {
      const response = await apiClient.get('/users/protected');
      //console.log('Authentication check response:', response.data); // Debugging log
      return {
        isAuthenticated: response.data.authenticated,
        user: response.data.user,
      };
  } catch (error) {
      console.error('Error checking authentication:', error);
      return {
        isAuthenticated: false,
        user: null,
      };
  }
};

export const handleLogout = async () => {
  try {
      const response = await apiClient.post('/users/logout');
      console.log('Logout successful:', response.data);
      return true;
  } catch (error) {
      console.error('Error during logout:', error); 
      return false;
  }
};

export const fetchOperations = async (): Promise<OperationWithMaterial[]> => {
  try {
    const [operationsResponse, materialsResponse] = await Promise.all([
      apiClient.get("/operations/operationRoute"),
      apiClient.get("/materials/materialRoute"),
    ]);

    const operations: Operation[] = operationsResponse.data;
    const materials: Material[] = materialsResponse.data;

    const combinedData: OperationWithMaterial[] = operations.map((operation: Operation) => {
        const material = materials.find((mat: Material) => mat.material_id === operation.material_id);
        return { ...operation, material };
    });

    return combinedData
  } catch (error) {
    throw new Error("Failed to fetch operations");
  }
};

export const deleteOperation = async (id: number) => {
  try {
      await apiClient.delete(`/operations/operationRoute/${id}`);
      return true;
  } catch (error) {
      return false;
  }
};

export const fetchMaterials = async () => {
  try {
      const response = await apiClient.get("/materials/materialRoute");
      //console.log("Fetched data:", response.data);
      return response.data;
  } catch (error) {
      console.error("Failed to fetch materials:", error);
  }
};

export const handleAddOperation = async (formData: any, userId: number) => {
  try {
    const newOperation = {
      ...formData,
      user_id: userId,
      date: new Date().toISOString().split('T')[0],
    }

    //console.log("formData: ", formData);
    //console.log("newOperation: ", newOperation);

    const response = await apiClient.post("/operations/operationRoute", newOperation);
    
    //console.log("Response status:", response.status);
    //console.log("Response data:", response.data);

    if (response.status === 201 || response.status === 200 ) {
      return response.data;
    }
  } catch (error) {
    console.error("Failed to add operation:", error);
    throw error;
  }
};

export const handleAddMaterial = async (formData: any) => {
  try {
    const newMaterial = formData;

    //console.log("formData: ", formData);
    //console.log("newMaterial: ", newMaterial);

    const response = await apiClient.post("/materials/materialRoute", newMaterial);
    
    //console.log("Response status:", response.status);
    //console.log("Response data:", response.data);

    if (response.status === 201 || response.status === 200 ) {
      return response.data;
    }
  } catch (error) {
    console.error("Failed to add material:", error);
    throw error;
  }
};

export const fetchStock = async () => {
  try {
      const response = await apiClient.get("/stock/stockRoute");
      console.log("Fetched data:", response.data);
      return response.data;
  } catch (error) {
      console.error("Failed to fetch stock:", error);
  }
}

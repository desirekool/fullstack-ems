import axios from "axios";
import { nanoid } from "nanoid";
import { QueryClient } from '@tanstack/react-query';
import { useNavigate } from "react-router-dom";

// export const employeesUrl = 'http://localhost:8080/api/v1';

export const REST_API_BASE_URL = 'http://localhost:8080/api/v1';
export const EMPLOYEES_API_URL = REST_API_BASE_URL + '/employees';
export const DEPARTMENTS_URI = '/departments';

export const customFetch = axios.create({
  baseURL: REST_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const formatPrice = (number) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format((number / 100).toFixed(2));
}


export const generateAmountOptions = (max) => {
  return Array.from({ length: max }, (_, index) => {
    const amount = index + 1;
    return (<option key={nanoid()} value={amount}>{amount}</option>);
  });
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

export const invalidateEmployeeQueries = (id) => {
  return Promise.all([
    queryClient.invalidateQueries({ queryKey: ['allEmployees', ] }),          
    queryClient.invalidateQueries({ queryKey: ['singleEmployee', id] })
  ]);
}

export const invalidateDepartmentQueries = (id) => {  
  return Promise.all([
    queryClient.invalidateQueries({ queryKey: ['allDepartments', ] }),          
    queryClient.invalidateQueries({ queryKey: ['singleDepartment', id] })
  ]);
}
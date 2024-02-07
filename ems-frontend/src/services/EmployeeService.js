import { customFetch } from '../utils';

export const newEmployee = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
  };

const allEmployeesQuery = () => {  
  return {
    queryKey: ['allEmployees'],      
    queryFn: () => customFetch('/employees'),
  };
};

export const allEmployeesLoader = (queryClient) => async () => {
  const response = await queryClient.ensureQueryData(allEmployeesQuery());  
  const employeeList = response.data;  
  return {employeeList};
}

const SingleEmployeeQuery = (id) => {
  return {
    queryKey: ['singleEmployee', id],
    queryFn: () => customFetch(`/employees/${id}`),
  };
}

export const SingleEmployeeLoader = (queryClient) => async ({ params }) => {
  const response = await queryClient.ensureQueryData(
    SingleEmployeeQuery(params.id)
  );  
  return { employee: response.data };
};

export const getEmployee =  async (id) => {
  if(id === "") return newEmployee;  
  const response = await customFetch(`/employees/${id}`);  
  return response.data;
}

export const addEmployee =  async (employee) => {  
  const response = await customFetch('/employees', {
    method: 'POST',
    data: JSON.stringify(employee),  
  });  
  return response;
}

export const updateEmployee =  async (employee) => {
  const response = await customFetch(`/employees/${employee.id}`, {
    method: 'PUT',
    data: JSON.stringify(employee),
  });
  return response;
}

export const deleteEmployee = async (id) => {
  const response = await customFetch(`/employees/${id}`, {
    method: 'DELETE',
  });
  return response;
}

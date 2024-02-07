import { customFetch } from '../utils';
const departmentsUri = '/departments';
export const newDepartment = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
};

const allDepartmentsQuery = () => {  
  return {
    queryKey: ['allDepartments'],      
    queryFn: () => customFetch(departmentsUri),
  };
};

export const DepartmentsLoader = (queryClient) => async () => {
  const response = await queryClient.ensureQueryData(allDepartmentsQuery());    
  return {departments: response.data};
}

const SingleDepartmentsQuery = (id) => {
  return {
    queryKey: ['singleDepartment', id],
    queryFn: () => customFetch(`${departmentsUri}/${id}`),
  };
}

export const SingleDepartmentsLoader = (queryClient) => async ({ params }) => {
  const response = await queryClient.ensureQueryData(
    SingleDepartmentsQuery(params.id)
  );  
  return { department: response.data };
};

export const getAllDepartments =  async () => {  
  const response = await customFetch(`${departmentsUri}`);  
  return response;
}

export const getDepartment =  async (id) => {
  if(id === "") return newDepartment;  
  const response = await customFetch(`${departmentsUri}/${id}`);  
  return response;
}

export const addDepartment =  async (department) => {  
  const response = await customFetch(departmentsUri, {
    method: 'POST',
    data: JSON.stringify(department),  
  });
  return response;
}

export const updateDepartment =  async (department) => {
  const response = await customFetch(`${departmentsUri}/${department.id}`, {
    method: 'PUT',
    data: JSON.stringify(department),
  });
  
  return response;
}

export const deleteDepartment = async (id) => {
  const response = await customFetch(`${departmentsUri}/${id}`, {
    method: 'DELETE',
  });  
  return response;
}

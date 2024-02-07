import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { About, Departments, Employees, Error, HomeLayout, Login, Register, SingleDepartment, SingleEmployee } from './Pages';

import { DepartmentEdit, EmployeeEdit, ErrorElement } from './components';
import { allEmployeesLoader  as EmployeesLoader, SingleEmployeeLoader} from './services/EmployeeService';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SingleDepartmentsLoader, DepartmentsLoader } from './services/DepartmentService';
import { queryClient } from './utils';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        path: '',
        element: <Employees />,
        errorElement: <ErrorElement />,
        loader: EmployeesLoader(queryClient),        
      },     
    ],
  },
  {
    path: '/employees',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        path: '',
        element: <Employees />,
        errorElement: <ErrorElement />,
        loader: EmployeesLoader(queryClient),
      },
      {
        path: ':id',
        element: <SingleEmployee />,
        errorElement: <ErrorElement />,
        loader: SingleEmployeeLoader(queryClient),
      },
      {
        path: 'edit/:id',
        element: <EmployeeEdit editMode={true} />,
        errorElement: <ErrorElement  />,        
      },
      {
        path: 'add',
        element: <EmployeeEdit editMode={false} />,
        errorElement: <ErrorElement />,        
      },     
    ],
  },
  {
    path: '/departments',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        path: '',
        element: <Departments />,
        errorElement: <ErrorElement />,
        loader: DepartmentsLoader(queryClient),
      },
      {
        path: ':id',
        element: <SingleDepartment />,
        errorElement: <ErrorElement />,
        loader: SingleDepartmentsLoader(queryClient),
      },
      {
        path: 'edit/:id',
        element: <DepartmentEdit editMode={true} />,
        errorElement: <ErrorElement  />,        
      },
      {
        path: 'add',
        element: <DepartmentEdit editMode={false} />,
        errorElement: <ErrorElement />,        
      },     
    ],
  },
  { 
    path: '/about', 
    element: <About />, 
    errorElement: <Error />,
  }, 
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
    // action: loginAction(store),
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <Error />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>            
  );
}

export default App;

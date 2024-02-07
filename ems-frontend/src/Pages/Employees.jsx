import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { DeleteModal } from "../components";
import { deleteEmployee } from "../services/EmployeeService";
import { invalidateEmployeeQueries } from "../utils";
import { useNavigate } from "react-router-dom";
import { getAllDepartments } from "../services/DepartmentService";

const Employees = () => {
  const { employeeList } = useLoaderData();
  const [showModal, setShowModal] = useState(false);
  const [employeeIdToDelete, setEmployeeIdToDelete] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  console.log(employeeList);

  useEffect(() => {
    getAllDepartments().then(( departmentsData) => {      
      setDepartments(departmentsData.data);            
    });
  }, []);

  const handleDeleteClick = (id) => {    
    setEmployeeIdToDelete(id);
    setShowModal(true);
  };

  const handleConfirmDelete = (id ) => {    
    return () => {      
      const response = deleteEmployee(id);
      setShowModal(false);
      response.then((res) => {
        if(res.status === 200) {
          invalidateEmployeeQueries(id);          
          navigate(0);
        }
      });
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);    
  };

  const handleAddEmployee = () => {
    navigate('/employees/add');
  }

  const handleEditClick = (id) => {
    navigate(`/employees/edit/${id}`);
  };

  const handleViewClick = (id) => {
    navigate(`/employees/${id}`);
  };

  if(loading) return (<div>Loading...</div>);

  return (
    <div className="overflow-x-auto w-4/5 text-center m-auto">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Employee List</h2>
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">id</th>
            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">First Name</th>
            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">Last Name</th>
            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">email</th>
            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">Department</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 text-left">
          {employeeList.map(({id, firstName, lastName, email, departmentId}) => { 
            return (<tr key={nanoid()} >
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{id}</td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">{firstName}</td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">{lastName}</td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">{email}</td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">{
                departments.find((department) => department.id === departmentId)?.departmentName
              }</td>
              <td className="whitespace-nowrap px-4 py-2 gap-4 flex">
                <button
                  onClick={() => handleViewClick(id)}
                  className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                  >
                  View
                </button>
              
                <button
                  onClick={() => handleEditClick(id)}
                  className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                  >
                  Edit
                </button>              
                <button
                  onClick={() => handleDeleteClick(id)}                    
                  className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                >Delete</button>
              </td>
            </tr>)
          }
            
          )}          
        </tbody>
      </table>

      <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
        <button
          className="bg-teal-700 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => handleAddEmployee()}
        >
          Add New Employee
        </button>
      </div>

      { showModal ? 
        <DeleteModal 
          headline="Delete Employee?"
          ModalContent={<p>Are you sure you want to delete this employee?</p>}
          onCancel={handleCancelDelete}
          onDelete={handleConfirmDelete(employeeIdToDelete)}                        
        /> : null }
    </div>
  );
};

export default Employees;

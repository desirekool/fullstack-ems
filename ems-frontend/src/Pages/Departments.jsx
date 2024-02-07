import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { deleteDepartment } from "../services/DepartmentService";
import { invalidateDepartmentQueries } from "../utils";
import { DeleteModal } from "../components";

const Departments = () => {
  const { departments } = useLoaderData();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [departmentIdToDelete, setDepartmentIdToDelete] = useState(null);

  const handleDeleteClick = (id) => {
    setDepartmentIdToDelete(id);
    setShowModal(true);
  };

  const handleConfirmDelete = (id ) => {    
    return () => {      
      const response = deleteDepartment(id);
      setShowModal(false);
      response.then((res) => {
        if(res.status === 200) {
          invalidateDepartmentQueries(id).then(() => {        
            navigate(0);          
          });
        }
      });
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);    
  };

  const handleAddEmployee = () => {
    navigate('/departments/add');
  }

  const handleEditClick = (id) => {
    navigate(`/departments/edit/${id}`);
  };

  const handleViewClick = (id) => {
    navigate(`/departments/${id}`);
  };

  return (
    <div className="overflow-x-auto w-4/5 text-center m-auto">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Department List</h2>
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">id</th>
            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">Department Name</th>
            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">Department Code</th>
            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">Description</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {departments.map(({id, departmentName, departmentCode, departmentDescription}) => { 
            return (<tr key={nanoid()} >
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{id}</td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">{departmentName}</td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">{departmentCode}</td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">{departmentDescription}</td>
              <td className="whitespace-nowrap px-4 py-2">
                <button
                  onClick={() => handleViewClick(id)}
                  className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                  >
                  View
                </button>
              </td>
              <td className="whitespace-nowrap px-4 py-2">
                <button
                  onClick={() => handleEditClick(id)}
                  className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                  >
                  Edit
                </button>
              </td>
              <td className="whitespace-nowrap px-4 py-2">
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
          Add New Department
        </button>
      </div>

      { showModal ? 
        <DeleteModal 
          headline="Delete Department?"
          ModalContent={<p>Are you sure you want to delete this Department?</p>}
          onCancel={handleCancelDelete}
          onDelete={handleConfirmDelete(departmentIdToDelete)}                        
        /> : null }
    </div>
  );
};

export default Departments;

/* eslint-disable react/prop-types */
import { addEmployee, updateEmployee, getEmployee } from "../services/EmployeeService"; 
import { getAllDepartments } from "../services/DepartmentService";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


const EmployeeEdit = ({editMode}) => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    Promise.all([getEmployee(id || ""), getAllDepartments()]).then(([employee, departmentsData]) => {      
      setDepartments(departmentsData.data);
      setEmployee(employee);
      setLoading(false);
    });
  }, []);

  const handleSubmit = (event) => {
    console.log(employee);
    event.preventDefault();
    if(!employee.departmentId) return;

    const response = editMode ? updateEmployee(employee) : addEmployee(employee);
    response.then((res) => {      
      if (res.status === 200 || res.status === 201) navigate('/employees'); 
    });
  };

  const handleDepartmentChange = (event) => {
    console.log(event.target);
    setEmployee({...employee, departmentId: event.target.value});
  }

  if(loading) return (<div>Loading...</div>);

  return (
    <>     
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <div className={`${editMode ? 'flex flex-col' : 'hidden'}`}>
            <label htmlFor="id" className="text-lg font-semibold text-gray-900">Id</label>
            <input
              id="id"
              name="id"
              type="text"
              disabled={editMode}          
              className="border-2 border-gray-400 rounded-md p-2"            
              defaultValue={employee?.id || ""}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="firstName" className="text-lg font-semibold text-gray-900">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              onChange={(e) => setEmployee({...employee, firstName: e.target.value})  }  
              className="border-2 border-gray-400 rounded-md p-2"
              value={employee?.firstName || ""}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastName" className="text-lg font-semibold text-gray-900">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              className="border-2 border-gray-400 rounded-md p-2"
              onChange={(e) => setEmployee({...employee, lastName: e.target.value})  }
              value={employee?.lastName || ""}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-lg font-semibold text-gray-900">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="border-2 border-gray-400 rounded-md p-2"
              onChange={(e) => setEmployee({...employee, email: e.target.value})  }
              value={employee?.email || ""}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="departmentId" className="text-lg font-semibold text-gray-900">
              Department
            </label>
            <select
              id="departmentId"
              name="departmentId"              
              className="border-2 border-gray-400 rounded-md p-2"
              onChange={(e) => handleDepartmentChange(e)  }
              value={employee?.departmentId || ""}
            >
              {departments.map((dep) => <option key={dep.id} value={dep.id}>{dep.departmentName}</option>)}              
            </select>
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md mt-4">
          {editMode ? "Update" : "Add"}
        </button>
      </form>          
    </>
  );
}

export default EmployeeEdit;
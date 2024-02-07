/* eslint-disable react/prop-types */
import { addDepartment, updateDepartment, getDepartment } from "../services/DepartmentService"; 
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { invalidateDepartmentQueries } from "../utils";


const DepartmentEdit = ({editMode}) => {
  const { id } = useParams();
  const [department, setDepartment] = useState(null);  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getDepartment(id || "").then(department => {
      setDepartment(department);
      setLoading(false);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const response = editMode ? updateDepartment(department) : addDepartment(department);
    response.then((res) => {
      if (res.status === 200 || res.status === 201) {
        invalidateDepartmentQueries(id).then(() => {                  
          navigate('/departments');
        });
      }
    });    
  };

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
              defaultValue={department?.id || ""}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="firstName" className="text-lg font-semibold text-gray-900">Department Name</label>
            <input
              id="departmentName"
              name="departmentName"
              type="text"
              onChange={(e) => setDepartment({...department, departmentName: e.target.value})  }  
              className="border-2 border-gray-400 rounded-md p-2"
              value={department?.departmentName || ""}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastName" className="text-lg font-semibold text-gray-900">
              Code
            </label>
            <input
              id="departmentCode"
              name="departmentCode"
              type="text"
              className="border-2 border-gray-400 rounded-md p-2"
              onChange={(e) => setDepartment({...department, departmentCode: e.target.value})  }
              value={department?.departmentCode || ""}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-lg font-semibold text-gray-900">
              Description
            </label>
            <input
              id="departmentDescription"
              name="departmentDescription"
              type="text"
              className="border-2 border-gray-400 rounded-md p-2"
              onChange={(e) => setDepartment({...department, departmentDescription: e.target.value})  }
              value={department?.departmentDescription || ""}
            />
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md mt-4">
          {editMode ? "Update" : "Add"}
        </button>
      </form>          
    </>
  );
}

export default DepartmentEdit;
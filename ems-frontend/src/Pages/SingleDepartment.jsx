import { useLoaderData } from "react-router-dom";

const SingleDepartment = () => {
  const { department } = useLoaderData();

  return (
    <div className="flow-root m-auto">
      <dl className="-my-3 divide-y divide-gray-100 text-sm">
        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">Id</dt>
          <dd className="text-gray-700 sm:col-span-2">{department?.id}</dd>
        </div>

        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">Department Name</dt>
          <dd className="text-gray-700 sm:col-span-2">{department?.departmentName}</dd>
        </div>

        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">Code</dt>
          <dd className="text-gray-700 sm:col-span-2">{department?.departmentCode}</dd>
        </div>

        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">Description</dt>
          <dd className="text-gray-700 sm:col-span-2">{department?.departmentDescription}</dd>
        </div>
      </dl>
    </div>
  );
};

export default SingleDepartment; 
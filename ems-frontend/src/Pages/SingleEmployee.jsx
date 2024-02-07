import { useLoaderData } from "react-router-dom";

const SingleEmployee = () => {
  const { employee } = useLoaderData();

  return (
    <div className="flow-root m-auto">
      <dl className="-my-3 divide-y divide-gray-100 text-sm">
        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">Id</dt>
          <dd className="text-gray-700 sm:col-span-2">{employee?.id}</dd>
        </div>

        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">First Name</dt>
          <dd className="text-gray-700 sm:col-span-2">{employee?.firstName}</dd>
        </div>

        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">Last Name</dt>
          <dd className="text-gray-700 sm:col-span-2">{employee?.lastName}</dd>
        </div>

        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">Email</dt>
          <dd className="text-gray-700 sm:col-span-2">{employee?.email}</dd>
        </div>

        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">notes</dt>
          <dd className="text-gray-700 sm:col-span-2">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et facilis debitis explicabo
            doloremque impedit nesciunt dolorem facere, dolor quasi veritatis quia fugit aperiam
            aspernatur neque molestiae labore aliquam soluta architecto?
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default SingleEmployee; 
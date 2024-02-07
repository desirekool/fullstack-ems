import { Link, useRouteError } from 'react-router-dom';

function Error() {
  const error = useRouteError();
  console.log(error);

  if(error.status === 404) {
    return (
      <main className="grid h-screen place-content-center bg-white px-4">
        <div className="text-center">
          <h1 className="text-9xl font-black text-gray-200">404</h1>

          <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Uh-oh!</p>

          <p className="mt-4 text-gray-500">We can&rsquo;t find that page.</p>

          <Link
            to='/'
            className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
          >
            Go Back Home
          </Link>
        </div>
      </main>      
    )
  }

  return (
    <main className='grid min-h-screen place-items-center px-8'>
      <h4 className='text-center font-bold text-4xl'>there was an Error</h4>
    </main>
  )
}

export default Error
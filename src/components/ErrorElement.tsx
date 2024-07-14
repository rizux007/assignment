import { useRouteError } from 'react-router-dom';
function ErrorElement() {
  const error = useRouteError();
  console.log(error);

  return <h4 className='font-bold text-4xl'>une erreur s'est produite... </h4>;
}
export default ErrorElement;

import { useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();
  console.log(error);

  return (
    <>
      <h1>Oops! Something went wrong</h1>
      <pre>{error.message}</pre>
      <pre>
        Status: {error.status} {error.statusText}
      </pre>
    </>
  );
}

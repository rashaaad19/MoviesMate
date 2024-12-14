import { useLoaderData } from "react-router-dom";

const Reviews = () => {
  const data = useLoaderData();
  return (
    <>
      <h1>{data.message}</h1>
    </>
  );
};

export default Reviews;

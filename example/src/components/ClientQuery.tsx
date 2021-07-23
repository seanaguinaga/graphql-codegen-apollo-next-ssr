import { useGetContinents } from "../generated/page";

const ClientQuery = () => {
  let { data, loading, error } = useGetContinents();

  if (error) {
    return <div>Error</div>;
  }

  if (loading) {
    return <div> Loading....</div>;
  }

  return (
    <div>
      {data?.continents.map((continent, index) => (
        <div key={index}>{continent.name}</div>
      ))}
    </div>
  );
};

export default ClientQuery;

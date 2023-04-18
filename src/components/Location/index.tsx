import { CharacterType } from "@/types";
import { useQuery } from "@tanstack/react-query";

function Location({ data }: { data: CharacterType }) {
  const { data: location } = useQuery(
    ["location", data.location.url],
    () =>
      fetch(data?.location.url).then(async (result) => {
        const response = await result.json();
        return response;
      }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false, // Do not refetch data when window regains focus
      cacheTime: 10 * (60 * 1000),
    }
  );

  return (
    <div>
      <h1 className="font-extrabold mt-4">
        {location?.url?.length ? "Location" : "Location Details Not Found"}
      </h1>
      {location?.url?.length && (
        <div>
          <p>Name: {location?.name}</p>
          <p>Dimension: {location.dimension}</p>
          <p>Residents: {location.residents?.length}</p>
          <p>Type: {location.type}</p>
        </div>
      )}
    </div>
  );
}

export default Location;

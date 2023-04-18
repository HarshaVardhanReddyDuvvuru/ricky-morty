import { CharacterType, addressType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

function Origin({ data }: { data: CharacterType }) {
  const { data: origin } = useQuery(
    ["origin", data.origin.url],
    () =>
      fetch(data?.origin.url).then(async (result) => {
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
        {origin?.url?.length ? "Origin" : "Origin Details Not Found"}
      </h1>
      {origin?.url?.length && (
        <div>
          <p>Name: {origin?.name}</p>
          <p>Dimension: {origin?.dimension}</p>
          <p>Residents: {origin?.residents?.length}</p>
          <p>Type: {origin?.type}</p>
        </div>
      )}
    </div>
  );
}

export default Origin;

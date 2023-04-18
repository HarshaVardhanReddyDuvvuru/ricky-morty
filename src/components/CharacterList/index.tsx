import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Link from "next/link";
import CharacterProfile from "../CharacterProfile";
import { CharacterType } from "@/types";

const CharacterList = () => {
  const [page, setPage] = useState(1);

  // Use TanStack-query to fetch data and cache it for 10 minutes
  const { data, isLoading, isError } = useQuery(
    ["characters", page],
    async () =>
      await fetch(
        `https://rickandmortyapi.com/api/character/?page=${page}`
      ).then((result) => result.json()),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false, // Do not refetch data when window regains focus
      cacheTime: 10 * (60 * 1000),
    }
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
    },
    []
  );

  if (isLoading) {
    return <h1 className="mt-3 text-center">Loading</h1>;
  }

  if (isError) {
    return <h1 className="mt-3 text-center">Error</h1>;
  }
  // Todo: little bit css needed to modified when the app is used in dark mode

  return (
    <>
      <h1 className="text-center mt-4 text-cyan-700 font-extrabold">
        Ricky and Morty App
      </h1>
      <div className="flex justify-center w-full mt-10">
        {data && (
          <Pagination
            className="margin-auto bg-transparent"
            count={data?.info.pages}
            page={page}
            onChange={handleChange}
          />
        )}
      </div>
      <div className="flex flex-wrap m-10">
        {data?.results.map((result: CharacterType) => (
          <div key={result.id}>
            <Link href={`/CharacterDetailedView/${result.id}`}>
              <CharacterProfile result={result} />
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default CharacterList;

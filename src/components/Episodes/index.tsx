import { CharacterType } from "@/types";
import { useQueries } from "@tanstack/react-query";

function Episodes({ data }: { data: CharacterType }) {
  const episodeQueries = useQueries({
    queries: data?.episode?.map((url: string) => {
      return {
        queryKey: ["episode", url],
        queryFn: () =>
          fetch(url).then(async (result) => {
            const response = await result.json();
            return response;
          }),
        keepPreviousData: true,
        refetchOnWindowFocus: false, // Do not refetch data when window regains focus
        cacheTime: 10 * (60 * 1000),
      };
    }),
  });

  const episodes = episodeQueries.map((episode) => {
    return episode.data;
  });

  return (
    <div>
      <h1 className="font-extrabold mt-4">Chapters Featured in</h1>
      {episodes.map((episode) => (
        <div key={episode?.id}>
          <p> {episode?.name}</p>
        </div>
      ))}
    </div>
  );
}

export default Episodes;

import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import Episodes from "@/components/Episodes";
import Origin from "@/components/Origin";
import Location from "@/components/Location";
import styles from "./index.module.css";

function CharacterDetailedView() {
  const router = useRouter();
  const { characterDetailedView } = router.query;

  const { data, isLoading } = useQuery(
    ["episodes", characterDetailedView],
    () =>
      fetch(
        "https://rickandmortyapi.com/api/character/" + characterDetailedView
      ).then(async (result) => {
        const response = await result.json();
        return response;
      }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false, // Do not refetch data when window regains focus
      cacheTime: 10 * (60 * 1000),
    }
  );

  return isLoading ? (
    <h1 className="text-center">Loading...</h1>
  ) : (
    <>
      <Link className={styles.homeLink} href={"/"}>
        <button>Back to Home</button>
      </Link>
      <div className={styles.characterContainer}>
        <div>
          <Image
            src={data?.image}
            alt="profile-img"
            width={150}
            height={150}
            priority
          />
          <h1>{data?.name}</h1>
          <p>
            {data?.species} - {data?.status}
          </p>
          <p>{data?.gender}</p>
          <h5>Origin : {data?.origin?.name}</h5>
        </div>
        {data && <Origin data={data} />}
        {data && <Location data={data} />}
        {data && <Episodes data={data} />}
      </div>
    </>
  );
}

export default CharacterDetailedView;

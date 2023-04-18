import { CharacterType } from "@/types";
import Image from "next/image";
function CharacterProfile(props: { result: CharacterType }) {
  const { result } = props;
  return (
    <div className=" w-80  flex justify-between m-4 border-4  border-cyan-700 p-1">
      <div>
        {/* using next js image component to optimize performance */}
        <Image
          src={result.image}
          alt="profile-img"
          width={150}
          height={150}
          priority
        />
      </div>
      <div className="p-3 flex-1">
        <h1>{result.name}</h1>
        <p>
          {result.species} - {result.status}
        </p>
        <p>{result?.gender}</p>
      </div>
    </div>
  );
}

export default CharacterProfile;

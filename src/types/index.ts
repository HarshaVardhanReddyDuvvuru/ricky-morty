export type CharacterType = {
  id: number;
  name: string;
  image: string;
  species: string;
  status: string;
  gender: string;
  origin: {
    url: string;
  };
  location: {
    url: string;
  };
  episode: string[];
};

export type episodeType = {
  id: number;
  name: string;
};

export type addressType = {
  url: string;
  name: string;
  dimension: string;
  type: string;
  residents: {
    length: number;
  };
};

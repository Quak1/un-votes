import { useState, useEffect } from "react";
import { ResolutionVotes } from "../types";

import voteData from "../lib/votes.json";

const useFile = () => {
  const [data, setData] = useState<ResolutionVotes>();

  useEffect(() => {
    setData({
      ...voteData,
      voteDate: new Date(voteData.voteDate),
    } as ResolutionVotes);
  }, []);

  return data;
};

export default useFile;

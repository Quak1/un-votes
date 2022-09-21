import { useState, useEffect } from "react";
import { ResolutionVotes } from "../types";

import { getResolutionByRecordNumber } from "../lib/resolutionVotes";

const useData = (resolutionNumber: string | number) => {
  const [data, setData] = useState<ResolutionVotes>();

  useEffect(() => {
    getResolutionByRecordNumber(resolutionNumber).then(setData);
  }, [resolutionNumber]);

  return data;
};

export default useData;

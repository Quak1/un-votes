import { useState, useEffect } from "react";
import type { IRecords, IVoteRecord } from "../models/record";

const useData = (resolutionNumber: string | number) => {
  const [data, setData] = useState<IRecords | IVoteRecord>();

  useEffect(() => {
    fetch(`/api/resolution/${resolutionNumber}`)
      .then((res) => res.json())
      .then((record) => setData(record));
  }, [resolutionNumber]);

  return data;
};

export default useData;

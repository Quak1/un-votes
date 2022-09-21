import type { NextApiRequest, NextApiResponse } from "next";

import { getResolutionByRecordNumber } from "../../lib/resolutionVotes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const RESOLUTION_NUMBER = 3967778;
  const votes = await getResolutionByRecordNumber(RESOLUTION_NUMBER);
  return res.status(200).json(votes);
}

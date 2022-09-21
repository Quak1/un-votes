import type { NextApiRequest, NextApiResponse } from "next";

import connectDB from "../../../utils/db";
import Resolution from "../../../models/resolution";
import { getResolutionByRecordNumber } from "../../../utils/resolutionVotes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  if (!id || Array.isArray(id))
    return res.status(400).json({ error: "missing id" });

  try {
    await connectDB();
    const resolution = await Resolution.findOne({ recordId: id });
    if (resolution) return res.status(200).json(resolution);

    const votes = await getResolutionByRecordNumber(id);
    votes.recordId = id;
    const newResolution = await Resolution.create(votes);

    return res.status(200).json(newResolution);
  } catch (e) {
    console.log(e);
    return res.status(505).json({ error: "error" });
  }
}

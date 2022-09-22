import type { NextApiRequest, NextApiResponse } from "next";

import { loadRecordByRecordId } from "../../../utils/loadRecord";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  if (!id || Array.isArray(id))
    return res.status(400).json({ error: "missing id" });

  try {
    const record = await loadRecordByRecordId(id);
    return res.status(200).json(record);
  } catch (e) {
    console.log(e);
    return res.status(505).json({ error: "error" });
  }
}

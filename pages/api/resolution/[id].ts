import type { NextApiRequest, NextApiResponse } from "next";

import connectDB from "../../../utils/db";
import { Records, VoteRecord } from "../../../models/record";
import { getRecordData } from "../../../utils/resolutionVotes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  if (!id || Array.isArray(id))
    return res.status(400).json({ error: "missing id" });

  try {
    await connectDB();
    const record = await Records.findOne({ recordId: id });
    if (record) {
      console.log("Found in DB");
      return res.status(200).json(record);
    }

    let newRecord;
    const recordData = await getRecordData(id);
    if (!recordData.voteDate) {
      recordData.type = "Other";
      newRecord = await Records.create(recordData);
    } else if (!recordData.note) {
      recordData.type = "Security Council";
      newRecord = await VoteRecord.create(recordData);
    } else {
      recordData.type = "General Assembly";
      newRecord = await VoteRecord.create(recordData);
    }

    return res.status(200).json(newRecord);
  } catch (e) {
    console.log(e);
    return res.status(505).json({ error: "error" });
  }
}

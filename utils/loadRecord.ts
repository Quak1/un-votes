import connectDB from "./db";
import { Records, VoteRecord } from "../models/record";
import { getRecordData } from "./resolutionVotes";

export const loadRecordByRecordId = async (id: string) => {
  await connectDB();
  const record = await Records.findOne({ recordId: id }).lean();
  if (record) {
    console.log("Found in DB");
    return record;
  }

  let newRecord;
  const recordData = await getRecordData(id);
  if (!recordData.voteDate) {
    recordData.type = "Other";
    // TODO maybe change how records are fetched
    newRecord = (await Records.create(recordData)).lean();
  } else if (!recordData.note) {
    recordData.type = "Security Council";
    newRecord = (await VoteRecord.create(recordData)).lean();
  } else {
    recordData.type = "General Assembly";
    newRecord = (await VoteRecord.create(recordData)).lean();
  }

  return newRecord;
};

import { Schema, model, models } from "mongoose";

// Basic Record
const recordsSchema = new Schema({
  title: { type: String, required: true },
  recordId: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ["Other"],
  },
});
export const Records = models.Records || model("Records", recordsSchema);

export interface IRecords {
  type: "Other";
  title: string;
  recordId: string;
}

// Vote Record
const resolutionFieldSchema = new Schema({
  text: { type: String, required: true },
  link: { type: String },
});

const voteFieldSchema = new Schema({
  Yes: { type: Number, required: true },
  No: { type: Number, required: true },
  Abstentions: { type: Number, required: true },
  "Non-Voting": { type: Number, required: true },
  "Total voting membership": { type: Number, required: true },
});

export const VoteRecord =
  models.VoteRecord ||
  Records.discriminator(
    "VoteRecord",
    new Schema({
      type: {
        type: String,
        required: true,
        enum: ["Security Council", "General Assembly"],
      },
      note: { type: String },
      voteDate: { type: Date, required: true },
      resolution: { type: resolutionFieldSchema, required: true },
      voteSummary: { type: voteFieldSchema },
      vote: { type: Map, of: String },
    })
  );

export interface IVoteRecord extends Omit<IRecords, "type"> {
  type: "Security Council" | "General Assembly";
  note?: string;
  voteDate: Date;
  resolution: {
    text: string;
    link?: string;
  };
  voteSummary?: {
    Yes: number;
    No: number;
    Abstentions: number;
    "Non-Voting": number;
    "Total voting membership": number;
  };
  vote?: Record<string, string>;
}

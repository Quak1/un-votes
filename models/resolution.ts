import { Schema, model, models } from "mongoose";

const ResolutionDocument = new Schema({
  link: { type: String, required: true },
  text: { type: String, required: true },
});

const VoteSummary = new Schema({
  Yes: { type: Number, required: true },
  No: { type: Number, required: true },
  Abstentions: { type: Number, required: true },
  "Non-Voting": { type: Number, required: true },
  "Total voting membership": { type: Number, required: true },
});

const resolutionSchema = new Schema({
  recordId: { type: String, required: true, unique: true },
  link: { type: String, required: true },
  title: { type: String, required: true },
  resolution: { type: ResolutionDocument },
  note: { type: String },
  voteSummary: { type: VoteSummary },
  voteDate: { type: Date },
  vote: { type: Map, of: String },
});

const Resolution = models.Resolution || model("Resolution", resolutionSchema);

export default Resolution;

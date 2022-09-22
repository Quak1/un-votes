export interface ColorScale {
  Y: string;
  N: string;
  A: string;
  "Non-Voting": string;
}

export type VotingOptions = "Y" | "N" | "A" | "Non-Voting";

interface CountryVote {
  country: string;
  vote: VotingOptions;
  code: string;
}

export type CountryVotes = Record<string, CountryVote>;

export interface ResolutionVotes {
  link: string;
  title: string;
  resolution: {
    link: string;
    text: string;
  };
  note: string;
  voteSummary?: {
    Yes: number;
    No: number;
    Abstentions: number;
    "Non-Voting": number;
    "Total voting membership": number;
  };
  voteDate: Date;
  vote?: CountryVotes;
}

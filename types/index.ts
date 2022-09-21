export interface ColorScale {
  Y: string;
  N: string;
  A: string;
  "Non-Voting": string;
}

interface CountryVote {
  country: string;
  vote: "Y" | "N" | "A" | "Non-Voting";
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

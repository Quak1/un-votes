export interface ColorScale {
  Y: string;
  N: string;
  A: string;
  "Non-Voting": string;
}

const VOTING_OPTIONS = ["Y", "N", "A", "Non-Voting"] as const;
export type VotingOptions = typeof VOTING_OPTIONS[number];
export const isVotingOption = (item: string): item is VotingOptions => {
  return VOTING_OPTIONS.includes(item as VotingOptions);
};

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

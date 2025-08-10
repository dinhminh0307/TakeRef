import type { CitationType } from "./CitationType";

export interface CitationResponse {
  citationid: number;
  title: string;
  content: string;
  citationType: CitationType;
  url: string;
  created_at: string;
  modified_at: string;
}
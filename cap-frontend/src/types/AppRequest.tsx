import { Client } from "./Client";
import { Consultants } from "./Consultants";


export interface AppRequest {
  id: number;
  proposed_time: string;
  p_time: string;
  scheduled_time: string;
  s_time: string;
  cancel_request: boolean;
  request_note: string;
  client: Client;
  consultant: Consultants;
  accepted: boolean;
}

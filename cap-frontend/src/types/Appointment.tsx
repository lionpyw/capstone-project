import { AppRequest } from "./AppRequest";


export interface Appointment {
  id: number;
  appointment: AppRequest;
  duration: string;
  charges: number;
  notes: string;
  prescription: string;
  expired: boolean;
  today:boolean;
  booking: string;
}

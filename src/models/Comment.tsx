import { Contact } from "./Contact";

export interface Comment {
  _id: string;
  date: Date;
  description: string;
  contact: string;
  company_id: string;
}

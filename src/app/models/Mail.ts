import { User } from './User';

export interface Mail {
  id?: number;
  order_id: number;
  /**
   * TODO: Implement after API is properly implemented
   */
  message_content: any;
  sender_id?: number;
  sender?: User;
  receiver_id?: number;
  receiver?: User;
  updated_at?: string;
  created_at?: string;
}

export interface MailResponse {
  message: string;
  data: Mail;
}

export type MailThread = Mail[]

export interface MailThreadResponse {
  data: any[];
}

export interface AdminMailThreadResponse {
  vendors: MailThread;
  users: MailThread;
}
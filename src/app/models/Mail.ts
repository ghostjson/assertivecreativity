/**
 * Model for Message
 */
export class Mail {
  id?: number;
  author: number;
  receiver: number;
  content: string;
  timestamp: string;
}

/**
 * Model for a thread of messages
 */
export interface MailThread {
  id?: number;
  orderId: number;
  mails: Mail[];
}
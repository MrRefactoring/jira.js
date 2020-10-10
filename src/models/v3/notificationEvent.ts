export interface NotificationEvent {
  id: number;
  name: string;
  description: string;
  templateEvent: NotificationEvent[];
}

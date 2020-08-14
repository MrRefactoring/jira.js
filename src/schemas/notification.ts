export interface Notification {
    [key: string]: any;
    subject: string;
    textBody: string;
    htmlBody: string;
    to: any;
    restrict: any;
}

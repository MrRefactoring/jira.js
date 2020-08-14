export interface Transition {
    id: string;
    name: string;
    description: string;
    from: any[];
    to: string;
    type: string;
    screen: any;
    rules: any;
}

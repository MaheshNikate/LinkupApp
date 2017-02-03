export interface User {
    ID: number;
    Name: string;
    Department: string;
    Project: [
        {
            Title: string,
            Manager: string
        }
    ];
}

class List {
    _id!: string;
    list!: string;
    items!: [string];
}
export class User {
    _id!: string;
    user!: string;
    password!: string;
    lists!: List[]; 
}
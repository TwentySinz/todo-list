export class Todo {
    constructor(userId: number, id: number, title: string, completed: boolean){
        this.userId = userId;
        this.id = id;
        this.title = title;
        this.completed = completed;
    }
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}


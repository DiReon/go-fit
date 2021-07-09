import { UserComment } from "./user-comment";

export class Meal {
    title: string;
    imageUrl: string;
    kkal: number;
    description: string;
    recipe: string;
    key: string;
    comments: UserComment[];
}
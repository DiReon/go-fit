import { UserComment } from "./user-comment";

export interface Training {
    title: string;
    videoUrl: string;
    category: string;
    complexity: string;
    description: string;
    thumbnailUrl: string;
    key: string;
    period: string;
    multiperiod: boolean;
    comments: UserComment[];
}
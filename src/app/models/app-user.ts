export class AppUser {
    userId: string;
    name: string;
    email: string;
    sex: string;
    birthday: Date;
    photoUrl: string;
    body: {
        weight: number;
        height: number;
    }
    isAdmin: boolean;
}
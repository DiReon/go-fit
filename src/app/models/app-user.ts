export class AppUser {
    userId: string;
    name: string;
    email: string;
    sex: string;
    photoUrl: string;
    weight: number;
    height: number;
    isAdmin: boolean;
    birthday: Date;
    completedTrainings: Array<string>;

    get age() {
        let today = new Date()
        console.log("Today is ", today.getUTCDay);
        return (today.getFullYear()-this.birthday.getFullYear())
    }
    
}
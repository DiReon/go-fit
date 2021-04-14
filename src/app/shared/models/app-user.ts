import { MyRecord } from './my-record';

export class AppUser {
    userId: string;
    name: string;
    email: string;
    sex: string;
    photoUrl: string;
    journal: {[id: string]: MyRecord};
    lastWeight: number;
    height: number;
    birthday: Date;
    completedTrainings: Array<string>;
    completedLectures: Array<string>;
    goal: string;
    physicalActivity: number;
    isAdmin: boolean;
    activeMonth: Array<string>;
    registrationDate: string;

    constructor(init?: Partial<AppUser>) {
        Object.assign(this, init)
    }

    get age() {
        let today = new Date()
        let birthday = new Date(this.birthday)
        return (today.getUTCFullYear()-birthday.getUTCFullYear())
    }
    
    get BMR() {
        let sexCoef: number;
        sexCoef = (this.sex === "мужской") ? 5 : -161;
        if (this.lastWeight) return Math.round((10*this.lastWeight + 6.25*this.height - 5*this.age + sexCoef)*this.physicalActivity);
        return null;
    }

    get kkalTarget() {
        switch (this.goal) {
            case "gain":
                return Math.round(this.BMR*1.2);
            case "lose":
                return Math.round(this.BMR*0.8);
            case "maintain":
                return this.BMR;
        }
    }
    
}


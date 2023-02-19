import { atom } from "recoil";

export class Question {
    question:string;
    score:{
        [date:string]:number
    }
}

export const questionsState = atom({
    key:'QuestionsKey',
    default:[] as Question[],
    effects: [
        ()=> {
            console.log("load");
        }
    ]
});


export enum Pages {
    Questions,
    Analytics,
    Configure
}

export const pageState = atom({
    key:'PageKey',
    default:Pages.Configure
});
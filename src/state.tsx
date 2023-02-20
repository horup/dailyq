import { DateTime } from "luxon";
import { atom, DefaultValue } from "recoil";

const localStorageEffect = key => ({setSelf, onSet}) => {
    setSelf(()=>{
        let v = localStorage.getItem(key);
        if (v != null) {
            return JSON.parse(v);
        } 

        return new DefaultValue();
    });

    onSet((newValue)=>{
        localStorage.setItem(key, JSON.stringify(newValue));
    });
  };


export interface Question {
    question:string;
    score:{
        [date:string]:number
    }
}

export const questionsState = atom({
    key:'QuestionsKey',
    default:[] as Question[],
    effects: [
        localStorageEffect('questions'),
    ]
});


export enum Pages {
    Questions,
    Analytics,
    Configure
}

export const pageState = atom({
    key:'PageKey',
    default:Pages.Configure,
    effects: [
        localStorageEffect('page'),
    ]
});

export const dateKeyState = atom({
    key:'DateKeyState',
    default:toDateKey(DateTime.now()),
});

export function dateKeyToString(key:string) {
    if (key == toDateKey(DateTime.now())) {
        return 'Today';
    }

    return key;
}

export function toDateKey(dt:DateTime) {
    return dt.toSQLDate();
}
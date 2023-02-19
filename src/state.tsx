import { atom, DefaultValue } from "recoil";

const localStorageEffect = key => ({setSelf, onSet}) => {
    setSelf(()=>{
        console.log('setself');
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

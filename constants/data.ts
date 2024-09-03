import { images } from "@/assets/images";
import { qmColors } from "./Colors";

function shuffleAnswer(answer: string[]) {
  for (let i = answer.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [answer[i], answer[j]] = [answer[j], answer[i]];
  }
  return answer;
}

export interface Response {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  allAnswers?: string[];
}

export const modifyResponseFromAPI = (response: any[]) => {
  if (Array.isArray(response)) {
    const newArr = response.map((item) => {
      item.question = decodeURIComponent(item.question);
      const allAnswers = shuffleAnswer([
        item.correct_answer,
        ...item.incorrect_answers,
      ]);
      return { ...item, allAnswers };
    });
    return newArr;
  } else {
    return [];
  }
};

export const getLabel = (index: number) => {
  switch (index) {
    case 0:
      return "A";
    case 1:
      return "B";
    case 2:
      return "C";
    case 3:
      return "D";
    default:
      return '';
  }
};


export const gamer = [
  {
    image: images.user_1,
    name: 'Joe',
    amount: '5,000',
    bg_color: 'rgba(242, 242, 242, 1)'
  },
  {
    image: images.user_2,
    name: 'Sarah',
    amount: '5,000',
    bg_color: 'rgba(175, 240, 255, 1)'
  },
  {
    image: images.user_3,
    name: 'Hanax',
    amount: '5,000',
    bg_color: 'rgba(196, 251, 210, 1)'
  },
  {
    image: images.user_4,
    name: 'Inioluwa',
    amount: '5,000',
    bg_color: 'rgba(255, 203, 210, 1)'
  },
  {
    image: images.user_5,
    name: 'Liz',
    amount: '5,000',
    bg_color: 'rgba(255, 246, 197, 1)'
  },
  {
    image: images.user_5,
    name: 'Solomon',
    amount: '5,000',
    bg_color: qmColors.app_color_1
  },
]

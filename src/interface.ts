export interface quizObject {
    question: string,
    rightAnswerId: number,
    answers: answerObject[]
}

export interface quizListObject {
    id: string,
    name: string,
    quiz: quizObject
}

export interface answerObject {
    text: string;
    id: number
}

export interface option {
    value: string | number,
    text: string
}

export interface formControls {
    value: string,
    type: string,
    label: string,
    errorMessage: string,
    valid: boolean,
    touched: boolean,
    validation: formControlsValidation
}

export interface formControlsValidation {
    required?: boolean,
    email?: boolean,
    minLength?: number
}
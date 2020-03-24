import React from 'react';
import classes from './QuizCreator.module.css'
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { createControl, validateControl } from '../../Form/FormFramework';
import Select from '../../components/UI/Select/Select';
import { quizObject } from '../../interface';
import { connect } from 'react-redux';
import { createQuizQuestion, finishCreateQuiz } from '../../store/actions/quizCreate';

function createAnswerControl(answerNumber: number) {
    return createControl({
        label: `Вариант ${answerNumber}`,
        errorMessage: "Значение не может быть пустым",
        id: answerNumber
    }, {
        required: true
    })
}

function createFormControls () {
    return [            
        createControl({
            label: 'Введите вопрос',
            errorMessage: "Вопрос не может быть пустым"
        }, {
            required: true
        })
        ,
        createAnswerControl(1)
        ,
        createAnswerControl(2)
        ,            
        createAnswerControl(3)
        ,            
        createAnswerControl(4)
    ]
}

interface QuizCreatorProps {
    quiz: quizObject[],
    createQuizQuestion: (item: quizObject) => void,
    finishCreateQuiz: () => void
}

class QuizCreator extends React.Component<QuizCreatorProps> {

    state={
        rightAnswerId: 1,
        formControls: createFormControls(),
        isFormValid: false
    }

    submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    }

    addQuestionHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {     
        event.preventDefault();   
        const questionItem : quizObject = {
            question: this.state.formControls[0].value,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
            ]
        }
        for (let i = 1; i < this.state.formControls.length; i++) {
            questionItem.answers.push({
                text: this.state.formControls[i].value,
                id: i
            })
        }

        this.props.createQuizQuestion(questionItem);

        this.setState({
            rightAnswerId: 1,
            formControls: createFormControls(),
            isFormValid: false
        });
    }

    createQuizHandler = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        this.props.finishCreateQuiz();
        this.setState({
            rightAnswerId: 1,
            formControls: createFormControls(),
            isFormValid: false
        })
    }

    onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>, controlIndex: number) => {
        const formControls = [...this.state.formControls];
        const currentControl = formControls[controlIndex];
        if (currentControl.value.trim() === event.target.value.trim()) {
            return;
        }

        currentControl.value = event.target.value;
        currentControl.touched = true;
        currentControl.valid = validateControl(currentControl.value, currentControl.validation);

        let isFormValid = true;
        formControls.forEach((control) => {
            isFormValid = control.valid && isFormValid;
        });

        this.setState({
            formControls: formControls,
            isFormValid: isFormValid
        })
    }

    renderInputs = () => {
        return this.state.formControls.map((control, index) => {
            return (
                <React.Fragment key={index}>
                    <Input
                        key={index}
                        type={control.type}
                        value={control.value}
                        valid={control.valid}
                        touched={control.touched}
                        label={control.label}
                        errorMessage={control.errorMessage}
                        shoudValidate={!!control.validation}
                        onChange={event => this.onChangeHandler(event, index)}
                    />
                    {(index === 0)? <hr/> : null}
                </React.Fragment>
            )
        })
    }

    selectChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({
            rightAnswerId: +event.target.value
        })
    }

    render() {
        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Создание теста</h1>
                    <form onSubmit={(event) => this.submitHandler(event)}>
                        {this.renderInputs()}
                        <Select
                            label="Выберете правильный ответ"
                            value={this.state.rightAnswerId}
                            onChange={this.selectChangeHandler}
                            options = {[
                                {text: '1', value: 1},
                                {text: '2', value: 2},
                                {text: '3', value: 3},
                                {text: '4', value: 4}
                            ]}
                        />
                        <Button
                            type="primary"
                            onClick={(event) => this.addQuestionHandler(event)}
                            disabled={!this.state.isFormValid}
                        >
                            Добавить вопрос
                        </Button>
                        <Button
                            type="success"
                            onClick={(event) => this.createQuizHandler(event)}
                            disabled={this.props.quiz.length === 0}
                        >
                            Создать тест
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state: any) {
    return {
        quiz: state.createQuiz.quiz
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        createQuizQuestion: (item: quizObject) => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);
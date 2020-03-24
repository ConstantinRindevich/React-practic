import React from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import { match } from 'react-router-dom'
import Loader from '../../components/UI/Loader/Loader';
import { connect } from 'react-redux';
import { fetchQuizById, retryQuiz, checkAnswer } from '../../store/actions/quiz';

interface QuizProps {
    match: match<any> | null,
    activeQuizNumber: number,
    answerSuccess: null,
    isFinished: boolean,
    results: [],
    quiz: [],
    loading: boolean,
    fetchQuizById: (id: string) => void,
    retryQuiz: () => void,
    checkAnswer: (answerId: number) => void
}

class Quiz extends React.Component<QuizProps> {

    componentDidMount = async () => {
        this.props.fetchQuizById(this.props.match!.params.id)
    }

    onAnswerClickHandler = (answerId: number) => {
        this.props.checkAnswer(answerId)
    }

    onRetryHandler = () => {
        this.props.retryQuiz();
    }

    render() {
        return (
            <div className={classes['Quiz']}>
                <div style = {{width: 600}}>
                    {
                        this.props.loading
                        ?
                        <Loader />
                        :                    
                        this.props.isFinished 
                        ? 
                        <FinishedQuiz 
                            quizes={this.props.quiz}
                            results={this.props.results}
                            onRetry={this.onRetryHandler}
                        />
                        : 
                        <>
                            <h1>Ответьте на все вопросы</h1>
                            <ActiveQuiz
                                quiz={this.props.quiz[this.props.activeQuizNumber]}
                                onAnswerClick = {this.onAnswerClickHandler}
                                quizLength={this.props.quiz.length}
                                quizNumber={this.props.activeQuizNumber + 1}
                                answerSuccess={this.props.answerSuccess}
                            />
                        </>
                    
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state: any) {
    return ({
        activeQuizNumber: state.quiz.activeQuizNumber,
        answerSuccess: state.quiz.answerSuccess,
        isFinished: state.quiz.isFinished,
        results:state.quiz.results,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    })
}

function mapDispatchToProps(dispatch: any) {
    return ({
        fetchQuizById: (id: string) => dispatch(fetchQuizById(id)),
        checkAnswer: (answerId: number) => dispatch(checkAnswer(answerId)),
        retryQuiz: () => dispatch(retryQuiz())
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
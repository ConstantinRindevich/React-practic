import React from 'react';
import classes from './QuizList.module.css'
import { NavLink } from 'react-router-dom';
import Loader from '../../components/UI/Loader/Loader';
import { connect } from 'react-redux';
import { fetchQuizes } from '../../store/actions/quizList';
import { quizListObject } from '../../interface';

interface QuizListProps {
    quizes: quizListObject[],
    loading: boolean,
    fetchQuizes: () => void
}

class QuizList extends React.Component<QuizListProps> {

    renderQuizes = () => {
        const quizes: any[] = this.props.quizes;
        return quizes.map((quiz, index) => {
            return (
                <li key={index}>
                    <NavLink to={"quiz/" + quiz.id}>{quiz.name}</NavLink>
                </li>
            )
        })
    }

    async componentDidMount () {
        this.props.fetchQuizes();
    }

    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>Список Тестов</h1>
                    {this.props.loading
                     ? 
                        <Loader/>
                     : 
                        <ul>
                            {this.renderQuizes()}
                        </ul>
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state: any) {
    return {
        quizes: state.quizList.quizes,
        loading: state.quizList.loading
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        fetchQuizes: () => dispatch(fetchQuizes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import QuizCreator from '../../containers/QuizCreator/QuizCreator';
import Logout from '../../components/Logout/Logout';
import QuizList from '../../containers/QuizList/QuizList';
import Auth from '../../containers/Auth/Auth';
import { connect } from 'react-redux';
import Quiz from '../../containers/Quiz/Quiz';

interface RoutesProps {
    isAuthenticated: boolean;
}

const Routes: React.FC<RoutesProps> = (props) => {
    let routes = null;
    console.log(Logout);
    if (props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/quiz-creator' component={QuizCreator} />
          <Route path='/quiz/:id'>
            {({match}) => {
              return <Quiz match={match}/>
            }}
          </Route>
          <Route path='/logout' component={Logout}/>
          <Route exact path='/' component={QuizList} />
          <Redirect to='/'/>
        </Switch>
      )
    }
    else {
      routes = (
        <Switch>
          <Route path='/auth' exact component={Auth} />
          <Route path='/quiz/:id'>
            {({match}) => {
              return <Quiz match={match}/>
            }}
          </Route>
          <Route exact path='/' component={QuizList} />
          <Redirect to='/'/>
        </Switch>
      )
    }
    return (
        <>
            { routes }
        </>
    )
}

function mapStateToProps(state: any) {
    return {
        isAuthenticated: state.auth.token
    }
}

export default connect(mapStateToProps)(Routes);
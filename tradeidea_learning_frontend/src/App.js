import React from "react"
// import React, { Component } from "react";
// import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import PrivateRoute from "./Component/PrivateRoute"
import CourseBoard from "./Container/CourseSection/courseBoard"
import TopicSection from "./Container/CourseSection/topicSection";
import LandingPage from "./Container/LandingPage"
import LoginPage from "./Container/LoginPage"
import SignupPage from "./Container/SignupPage"
import MainPage from "./Container/Main"
import ExamPage from "./Container/ExamSection"
import ExamBoard from "./Container/ExamSection/ExamBoard"
import BlogPage from "./Container/BlogSection"
import TradeIdeaPage from "./Container/BlogSection/TradeIndex"
import LeaderBoardPage from "./Container/TradingLeaderBoard"
// import TestSection from "./TestSection"
import BlogPubPage from "./Container/BlogSection/BlogPubPage"
import ExamPubPage from "./Container/ExamSection/ExamPubPage"
import CoursePubPage from "./Container/CourseSection/CoursePubPage"
import CoursePubBoard from "./Container/CourseSection/CoursePubBoard"
import TradeIdeaPubPage from "./Container/TradingLeaderBoard/TradeIdeaPubPage"
// import CourseSection from "./Container/CourseSection"
import ProfilePage from "./Container/Profile"
import ProfileUserPage from "./Container/Profile/UserPage"
// import AuthPage from "./app/pages/auth/AuthPage"
// fake data generator


function App() {
	// return (
	// 	<Router>
	// 		<Route exact path="/" component={TestSection} />
	// 	</Router>
	// 	)
  return (
    <Router>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={SignupPage} />
        <Route exact path="/public/course" component={CoursePubPage} />
        <Route exact path="/public/course/:course" component={CoursePubBoard} />
        <Route exact path="/public/blog" component={BlogPubPage} />
        <Route exact path="/public/exam" component={ExamPubPage} />
        <Route exact path="/public/tradeidea" component={TradeIdeaPubPage} />
        <Route exact path="/public/profile/" component={ProfilePage} />
        <Route exact path="/public/profile/:userid" component={ProfileUserPage} />
        <Switch>
            <PrivateRoute exact path="/main" component={MainPage} />
            <PrivateRoute exact path="/main/:course" component={CourseBoard} />
            <PrivateRoute exact path="/main/:course/:topic" component={TopicSection} />
            <PrivateRoute exact path="/exam" component={ExamPage} />
            <PrivateRoute exact path="/exam/:course" component={ExamBoard} />
            <PrivateRoute exact path="/blog" component={BlogPage} />
            <PrivateRoute exact path="/tradeidea" component={TradeIdeaPage} />
            <PrivateRoute exact path="/leaderboard" component={LeaderBoardPage} />
        </Switch>
    </Router>
  );
  // return (
  //   <Router>
  //       <Route exact path="/" component={LandingPage} />
  //       <Route exact path="/login" component={LoginPage} />
  //       <Route exact path="/signup" component={SignupPage} />
  //           <Route exact path="/main" component={MainPage} />
  //           <Route exact path="/main/:course" component={CourseBoard} />
  //           <Route exact path="/main/:course/:topic" component={TopicSection} />
  //   </Router>
  // );
}

export default App;

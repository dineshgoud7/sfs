// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import AdminDashboard from './components/admin/admindashboard'; // Make sure the file name matches
import AddStudent from './components/admin/addStudent';
import AddFaculty from './components/admin/addFaculty';
import AddCourse from './components/admin/addCourse';
import Login from './components/login';
import Register from './components/register';
import Contact from './components/contact';
import Home from './components/home';
import FacultyDashboard from './components/faculty/facultyDashboard';
import ViewFeedback from './components/faculty/viewFeedback';
import StudentDashboard from './components/student/studentDashboard';
import GiveFeedback from './components/student/giveFeedback';
import ViewFaculty from './components/admin/ViewFaculty';
import ViewStudents from './components/admin/ViewStudents';
import ViewPreviousFeedback from './components/student/ViewPreviousFeedback'; // Import the new component
import FeedbackVisualization from './components/admin/FeedbackVisualization';
import CourseList from './components/student/CourseList'; // Import the CourseList component


import './App.css';
import DeleteFaculty from './components/admin/DeleteFaculty';
import ForgotPassword from './components/ForgotPassword';
import CourseFeedbackForm from './components/CourseFeedbackForm';
import CourseFeedbackPieChart from './components/CourseFeedbackPieChart';
import ViewCourses from './components/student/ViewCourses';
import UpdateFaculty from './components/admin/UpdateFaculty';

const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                {/* Home */}
                <Route path="/" element={<Home />} />  {/* Home Page */}
                <Route path="/login" element={<Login />} />  {/* Login Page */}
                <Route path="/register" element={<Register />} />  {/* Register Page */}
                <Route path="/contact" element={<Contact />} />  {/* Contact Page */}
                 
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/add-student" element={<AddStudent />} />
                <Route path="/admin/add-faculty" element={<AddFaculty />} />
                <Route path="/admin/delete-faculty" element={<DeleteFaculty />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/coursefeedback" element={<CourseFeedbackForm />} />
                <Route path="/viewcoursefeedback" element={<CourseFeedbackPieChart />} />
                
                <Route path="/admin/add-course" element={<AddCourse />} />
                <Route path="/admin/view-students" element={<ViewStudents />} /> {/* Use element here */}
                <Route path="/admin/view-faculty" element={<ViewFaculty />} />   {/* Use element here */}
                <Route path="/admin/feedback-visualization" element={<FeedbackVisualization />} />


                {/* Faculty Routes */}
                <Route path="/faculty" element={<FacultyDashboard />} />
                <Route path="/faculty/view-feedback" element={<ViewFeedback />} />

                {/* Student Routes */}
                <Route path="/student" element={<StudentDashboard />} />
                <Route path="/student/give-feedback" element={<GiveFeedback />} />
                <Route path="/student/view-previous-feedback" element={<ViewPreviousFeedback />} /> {/* Added ViewPreviousFeedback route */}
                <Route path="/student/courses" element={<CourseList />} /> {/* Add this route */}
                <Route path="/student/courses" element={<ViewCourses />} />
                <Route path="/admin/update-faculty/:id" element={<UpdateFaculty />} />
                
            </Routes>
        </Router>
    );
}

export default App;

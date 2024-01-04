import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Start from './components/Start';
import Login from './components/Login';
import SignUp from './components/SignUp';
import FreelancerProfile from './components/FreelancerProfile';
import EmployerProfile from './components/EmployerProfile';
import PostJob from './components/PostJob';
import ApplyProposal from './components/ApplyProposal';
import BrowseFreelancer from './components/BrowseFreelancer';
import BrowseJobs from './components/BrowseJobs';
import JobDetails from './components/JobDetails';
import PaymentByClient from './components/PaymentByClient';
import FreelancerDashboard from './components/FreelancerDashboard';
import FreelancerManagerJobs from './components/FreelancerManageJobs';
import ClientDashboard from './components/ClientDashboard';
import ClientManageJobs from './components/ClientManageJobs';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/start" element={<Start />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/freelancerprofile" element={<FreelancerProfile/>}/>
        <Route path="/employerprofile" element={<EmployerProfile/>}/>
        <Route path="/postjob" element={<PostJob/>}/>
        <Route path="/applyproposal" element={<ApplyProposal/>}/>
        <Route path="/browsefreelancer" element={<BrowseFreelancer/>}/>
        <Route path="/browsejobs" element={<BrowseJobs/>}/>
        <Route path="/jobdetails" element={<JobDetails/>}/>
        <Route path="/paymentbyclient" element={<PaymentByClient/>}/>
        <Route path="/" element={<FreelancerDashboard/>}/>
        <Route path="/managejobs/:section" element={<FreelancerManagerJobs/>}/>
        <Route path="/client" element={<ClientDashboard />} />
        <Route path="/clientmanagejobs/:section" element={<ClientManageJobs />} />
      </Routes>
    </Router>
  );
}

export default App;

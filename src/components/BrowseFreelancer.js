import React from "react";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../styles/Browsefreelancer.css';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.min.css';

const BrowseFreelancer = () => {

  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');

  const ClickBrowseFreelancer = () => {
    navigate('/browsefreelancer');
  }

  const ClickPostJobs=()=>{
    navigate('/postjob');
  }

  const handleImage2Click = () => {

  }
  const handleImage3Click = () => {

  }

  const sortByOptions = [
    { value: 'Newest', label: 'Newest' },
    { value: 'Cheapest', label: 'Cheapest' },
  ]

  const [categoryExpanded, setCategoryExpanded] = useState(true);
  const toggleCategory = () => setCategoryExpanded(!categoryExpanded);

  const [experienceExpanded, setExperienceExpanded] = useState(true);
  const toggleExperience = () => setExperienceExpanded(!experienceExpanded);

  const [jobExpanded, setJobExpanded] = useState(true);
  const toggleJob = () => setJobExpanded(!jobExpanded);

  const [locationExpanded, setLocationExpanded] = useState(true);
  const toggleLocation = () => setLocationExpanded(!locationExpanded);

  return (
    <div>
      {/* div 1 for header */}
      <div className='headerStyle' style={{ display: 'flex', alignItems: 'center' }}>
        <h2 style={{ marginLeft: '80px', marginTop: '16px' }}>Grull</h2>

        <div className='buttonContainer'>
          <button className='browse-jobs' onClick={ClickBrowseFreelancer}>Browse Freelancer &#9660;</button>
        </div>

        <div className='buttonContainer'>
          <button className='manage-jobs' onClick={ClickPostJobs}>Post Jobs &#9660;</button>
          <span className='buttonIcon'></span>
        </div>

        <div className='searchContainer'>
          <input
            type='text'
            placeholder='Search for Jobs, Projects or company'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='search-container'
          />

          {/* <button className='searchButton' onClick={() => handleSearch(searchQuery)}>
                    Search
                </button> */}
        </div>
        <div className='imageContainer' style={{ marginRight: '10px', display: 'flex', alignItems: 'center' }}>
          <img src={require('../assets/FreelancerProfileHeaderNotif.jpg')} alt="" className='notification' onClick={handleImage2Click} />
          <img src={require('../assets/FreelancerProfileHeaderProfile.jpg')} alt="" className='profile' onClick={handleImage3Click} />
        </div>
      </div>


      {/* div 2 for box and browse, search bar */}
      <div className='rectangle'></div>
      <div className='search-bar'>
        <h1 style={{ color: 'white', marginLeft: '150px', marginTop: '50px' }}>Browse</h1>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder=" Search for Freelancers"
            style={{
              marginRight: '30px', borderRadius: '10px',
              height: '32px', width: '980px', marginLeft: '150px', border: 'none',
              paddingLeft: '40px', // Adjust padding to make space for the image
              fontFamily: 'Font Awesome 5 Free',
            }}
          />
          <FontAwesomeIcon icon={faSearch} style={{
            position: 'absolute', left: '165px', top: '50%',
            transform: 'translateY(-50%)', zIndex: 1, color: '#957474',
          }} />

          <button style={{
            backgroundColor: '#B27EE3', color: 'white', border: 'none', borderRadius: '10px',
            height: '38px', width: '100px', fontSize: '15px'
          }}>Search</button>
        </div>

        <div style={{ marginLeft: '1100px', color: 'white', marginTop: '15px' }}>
          <button style={{
            border: 'none', backgroundColor: '#ED8335', color: 'white',
            cursor: 'pointer', fontSize: '15px'
          }}>   Show Advanced Options</button> </div>

        <div style={{ marginTop: '15px', marginLeft: '150px' }}>
          <a href="" className='freelancer'>Freelancer</a>
          <a href="" className='projects'>Projects</a>
        </div>

      </div>

      <div style={{ marginTop: '50px', marginLeft: '1100px' }}>
        <Form>
          <Form.Group className="mb-3 form-group" controlId="formSortByOptions">
            <span style={{ marginRight: '10px' }}>Sort by:</span>
            <Select
              placeholder=""
              options={sortByOptions}
              styles={{
                control: (provided) => ({
                  ...provided, borderRadius: '10px', width: '200px', height: '2px',
                  border: '1px solid #D9D9D9'
                }),
              }}
            />
          </Form.Group>
        </Form>
      </div>



      {/* div 3  */}
      <div style={{ marginBottom: '50px', marginTop: '10px', display: 'flex' }}>
        {/* left box  */}
        <div className='browseJobs-left-box'>
          <div className='category' style={{ marginBottom: '40px' }}>
            <h2 style={{ marginLeft: '15px', cursor: 'pointer' }} onClick={toggleCategory}>
              Category <span style={{ marginLeft: '124px' }}>{categoryExpanded ? '⮙' : '⮛'}</span>
            </h2>

            {categoryExpanded && (
              <div style={{ marginLeft: '10px' }}>
                <div style={{ position: 'relative', marginBottom: '15px' }}>
                  <input
                    type="text"
                    placeholder=" Search categories"
                    style={{
                      marginRight: '30px', borderRadius: '10px', border: '1px solid #D9D9D9',
                      height: '32px', width: '200px', marginLeft: '10px',
                      paddingLeft: '40px', // Adjust padding to make space for the image
                      fontFamily: 'Font Awesome 5 Free',
                    }}
                  />
                  <FontAwesomeIcon icon={faSearch} style={{
                    position: 'absolute', left: '20px', top: '50%',
                    transform: 'translateY(-50%)', zIndex: 1, color: '#957474',
                  }} />
                </div>

                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" />
                    Graphic Designer
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" />
                    Illustrator
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" />
                    Programmer
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" />
                    Video Editor
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" />
                    3D Artist
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" />
                    Product Designer
                  </label>
                </div>
              </div>
            )}
          </div>

          <div className='experience-level' style={{ marginBottom: '40px' }}>
            <h2 style={{ marginLeft: '15px', cursor: 'pointer' }} onClick={toggleExperience}>
              Experience Level <span style={{ marginLeft: '40px' }}>{experienceExpanded ? '⮙' : '⮛'}</span> </h2>

            {experienceExpanded && (
              <div style={{ marginLeft: '10px' }}>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" />
                    Beginner
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" />
                    Intermediate
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" />
                    Advanced
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" />
                    Expert
                  </label>
                </div>
              </div>
            )}
          </div>

          <div className='job-type' style={{ marginBottom: '40px' }}>
            <h2 style={{ marginLeft: '15px', cursor: 'pointer' }} onClick={toggleJob}>
              Job Type <span style={{ marginLeft: '125px' }}>{jobExpanded ? '⮙' : '⮛'}</span></h2>

            {jobExpanded && (
              <div>
                <div style={{ marginLeft: '10px', marginBottom: '20px' }}>
                  <label>
                    <input type="checkbox" style={{ fontSize: '20px' }} />
                    Hourly
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', marginLeft: '30px', marginBottom: '10px' }}>
                    <label style={{ marginRight: '10px' }}>
                      <input type="checkbox" />
                    </label>
                    <label style={{ marginRight: '10px' }}>
                      <input type="text" placeholder="$ min" style={{ width: '40px' }} />
                      <span style={{ color: '#808080' }}>/hr</span>
                    </label>
                    <label style={{ marginRight: '10px' }}>
                      <input type="text" placeholder="$ max" style={{ width: '40px' }} />
                      <span style={{ color: '#808080' }}>/hr</span>
                    </label>
                  </div>
                </div>
                <div style={{ marginLeft: '10px' }}>
                  <label>
                    <input type="checkbox" style={{ fontSize: '20px' }} />
                    Fixed-Price
                  </label>
                  <div style={{ marginLeft: '30px', marginTop: '15px' }}>
                    <div style={{ marginBottom: '10px', fontSize: '14px' }}>
                      <label>
                        <input type="checkbox" />
                        Less than $100
                      </label>
                    </div>
                    <div style={{ marginBottom: '10px', fontSize: '14px' }}>
                      <label>
                        <input type="checkbox" />
                        $100 to $500
                      </label>
                    </div>
                    <div style={{ marginBottom: '10px', fontSize: '14px' }}>
                      <label>
                        <input type="checkbox" />
                        $500 to $1k
                      </label>
                    </div>
                    <div style={{ marginBottom: '10px', fontSize: '14px' }}>
                      <label>
                        <input type="checkbox" />
                        $1k to $5k
                      </label>
                    </div>
                    <div style={{ marginBottom: '10px', fontSize: '14px' }}>
                      <label>
                        <input type="checkbox" />
                        $5k +
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className='location' style={{ marginBottom: '40px' }}>
            <h2 style={{ marginLeft: '15px', cursor: 'pointer' }} onClick={toggleLocation}>
              Location <span style={{ marginLeft: '125px' }}>{locationExpanded ? '⮙' : '⮛'}</span></h2>
            {locationExpanded && (
              <div style={{ marginLeft: '10px' }}>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" />
                    India
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" />
                    USA
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" />
                    Canada
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" />
                    England
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" />
                    China
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" />
                    Russia
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className='browseJobs-right-box'></div>
      </div>

    </div>
  )
}
export default BrowseFreelancer;
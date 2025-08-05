import React from 'react';
import WelComeCard from '../../components/WelcomeCard/WelComeCard';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';

const WelComePage: React.FC = () => {
    const navigate = useNavigate();

    const onGetStartedClicked = () => {
        navigate("/auth");
    }

    return(
        <>
            <div className="container-fluid py-5">
          <div className="container">
            <div className="row justify-content-center mb-5">
              <div className="col-12 col-lg-8 text-center">
                <h1 className="display-4 fw-bold mb-3">TakeRef - RMIT Citation Assistant</h1>
                <p className="lead text-muted">
                  Automatically generate perfect citations for RMIT students in multiple academic styles
                </p>
              </div>
            </div>
            <div className='text-center mb-4'>
                <button onClick={onGetStartedClicked} type="button" className="btn btn-outline-success btn-lg">Get Started</button>
            </div>
            <div className="row">
              {/* APA Style Card */}
              <WelComeCard
                title="APA Style Citations"
                description="Generate accurate APA 7th edition citations instantly. Perfect for psychology, education, and social sciences assignments at RMIT."
                icon={
                  <div className="custom-icon icon-green">
                    <i className="fas fa-graduation-cap"></i>
                  </div>
                }
              />
              
              {/* Harvard Style Card */}
              <WelComeCard
                title="Harvard Referencing"
                description="Create Harvard style references with ease. Widely used across RMIT business, humanities, and health science courses."
                icon={
                  <div className="custom-icon icon-blue">
                    <i className="fas fa-book-open"></i>
                  </div>
                }
              />
              
              {/* Chicago Style Card */}
              <WelComeCard
                title="Chicago Style"
                description="Generate Chicago Manual of Style citations for history, literature, and arts subjects. Supports both notes-bibliography and author-date systems."
                icon={
                  <div className="custom-icon icon-purple">
                    <i className="fas fa-scroll"></i>
                  </div>
                }
              />
              
              {/* MLA Style Card */}
              <WelComeCard
                title="MLA Format"
                description="Create Modern Language Association citations for English, literature, and language studies. Perfect for RMIT humanities assignments."
                icon={
                  <div className="custom-icon icon-orange">
                    <i className="fas fa-feather-alt"></i>
                  </div>
                }
              />
              
              {/* IEEE Style Card */}
              <WelComeCard
                title="IEEE Citations"
                description="Generate IEEE style references for engineering, computer science, and technology subjects. Essential for RMIT STEM students."
                icon={
                  <div className="custom-icon icon-blue">
                    <i className="fas fa-microchip"></i>
                  </div>
                }
              />
              
              {/* RMIT Guidelines Card */}
              <WelComeCard
                title="RMIT Compliance"
                description="All citations follow RMIT University's specific formatting guidelines and academic integrity standards. Stay compliant with university requirements."
                icon={
                  <div className="custom-icon icon-green">
                    <i className="fas fa-university"></i>
                  </div>
                }
              />
            </div>

            {/* Additional Features Section */}
            <div className="row mt-5">
              <div className="col-12 text-center mb-4">
                <h2 className="h3 fw-bold">Why Choose TakeRef for RMIT?</h2>
              </div>
            </div>

            <div className="row">
              {/* Auto-Detection Card */}
              <WelComeCard
                title="Smart Source Detection"
                description="Automatically detects source types (journal articles, books, websites, etc.) and formats citations accordingly. Save time on manual formatting."
                icon={
                  <div className="custom-icon icon-purple">
                    <i className="fas fa-magic"></i>
                  </div>
                }
              />
              
              {/* Bibliography Builder Card */}
              <WelComeCard
                title="Bibliography Builder"
                description="Create complete reference lists and bibliographies. Export in Word, PDF, or copy-paste directly into your RMIT assignments."
                icon={
                  <div className="custom-icon icon-orange">
                    <i className="fas fa-list-ul"></i>
                  </div>
                }
              />
              
              {/* Plagiarism Prevention Card */}
              <WelComeCard
                title="Academic Integrity"
                description="Proper citations help maintain RMIT's academic integrity standards. Avoid accidental plagiarism with accurate, consistent referencing."
                icon={
                  <div className="custom-icon icon-blue">
                    <i className="fas fa-shield-check"></i>
                  </div>
                }
              />
            </div>
          </div>
        </div>
        </>
    )
}

export default WelComePage;
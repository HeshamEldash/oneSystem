import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router'
import MobileMenu from './MobileMenu.jsx'


import './home.css'
import './style.css'


const Home = (props) => {

  const navigate = useNavigate()
  const [isOpened, setIsOpened]= useState(false)

  const handleMobileMenu = ()=>{
    setIsOpened(prev =>!prev)
  }






  return (
    <div className="home-container">
      <Helmet>
        <title>Connecting doctors and patients</title>
        <meta
          name="description"
          content="Boost your clinic's efficiency and patient satisfaction with our medical records app. Streamline communication and securely manage patient data. Try it now!"
        />
        <meta property="og:title" content="Connecting doctors and patients" />
        <meta
          property="og:description"
          content="Boost your clinic's efficiency and patient satisfaction with our medical records app. Streamline communication and securely manage patient data. Try it now!"
        />
      </Helmet>
      <section className="home-hero">
        <div className="home-menu">
          <div id="mobile-menu" className="home-mobile-navigation">
            <img
              alt="pastedImage"
              src="https://play.teleporthq.io/static/svg/placeholders/no-image.svg"
              className="home-logo"
            />
            <div className="home-links">
              <span className="Link">Solutions</span>
              <span className="Link">How it works</span>
              <span className="Link">Prices</span>
            </div>
            <div id="close-mobile-menu" className="home-close-mobile-menu">
              <svg viewBox="0 0 804.5714285714286 1024" className="home-icon">
                <path d="M741.714 755.429c0 14.286-5.714 28.571-16 38.857l-77.714 77.714c-10.286 10.286-24.571 16-38.857 16s-28.571-5.714-38.857-16l-168-168-168 168c-10.286 10.286-24.571 16-38.857 16s-28.571-5.714-38.857-16l-77.714-77.714c-10.286-10.286-16-24.571-16-38.857s5.714-28.571 16-38.857l168-168-168-168c-10.286-10.286-16-24.571-16-38.857s5.714-28.571 16-38.857l77.714-77.714c10.286-10.286 24.571-16 38.857-16s28.571 5.714 38.857 16l168 168 168-168c10.286-10.286 24.571-16 38.857-16s28.571 5.714 38.857 16l77.714 77.714c10.286 10.286 16 24.571 16 38.857s-5.714 28.571-16 38.857l-168 168 168 168c10.286 10.286 16 24.571 16 38.857z"></path>
              </svg>
            </div>
          </div>
          <div className="home-desktop-navigation">
            <nav className="home-centered">
              <div className="home-left">
                <img
                  alt="pastedImage"
                  src="/playground_assets/logon-200h.png"
                  className="home-logo1"
                  onClick={() =>navigate("/")}
                />
                <div className="home-links1">
                  <span className="Link">Solutions</span>
                  <span className="Link">How it works</span>
                  <span className="Link">Prices</span>
                </div>
              </div>
              <div className="home-right">
                <span className="home-sign-in Link"
                  onClick={()=>navigate("/login")}
                >Sign in</span>
                <div className="home-get-started">
                  <span className="home-text06"
                      onClick={()=>navigate("/register/staff")}
                  >Get started</span>
                </div>


                <div id="open-mobile-menu" className="home-burger-menu"
                  onClick={()=>handleMobileMenu()}
                >
                  <img
                    alt="pastedImage"
                    src="/playground_assets/pastedimage-yxbd.svg"
                    className="home-mobile-menu-button"
                  />
                </div>




              </div>
            </nav>
              


            {isOpened && <MobileMenu/>}
          </div>
          <div>




          </div>
        </div>
        <header className="home-header">
          <h1 className="home-text07">Connecting Doctors &amp; Patients</h1>
          <p className="home-text08">
            A medical health record system that gives both doctor and patient
            access toan easy, user friendly system that makes the healthcare
            journy safer.
          </p>
          <div className="home-get-started1">
            <span className="home-text09"
                    onClick={()=>navigate("/register/staff")}
            >Get started</span>
          </div>
        </header>
        <div className="home-dashboard-preview">
          <div className="home-outline">
            <img
              alt="pastedImage"
              src="/playground_assets/screenshot%20%5B48%5D-1400w.png"
              loading="lazy"
              className="home-image"
            />
          </div>
        </div>
      </section>
      <section className="home-features">
        <div className="home-title">
          <span className="home-text10">
            Let&apos;s simplify your clinic managment
          </span>
          <span className="home-text11">
            <span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </span>
            <span>eiusmod tempor incididunt.</span>
          </span>
        </div>
        <div className="home-cards">
          <div className="home-container1">
            <div className="card">
              <img
                alt="pastedImage"
                src="/playground_assets/pastedimage-fii6m-200h.png"
                className="home-icon02"
              />
              <span className="home-text14">Schedule</span>
              <span className="home-text15">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor
              </span>
            </div>
            <div className="home-publish card">
              <img
                alt="pastedImage"
                src="/playground_assets/pastedimage-mimg-200h.png"
                className="home-icon03"
              />
              <span className="home-text16">Record</span>
              <span className="home-text17">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sedr
              </span>
            </div>
          </div>
          <div className="home-container2">
            <div className="card home-analyze">
              <img
                alt="pastedImage"
                src="/playground_assets/pastedimage-l6p-200h.png"
                className="home-icon04"
              />
              <span className="home-text18">Analyze</span>
              <span className="home-text19">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor
              </span>
            </div>
            <div className="card">
              <img
                alt="pastedImage"
                src="/playground_assets/pastedimage-vyi5-200h.png"
                className="home-icon05"
              />
              <span className="home-text20">Prescribe</span>
              <span className="home-text21">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="home-quote-container">
        <div className="home-quote">
          <span className="home-message">
            Easily manage your clinic system 
          </span>
          <div className="home-author"></div>
        </div>
      </section>
      <section className="home-banners">
        <div className="home-banner-manage">
          <div className="home-container3">
            <div className="home-left1">
              <span className="sub-title">Content Management</span>
              <span className="home-text23 title">
                Prescribe medications safely
              </span>
              <span className="home-text24">
                The prescribing tool provide availblemedications, identifiy
                interactions with medication patient on. And list all the side
                effects
              </span>
              <div className="home-get-started2 template-button">
                <span className="home-text25"
                        onClick={()=>navigate("/register/staff")}
                >Get started</span>
              </div>
            </div>
            <div className="home-image-container">
              <img
                alt="pastedImage"
                src="/playground_assets/na_january_39-1200w.jpg"
                className="home-cards-image"
              />
            </div>
          </div>
        </div>
        <div className="home-banner-advanced-analytics">
          <div className="home-centered-container">
            <div className="home-image-container1">
              <img
                alt="pastedImage"
                src="/playground_assets/test.svg"
                className="home-cards-image1"
              />
            </div>
            <div className="home-right1">
              <span className="sub-title">
                Reporting Metrics
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
              <h2 className="home-text27 title">
                Advanced analytics, easy to understand.
              </h2>
              <div className="home-category">
                <span className="home-text28">Power reports</span>
                <span className="home-text29">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  vv
                </span>
                <span className="home-text30">Example -&gt;</span>
              </div>
            </div>
          </div>
        </div>
        <div className="home-banner">
          <div className="home-container4">
            <div className="home-left2">
              <span className="home-text31">Improve Scheduling</span>
              <h2 className="home-text32 title">
                Powerful scheduler that saves you time
              </h2>
              <span className="home-text33">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. vv
              </span>
              <div className="home-get-started3 template-button">
                <span className="home-text34"
                        onClick={()=>navigate("/register/staff")}
                >Get started</span>
              </div>
            </div>
            <div className="home-image-container2">
              <img
                alt="pastedImage"
                src="/playground_assets/calender-1200w.jpg"
                className="home-cards-image2"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="home-pricing">
        <div className="home-centered-container1">
          <div className="home-heading">
            <span className="home-text35 title">
              Pricing for all kind of businesses
            </span>
            <span className="home-text36">
              Create next-generation solutions for small business customers with
              pricing options that accommodate everyone.
            </span>
            <div className="home-selection">
              <span className="home-text37">Monthly</span>
              <span className="home-text38">Yearly</span>
            </div>
          </div>
          <div className="home-cards1">
            <div className="home-card">
              <span className="home-text39">Free Trial</span>
              <span className="home-text40">
                Try free for a month all features
              </span>
              <div className="home-get-started4 template-button">
                <span className="home-text41"
                        onClick={()=>navigate("/register/staff")}
                  >Start for free</span>
              </div>
              <span className="home-text42">What&apos;s included</span>
              <div className="home-bullet-points">
                <div className="home-point">
                  <svg
                    viewBox="0 0 877.7142857142857 1024"
                    className="home-icon06"
                  >
                    <path d="M877.714 512c0 242.286-196.571 438.857-438.857 438.857s-438.857-196.571-438.857-438.857 196.571-438.857 438.857-438.857 438.857 196.571 438.857 438.857z"></path>
                  </svg>
                  <span className="home-text43">
                    Sed ut pespiciatis unde omnis
                  </span>
                </div>
                <div className="home-point01">
                  <svg
                    viewBox="0 0 877.7142857142857 1024"
                    className="home-icon08"
                  >
                    <path d="M877.714 512c0 242.286-196.571 438.857-438.857 438.857s-438.857-196.571-438.857-438.857 196.571-438.857 438.857-438.857 438.857 196.571 438.857 438.857z"></path>
                  </svg>
                  <span className="home-text44">
                    Sed ut pespiciatis unde omnis
                  </span>
                </div>
              </div>
            </div>
            <div className="home-card1">
              <span className="home-text45">One clinic</span>
              <span className="home-text46">
                <span>Launch your lorem for $49/mo</span>
                <br></br>
                <span>lorem ipsum dolor sit amet, consectetur adipiscing.</span>
              </span>
              <div className="home-get-started5 template-button">
                <span className="home-text50">
                  <span 
                          onClick={()=>navigate("/register/staff")}
                  >Upgrade now</span>
                  <br></br>
                </span>
              </div>
              <span className="home-text53">What&apos;s included</span>
              <div className="home-bullet-points1">
                <div className="home-point02">
                  <svg
                    viewBox="0 0 877.7142857142857 1024"
                    className="home-icon10"
                  >
                    <path d="M877.714 512c0 242.286-196.571 438.857-438.857 438.857s-438.857-196.571-438.857-438.857 196.571-438.857 438.857-438.857 438.857 196.571 438.857 438.857z"></path>
                  </svg>
                  <span className="home-text54">
                    Sed ut pespiciatis unde omnis
                  </span>
                </div>
                <div className="home-point03">
                  <svg
                    viewBox="0 0 877.7142857142857 1024"
                    className="home-icon12"
                  >
                    <path d="M877.714 512c0 242.286-196.571 438.857-438.857 438.857s-438.857-196.571-438.857-438.857 196.571-438.857 438.857-438.857 438.857 196.571 438.857 438.857z"></path>
                  </svg>
                  <span className="home-text55">
                    Sed ut pespiciatis unde omnis
                  </span>
                </div>
                <div className="home-point04">
                  <svg
                    viewBox="0 0 877.7142857142857 1024"
                    className="home-icon14"
                  >
                    <path d="M877.714 512c0 242.286-196.571 438.857-438.857 438.857s-438.857-196.571-438.857-438.857 196.571-438.857 438.857-438.857 438.857 196.571 438.857 438.857z"></path>
                  </svg>
                  <span className="home-text56">
                    Sed ut pespiciatis unde omnis
                  </span>
                </div>
                <div className="home-point05">
                  <svg
                    viewBox="0 0 877.7142857142857 1024"
                    className="home-icon16"
                  >
                    <path d="M877.714 512c0 242.286-196.571 438.857-438.857 438.857s-438.857-196.571-438.857-438.857 196.571-438.857 438.857-438.857 438.857 196.571 438.857 438.857z"></path>
                  </svg>
                  <span className="home-text57">
                    Sed ut pespiciatis unde omnis
                  </span>
                </div>
              </div>
            </div>
            <div className="home-card2">
              <span className="home-text58">Poly Clinic</span>
              <span className="home-text59">
                <span>
                  Custom-built lorem ipsum dolor sit amet, consectetur
                  adipiscing elit, sed doliqua.
                </span>
                <br></br>
              </span>
              <div className="home-get-started6 template-button">
                <span className="home-text62">
                  <span
                          onClick={()=>navigate("/register/staff")}
                  >Upgrade now</span>
                  <br></br>
                </span>
              </div>
              <span className="home-text65">What&apos;s included</span>
              <div className="home-bullet-points2">
                <div className="home-point06">
                  <svg
                    viewBox="0 0 877.7142857142857 1024"
                    className="home-icon18"
                  >
                    <path d="M877.714 512c0 242.286-196.571 438.857-438.857 438.857s-438.857-196.571-438.857-438.857 196.571-438.857 438.857-438.857 438.857 196.571 438.857 438.857z"></path>
                  </svg>
                  <span className="home-text66">
                    Sed ut pespiciatis unde omnis
                  </span>
                </div>
                <div className="home-point07">
                  <svg
                    viewBox="0 0 877.7142857142857 1024"
                    className="home-icon20"
                  >
                    <path d="M877.714 512c0 242.286-196.571 438.857-438.857 438.857s-438.857-196.571-438.857-438.857 196.571-438.857 438.857-438.857 438.857 196.571 438.857 438.857z"></path>
                  </svg>
                  <span className="home-text67">
                    Sed ut pespiciatis unde omnis
                  </span>
                </div>
                <div className="home-point08">
                  <svg
                    viewBox="0 0 877.7142857142857 1024"
                    className="home-icon22"
                  >
                    <path d="M877.714 512c0 242.286-196.571 438.857-438.857 438.857s-438.857-196.571-438.857-438.857 196.571-438.857 438.857-438.857 438.857 196.571 438.857 438.857z"></path>
                  </svg>
                  <span className="home-text68">
                    Sed ut pespiciatis unde omnis
                  </span>
                </div>
                <div className="home-point09">
                  <svg
                    viewBox="0 0 877.7142857142857 1024"
                    className="home-icon24"
                  >
                    <path d="M877.714 512c0 242.286-196.571 438.857-438.857 438.857s-438.857-196.571-438.857-438.857 196.571-438.857 438.857-438.857 438.857 196.571 438.857 438.857z"></path>
                  </svg>
                  <span className="home-text69">
                    Sed ut pespiciatis unde omnis
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="home-footer">
        <div className="home-top">
          <div className="home-left3">
            <span className="home-text70">Subscribe to our newsletter</span>
            <div className="home-subscription">
              <input
                type="email"
                placeholder="Enter your email"
                className="home-textinput input"
              />
              <div className="home-subscribe">
                <span className="home-text71">Subscribe</span>
              </div>
            </div>
            <span className="home-text72">
              By subscribing to our newsletter you agree with our Terms and
              Conditions.
            </span>
            <div className="home-contact">
              <span className="home-text73">Contact</span>
              <a
                href="mailto:use@active-app.com?subject=Support"
                className="home-link"
              >
                info@el-tabeeb.com
              </a>
            </div>
          </div>
          <div className="home-right2">
            <div className="home-category1">
              <span className="home-text74">Company</span>
              <div className="home-links2">
                <span className="home-text75">About</span>
                <span className="home-text76">Team</span>
                <span className="home-text77">News</span>
                <span className="home-text78">Partners</span>
                <span className="home-text79">Careers</span>
                <span className="home-text80">Press &amp; Media</span>
              </div>
            </div>
            <div className="home-category2">
              <span className="home-text81">Solutions</span>
              <div className="home-links3">
                <span className="home-text82">One clinic</span>
                <span className="home-text83">Poly clinic</span>
                <span className="home-text84">Patient website</span>
              </div>
            </div>
          </div>
        </div>
        <div className="home-bottom">
          <img
            alt="pastedImage"
            src="/playground_assets/logon-200h.png"
            className="home-branding"
          />
          <span className="home-text85">Copyright © el-tabeeb- 2022</span>
        </div>
      </footer>
    </div>
  )
}

export default Home

import "./App.css";

function App() {
  return (
    <>
      <main className="profile-card">
        <section className="profile-info">
          <img
            src="/avataaars.svg"
            className="profile-image"
            alt="Profile Image"
          />
          <h1 className="profile-name" aria-label="Profile Name">
            Onkareshwar Prasad
          </h1>
          <p className="profile-location" aria-label="Profile Location">
            Chennai, India
          </p>
        </section>

        <p className="profile-summary">"Front-end developer and avid reader"</p>

        <section className="profile-socials">
          <ul className="profile-social-links">
            <li>
              <a
                className="profile-social-link"
                href="https://github.com/onkareshwarprasad17"
                target="_blank"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                className="profile-social-link"
                href="https://www.frontendmentor.io/profile/onkareshwarprasad17"
                target="_blank"
              >
                Frontend Mentor
              </a>
            </li>
            <li>
              <a
                className="profile-social-link"
                href="https://www.linkedin.com/in/onkareshwar-prasad/"
                target="_blank"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </section>
      </main>
    </>
  );
}

export default App;

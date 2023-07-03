function initialize() {
  const content = document.querySelector('.content');
  const profileLink = document.querySelector('#profile-link');
  const aboutLink = document.querySelector('#about-link');
  const para = document.createElement('div');
  para.innerHTML = `<p class="text"><span>Hello there, thrilled to have you here! 👋</span>
        <span>I'm currently on an exciting journey to become
          a
          frontend
          developer. My previous experiences as a Consultant have allowed me to work with a wide variety of
          technologies. It was during one of my projects that I discovered my deep affinity for creating visually
          appealing
          interfaces, which led
          me to pursue a career in web development and design.</span> <span>To learn more about my past work experience,
          feel free to
          check out
          my <a class="resume-link" href="./assets/2023-resume.pdf" target="_blank">resume</a>.</span>
          <span> I look
          forward
          to connecting with
          you!</span>
      </p>`;

  const existingProfile = content.innerHTML;
  const existingAbout = para.innerHTML;



  function handleClick(e, data, link, content) {
    content.innerHTML = data;
    aboutLink.classList.remove('active');
    profileLink.classList.remove('active');
    if (!link.classList.contains('active')) {
      link.classList.add('active');
    }
  }

  profileLink.addEventListener('click', (e) => {
    handleClick(e, existingProfile, profileLink, content);
  });

  aboutLink.addEventListener('click', (e) => {
    handleClick(e, existingAbout, aboutLink, content);
  });
}

initialize();
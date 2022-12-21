import "./about.css";
//icons attribute:
//<a href="https://www.flaticon.com/free-icons/pen" title="pen icons">Pen icons created by Freepik - Flaticon</a>
//https://www.freepik.com/?_gl=1*zrjl18*test_ga*OTc2Njg2NDA2LjE2NjM2ODg4NzY.*test_ga_523JXC6VL7*MTY2NTU3NjgzNy4yLjEuMTY2NTU3NzE2MS42MC4wLjA.*fp_ga*OTc2Njg2NDA2LjE2NjM2ODg4NzY.*fp_ga_1ZY8468CQB*MTY2NTU3NjgzNy4yLjEuMTY2NTU3NzE2MS42MC4wLjA.
//<a href="https://www.flaticon.com/free-icons/calligraphy" title="calligraphy icons">Calligraphy icons created by Freepik - Flaticon</a>
const About = () => {
  return (
    <div className="about">
      <div className="inner-container">
        <h4>About this website</h4>
        <div>
          <p>
            This is personal project and it's open source . You can view the
            source code{" "}
            <a
              href="https://github.com/dshivrin/Grid-Templates"
              title="github page"
              target="_blank"
            >
              here
            </a>
            .
          </p>
          <p>
            As for this moment this website does not uses cookies, or gathering
            any information about it's users, totally free to use. If you know
            some JavaScript you are welcome to contribute to this project.
          </p>
        </div>
        <h4>About myself</h4>
        <p>
          I'm a software developer, and during 2022 I've picked up a new hobby -
          calligraphy! I took a few online courses and at some point I realized
          that I need a specific sheet to be used with my newly acquired
          lightbox. After spending some time online I realized that most of the
          calligraphy sheets are pre-desigend and cost money. After trying to
          create a much desired sheet using MS Word, Adobe Photoshop and what
          not, I came to realize that all I need is just one Javascript loop
          away. This thought gave birth to the website you see. I'm spending my
          free time to add more features and maintain this website, so it grows
          as my journey with calligraphy continues.
        </p>
        <h4>Credits</h4>
        <p>
          This website uses icons from and amazing platform maned "Freepik" and
          hosts their work at{" "}
          <a
            href="https://www.flaticon.com/authors/freepik"
            title="flaticon.com"
            target="_blank"
          >
            flaticon.com
          </a>
          . Go check their{" "}
          <a
            href="https://www.facebook.com/Freepik"
            title="Freepik Facebook page"
            target="_blank"
          >
            Facebook page
          </a>
          , and give them the credit that they deserve.
        </p>
      </div>
    </div>
  );
};

export default About;

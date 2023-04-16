import "./index.css";

const Footer = () => {
  return (
    <div className="footer row w-100 mt-5 p-0">
      <div className="fLists col col-xxl-8 col-xl-9 col-lg-10 col-md-10 ">
        <ul>
          <li>
            <b className="fTitle">SITE</b>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Help</a>
          </li>
          <li>
            <a href="#">Contact Us</a>
          </li>
          <li>
            <a href="#">Guidelines</a>
          </li>
        </ul>
        <ul>
          <li>
            <b className="fTitle">LEGAL</b>
          </li>
          <li>
            <a href="https://www.northeastern.edu/emergency-information#_ga=2.20474808.162937863.1669921573-1244826038.1617331415">
              Emergency Information
            </a>
          </li>
          <li>
            <a href="https://www.northeastern.edu/privacy-information#_ga=2.20474808.162937863.1669921573-1244826038.1617331415">
              Privacy Information
            </a>
          </li>
          <li>
            <a href="https://policies.northeastern.edu/policy122/#_ga=2.20474808.162937863.1669921573-1244826038.1617331415">
              Digital Accessibility
            </a>
          </li>
        </ul>
        <ul>
          <li>
            <b className="fTitle">PARTNERS</b>
          </li>
          <li>
            <a href="https://www.northeastern.edu/">Northeastern University</a>
          </li>
          <li>
            <a href="https://www.khoury.northeastern.edu/">Khoury College</a>
          </li>
        </ul>
      </div>
      <hr />
      <div className="copyright">
        Copyright © 2023 TuneBox · All Rights Reserved
      </div>
    </div>
  );
};

export default Footer;

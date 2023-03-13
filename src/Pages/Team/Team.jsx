import React from "react";
import "./team.css";
import { IoIosMail } from "react-icons/io";
import { BsLinkedin } from "react-icons/bs";
import gustav from "../../Images/ProfilGul/GNormal.png";
import snaran from "../../Images/ProfilGul/SNormal.png";
import frida from "../../Images/ProfilGul/FNormal.png";
import manda from "../../Images/ProfilGul/ANormal.png";
import qvisten from "../../Images/ProfilGul/QNormal.png";
//Spexbilder
import FSpexHatt from "../../Images/ProfilGulHatt/FridaSpexHatt.png";
import GSpexHatt from "../../Images/ProfilGulHatt/GSpexHatt.png";
import MSpexHatt from "../../Images/ProfilGulHatt/MSpexHatt.png";
import SSpexHatt from "../../Images/ProfilGulHatt/SSpexHatt.png";
import QSpexHatt from "../../Images/ProfilGulHatt/QSpexHatt.png";

function Team() {
  const teamMembers = [
    {
      name: "Amanda Brundin",
      mail: "mailto:abrundin@kth.se",
      linkedin: "https://www.linkedin.com/in/amanda-brundin-bb5479177/",
      role: "Front-end Development",
      description:
        "Main tasks: ",
      image:
        manda,
      spexImage:
        MSpexHatt,
    },
    {
      name: "Gustav Axelsson",
      mail: "mailto:gustavax@kth.se",
      linkedin: "https://www.linkedin.com/in/gustav-axelsson-985970176/",
      role: "Front-end Development, Data Processing",
      description:
        "Main tasks:",
      image:
        gustav,
      spexImage:
        GSpexHatt,
    },
    {
      name: "Hanna Snarberg",
      mail: "mailto:hannasn@kth.se",
      linkedin: "https://www.linkedin.com/in/hanna-snarberg/",
      role: "Front-end Development, Data Processing",
      description:
        "Main tasks: ",
      image:
        snaran,
      spexImage:
        SSpexHatt,
    },
    {
      name: "Frida Jansson",
      mail: "mailto:frija@kth.se",
      linkedin: "https://www.linkedin.com/in/frida-jansson-8221671a2/",
      role: "UX, Front-end Development, User Testing",
      description:
        "Main tasks:",
      image:
        frida,
      spexImage:
        FSpexHatt,
    },
    {
      name: "Hanna Almqvist",
      mail: "mailto:hannaal@kth.se",
      linkedin: "https://www.linkedin.com/in/hanna-almqvist-9244921a3/",
      role: "UX, Front-end Development, User Testing",
      description:
        "Main tasks:",
      image:
        qvisten,
      spexImage:
        QSpexHatt,
    },
  ];

  function hover(img){
    img.src = teamMembers[0].spexImage;
  }

  const topMembers = teamMembers.slice(0, 3);
  const bottomMembers = teamMembers.slice(3, 5);

  return (
    <div className="teamContainer">
      <h1 className="titleTeam"> The Team </h1>{" "}
      <div className="team">
        <div className="top-members">
          {topMembers.map((member, index) => (
            <span key={index} className="team-member">
              <img
                src={member.image}
                alt={member.name}
                className="team-member-image"
                onMouseOver={e => (e.currentTarget.src = member.spexImage)}
                onMouseLeave={e => (e.currentTarget.src = member.image)}
              />
              <h3 className="team-member-name">{member.name}</h3>
              <h4 className="team-member-role">{member.role}</h4>
              <p className="team-member-description">{member.description}</p>
              <span>
                <a href={member.mail} target="_blank" rel="noreferrer">
                  <IoIosMail className="icon-mail"> </IoIosMail>
                </a>
                <a href={member.linkedin} target="_blank" rel="noreferrer">
                  <BsLinkedin className="icon-linkedin"> </BsLinkedin>
                </a>
              </span>
            </span>
          ))}
        </div>
        <div className="bottom-members">
          {bottomMembers.map((member, index) => (
            <span key={index} className="team-member">
              <img
                src={member.image}
                alt={member.name}
                className="team-member-image"
                onMouseOver={e => (e.currentTarget.src = member.spexImage)}
                onMouseLeave={e => (e.currentTarget.src = member.image)}
              />
              <h3 className="team-member-name">{member.name}</h3>
              <h4 className="team-member-role">{member.role}</h4>
              <p className="team-member-description">{member.description}</p>
              <span>
                <a href={member.mail} target="_blank" rel="noreferrer">
                  <IoIosMail className="icon-mail"> </IoIosMail>
                </a>
                <a href={member.linkedin} target="_blank" rel="noreferrer">
                  <BsLinkedin className="icon-linkedin"> </BsLinkedin>
                </a>
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Team;

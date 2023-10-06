import React, { useEffect } from 'react';
import './team.css';
import { IoIosMail } from 'react-icons/io';
import { BsLinkedin } from 'react-icons/bs';
import gustav from '../../Images/ProfilGul/GNormal.png';
import snaran from '../../Images/ProfilGul/SNormal.png';
import frida from '../../Images/ProfilGul/FNormal.png';
import manda from '../../Images/ProfilGul/ANormal.png';
import qvisten from '../../Images/ProfilGul/QNormal.png';
//Spexbilder
import FSpexHatt from '../../Images/ProfilGulHatt/FridaSpexHatt.png';
import GSpexHatt from '../../Images/ProfilGulHatt/GSpexHatt.png';
import MSpexHatt from '../../Images/ProfilGulHatt/MSpexHatt.png';
import SSpexHatt from '../../Images/ProfilGulHatt/SSpexHatt.png';
import QSpexHatt from '../../Images/ProfilGulHatt/QSpexHatt.png';
import { Fade } from 'react-reveal';

function Team() {
  const teamMembers = [
    {
      name: 'Gustav Axelsson',
      mail: 'mailto:gustavax@kth.se',
      linkedin: 'https://www.linkedin.com/in/gustav-axelsson-985970176/',
      role: 'Front-End Development | Data Processing',
      description: '',
      image: gustav,
      spexImage: GSpexHatt,
    },
    {
      name: 'Hanna Snarberg',
      mail: 'mailto:hannasn@kth.se',
      linkedin: 'https://www.linkedin.com/in/hanna-snarberg/',
      role: 'Front-End Development | Data Processing',
      description: '',
      image: snaran,
      spexImage: SSpexHatt,
    },
    {
      name: 'Frida Jansson',
      mail: 'mailto:frija@kth.se',
      linkedin: 'https://www.linkedin.com/in/frida-jansson-8221671a2/',
      role: 'UX | Front-End Development | User Testing',
      description: '',
      image: frida,
      spexImage: FSpexHatt,
    },
    {
      name: 'Hanna Almqvist',
      mail: 'mailto:hannaal@kth.se',
      linkedin: 'https://www.linkedin.com/in/hanna-almqvist-9244921a3/',
      role: 'UX | Front-End Development | User Testing',
      description: '',
      image: qvisten,
      spexImage: QSpexHatt,
    },
    {
      name: 'Amanda Brundin',
      mail: 'mailto:abrundin@kth.se',
      linkedin: 'https://www.linkedin.com/in/amanda-brundin-bb5479177/',
      role: 'Front-End Development',
      description: '',
      image: manda,
      spexImage: MSpexHatt,
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='teamContainer'>
      <Fade top delay={200} distance={'15%'} force={true}>
        <h1 className='titleTeam'> The Team </h1>
      </Fade>
      <div className='team'>
        {teamMembers.map((member, index) => (
          <span key={index} className='teamMember'>
            <Fade top delay={100 + 100 * index} distance={'15%'} force={true}>
              <img
                src={member.image}
                alt={member.name}
                className='teamMemberImage'
                onMouseOver={(e) => (e.currentTarget.src = member.spexImage)}
                onMouseLeave={(e) => (e.currentTarget.src = member.image)}
              />
              <h3 className='teamMemberName'>{member.name}</h3>
              <h4 className='teamMemberRole'>{member.role}</h4>
              <p className='teamMemberDescription'>{member.description}</p>
              <span>
                <a href={member.mail} target='_blank' rel='noreferrer'>
                  <IoIosMail className='iconMail'> </IoIosMail>
                </a>
                <a href={member.linkedin} target='_blank' rel='noreferrer'>
                  <BsLinkedin className='iconLinkedin'> </BsLinkedin>
                </a>
              </span>
            </Fade>
          </span>
        ))}
      </div>
    </div>
  );
}

export default Team;

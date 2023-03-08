import React from 'react';
import './team.css';

function Team() {
  const teamMembers = [
    {
      name: 'Amanda Brundin',
      mail: 'Email me on abrundin@kth.se or connect with me on ',
      linkedin: 'https://www.linkedin.com/in/amanda-brundin-bb5479177/',
      role: 'Front-end Development',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu orci eget lacus vestibulum commodo posuere in tortor. Phasellus pretium felis ipsum, vitae euismod erat posuere eget.',
      image:
        'https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg',
    },
    {
      name: 'Gustav Axelsson',
      mail: 'Email me on gustavax@kth.se or connect with me on ',
      linkedin: 'https://www.linkedin.com/in/gustav-axelsson-985970176/',
      role: 'Front-end Development, Data Processing',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu orci eget lacus vestibulum commodo posuere in tortor. Phasellus pretium felis ipsum, vitae euismod erat posuere eget.',
      image:
        'https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg',
    },
    {
      name: 'Hanna Snarberg',
      mail: 'Email me on hannasn@kth.se or connect with me on ',
      linkedin: 'https://www.linkedin.com/in/hanna-snarberg/',
      role: 'Front-end Development, Data Processing',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu orci eget lacus vestibulum commodo posuere in tortor. Phasellus pretium felis ipsum, vitae euismod erat posuere eget. ',
      image:
        'https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg',
    },
    {
      name: 'Frida Jansson',
      mail: 'Email me on frija@kth.se or connect with me on ',
      linkedin: 'https://www.linkedin.com/in/frida-jansson-8221671a2/',
      role: 'UX, Front-end Development, User Testing',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu orci eget lacus vestibulum commodo posuere in tortor. Phasellus pretium felis ipsum, vitae euismod erat posuere eget.',
      image:
        'https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg',
    },
    {
      name: 'Hanna Almqvist',
      mail: 'Email me on hannaal@kth.se or connect with me on ',
      linkedin: 'https://www.linkedin.com/in/hanna-almqvist-9244921a3/',
      role: 'UX, Front-end Development, User Testing',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu orci eget lacus vestibulum commodo posuere in tortor. Phasellus pretium felis ipsum, vitae euismod erat posuere eget.',
      image:
        'https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg',
    },
  ];

  const topMembers = teamMembers.slice(0, 3);
  const bottomMembers = teamMembers.slice(3, 5);

  return (
    <div className='teamContainer'>
      <h1 className='titleTeam'> The Team </h1>{' '}
      <div className='team'>
        <div className='top-members'>
          {topMembers.map((member, index) => (
            <span key={index} className='team-member'>
              <img
                src={member.image}
                alt={member.name}
                className='team-member-image'
              />
              <h3 className='team-member-name'>{member.name}</h3>
              <p className='team-member-role'>{member.role}</p>
              <p className='team-member-description'>{member.description}</p>
              <p className='team-member-description'>
                {member.mail} <a href={member.linkedin}>LinkedIn</a>
              </p>
            </span>
          ))}
        </div>
        <div className='bottom-members'>
          {bottomMembers.map((member, index) => (
            <span key={index} className='team-member'>
              <img
                src={member.image}
                alt={member.name}
                className='team-member-image'
              />
              <h3 className='team-member-name'>{member.name}</h3>
              <p className='team-member-role'>{member.role}</p>
              <p className='team-member-description'>{member.description}</p>
              <p className='team-member-description'>
                {member.mail}{' '}
                <a href={member.linkedin} target='_blank'>
                  LinkedIn
                </a>
              </p>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Team;

import Image from 'next/image';
import React from 'react';

const Team = () => {
  const coreTeam = [
    {
      name: "Arjun Patel",
      role: "President",
      image: "/person.jpeg",
      bio: "4th year Computer Science student with a passion for AI and machine learning. Previously interned at Google and Microsoft.",
      github: "#",
      linkedin: "#",
      twitter: "#",
      email: "arjun@example.com"
    },
    {
      name: "Priya Sharma",
      role: "Vice President",
      image: "/person.jpeg",
      bio: "3rd year Computer Science student specializing in web development. Lead developer for the campus events platform.",
      github: "#",
      linkedin: "#",
      twitter: "#",
      email: "priya@example.com"
    },
    {
      name: "Rahul Verma",
      role: "Technical Lead",
      image: "/person.jpeg",
      bio: "4th year Computer Science student with expertise in backend development and system architecture. ICPC regional finalist.",
      github: "#",
      linkedin: "#",
      twitter: "#",
      email: "rahul@example.com"
    },
    {
      name: "Ananya Desai",
      role: "Events Coordinator",
      image: "/person.jpeg",
      bio: "3rd year Computer Science student with a knack for event management and outreach programs.",
      github: "#",
      linkedin: "#",
      twitter: "#",
      email: "ananya@example.com"
    }
  ];

  return (
    <div>
      {coreTeam.map(({ name, role, image, bio }, index) => (
        <div key={index} className="team-member">
          {/* <Image fill src={image} alt={name} className='w-10'/> */}
          <h2>{name}</h2>
          <h3>{role}</h3>
          <p>{bio}</p>
        </div>
      ))}
    </div>
  );
};

export default Team;

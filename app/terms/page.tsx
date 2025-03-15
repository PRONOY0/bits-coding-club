"use client";
import React, { useState } from 'react';

interface Section {
  id: string;
  title: string;
  content: React.ReactNode;
}

const TermsAndConditions: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const toggleSection = (sectionId: string) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  const sections: Section[] = [
    {
      id: "our-services",
      title: "1. OUR SERVICES",
      content: (
        <div>
          <p className="mb-4">
            The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Services from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.
          </p>
          <p className="mb-4">
            The Services are not tailored to comply with industry-specific regulations (Health Insurance Portability and Accountability Act (HIPAA), Federal Information Security Management Act (FISMA), etc.), so if your interactions would be subjected to such laws, you may not use the Services. You may not use the Services in a way that would violate the Gramm-Leach-Bliley Act (GLBA).
          </p>
        </div>
      )
    },
    {
      id: "intellectual-property",
      title: "2. INTELLECTUAL PROPERTY RIGHTS",
      content: (
        <div>
          <h3 className="font-semibold mb-2">Our intellectual property</h3>
          <p className="mb-4">
            We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the &quot;Content&quot;), as well as the trademarks, service marks, and logos contained therein (the &quot;Marks&quot;).
          </p>
          <p className="mb-4">
            Our Content and Marks are protected by copyright and trademark laws (and various other intellectual property rights and unfair competition laws) and treaties in the United States and around the world.
          </p>
          <p className="mb-4">
            The Content and Marks are provided in or through the Services &quot;AS IS&quot; for your personal, non-commercial use or internal business purpose only.
          </p>
          <h3 className="font-semibold mb-2">Your use of our Services</h3>
          <p className="mb-4">
            Subject to your compliance with these Legal Terms, including the &quot;PROHIBITED ACTIVITIES&quot; section below, we grant you a non-exclusive, non-transferable, revocable license to:
          </p>
          <ul className="list-disc pl-8 mb-4">
            <li>access the Services; and</li>
            <li>download or print a copy of any portion of the Content to which you have properly gained access,</li>
          </ul>
          <p className="mb-4">
            solely for your personal, non-commercial use or internal business purpose.
          </p>
          <p className="mb-4">
            Except as set out in this section or elsewhere in our Legal Terms, no part of the Services and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.
          </p>
          <p className="mb-4">
            If you wish to make any use of the Services, Content, or Marks other than as set out in this section or elsewhere in our Legal Terms, please address your request to: codingclub@online.bits-pilani.ac.in. If we ever grant you the permission to post, reproduce, or publicly display any part of our Services or Content, you must identify us as the owners or licensors of the Services, Content, or Marks and ensure that any copyright or proprietary notice appears or is visible on posting, reproducing, or displaying our Content.
          </p>
          <p className="mb-4">
            We reserve all rights not expressly granted to you in and to the Services, Content, and Marks.
          </p>
          <p className="mb-4">
            Any breach of these Intellectual Property Rights will constitute a material breach of our Legal Terms and your right to use our Services will terminate immediately.
          </p>
          <h3 className="font-semibold mb-2">Your submissions</h3>
          <p className="mb-4">
            Please review this section and the &quot;PROHIBITED ACTIVITIES&quot; section carefully prior to using our Services to understand the (a) rights you give us and (b) obligations you have when you post or upload any content through the Services.
          </p>
          <p className="mb-4">
            Submissions: By directly sending us any question, comment, suggestion, idea, feedback, or other information about the Services (&quot;Submissions&quot;), you agree to assign to us all intellectual property rights in such Submission. You agree that we shall own this Submission and be entitled to its unrestricted use and dissemination for any lawful purpose, commercial or otherwise, without acknowledgment or compensation to you.
          </p>
          <p className="mb-4">
            You are responsible for what you post or upload: By sending us Submissions through any part of the Services you:
          </p>
          <ul className="list-disc pl-8 mb-4">
            <li>confirm that you have read and agree with our &quot;PROHIBITED ACTIVITIES&quot; and will not post, send, publish, upload, or transmit through the Services any Submission that is illegal, harassing, hateful, harmful, defamatory, obscene, bullying, abusive, discriminatory, threatening to any person or group, sexually explicit, false, inaccurate, deceitful, or misleading;</li>
            <li>to the extent permissible by applicable law, waive any and all moral rights to any such Submission;</li>
            <li>warrant that any such Submission are original to you or that you have the necessary rights and licenses to submit such Submissions and that you have full authority to grant us the above-mentioned rights in relation to your Submissions; and</li>
            <li>warrant and represent that your Submissions do not constitute confidential information.</li>
          </ul>
          <p className="mb-4">
            You are solely responsible for your Submissions and you expressly agree to reimburse us for any and all losses that we may suffer because of your breach of (a) this section, (b) any third party`&apos;s intellectual property rights, or (c) applicable law.
          </p>
        </div>
      )
    },
    {
      id: "user-representations",
      title: "3. USER REPRESENTATIONS",
      content: (
        <div>
          <p className="mb-4">
            By using the Services, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Legal Terms; (4) you are not a minor in the jurisdiction in which you reside, or if a minor, you have received parental permission to use the Services; (5) you will not access the Services through automated or non-human means, whether through a bot, script or otherwise; (6) you will not use the Services for any illegal or unauthorized purpose; and (7) your use of the Services will not violate any applicable law or regulation.
          </p>
          <p className="mb-4">
            If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the Services (or any portion thereof).
          </p>
        </div>
      )
    },
    // Adding more sections with similar pattern...
    {
      id: "user-registration",
      title: "4. USER REGISTRATION",
      content: (
        <p className="mb-4">
          You may be required to register to use the Services. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.
        </p>
      )
    },
    {
      id: "prohibited-activities",
      title: "5. PROHIBITED ACTIVITIES",
      content: (
        <div>
          <p className="mb-4">
            You may not access or use the Services for any purpose other than that for which we make the Services available. The Services may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
          </p>
          <p className="mb-4">
            As a user of the Services, you agree not to:
          </p>
          <ul className="list-disc pl-8 mb-4">
            <li>Systematically retrieve data or other content from the Services to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
            <li>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.</li>
            <li>Circumvent, disable, or otherwise interfere with security-related features of the Services, including features that prevent or restrict the use or copying of any Content or enforce limitations on the use of the Services and/or the Content contained therein.</li>
            <li>Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Services.</li>
            <li>Use any information obtained from the Services in order to harass, abuse, or harm another person.</li>
            <li>Make improper use of our support services or submit false reports of abuse or misconduct.</li>
            <li>Use the Services in a manner inconsistent with any applicable laws or regulations.</li>
            <li>Engage in unauthorized framing of or linking to the Services.</li>
            <li>Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, including excessive use of capital letters and spamming (continuous posting of repetitive text), that interferes with any party`&apos;s uninterrupted use and enjoyment of the Services or modifies, impairs, disrupts, alters, or interferes with the use, features, functions, operation, or maintenance of the Services.</li>
            <li>Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools.</li>
            <li>Delete the copyright or other proprietary rights notice from any Content.</li>
            <li>Attempt to impersonate another user or person or use the username of another user.</li>
            <li>Upload or transmit (or attempt to upload or to transmit) any material that acts as a passive or active information collection or transmission mechanism, including without limitation, clear graphics interchange formats (&quot;gifs&quot;), 1×1 pixels, web bugs, cookies, or other similar devices (sometimes referred to as &quot;spyware&quot; or &quot;passive collection mechanisms&quot; or &quot;pcms&quot;).</li>
            <li>Interfere with, disrupt, or create an undue burden on the Services or the networks or services connected to the Services.</li>
            <li>Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the Services to you.</li>
            <li>Attempt to bypass any measures of the Services designed to prevent or restrict access to the Services, or any portion of the Services.</li>
            <li>Copy or adapt the Services&lsquo; software, including but not limited to Flash, PHP, HTML, JavaScript, or other code.</li>
            <li>Except as permitted by applicable law, decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a part of the Services.</li>
            <li>Except as may be the result of standard search engine or Internet browser usage, use, launch, develop, or distribute any automated system, including without limitation, any spider, robot, cheat utility, scraper, or offline reader that accesses the Services, or use or launch any unauthorized script or other software.</li>
            <li>Use a buying agent or purchasing agent to make purchases on the Services.</li>
            <li>Make any unauthorized use of the Services, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email, or creating user accounts by automated means or under false pretenses.</li>
            <li>Use the Services as part of any effort to compete with us or otherwise use the Services and/or the Content for any revenue-generating endeavor or commercial enterprise.</li>
            <li>Use the Services to advertise or offer to sell goods and services.</li>
            <li>Sell or otherwise transfer your profile.</li>
          </ul>
        </div>
      )
    },
    // Adding remaining sections
    {
      id: "contact-us",
      title: "22. CONTACT US",
      content: (
        <div>
          <p className="mb-4">
            In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at:
          </p>
          <p className="mb-4">
            __________<br />
            BITS Pilani, Pilani Campus Vidya Vihar<br />
            Pilani, Rajasthan 333031<br />
            India<br />
            codingclub@online.bits-pilani.ac.in
          </p>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-center mb-2">TERMS AND CONDITIONS</h1>
        <p className="text-center text-gray-600 mb-6">Last updated March 15, 2025</p>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">AGREEMENT TO OUR LEGAL TERMS</h2>
          <p className="mb-4">
            We are __________ (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;), a company registered in India at BITS Pilani, Pilani Campus Vidya Vihar, Pilani, Rajasthan 333031.
          </p>
          <p className="mb-4">
            We operate the website https://bits-coding-club.vercel.app (the &quot;Site&quot;), as well as any other related products and services that refer or link to these legal terms (the &quot;Legal Terms&quot;) (collectively, the &quot;Services&quot;).
          </p>
          <p className="mb-4">
            You can contact us by email at codingclub@online.bits-pilani.ac.in or by mail to BITS Pilani, Pilani Campus Vidya Vihar, Pilani, Rajasthan 333031, India.
          </p>
          <p className="mb-4">
            These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity (&quot;you&quot;), and __________, concerning your access to and use of the Services. You agree that by accessing the Services, you have read, understood, and agreed to be bound by all of these Legal Terms. IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.
          </p>
          <p className="mb-4">
            We will provide you with prior notice of any scheduled changes to the Services you are using. The modified Legal Terms will become effective upon posting or notifying you by codingclub@online.bits-pilani.ac.in, as stated in the email message. By continuing to use the Services after the effective date of any changes, you agree to be bound by the modified terms.
          </p>
          <p className="mb-4">
            All users who are minors in the jurisdiction in which they reside (generally under the age of 18) must have the permission of, and be directly supervised by, their parent or guardian to use the Services. If you are a minor, you must have your parent or guardian read and agree to these Legal Terms prior to you using the Services.
          </p>
          <p className="mb-4">
            We recommend that you print a copy of these Legal Terms for your records.
          </p>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">TABLE OF CONTENTS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {sections.map((section) => (
              <div key={section.id} className="mb-1">
                <button 
                  onClick={() => toggleSection(section.id)}
                  className="text-blue-600 hover:text-blue-800 hover:underline text-left"
                >
                  {section.title}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {sections.map((section) => (
          <div 
            key={section.id} 
            id={section.id} 
            className={`border rounded-lg overflow-hidden transition-all duration-300 ${
              activeSection === section.id ? 'border-blue-500' : 'border-gray-200'
            }`}
          >
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full px-4 py-3 text-left font-semibold flex justify-between items-center bg-gray-50 hover:bg-gray-100"
            >
              <span>{section.title}</span>
              <span className="text-gray-600">
                {activeSection === section.id ? '−' : '+'}
              </span>
            </button>
            <div 
              className={`px-4 py-3 bg-white transition-all duration-300 ${
                activeSection === section.id ? 'block' : 'hidden'
              }`}
            >
              {section.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TermsAndConditions;
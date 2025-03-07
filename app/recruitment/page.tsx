"use client";
import { CheckCircle, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TimelineDemo } from "@/components/ui/TimeLineDemo"
import { AnimatedTestimonialsDemo } from "@/components/ui/AnimatedTestimonialDemo"
import Footer from "@/components/Footer/Footer";

export default function RecruitmentPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] bg-gradient-to-r from-[#2B2B88] to-[#5CCAE8] flex justify-center">
        <div className="absolute inset-0 bg-black/30" />
        <div className="container relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 lg:text-7xl">Join Our Coding Club</h1>
          <p className="text-xl max-w-2/4 mb-8 lg:text-2xl">
            Be part of a vibrant community of coders, innovators, and problem-solvers at BITS Pilani
          </p>
          <Button size="lg" className="bg-[#FFE275] hover:bg-[#FFC900]/90 text-[#2B2B88] font-bold transition-colors duration-300 cursor-pointer">
            Apply Now
          </Button>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-16 w-full flex justify-center">
        <div className="container px-4">
          <h2 className="text-3xl font-bold text-[#2B2B88] mb-12 text-center lg:text-5xl">Why Join Us?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:bg-[#EDFAFE]/50 hover:scale-105 hover:-translate-y-4 transition-all duration-500 cursor-default">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-[#5CCAE8]/20 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-[#2B2B88]" />
                </div>
                <CardTitle>Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Connect with like-minded peers who share your passion for coding and technology. Build lasting
                  friendships and professional networks.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:bg-[#EDFAFE]/50 hover:scale-105 hover:-translate-y-4 transition-all duration-500 cursor-default">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-[#5CCAE8]/20 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-[#2B2B88]"
                  >
                    <path d="M12 2v4" />
                    <path d="M18.4 6.6 16 9" />
                    <path d="M22 12h-4" />
                    <path d="M18.4 17.4 16 15" />
                    <path d="M12 22v-4" />
                    <path d="M5.6 17.4 8 15" />
                    <path d="M2 12h4" />
                    <path d="M5.6 6.6 8 9" />
                  </svg>
                </div>
                <CardTitle>Skill Development</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Enhance your programming skills through workshops, hackathons, and collaborative projects. Learn from
                  peers and industry experts.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:bg-[#EDFAFE]/50 hover:scale-105 hover:-translate-y-4 transition-all duration-500 cursor-default">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-[#5CCAE8]/20 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-[#2B2B88]"
                  >
                    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                  </svg>
                </div>
                <CardTitle>Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Gain access to exclusive internship opportunities, industry connections, and the chance to represent
                  BITS Pilani in national competitions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recruitment Process */}
      <TimelineDemo />

      {/* Roles & Responsibilities */}
      <section className="mt-32 w-full">
        <div className="w-full px-64 py-24 flex flex-col">
          <h2 className="text-3xl font-bold text-[#2B2B88] mb-12 text-start lg:text-6xl">Roles & Teams</h2>

          <Tabs defaultValue="technical" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8 w-fit">
              <TabsTrigger value="technical" className="cursor-pointer">Technical</TabsTrigger>
              <TabsTrigger value="events" className="cursor-pointer">Events</TabsTrigger>
              <TabsTrigger value="content" className="cursor-pointer">Content & Design</TabsTrigger>
            </TabsList>

            <TabsContent value="technical" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Development Team</CardTitle>
                  <CardDescription>Build and maintain club projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#5CCAE8] mt-0.5" />
                      <span>Develop web and mobile applications for the club and university</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#5CCAE8] mt-0.5" />
                      <span>Collaborate on open-source projects</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#5CCAE8] mt-0.5" />
                      <span>Implement and maintain the club&apos;s technical infrastructure</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">
                    Required skills: HTML, CSS, JavaScript, and any modern framework
                  </p>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Competitive Programming Team</CardTitle>
                  <CardDescription>Represent the club in coding competitions</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#5CCAE8] mt-0.5" />
                      <span>Participate in national and international coding competitions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#5CCAE8] mt-0.5" />
                      <span>Organize practice sessions and mock contests</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#5CCAE8] mt-0.5" />
                      <span>Mentor junior members in algorithmic problem-solving</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">
                    Required skills: Data Structures, Algorithms, Problem-solving
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="events" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Events Coordination Team</CardTitle>
                  <CardDescription>Plan and execute club events</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#5CCAE8] mt-0.5" />
                      <span>Organize workshops, hackathons, and coding competitions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#5CCAE8] mt-0.5" />
                      <span>Coordinate with guest speakers and industry partners</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#5CCAE8] mt-0.5" />
                      <span>Manage event logistics and participant experience</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">
                    Required skills: Communication, Organization, Time Management
                  </p>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Outreach Team</CardTitle>
                  <CardDescription>Build partnerships and manage external relations</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#5CCAE8] mt-0.5" />
                      <span>Establish partnerships with tech companies and other universities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#5CCAE8] mt-0.5" />
                      <span>Secure sponsorships for club events</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#5CCAE8] mt-0.5" />
                      <span>Represent the club at external events and conferences</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">
                    Required skills: Networking, Communication, Negotiation
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="content" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Content Creation Team</CardTitle>
                  <CardDescription>Develop educational and promotional content</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#5CCAE8] mt-0.5" />
                      <span>Create blog posts, tutorials, and technical articles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#5CCAE8] mt-0.5" />
                      <span>Develop educational resources for workshops and training</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#5CCAE8] mt-0.5" />
                      <span>Manage the club&apos;s technical documentation</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">
                    Required skills: Writing, Technical Knowledge, Attention to Detail
                  </p>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Design & Media Team</CardTitle>
                  <CardDescription>Create visual assets and manage social media</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#5CCAE8] mt-0.5" />
                      <span>Design posters, banners, and promotional materials</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#5CCAE8] mt-0.5" />
                      <span>Manage the club&apos;s social media presence</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#5CCAE8] mt-0.5" />
                      <span>Create engaging visual content for events and workshops</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">
                    Required skills: Graphic Design, Social Media Management, Creativity
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Testimonials */}
      <section className=" w-full py-16 bg-gray-50">
        <div className="w-full px-64 py-24 flex flex-col">
          <h2 className="text-3xl font-bold text-[#2B2B88] mb-12 text-start lg:text-6xl">What Our Members Say</h2>
          <AnimatedTestimonialsDemo />
        </div>
      </section>


      {/* Apply Now CTA */}
      <section className="py-16 bg-[#2B2B88] text-white w-full justify-center">
        <div className="w-full text-center">
          <h2 className="text-3xl font-bold mb-4 lg:text-5xl">Ready to Join Us?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg lg:text-xl">
            Applications for the 2023-2024 academic year are now open. Join our community of passionate coders and take
            your skills to the next level.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-[#FFE275] hover:bg-[#FFC900]/90 text-[#2B2B88] font-bold transition-colors duration-300 cursor-pointer">
              Apply Now
            </Button>

            <Button size="lg" variant="outline" className="text-white bg-transparent border-white hover:bg-white/10 hover:text-white transition-colors duration-500 cursor-pointer">
              Download Information Packet
            </Button>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 w-full justify-center">
        <div className="px-4 w-full justify-center">
          <h2 className="text-3xl font-bold text-[#2B2B88] mb-12 text-center lg:text-5xl">Frequently Asked Questions</h2>

          <div className="max-w-3xl mx-auto space-y-4">
            <Card className="hover:scale-105 hover:-translate-y-4 transition-all duration-500 cursor-default">
              <CardHeader>
                <CardTitle>Who can join the Coding Club?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  The club is open to all BITS Pilani students with an interest in coding and technology, regardless of
                  their major or year of study. We welcome members with all levels of experience, from beginners to
                  advanced programmers.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:scale-105 hover:-translate-y-4 transition-all duration-500 cursor-default">
              <CardHeader>
                <CardTitle>What is the time commitment?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  The time commitment varies depending on your role and level of involvement. Core team members
                  typically dedicate 5-8 hours per week, while general members can participate as much as their schedule
                  allows. We understand that academics come first and offer flexible engagement options.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:scale-105 hover:-translate-y-4 transition-all duration-500 cursor-default">
              <CardHeader>
                <CardTitle>Do I need prior coding experience?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  While some roles may require specific technical skills, we have opportunities for members at all
                  levels. Beginners can join our learning tracks and workshops to build their skills, while more
                  experienced coders can take on leadership roles or technical projects.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:scale-105 hover:-translate-y-4 transition-all duration-500 cursor-default">
              <CardHeader>
                <CardTitle>How can I prepare for the recruitment process?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  For technical roles, we recommend brushing up on your programming fundamentals and problem-solving
                  skills. For non-technical roles, prepare to showcase your relevant experience and enthusiasm for the
                  club&apos;s mission. All applicants should be ready to demonstrate their teamwork abilities and commitment
                  to learning.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="w-full justify-center bg-gray-50">
        <div className="w-full justify-center p-16 px-4">
          <h2 className="text-3xl font-bold text-[#2B2B88] mb-12 text-center lg:text-4xl">Still Have Questions?</h2>

          <div className="max-w-md mx-auto text-center">
            <p className="mb-6">
              If you have any questions about the recruitment process or the club in general, feel free to reach out to
              us.
            </p>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Email:</span>{" "}
                <a href="mailto:codingclub@bitspilani.ac.in" className="text-[#2B2B88] hover:underline">
                  codingclub@bitspilani.ac.in
                </a>
              </p>
              <p>
                <span className="font-medium">Instagram:</span>{" "}
                <a href="#" className="text-[#2B2B88] hover:underline">
                  @bitspilani_codingclub
                </a>
              </p>
              <p>
                <span className="font-medium">Discord:</span>{" "}
                <a href="#" className="text-[#2B2B88] hover:underline">
                  Join our server
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}


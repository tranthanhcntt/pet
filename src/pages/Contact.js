import { useState } from "react";
import { Card, CardContent } from "@/components/atoms/ui/card";
import { Input } from "@/components/atoms/ui/input";
import { Textarea } from "@/components/atoms/ui/textarea";
import { Button } from "@/components/atoms/ui/button";
import { Mail, Phone, MapPin, Briefcase, Linkedin } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
  };
  
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Contact Me</h1>
      <Card className="mb-6 p-6">
        <CardContent>
          <div className="space-y-4">
            <p className="flex items-center gap-2"><Mail size={20} /> <a href="mailto:tranthanhcntt90@gmail.com">tranthanhcntt90@gmail.com</a></p>
            <p className="flex items-center gap-2"><Phone size={20} /> <a href="tel:+84989437721">+84 989 437 721</a></p>
            <p className="flex items-center gap-2"><MapPin size={20} /> <span>Hanoi, Vietnam</span></p>
            <p className="flex items-center gap-2"><Briefcase size={20} /> <span>Senior Full-Stack Developer | ReactJs, Nest.js, Python</span></p>
            <p className="flex items-center gap-2"><Linkedin size={20} /> <a href="https://www.linkedin.com/in/thanhkimtran" target="_blank" rel="noopener noreferrer" className="text-blue-600">LinkedIn Profile</a></p>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6 p-6">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Technical Skills</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Languages:</strong> JavaScript, TypeScript, Python, PHP, NestJS</li>
            <li><strong>Frameworks/Libraries:</strong> ReactJS, Redux, VueJS, Vuex, Django, Laravel</li>
            <li><strong>Databases:</strong> PostgreSQL, MySQL, MongoDB</li>
            <li><strong>DevOps & Tools:</strong> AWS, Docker, Git, CI/CD, Jest, Cypress</li>
            <li><strong>Web Technologies:</strong> HTML5, CSS, RESTful API</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6 p-6">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Professional Experience</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold">LTHC (08/2024 – Present)</h3>
              <p>Developed and maintained healthcare solutions, collaborating with cross-functional teams to ensure operational efficiency.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold">Nudge (04/2022 – 07/2024)</h3>
              <p>Built a financial tool for students in Japan using Visa cards and nudge theory, implementing secure payment systems and analytics.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold">Vinmec (04/2020 – 12/2022)</h3>
              <p>Developed a healthcare system with Django and VueJS, optimizing performance and user experience.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold">ViewMyChain (07/2015 – 09/2017)</h3>
              <p>Worked on blockchain analysis and visualization, developing APIs and scalable solutions.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="p-6">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
            <Input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange} required />
            <Textarea name="message" placeholder="Your Message" value={form.message} onChange={handleChange} required />
            <Button type="submit" className="w-full">Send Message</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

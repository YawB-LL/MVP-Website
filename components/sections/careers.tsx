"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { 
  Users, 
  Briefcase, 
  GraduationCap, 
  Heart, 
  Zap, 
  Globe,
  ArrowRight,
  ExternalLink
} from "lucide-react"

interface JobPosition {
  id: string
  title: string
  department: string
  location: string
  type: "Full-time" | "Part-time" | "Contract" | "Internship"
  experience: string
  description: string
  requirements: string[]
  benefits: string[]
  isRemote: boolean
}

const jobPositions: JobPosition[] = [
  {
    id: "1",
    title: "Senior Full-Stack Developer",
    department: "Engineering",
    location: "Accra, Ghana",
    type: "Full-time",
    experience: "5+ years",
    description: "Lead the development of our land investment platform, working with cutting-edge technologies and a talented team.",
    requirements: [
      "Expert in React, Node.js, and TypeScript",
      "Experience with cloud platforms (AWS/Azure)",
      "Strong understanding of financial systems",
      "Leadership and mentoring skills"
    ],
    benefits: [
      "Competitive salary + equity",
      "Remote work options",
      "Health insurance",
      "Professional development budget"
    ],
    isRemote: true
  },
  {
    id: "2",
    title: "Land Investment Analyst",
    department: "Investment",
    location: "Accra, Ghana",
    type: "Full-time",
    experience: "3+ years",
    description: "Analyze land investment opportunities, conduct market research, and provide investment recommendations.",
    requirements: [
      "Degree in Finance, Economics, or related field",
      "Experience in real estate investment analysis",
      "Strong analytical and research skills",
      "Knowledge of Ghanaian real estate market"
    ],
    benefits: [
      "Competitive salary",
      "Performance bonuses",
      "Health insurance",
      "Flexible work arrangements"
    ],
    isRemote: false
  },
  {
    id: "3",
    title: "Marketing Manager",
    department: "Marketing",
    location: "Accra, Ghana",
    type: "Full-time",
    experience: "4+ years",
    description: "Develop and execute marketing strategies to grow our platform and attract investors and developers.",
    requirements: [
      "Experience in B2B marketing",
      "Digital marketing expertise",
      "Content strategy skills",
      "Team leadership experience"
    ],
    benefits: [
      "Competitive salary",
      "Marketing budget",
      "Health insurance",
      "Creative freedom"
    ],
    isRemote: true
  },
  {
    id: "4",
    title: "Legal Counsel",
    department: "Legal",
    location: "Accra, Ghana",
    type: "Full-time",
    experience: "6+ years",
    description: "Provide legal guidance on real estate transactions, regulatory compliance, and corporate matters.",
    requirements: [
      "Law degree and bar admission",
      "Experience in real estate law",
      "Regulatory compliance knowledge",
      "Strong negotiation skills"
    ],
    benefits: [
      "Competitive salary",
      "Professional development",
      "Health insurance",
      "Work-life balance"
    ],
    isRemote: false
  }
]

export function Careers() {
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null)
  const [filterDepartment, setFilterDepartment] = useState<string>("all")

  const departments = ["all", "Engineering", "Investment", "Marketing", "Legal"]
  const filteredJobs = filterDepartment === "all" 
    ? jobPositions 
    : jobPositions.filter(job => job.department === filterDepartment)

  return (
    <section className="section-padding bg-base" id="careers">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-display-2 text-text mb-6">
            Join Our Mission
          </h2>
          <p className="text-body-1 text-text-secondary max-w-3xl mx-auto">
            We're building the future of land investment in Africa. Join our team of passionate professionals 
            who are committed to transforming how people invest in and develop land.
          </p>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all duration-300">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-title-1 text-text mb-3">Passion-Driven</h3>
            <p className="text-body-2 text-text-secondary">
              We're passionate about creating opportunities and transforming communities through land development.
            </p>
          </div>

          <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all duration-300">
            <div className="w-16 h-16 bg-highlight/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-highlight" />
            </div>
            <h3 className="text-title-1 text-text mb-3">Innovation-First</h3>
            <p className="text-body-2 text-text-secondary">
              We embrace new technologies and creative solutions to solve complex challenges in land investment.
            </p>
          </div>

          <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all duration-300">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-emerald-500" />
            </div>
            <h3 className="text-title-1 text-text mb-3">Global Impact</h3>
            <p className="text-body-2 text-text-secondary">
              Our work has the potential to impact millions of people across Africa and beyond.
            </p>
          </div>
        </motion.div>

        {/* Job Listings */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-8"
        >
          <div className="text-center mb-8">
            <h3 className="text-headline-2 text-text mb-4">Open Positions</h3>
            <p className="text-body-1 text-text-secondary">
              Explore our current openings and find your perfect role
            </p>
          </div>

          {/* Department Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setFilterDepartment(dept)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  filterDepartment === dept
                    ? "bg-primary text-white"
                    : "bg-white/10 text-text hover:bg-white/20"
                }`}
              >
                {dept === "all" ? "All Departments" : dept}
              </button>
            ))}
          </div>

          {/* Jobs Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredJobs.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-primary/30 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedJob(job)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-title-1 text-text mb-2">{job.title}</h4>
                    <p className="text-body-2 text-text-secondary mb-1">{job.department}</p>
                    <div className="flex items-center gap-4 text-sm text-text-secondary">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {job.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {job.experience}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-sm text-text-secondary mb-2">
                      <span>{job.location}</span>
                      {job.isRemote && (
                        <span className="bg-primary/20 text-primary px-2 py-1 rounded-full text-xs">
                          Remote
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <p className="text-body-2 text-text-secondary mb-4 line-clamp-2">
                  {job.description}
                </p>

                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary/30 text-primary hover:bg-primary/10"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90"
                  >
                    Apply Now
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* No Jobs Message */}
          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-10 h-10 text-text-secondary" />
              </div>
              <h4 className="text-title-1 text-text mb-2">No Open Positions</h4>
              <p className="text-body-1 text-text-secondary mb-6">
                We don't have any open positions in this department right now.
              </p>
              <Button
                onClick={() => setFilterDepartment("all")}
                variant="outline"
                className="border-primary/30 text-primary hover:bg-primary/10"
              >
                View All Positions
              </Button>
            </div>
          )}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16 p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-highlight/10 border border-primary/20"
        >
          <h3 className="text-headline-2 text-text mb-4">
            Don't See Your Role?
          </h3>
          <p className="text-body-1 text-text-secondary mb-6 max-w-2xl mx-auto">
            We're always looking for talented individuals to join our team. 
            Send us your resume and let us know how you can contribute to our mission.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3"
            >
              Send Resume
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-primary/30 text-primary hover:bg-primary/10 px-8 py-3"
            >
              Contact HR
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  Download,
  Database,
  Code2,
  Zap,
  Shield,
  Users,
  ArrowRight,
  Linkedin,
  Github,
  Mail,
  Terminal,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRef } from "react";
import Link from "next/link";

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <div className="bg-zinc-950 text-zinc-50 overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Agung Denisa Bekam",
            url: "https://agungdenisa.com",
            jobTitle: "Co-Founder & CTO",
            worksFor: {
              "@type": "Organization",
              name: "AI WorkLabs",
            },
            sameAs: [
              "https://www.linkedin.com/in/agung78/",
              "https://github.com/Agung78/",
            ],
          }),
        }}
      />
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-zinc-950/70 border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <Terminal className="w-6 h-6 text-emerald-400" />
            <span className="font-mono font-bold text-xl">Agoeng Denisa</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden md:flex items-center gap-8"
          >
            <a
              href="#about"
              className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors duration-300"
            >
              About
            </a>
            <a
              href="#work"
              className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors duration-300"
            >
              Work
            </a>
            <a
              href="#stack"
              className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors duration-300"
            >
              Stack
            </a>
            <a
              href="#timeline"
              className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors duration-300"
            >
              Timeline
            </a>
            <Link href="https://drive.google.com/file/d/18SMm2Z7P9GogRb24KoHDqxXgWRPjWz-A/view?usp=sharing">
              <Button
                size="sm"
                className="bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-semibold"
              >
                <Download className="w-4 h-4 mr-2" />
                Resume
              </Button>
            </Link>
          </motion.div>
        </div>
      </nav>

      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 via-zinc-950 to-zinc-950" />

        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <motion.div
          style={{ opacity, scale }}
          className="relative z-10 max-w-6xl mx-auto px-6 text-center space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20 mb-6 px-4 py-1.5">
              <Sparkles className="w-3 h-3 mr-2" />
              Co-Founder & CTO @ AI WorkLabs
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-6xl md:text-8xl font-bold tracking-tight"
          >
            <span className="bg-gradient-to-r from-zinc-100 via-emerald-100 to-zinc-100 bg-clip-text text-transparent">
              Building Systems
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
              That Scale
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Full-Stack Engineer & Data Architect transforming legacy systems
            into modern, high-performance platforms. From Azure migrations to
            Next.js rebuilds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-semibold"
            >
              View Projects
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-zinc-700 hover:border-emerald-500/50 hover:bg-emerald-500/5"
            >
              Get in Touch
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.8,
              repeat: Infinity,
              duration: 2,
              repeatType: "reverse",
            }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <ChevronDown className="w-6 h-6 text-zinc-600" />
          </motion.div>
        </motion.div>
      </section>

      <section id="about" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <div className="space-y-6">
              <h2 className="text-5xl md:text-6xl font-bold leading-tight">
                Where Data Meets{" "}
                <span className="text-emerald-400">Design</span>
              </h2>
              <div className="space-y-4 text-lg text-zinc-400 leading-relaxed">
                <p>
                  Most engineers specialize in either backend infrastructure or
                  frontend interfaces. I bridge both worlds with equal
                  expertise.
                </p>
                <p>
                  As a Co-Founder & CTO, I architect complete solutions—from
                  secure Python APIs processing terabytes of data to
                  pixel-perfect Next.js experiences serving millions of users.
                </p>
                <p>
                  My unique background as a former professor gives me the
                  ability to translate complex technical concepts into clear
                  strategies that teams can execute.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="col-span-2"
              >
                <Card className="bg-gradient-to-br from-emerald-950/50 to-zinc-900/50 border-emerald-900/20 backdrop-blur">
                  <CardHeader>
                    <Zap className="w-8 h-8 text-emerald-400 mb-2" />
                    <CardTitle className="text-2xl">
                      Performance First
                    </CardTitle>
                    <CardDescription className="text-base text-zinc-400">
                      Optimized processing from weeks to hours through Azure
                      Databricks and PySpark
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Card className="bg-gradient-to-br from-blue-950/50 to-zinc-900/50 border-blue-900/20 backdrop-blur h-full">
                  <CardHeader>
                    <Shield className="w-8 h-8 text-blue-400 mb-2" />
                    <CardTitle>Enterprise Security</CardTitle>
                    <CardDescription className="text-zinc-400">
                      Veracode & Snyk certified approaches
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Card className="bg-gradient-to-br from-emerald-950/50 to-zinc-900/50 border-emerald-900/20 backdrop-blur h-full">
                  <CardHeader>
                    <Users className="w-8 h-8 text-emerald-400 mb-2" />
                    <CardTitle>Team Leadership</CardTitle>
                    <CardDescription className="text-zinc-400">
                      Professor-turned-engineer mentorship
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="work" className="py-32 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              Featured Work
            </h2>
            <p className="text-xl text-zinc-400">
              Architecting solutions at scale
            </p>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-zinc-900/50 border-emerald-900/20 backdrop-blur overflow-hidden group hover:border-emerald-500/40 transition-all duration-300">
                <div className="grid lg:grid-cols-2 gap-0 cursor-pointer">
                  <div className="bg-gradient-to-br from-emerald-950/30 to-zinc-950/30 p-12 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent group-hover:from-emerald-500/10 transition-all duration-300" />
                    <Code2 className="w-32 h-32 text-emerald-400/50 relative z-10" />
                  </div>
                  <div className="p-12 space-y-6">
                    <div>
                      <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 mb-4">
                        AIA Singapore
                      </Badge>
                      <h3 className="text-3xl font-bold mb-2">
                        PayEZ Fintech Re-Platform
                      </h3>
                      <p className="text-zinc-500">Next.js Migration Project</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-2">
                          <div className="w-1 h-6 bg-emerald-400 rounded" />
                          Challenge
                        </div>
                        <p className="text-zinc-400 ml-5">
                          Legacy AEM system struggling to scale with modern
                          demands
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2">
                          <div className="w-1 h-6 bg-blue-400 rounded" />
                          Solution
                        </div>
                        <p className="text-zinc-400 ml-5">
                          Complete rebuild using Next.js with Storybook
                          component library for consistency
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-2">
                          <div className="w-1 h-6 bg-emerald-400 rounded" />
                          Impact
                        </div>
                        <p className="text-zinc-400 ml-5">
                          Now powering financial operations for UOB TMRW and
                          OCBC banks
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-zinc-900/50 border-blue-900/20 backdrop-blur overflow-hidden group hover:border-blue-500/40 transition-all duration-300">
                <div className="grid lg:grid-cols-2 gap-0 cursor-pointer">
                  <div className="bg-gradient-to-br from-blue-950/30 to-zinc-950/30 p-12 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent group-hover:from-blue-500/10 transition-all duration-300" />
                    <Database className="w-32 h-32 text-blue-400/50 relative z-10" />
                  </div>
                  <div className="p-12 space-y-6">
                    <div>
                      <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 mb-4">
                        AIA Singapore
                      </Badge>
                      <h3 className="text-3xl font-bold mb-2">
                        Azure Data Migration
                      </h3>
                      <p className="text-zinc-500">
                        Enterprise Data Engineering
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-2">
                          <div className="w-1 h-6 bg-emerald-400 rounded" />
                          Challenge
                        </div>
                        <p className="text-zinc-400 ml-5">
                          PL/SQL procedures processing data over several weeks
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2">
                          <div className="w-1 h-6 bg-blue-400 rounded" />
                          Solution
                        </div>
                        <p className="text-zinc-400 ml-5">
                          Full migration to Azure Databricks leveraging PySpark
                          for distributed processing
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-2">
                          <div className="w-1 h-6 bg-emerald-400 rounded" />
                          Impact
                        </div>
                        <p className="text-zinc-400 ml-5">
                          Processing time reduced from weeks to hours—over 100x
                          improvement
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-gradient-to-br from-emerald-950/20 via-zinc-900/50 to-blue-950/20 border-emerald-900/30 backdrop-blur overflow-hidden group hover:border-emerald-500/50 transition-all duration-300">
                <div className="p-12 text-center space-y-6 cursor-pointer">
                  <Sparkles className="w-16 h-16 text-emerald-400 mx-auto" />
                  <div>
                    <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 mb-4">
                      Current Role
                    </Badge>
                    <h3 className="text-4xl font-bold mb-2">AI WorkLabs</h3>
                    <p className="text-xl text-zinc-400">
                      Co-Founder & Chief Technology Officer
                    </p>
                  </div>
                  <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
                    Leading technology strategy and driving AI innovation.
                    Building the future of intelligent workplace solutions.
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="stack" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              Technology Stack
            </h2>
            <p className="text-xl text-zinc-400">
              Full-spectrum engineering expertise
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-zinc-900/50 border-emerald-900/20 backdrop-blur p-6 h-full cursor-pointer hover:border-emerald-500/50 transition-all duration-300">
                <Code2 className="w-10 h-10 text-emerald-400 mb-4" />
                <h3 className="text-xl font-bold mb-4">Front-End</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-zinc-800 text-zinc-300"
                  >
                    React.js
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-zinc-800 text-zinc-300"
                  >
                    Next.js
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-zinc-800 text-zinc-300"
                  >
                    Storybook
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-zinc-800 text-zinc-300"
                  >
                    React Native
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-zinc-800 text-zinc-300"
                  >
                    Phaser3
                  </Badge>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-zinc-900/50 border-blue-900/20 backdrop-blur p-6 h-full cursor-pointer hover:border-blue-500/40 transition-all duration-300">
                <Database className="w-10 h-10 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold mb-4">Data Engineering</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-zinc-800 text-zinc-300"
                  >
                    Azure Databricks
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-zinc-800 text-zinc-300"
                  >
                    PySpark
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-zinc-800 text-zinc-300"
                  >
                    SparkSQL
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-zinc-800 text-zinc-300"
                  >
                    Azure Data Factory
                  </Badge>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-zinc-900/50 border-emerald-900/20 backdrop-blur p-6 h-full cursor-pointer hover:border-emerald-500/50 transition-all duration-300">
                <Terminal className="w-10 h-10 text-emerald-400 mb-4" />
                <h3 className="text-xl font-bold mb-4">Backend</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-zinc-800 text-zinc-300"
                  >
                    Python
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-zinc-800 text-zinc-300"
                  >
                    Flask
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-zinc-800 text-zinc-300"
                  >
                    Laravel
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-zinc-800 text-zinc-300"
                  >
                    Node.js
                  </Badge>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-zinc-900/50 border-blue-900/20 backdrop-blur p-6 h-full cursor-pointer hover:border-blue-500/40 transition-all duration-300">
                <Zap className="w-10 h-10 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold mb-4">Tools & DevOps</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-zinc-800 text-zinc-300"
                  >
                    Adobe Analytics
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-zinc-800 text-zinc-300"
                  >
                    Docker
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-zinc-800 text-zinc-300"
                  >
                    Git
                  </Badge>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="timeline" className="py-32 bg-zinc-900/30">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              Career Journey
            </h2>
            <p className="text-xl text-zinc-400">
              From academia to enterprise leadership
            </p>
          </motion.div>

          <div className="space-y-12 relative before:content-[''] before:absolute before:left-8 before:top-0 before:bottom-0 before:w-px before:bg-gradient-to-b before:from-emerald-500/50 before:via-blue-500/50 before:to-emerald-500/50">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative pl-20"
            >
              <div className="absolute left-5 top-0 w-6 h-6 rounded-full bg-emerald-500 border-4 border-zinc-950" />
              <div className="bg-zinc-900/50 border border-emerald-900/20 rounded-lg p-6 backdrop-blur cursor-pointer hover:border-emerald-500/50 transition-all duration-300">
                <div className="text-emerald-400 font-mono text-sm mb-2">
                  2025 — Present
                </div>
                <h3 className="text-2xl font-bold mb-1">Co-Founder & CTO</h3>
                <p className="text-zinc-400">AI WorkLabs</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative pl-20"
            >
              <div className="absolute left-5 top-0 w-6 h-6 rounded-full bg-blue-500 border-4 border-zinc-950" />
              <div className="bg-zinc-900/50 border border-blue-900/20 rounded-lg p-6 backdrop-blur cursor-pointer hover:border-blue-500/50 transition-all duration-300">
                <div className="text-blue-400 font-mono text-sm mb-2">
                  2022 — Present
                </div>
                <h3 className="text-2xl font-bold mb-1">
                  Engineer/Analyst Fullstack
                </h3>
                <p className="text-zinc-400">AIA Singapore</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative pl-20"
            >
              <div className="absolute left-5 top-0 w-6 h-6 rounded-full bg-emerald-500 border-4 border-zinc-950" />
              <div className="bg-zinc-900/50 border border-emerald-900/20 rounded-lg p-6 backdrop-blur cursor-pointer hover:border-emerald-500/50 transition-all duration-300">
                <div className="text-emerald-400 font-mono text-sm mb-2">
                  2021 — 2022
                </div>
                <h3 className="text-2xl font-bold mb-1">Data Engineer</h3>
                <p className="text-zinc-400">AIA Singapore</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative pl-20"
            >
              <div className="absolute left-5 top-0 w-6 h-6 rounded-full bg-blue-500 border-4 border-zinc-950" />
              <div className="bg-zinc-900/50 border border-blue-900/20 rounded-lg p-6 backdrop-blur cursor-pointer hover:border-blue-500/50 transition-all duration-300">
                <div className="text-blue-400 font-mono text-sm mb-2">
                  2018 — 2021
                </div>
                <h3 className="text-2xl font-bold mb-1">
                  Assistant Professor & Instructor
                </h3>
                <p className="text-zinc-400">
                  Universitas Mikroskil & Timedoor Academy
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-800/50 bg-zinc-950 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                <Terminal className="w-5 h-5 text-emerald-400" />
                <span className="font-mono font-bold">
                  Mas Agung Denisa Bekam
                </span>
              </div>
              <p className="text-sm text-zinc-500">
                Fluent in English, Indonesian, Javanese, and Hokkien
              </p>
            </div>

            <div className="flex items-center gap-6">
              <a
                href="https://www.linkedin.com/in/agung78/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-emerald-400 transition-colors duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/Agung78/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-emerald-400 transition-colors duration-300"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:agungmethodist78@gmail.com"
                className="text-zinc-400 hover:text-emerald-400 transition-colors duration-300"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-zinc-800/50 text-center text-sm text-zinc-600">
            © {new Date().getFullYear()} Mas Agung Denisa Bekam. All rights
            reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

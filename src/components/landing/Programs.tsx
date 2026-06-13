import { Code2, Layout, Server, ShieldAlert, Bug, BrainCircuit, Cpu, Database, Cloud, Workflow, TestTube, Palette, Smartphone, Boxes, Wifi, Cog, Building2, Zap, Radio, Car, Plane, FlaskConical, Leaf, GitBranch, type LucideIcon } from "lucide-react";

type Program = { name: string; desc: string; icon: LucideIcon; tag: string };

const programs: Program[] = [
  { name: "Full Stack Development", desc: "Build production-grade web apps", icon: Code2, tag: "tech" },
  { name: "Frontend Development", desc: "React, TypeScript, modern UI and styling", icon: Layout, tag: "tech" },
  { name: "Backend Development", desc: "Node, APIs, databases, scalable architecture", icon: Server, tag: "tech" },
  { name: "Cyber Security & Ethical Hacking", desc: "Defensive security, audits & compliance", icon: ShieldAlert, tag: "tech" },
  { name: "Artificial Intelligence & ML", desc: "LLMs, agents, applied AI projects", icon: BrainCircuit, tag: "tech" },
  { name: "Data Science & Analytics", desc: "Analysis, visualization, real datasets", icon: Cpu, tag: "tech" },
  { name: "Cloud Computing", desc: "AWS, GCP, Azure fundamentals & deployment", icon: Cpu, tag: "tech" },
  { name: "DevOps Engineering", desc: "CI/CD, Docker, Kubernetes, IaC", icon: Cpu, tag: "tech" },
  { name: "Software Testing (QA)", desc: "Manual + automation testing pipelines", icon: Bug, tag: "tech" },
  { name: "UI/UX Design", desc: "Figma, design systems, product UX", icon: Layout, tag: "tech" },
  { name: "Mobile App Development", desc: "React Native & Flutter apps", icon: Code2, tag: "tech" },
  { name: "Blockchain Technology", desc: "Solidity, smart contracts, dApps", icon: ShieldAlert, tag: "tech" },
  { name: "Internet of Things (IoT)", desc: "Sensors, embedded, connected systems", icon: Cpu, tag: "tech" },
  { name: "Python Programming", desc: "Core Python, scripting, and automation", icon: Code2, tag: "tech" },
  { name: "Android App Development", desc: "Native Android development with Kotlin", icon: Code2, tag: "tech" },
  { name: "Digital Marketing", desc: "SEO, SEM, social media growth hacks", icon: Layout, tag: "tech" },

  // --- BBA & MBA SPECIALIZATIONS ---
  { name: "BBA (Marketing)", desc: "Brand management, consumer behavior & sales", icon: Layout, tag: "management" },
  { name: "BBA (Finance)", desc: "Corporate finance, investments & accounting", icon: Server, tag: "management" },
  { name: "BBA (Human Resource)", desc: "Talent acquisition & organization behavior", icon: BrainCircuit, tag: "management" },
  { name: "BBA (International Business)", desc: "Global trade, logistics & export management", icon: Layout, tag: "management" },
  { name: "MBA (Marketing Management)", desc: "Advanced marketing strategy & market research", icon: Layout, tag: "management" },
  { name: "MBA (Financial Management)", desc: "Portfolio management & financial analytics", icon: Server, tag: "management" },
  { name: "MBA (Human Resource Management)", desc: "Strategic HR planning & employee relations", icon: BrainCircuit, tag: "management" },
  { name: "MBA (Data Analytics & BI)", desc: "Business intelligence & data-driven insights", icon: BrainCircuit, tag: "management" },
  { name: "MBA (Information Technology)", desc: "Managing IT infrastructure & tech products", icon: Cpu, tag: "management" },

  // --- BCA & MCA SPECIALIZATIONS ---
  { name: "BCA (Data Science)", desc: "Foundational data analysis & mathematics", icon: BrainCircuit, tag: "tech" },
  { name: "BCA (Cloud Computing)", desc: "Cloud infrastructure & server management", icon: Cpu, tag: "tech" },
  { name: "BCA (Cyber Security)", desc: "Network security & ethical hacking basics", icon: ShieldAlert, tag: "tech" },
  { name: "BCA (Web Development)", desc: "Building modern websites & web scripts", icon: Layout, tag: "tech" },
  { name: "MCA (Artificial Intelligence & ML)", desc: "Advanced neural networks & deep learning", icon: BrainCircuit, tag: "tech" },
  { name: "MCA (Cloud Computing)", desc: "Enterprise cloud architecture & DevOps", icon: Cpu, tag: "tech" },
  { name: "MCA (Data Analytics)", desc: "Big data tools, Hadoop & business analytics", icon: BrainCircuit, tag: "tech" },
  { name: "MCA (Full Stack Development)", desc: "Advanced enterprise app development", icon: Code2, tag: "tech" },

  // --- COMMERCE, SCIENCE & ARTS ---
  { name: "B.Com (Accounting & Finance)", desc: "Financial accounting & corporate laws", icon: Server, tag: "commerce" },
  { name: "B.Com (Banking & Insurance)", desc: "Banking operations & risk management", icon: ShieldAlert, tag: "commerce" },
  { name: "M.Com (Finance & Taxation)", desc: "Advanced taxation, GST & audit practices", icon: Server, tag: "commerce" },
  { name: "M.Com (Business Analytics)", desc: "Statistical data analysis for business", icon: BrainCircuit, tag: "commerce" },
  { name: "B.Sc (Computer Science)", desc: "Computer algorithms & software theory", icon: Code2, tag: "science" },
  { name: "B.Sc (Information Technology)", desc: "Database systems & network management", icon: Server, tag: "science" },
  { name: "M.Sc (Data Science)", desc: "Advanced predictive modeling & data research", icon: BrainCircuit, tag: "science" },
  { name: "BA (Bachelor of Arts)", desc: "Humanities, social sciences & communication", icon: Layout, tag: "arts" },
  { name: "MA (Master of Arts)", desc: "Advanced research in humanities & literature", icon: Layout, tag: "arts" }
];

export function Programs() {
  return (
    <section id="programs" className="relative py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">Internship Domains</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">
            Pick from <span className="text-gradient">50+ domains</span> across tech & engineering
          </h2>
          <p className="mt-4 text-muted-foreground">
            Every program includes video lessons, assignments, MCQ assessments, a final project,
            and a verified certificate.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {programs.map(({ name, desc, icon: Icon, tag }) => (
            <article
              key={name}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-1 hover:shadow-soft hover:border-brand/40"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-gradient opacity-0 blur-2xl transition group-hover:opacity-20" />
              <div className="flex items-start justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-gradient text-white shadow-soft">
                  <Icon className="h-5 w-5" />
                </span>
                {tag && (
                  <span className="rounded-full border border-brand/30 bg-brand/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand">
                    {tag}
                  </span>
                )}
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{name}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{desc}</p>
              <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                <span>15–180 days</span>
                <span className="font-semibold text-foreground">₹289</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

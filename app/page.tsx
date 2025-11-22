import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Calendar, ArrowRight, GraduationCap } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans relative isolate">
      {/* Global Background (Fixed to cover navbar at top) */}
      <div className="fixed inset-0 -z-50 h-full w-full bg-white dark:bg-slate-950">
        <div className="absolute h-full w-full bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)]"></div>
        {/* Primary Ambient Glow */}
        <div className="absolute -top-[200px] left-[10%] -z-10 h-[700px] w-[700px] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] bg-primary/20 opacity-50 blur-[120px] animate-pulse"></div>
        {/* Secondary Ambient Glow */}
        <div className="absolute -top-[100px] -right-[100px] -z-10 h-[600px] w-[600px] rounded-[30%_70%_70%_30%/30%_30%_70%_70%] bg-secondary/20 opacity-50 blur-[120px] animate-pulse delay-1000"></div>
      </div>

      {/* Navbar */}
      {/* Navbar */}
      <header className="sticky top-0 z-50 isolate bg-transparent">
        {/* Glass Backdrop */}
        <div className="absolute inset-0 -z-10 h-[200%] w-full bg-gradient-to-b from-white/40 to-transparent dark:from-slate-950/40 backdrop-blur-xl [mask-image:linear-gradient(to_bottom,black_0%_50%,transparent_50%_100%)] pointer-events-none"></div>

        {/* Glassy Edge (The "3D" Look) - Refined */}
        <div className="absolute bottom-0 left-0 right-0 h-px translate-y-full bg-white/10 dark:bg-white/5 backdrop-blur-sm pointer-events-none"></div>

        <div className="container mx-auto px-4 h-16 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-xl">
              <GraduationCap className="h-5 w-5 text-primary" />
            </div>
            <span className="font-black text-xl tracking-tighter">StudyBuddy</span>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Link href="/login">
              <Button variant="outline" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 px-4 text-center space-y-6 max-w-4xl mx-auto relative z-10">
          <div className="text-center space-y-8 max-w-4xl mx-auto relative z-10">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20 mb-4">
              New: Study Groups Feature 🚀
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-[1.1]">
              Master Your Classes <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Together
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
              Find compatible study partners, schedule focused sessions, and crush your academic goals with a community that supports you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto gap-2 text-base h-14 px-8 rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-0.5">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-base h-14 px-8 rounded-full border-2 hover:bg-muted/50">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Why StudyBuddy?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We provide the tools you need to stay organized, motivated, and connected.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Feature 1 */}
              <Card className="bg-card border-border/50 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 group">
                <CardHeader className="space-y-4">
                  <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold">Find Partners</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Match with students taking the same courses. Filter by study style, availability, and goals.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 2 */}
              <Card className="bg-card border-border/50 shadow-sm hover:shadow-xl hover:border-secondary/20 transition-all duration-300 group">
                <CardHeader className="space-y-4">
                  <div className="h-14 w-14 bg-secondary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Calendar className="h-7 w-7 text-secondary" />
                  </div>
                  <CardTitle className="text-xl font-bold">Plan Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Schedule study sessions, set agendas, and keep track of upcoming deadlines in one place.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 3 */}
              <Card className="bg-card border-border/50 shadow-sm hover:shadow-xl hover:border-amber-500/20 transition-all duration-300 group">
                <CardHeader className="space-y-4">
                  <div className="h-14 w-14 bg-amber-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="h-7 w-7 text-amber-600" />
                  </div>
                  <CardTitle className="text-xl font-bold">Share Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Collaborate on notes, share helpful links, and build a shared knowledge base for your exams.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-border/40 bg-muted/20">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} StudyBuddy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

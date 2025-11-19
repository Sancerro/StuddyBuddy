import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Calendar, ArrowRight, GraduationCap } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
      {/* Navbar */}
      <header className="border-b border-border/40 sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl tracking-tight">StudyBuddy</span>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Link href="/login">
              <Button variant="ghost" size="sm">
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
        <section className="py-20 md:py-32 px-4 text-center space-y-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
            Master Your Classes <br className="hidden md:block" />
            <span className="text-primary">Together</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Find compatible study partners, schedule focused sessions, and crush your academic goals with a community that supports you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto gap-2 text-base h-12 px-8">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-base h-12 px-8">
                Learn More
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Why StudyBuddy?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We provide the tools you need to stay organized, motivated, and connected.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Feature 1 */}
              <Card className="bg-card border-border shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="space-y-2">
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Find Partners</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Match with students taking the same courses. Filter by study style, availability, and goals.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 2 */}
              <Card className="bg-card border-border shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="space-y-2">
                  <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                    <Calendar className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle className="text-xl">Plan Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Schedule study sessions, set agendas, and keep track of upcoming deadlines in one place.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 3 */}
              <Card className="bg-card border-border shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="space-y-2">
                  <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center mb-2">
                    <BookOpen className="h-6 w-6 text-amber-600" />
                  </div>
                  <CardTitle className="text-xl">Share Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Collaborate on notes, share helpful links, and build a shared knowledge base for your exams.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-border bg-background">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} StudyBuddy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

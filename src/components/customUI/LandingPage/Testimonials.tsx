import { Card, CardContent } from "@/components/ui/card";

export default function Testimonials() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Trusted by Teams and Individuals Worldwide
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <TestimonialCard
            quote="TaskMaster has revolutionized how I manage my time. I'm more productive than ever!"
            author="Jane Doe, Freelance Designer"
          />
          <TestimonialCard
            quote="The weekly analysis feature has given our team invaluable insights into our workflow."
            author="John Smith, Project Manager"
          />
          <TestimonialCard
            quote="I've finally been able to build consistent habits thanks to TaskMaster's integrated habit tracker."
            author="Emily Johnson, Entrepreneur"
          />
        </div>
        <div className="text-center mb-12">
          <p className="text-2xl font-semibold mb-4">Over 1M tasks tracked</p>
          <p className="text-lg text-muted-foreground">
            Users report a 25% increase in productivity
          </p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {["Company1", "Company2", "Company3", "Company4", "Company5"].map(
            (company) => (
              <img
                key={company}
                src="https://miro.medium.com/v2/resize:fit:636/1*Z14pvsjLwMRE0KV2HhU_LA.png"
                alt={`${company} logo`}
                width={120}
                height={60}
                className="opacity-50 hover:opacity-100 transition-opacity duration-200"
              />
            )
          )}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ quote, author }) {
  return (
    <Card>
      <CardContent className="p-6">
        <blockquote className="text-lg mb-4">&ldquo;{quote}&rdquo;</blockquote>
        <p className="font-semibold">{author}</p>
      </CardContent>
    </Card>
  );
}

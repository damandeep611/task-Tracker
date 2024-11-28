import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Have Questions? We've Got Answers.
        </h2>
        <Accordion type="single" collapsible className="max-w-2xl mx-auto">
          <AccordionItem value="item-1">
            <AccordionTrigger>How secure is my data?</AccordionTrigger>
            <AccordionContent>
              We take data privacy and security seriously. All your data is
              encrypted and stored securely. We never share your personal
              information with third parties.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              Can I access TaskMaster on multiple devices?
            </AccordionTrigger>
            <AccordionContent>
              Yes! TaskMaster syncs across all your devices. You can access your
              tasks, habits, and analytics on web, iOS, and Android platforms.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              What's the difference between free and premium features?
            </AccordionTrigger>
            <AccordionContent>
              The free plan includes basic task management and time tracking.
              Premium users get access to advanced analytics, the habit tracker,
              integrations with other tools, and priority support.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              Is there a limit to how many tasks I can create?
            </AccordionTrigger>
            <AccordionContent>
              No, there's no limit to the number of tasks you can create in
              TaskMaster, regardless of your plan.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}

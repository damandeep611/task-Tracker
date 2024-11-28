import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";

export default function DemoSection() {
  const [activeTab, setActiveTab] = useState("interactive");

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          See How It Works
        </h2>
        <Tabs defaultValue="interactive" className="max-w-3xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="interactive">Interactive Demo</TabsTrigger>
            <TabsTrigger value="video">Video Walkthrough</TabsTrigger>
          </TabsList>
          <TabsContent value="interactive">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">
                Try TaskMaster Features
              </h3>
              <div className="space-y-4">
                <Button onClick={() => alert("Starting task timer...")}>
                  Start Task Timer
                </Button>
                <Button onClick={() => alert("Viewing weekly analysis...")}>
                  View Weekly Analysis
                </Button>
                <Button onClick={() => alert("Creating new habit...")}>
                  Create New Habit
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="video">
            <div className="aspect-video">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-1AXxuY91HEj1BD_WhrVsI3g1altwpT1Hnw&s"
                alt="Video Walkthrough"
                width={1280}
                height={720}
                className="rounded-lg shadow-md"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

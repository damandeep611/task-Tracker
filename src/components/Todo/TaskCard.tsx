import { Clock, Trash } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";

export default function TaskCard({id, text, createdAt}){
  return(
    <div className="flex items-center justify-between bg-gray-100 p-2 rounded">
      <div>
        <Checkbox className="mr-2"/>
        <div>
          <span className="font-semibold">
            {/* task prop */}
          </span>
          {/* timestamp on each task */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="h-3 w-3"/>
            {/* task created at prop */}
          </div>
        </div>
      </div>
      <Button>
        <Trash className="w-4 h-4"/>
      </Button>
    </div>
  )
}
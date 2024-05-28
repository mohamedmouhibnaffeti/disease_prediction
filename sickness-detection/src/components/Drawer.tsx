import * as React from "react"
import { MinusIcon, PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import Carousel from "./Carousel"
const DATA = [{ image: "https://picsum.photos/seed/random101/500/500" },
 { image: "https://picsum.photos/seed/random102/500/500" }, 
 { image: "https://picsum.photos/seed/random103/500/500" }]
const data = [
  // Data array remains unchanged
]
interface MyComponentProps {
    triggerButton: React.ReactNode;  // Accepts any valid JSX element or TypeScript expression
  }
  
const DrawerComponent: React.FC<MyComponentProps> = ({ triggerButton }) => {
  const [goal, setGoal] = React.useState(350)

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)))
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        {triggerButton}
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="text-center">ID Images</DrawerTitle>
            <DrawerDescription className="text-center">A list of identity images corresponding to the selected doctor.</DrawerDescription>
          </DrawerHeader>
            <Carousel data={DATA} />
          <DrawerFooter>
            <Button>Accept</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default DrawerComponent

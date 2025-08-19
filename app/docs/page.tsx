"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from "@/components/ui/context-menu"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from "@/components/ui/menubar"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Calendar } from "@/components/ui/calendar"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useToast } from "@/components/ui/use-toast"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
import { CalendarIcon, Check, ChevronDown, Info, AlertTriangle, CheckCircle, Bold, Italic, Underline, DollarSign, Users, CreditCard, Activity, Mail, MapPin, FileText, Video, Image, X, Share, Menu, Lock, Quote, Heart } from "lucide-react"
import { format } from "date-fns"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Search,
  Copy,
  Check as CheckIcon,
  ChevronRight,
  Home,
  Book,
  Zap,
  Palette,
  Shield,
  Smartphone,
  Settings,
  Star,
  Upload,
  Sun,
  Moon,
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState("getting-started")
  const [date, setDate] = useState<Date>()
  const [progress, setProgress] = useState(13)
  const [sliderValue, setSliderValue] = useState([50])
  const [switchChecked, setSwitchChecked] = useState(false)
  const [checkboxChecked, setCheckboxChecked] = useState<boolean | "indeterminate">(false)
  const [radioValue, setRadioValue] = useState("option-one")
  const [value, setValue] = useState("")
  const { toast } = useToast()

  const frameworks = [
    {
      value: "next.js",
      label: "Next.js",
    },
    {
      value: "sveltekit",
      label: "SvelteKit",
    },
    {
      value: "nuxt.js",
      label: "Nuxt.js",
    },
    {
      value: "remix",
      label: "Remix",
    },
    {
      value: "astro",
      label: "Astro",
    },
  ]

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const sidebarItems = [
    { id: "getting-started", title: "Getting Started", icon: Home },
    { id: "installation", title: "Installation", icon: Book },
    { id: "components", title: "Components", icon: Zap },
    { id: "create-component", title: "Create Component", icon: Settings },
    { id: "theming", title: "Theming", icon: Palette },
    { id: "accessibility", title: "Accessibility", icon: Shield },
    { id: "responsive", title: "Responsive Design", icon: Smartphone },
  ]

  const components = [
    {
      name: "Button",
      description: "Customizable button component with multiple variants",
      code: `<Button variant="default">Click me</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="link">Link</Button>`,
      preview: (
        <div className="flex gap-2 flex-wrap">
          <Button variant="default">Click me</Button>
          <Button variant="destructive">Delete</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="link">Link</Button>
        </div>
      ),
    },
    {
      name: "Card",
      description: "Flexible card component for displaying content",
      code: `<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here.</p>
  </CardContent>
</Card>`,
      preview: (
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card content goes here.</p>
          </CardContent>
        </Card>
      ),
    },
    {
      name: "Badge",
      description: "Small status indicators and labels",
      code: `<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>`,
      preview: (
        <div className="flex gap-2 flex-wrap">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      ),
    },
    {
      name: "Input",
      description: "Form input component with various states",
      code: `<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input type="email" id="email" placeholder="Enter your email" />
</div>`,
      preview: (
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Enter your email" />
        </div>
      ),
    },
    {
      name: "Select",
      description: "Dropdown select component with search",
      code: `<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="orange">Orange</SelectItem>
  </SelectContent>
</Select>`,
      preview: (
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="orange">Orange</SelectItem>
          </SelectContent>
        </Select>
      ),
    },
    {
      name: "Tabs",
      description: "Tabbed interface component",
      code: `<Tabs defaultValue="account" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account settings</TabsContent>
  <TabsContent value="password">Password settings</TabsContent>
</Tabs>`,
      preview: (
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">Account settings</TabsContent>
          <TabsContent value="password">Password settings</TabsContent>
        </Tabs>
      ),
    },
    {
      name: "Progress",
      description: "Progress indicator component",
      code: `<div className="w-full">
  <Progress value={progress} className="w-full" />
</div>`,
      preview: (
        <div className="w-full">
          <Progress value={progress} className="w-full" />
        </div>
      ),
    },

    {
      name: "Alert",
      description: "Alert component for notifications",
      code: `<Alert>
  <Info className="h-4 w-4" />
  <AlertDescription>
    This is an informational alert.
  </AlertDescription>
</Alert>`,
      preview: (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            This is an informational alert.
          </AlertDescription>
        </Alert>
      ),
    },
    {
      name: "Accordion",
      description: "Collapsible content sections",
      code: `<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
      preview: (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ),
    },
    {
      name: "Avatar",
      description: "User avatar component",
      code: `<Avatar>
  <AvatarImage src="/placeholder-user.jpg" alt="@user" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>`,
      preview: (
        <Avatar>
          <AvatarImage src="/placeholder-user.jpg" alt="@user" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      ),
    },
    {
      name: "Checkbox",
      description: "Checkbox input component",
      code: `<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>`,
      preview: (
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" checked={checkboxChecked} onCheckedChange={setCheckboxChecked} />
          <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>
      ),
    },
    {
      name: "Radio Group",
      description: "Radio button group component",
      code: `<RadioGroup value={radioValue} onValueChange={setRadioValue}>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-one" id="option-one" />
    <Label htmlFor="option-one">Option One</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-two" id="option-two" />
    <Label htmlFor="option-two">Option Two</Label>
  </div>
</RadioGroup>`,
      preview: (
        <RadioGroup value={radioValue} onValueChange={setRadioValue}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="option-one" />
            <Label htmlFor="option-one">Option One</Label>
</div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="option-two" />
            <Label htmlFor="option-two">Option Two</Label>
</div>
        </RadioGroup>
      ),
    },
    {
      name: "Slider",
      description: "Range slider component",
      code: `<Slider
  value={sliderValue}
  onValueChange={setSliderValue}
  max={100}
  step={1}
  className="w-full"
/>`,
      preview: (
        <Slider
          value={sliderValue}
          onValueChange={setSliderValue}
          max={100}
          step={1}
          className="w-full"
        />
      ),
    },
    {
      name: "Textarea",
      description: "Multi-line text input",
      code: `<div className="grid w-full gap-1.5">
  <Label htmlFor="message">Message</Label>
  <Textarea placeholder="Type your message here." />
</div>`,
      preview: (
        <div className="grid w-full gap-1.5">
          <Label htmlFor="message">Message</Label>
          <Textarea placeholder="Type your message here." />
</div>
      ),
    },
    {
      name: "Tooltip",
      description: "Hover tooltip component",
      code: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Tooltip content</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`,
      preview: (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Tooltip content</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
    },
    {
      name: "Dialog",
      description: "Modal dialog component",
      code: `<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>
        Dialog description
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>`,
      preview: (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog Title</DialogTitle>
              <DialogDescription>
                Dialog description
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ),
    },
    {
      name: "Calendar",
      description: "Date picker calendar component",
      code: `<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">
      <CalendarIcon className="mr-2 h-4 w-4" />
      Pick a date
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-auto p-0">
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      initialFocus
    />
  </PopoverContent>
</Popover>`,
      preview: (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Pick a date
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      ),
    },
    {
      name: "Sheet",
      description: "Slide-out panel component",
      code: `<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Open Sheet</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Sheet Title</SheetTitle>
      <SheetDescription>
        Sheet description goes here.
      </SheetDescription>
    </SheetHeader>
    <div className="py-4">
      <p>Sheet content goes here.</p>
</div>
  </SheetContent>
</Sheet>`,
      preview: (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open Sheet</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Sheet Title</SheetTitle>
              <SheetDescription>
                Sheet description goes here.
              </SheetDescription>
            </SheetHeader>
            <div className="py-4">
              <p>Sheet content goes here.</p>
</div>
          </SheetContent>
        </Sheet>
      ),
    },
    {
      name: "Separator",
      description: "Visual divider component",
      code: `<div className="space-y-4">
  <div>Content above</div>
  <Separator />
  <div>Content below</div>
</div>`,
      preview: (
        <div className="space-y-4 w-full">
          <div>Content above</div>
          <Separator />
          <div>Content below</div>
</div>
      ),
    },
    {
      name: "Drawer",
      description: "Bottom drawer component for mobile",
      code: `<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outline">Open Drawer</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Drawer Title</DrawerTitle>
      <DrawerDescription>
        Drawer description goes here.
      </DrawerDescription>
    </DrawerHeader>
    <div className="p-4">
      <p>Drawer content goes here.</p>
</div>
  </DrawerContent>
</Drawer>`,
      preview: (
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">Open Drawer</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Drawer Title</DrawerTitle>
              <DrawerDescription>
                Drawer description goes here.
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4">
              <p>Drawer content goes here.</p>
</div>
          </DrawerContent>
        </Drawer>
      ),
    },
    {
      name: "Hover Card",
      description: "Hover-triggered card component",
      code: `<HoverCard>
  <HoverCardTrigger asChild>
    <Button variant="link">@username</Button>
  </HoverCardTrigger>
  <HoverCardContent className="w-80">
    <div className="flex justify-between space-x-4">
      <Avatar>
        <AvatarImage src="/placeholder-user.jpg" />
        <AvatarFallback>VC</AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <h4 className="text-sm font-semibold">@username</h4>
        <p className="text-sm">User description</p>
</div>
</div>
  </HoverCardContent>
</HoverCard>`,
      preview: (
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link">@username</Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-between space-x-4">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>VC</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">@username</h4>
                <p className="text-sm">User description</p>
</div>
</div>
          </HoverCardContent>
        </HoverCard>
      ),
    },
    {
      name: "Command",
      description: "Command palette component",
      code: `<Command>
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Calendar</CommandItem>
      <CommandItem>Search</CommandItem>
      <CommandItem>Settings</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`,
      preview: (
        <Command className="rounded-lg border shadow-md">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>Calendar</CommandItem>
              <CommandItem>Search</CommandItem>
              <CommandItem>Settings</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      ),
    },
    {
      name: "Context Menu",
      description: "Right-click context menu",
      code: `<ContextMenu>
  <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
    Right click here
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Back</ContextMenuItem>
    <ContextMenuItem>Forward</ContextMenuItem>
    <ContextMenuItem>Reload</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem>Save as...</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`,
      preview: (
        <ContextMenu>
          <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
            Right click here
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Back</ContextMenuItem>
            <ContextMenuItem>Forward</ContextMenuItem>
            <ContextMenuItem>Reload</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Save as...</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      ),
    },
    {
      name: "Menubar",
      description: "Horizontal menu bar component",
      code: `<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>New Tab</MenubarItem>
      <MenubarItem>New Window</MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Share</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger>Edit</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>Undo</MenubarItem>
      <MenubarItem>Redo</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`,
      preview: (
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>New Tab</MenubarItem>
              <MenubarItem>New Window</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Share</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Edit</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Undo</MenubarItem>
              <MenubarItem>Redo</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      ),
    },
    {
      name: "Navigation Menu",
      description: "Navigation menu with dropdown",
      code: `<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-4 w-[400px]">
          <li className="row-span-3">
            <NavigationMenuLink asChild>
              <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                <div className="text-sm font-medium leading-none">Introduction</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Build high-quality, accessible design systems and web apps.
                </p>
              </a>
            </NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`,
      preview: (
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 w-[400px]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Introduction</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Build high-quality, accessible design systems and web apps.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      ),
    },
    {
      name: "Breadcrumb",
      description: "Breadcrumb navigation component",
      code: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Components</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
      preview: (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Components</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      ),
    },
    {
      name: "Toggle",
      description: "Toggle switch component for binary states",
      code: `<div className="flex items-center space-x-2">
  <Label htmlFor="airplane-mode">Airplane mode</Label>
  <Switch id="airplane-mode" />
</div>
<div className="flex items-center space-x-2">
  <Label htmlFor="wifi">Wi-Fi</Label>
  <Switch id="wifi" defaultChecked />
</div>`,
      preview: (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Label htmlFor="airplane-mode">Airplane mode</Label>
            <Switch id="airplane-mode" />
</div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="wifi">Wi-Fi</Label>
            <Switch id="wifi" defaultChecked />
</div>
</div>
      ),
    },
    {
      name: "Toggle Group",
      description: "Group of toggle buttons for multiple options",
      code: `<ToggleGroup type="single" className="justify-start">
  <ToggleGroupItem value="bold" aria-label="Toggle bold">
    <Bold className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="italic" aria-label="Toggle italic">
    <Italic className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="underline" aria-label="Toggle underline">
    <Underline className="h-4 w-4" />
  </ToggleGroupItem>
</ToggleGroup>`,
      preview: (
        <ToggleGroup type="single" className="justify-start">
          <ToggleGroupItem value="bold" aria-label="Toggle bold">
            <Bold className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic">
            <Italic className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Toggle underline">
            <Underline className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      ),
    },
    {
      name: "Toast",
      description: "Notification toast component for user feedback",
      code: `<Button
  variant="outline"
  onClick={() => {
    toast({
      title: "Scheduled: Catch up",
      description: "Friday, February 10, 2023 at 3:00 PM",
    })
  }}
>
  Add to calendar
</Button>`,
      preview: (
        <Button
          variant="outline"
          onClick={() => {
            toast({
              title: "Scheduled: Catch up",
              description: "Friday, February 10, 2023 at 3:00 PM",
            })
          }}
        >
          Add to calendar
        </Button>
      ),
    },
    {
      name: "Resizable Panels",
      description: "Resizable panel layout component",
      code: `<ResizablePanelGroup direction="horizontal" className="min-h-[200px] rounded-lg border">
  <ResizablePanel defaultSize={25}>
    <div className="flex h-full items-center justify-center p-6">
      <span className="font-semibold">Sidebar</span>
</div>
  </ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize={75}>
    <div className="flex h-full items-center justify-center p-6">
      <span className="font-semibold">Content</span>
</div>
  </ResizablePanel>
</ResizablePanelGroup>`,
      preview: (
        <ResizablePanelGroup direction="horizontal" className="min-h-[200px] rounded-lg border">
          <ResizablePanel defaultSize={25}>
            <div className="flex h-full items-center justify-center p-6 bg-muted/50">
              <span className="font-semibold">Sidebar</span>
</div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={75}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Content</span>
</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      ),
    },
    {
      name: "Carousel",
      description: "Image carousel with navigation controls",
      code: `<Carousel className="w-full max-w-xs">
  <CarouselContent>
    <CarouselItem>
      <div className="p-1">
        <Card>
          <CardContent className="flex aspect-square items-center justify-center p-6">
            <span className="text-4xl font-semibold">1</span>
          </CardContent>
        </Card>
</div>
    </CarouselItem>
    <CarouselItem>
      <div className="p-1">
        <Card>
          <CardContent className="flex aspect-square items-center justify-center p-6">
            <span className="text-4xl font-semibold">2</span>
          </CardContent>
        </Card>
</div>
    </CarouselItem>
    <CarouselItem>
      <div className="p-1">
        <Card>
          <CardContent className="flex aspect-square items-center justify-center p-6">
            <span className="text-4xl font-semibold">3</span>
          </CardContent>
        </Card>
</div>
    </CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`,
      preview: (
        <Carousel className="w-full max-w-xs">
          <CarouselContent>
            <CarouselItem>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">1</span>
                  </CardContent>
                </Card>
</div>
            </CarouselItem>
            <CarouselItem>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">2</span>
                  </CardContent>
                </Card>
</div>
            </CarouselItem>
            <CarouselItem>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">3</span>
                  </CardContent>
                </Card>
</div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ),
    },
    {
      name: "Input OTP",
      description: "One-time password input component",
      code: `<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`,
      preview: (
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      ),
    },
    {
      name: "Table",
      description: "Data table component with sorting and pagination",
      code: `<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>john@example.com</TableCell>
      <TableCell><Badge variant="secondary">Active</Badge></TableCell>
      <TableCell>
        <Button variant="ghost" size="sm">Edit</Button>
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Jane Smith</TableCell>
      <TableCell>jane@example.com</TableCell>
      <TableCell><Badge variant="outline">Inactive</Badge></TableCell>
      <TableCell>
        <Button variant="ghost" size="sm">Edit</Button>
      </TableCell>
    </TableRow>
  </TableBody>
</Table>`,
      preview: (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>John Doe</TableCell>
              <TableCell>john@example.com</TableCell>
              <TableCell><Badge variant="secondary">Active</Badge></TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">Edit</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Jane Smith</TableCell>
              <TableCell>jane@example.com</TableCell>
              <TableCell><Badge variant="outline">Inactive</Badge></TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">Edit</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ),
    },
    {
      name: "Scroll Area",
      description: "Custom scrollable area component",
      code: `<ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
  <div className="space-y-4">
    <h4 className="text-sm font-medium leading-none">Jokester</h4>
    <p className="text-sm text-muted-foreground">
      The Jokester began telling jokes when he was 4 years old and never stopped. 
      His first joke was "Why did the chicken cross the road?" and he's been 
      perfecting his craft ever since. Now, at the age of 42, he's a master of 
      comedy with a repertoire of over 1,000 jokes.
    </p>
    <h4 className="text-sm font-medium leading-none">The Jokester's Repertoire</h4>
    <p className="text-sm text-muted-foreground">
      From knock-knock jokes to one-liners, the Jokester has it all. His jokes 
      range from family-friendly to slightly edgy, but always delivered with 
      perfect timing and a contagious laugh that makes everyone around him smile.
    </p>
</div>
</ScrollArea>`,
      preview: (
        <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
          <div className="space-y-4">
            <h4 className="text-sm font-medium leading-none">Jokester</h4>
            <p className="text-sm text-muted-foreground">
              The Jokester began telling jokes when he was 4 years old and never stopped. 
              His first joke was "Why did the chicken cross the road?" and he's been 
              perfecting his craft ever since. Now, at the age of 42, he's a master of 
              comedy with a repertoire of over 1,000 jokes.
            </p>
            <h4 className="text-sm font-medium leading-none">The Jokester's Repertoire</h4>
            <p className="text-sm text-muted-foreground">
              From knock-knock jokes to one-liners, the Jokester has it all. His jokes 
              range from family-friendly to slightly edgy, but always delivered with 
              perfect timing and a contagious laugh that makes everyone around him smile.
            </p>
</div>
        </ScrollArea>
      ),
    },
    {
      name: "Sonner Toast",
      description: "Modern toast notifications with Sonner",
      code: `<Button
  variant="outline"
  onClick={() => {
    toast("Event has been created", {
      description: "Sunday, December 03, 2023 at 9:00 AM",
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    })
  }}
>
  Show Toast
</Button>`,
      preview: (
        <Button
          variant="outline"
          onClick={() => {
            toast({
              title: "Event has been created",
              description: "Sunday, December 03, 2023 at 9:00 AM",
            })
          }}
        >
          Show Toast
        </Button>
      ),
    },
    {
      name: "Collapsible",
      description: "Expandable and collapsible content sections",
      code: `<Collapsible>
  <CollapsibleTrigger asChild>
    <Button variant="outline" className="w-full justify-between">
      <span>Click to expand</span>
      <ChevronDown className="h-4 w-4" />
    </Button>
  </CollapsibleTrigger>
  <CollapsibleContent className="space-y-2">
    <div className="rounded-md border px-4 py-3 text-sm">
      <p>This is the collapsible content. You can put any content here.</p>
</div>
    <div className="rounded-md border px-4 py-3 text-sm">
      <p>More content can be added in multiple sections.</p>
</div>
  </CollapsibleContent>
</Collapsible>`,
      preview: (
        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              <span>Click to expand</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2">
            <div className="rounded-md border px-4 py-3 text-sm">
              <p>This is the collapsible content. You can put any content here.</p>
</div>
            <div className="rounded-md border px-4 py-3 text-sm">
              <p>More content can be added in multiple sections.</p>
</div>
          </CollapsibleContent>
        </Collapsible>
      ),
    },
    {
      name: "Combobox",
      description: "Searchable select dropdown with keyboard navigation",
      code: `<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline" role="combobox" className="w-[200px] justify-between">
      {value
        ? frameworks.find((framework) => framework.value === value)?.label
        : "Select framework..."}
      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-[200px] p-0">
    <Command>
      <CommandInput placeholder="Search framework..." />
      <CommandEmpty>No framework found.</CommandEmpty>
      <CommandGroup>
        {frameworks.map((framework) => (
          <CommandItem
            key={framework.value}
            value={framework.value}
            onSelect={(currentValue) => {
              setValue(currentValue === value ? "" : currentValue)
            }}
          >
            <Check
              className={cn(
                "mr-2 h-4 w-4",
                value === framework.value ? "opacity-100" : "opacity-0"
              )}
            />
            {framework.label}
          </CommandItem>
        ))}
      </CommandGroup>
    </Command>
  </PopoverContent>
</Popover>`,
      preview: (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" role="combobox" className="w-[200px] justify-between">
              {value
                ? frameworks.find((framework) => framework.value === value)?.label
                : "Select framework..."}
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search framework..." />
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {frameworks.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === framework.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {framework.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      ),
    },
    {
      name: "Data Table",
      description: "Advanced data table with sorting, filtering, and pagination",
      code: `<div className="space-y-4">
  <div className="flex items-center justify-between">
    <Input
      placeholder="Filter emails..."
      value={table.getColumn("email")?.getFilterValue() as string ?? ""}
      onChange={(event) =>
        table.getColumn("email")?.setFilterValue(event.target.value)
      }
      className="max-w-sm"
    />
</div>
  <div className="rounded-md border">
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              )
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
</div>
</div>`,
      preview: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Input
              placeholder="Filter emails..."
              className="max-w-sm"
            />
</div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>John Doe</TableCell>
                  <TableCell>john@example.com</TableCell>
                  <TableCell><Badge variant="secondary">Active</Badge></TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Jane Smith</TableCell>
                  <TableCell>jane@example.com</TableCell>
                  <TableCell><Badge variant="outline">Inactive</Badge></TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
</div>
</div>
      ),
    },
    {
      name: "Form",
      description: "Complete form component with validation",
      code: `<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
    <FormField
      control={form.control}
      name="username"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input placeholder="shadcn" {...field} />
          </FormControl>
          <FormDescription>
            This is your public display name.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input placeholder="m@example.com" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <Button type="submit">Submit</Button>
  </form>
</Form>`,
      preview: (
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" placeholder="shadcn" />
            <p className="text-sm text-muted-foreground">
              This is your public display name.
            </p>
</div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="m@example.com" />
</div>
          <Button>Submit</Button>
</div>
      ),
    },
    {
      name: "Multi Step Form",
      description: "Multi-step form with progress indicator",
      code: `<div className="space-y-6">
  <div className="flex items-center justify-center space-x-2">
    <div className="flex items-center space-x-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
        1
</div>
      <span className="text-sm font-medium">Account</span>
</div>
    <div className="h-px w-8 bg-border" />
    <div className="flex items-center space-x-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-sm font-medium">
        2
</div>
      <span className="text-sm text-muted-foreground">Profile</span>
</div>
    <div className="h-px w-8 bg-border" />
    <div className="flex items-center space-x-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-sm font-medium">
        3
</div>
      <span className="text-sm text-muted-foreground">Review</span>
</div>
</div>
  <div className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="Enter your email" />
</div>
    <div className="space-y-2">
      <Label htmlFor="password">Password</Label>
      <Input id="password" type="password" placeholder="Enter your password" />
</div>
    <div className="flex space-x-2">
      <Button variant="outline" className="flex-1">Back</Button>
      <Button className="flex-1">Next</Button>
</div>
</div>
</div>`,
      preview: (
        <div className="space-y-6">
          <div className="flex items-center justify-center space-x-2">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                1
</div>
              <span className="text-sm font-medium">Account</span>
</div>
            <div className="h-px w-8 bg-border" />
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-sm font-medium">
                2
</div>
              <span className="text-sm text-muted-foreground">Profile</span>
</div>
            <div className="h-px w-8 bg-border" />
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-sm font-medium">
                3
</div>
              <span className="text-sm text-muted-foreground">Review</span>
</div>
</div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
</div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Enter your password" />
</div>
            <div className="flex space-x-2">
              <Button variant="outline" className="flex-1">Back</Button>
              <Button className="flex-1">Next</Button>
</div>
</div>
</div>
      ),
    },
    {
      name: "Card Grid",
      description: "Responsive grid layout for cards",
      code: `<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <Card>
    <CardHeader>
      <CardTitle>Card 1</CardTitle>
      <CardDescription>Description for card 1</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Content for the first card goes here.</p>
    </CardContent>
  </Card>
  <Card>
    <CardHeader>
      <CardTitle>Card 2</CardTitle>
      <CardDescription>Description for card 2</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Content for the second card goes here.</p>
    </CardContent>
  </Card>
  <Card>
    <CardHeader>
      <CardTitle>Card 3</CardTitle>
      <CardDescription>Description for card 3</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Content for the third card goes here.</p>
    </CardContent>
  </Card>
</div>`,
      preview: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Card 1</CardTitle>
              <CardDescription>Description for card 1</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Content for the first card goes here.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Card 2</CardTitle>
              <CardDescription>Description for card 2</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Content for the second card goes here.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Card 3</CardTitle>
              <CardDescription>Description for card 3</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Content for the third card goes here.</p>
            </CardContent>
          </Card>
</div>
      ),
    },
    {
      name: "Timeline",
      description: "Vertical timeline component for events",
      code: `<div className="space-y-8">
  <div className="flex items-start space-x-4">
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
      1
</div>
    <div className="space-y-1">
      <h4 className="text-sm font-medium leading-none">Application submitted</h4>
      <p className="text-sm text-muted-foreground">
        Your application has been submitted successfully.
      </p>
      <p className="text-xs text-muted-foreground">2 hours ago</p>
</div>
</div>
  <div className="flex items-start space-x-4">
    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-sm font-medium">
      2
</div>
    <div className="space-y-1">
      <h4 className="text-sm font-medium leading-none">Under review</h4>
      <p className="text-sm text-muted-foreground">
        Your application is currently being reviewed by our team.
      </p>
      <p className="text-xs text-muted-foreground">1 hour ago</p>
</div>
</div>
  <div className="flex items-start space-x-4">
    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-sm font-medium">
      3
</div>
    <div className="space-y-1">
      <h4 className="text-sm font-medium leading-none">Decision</h4>
      <p className="text-sm text-muted-foreground">
        You will receive a decision within 24-48 hours.
      </p>
      <p className="text-xs text-muted-foreground">Pending</p>
</div>
</div>
</div>`,
      preview: (
        <div className="space-y-8">
          <div className="flex items-start space-x-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
              1
</div>
            <div className="space-y-1">
              <h4 className="text-sm font-medium leading-none">Application submitted</h4>
              <p className="text-sm text-muted-foreground">
                Your application has been submitted successfully.
              </p>
              <p className="text-xs text-muted-foreground">2 hours ago</p>
</div>
</div>
          <div className="flex items-start space-x-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-sm font-medium">
              2
</div>
            <div className="space-y-1">
              <h4 className="text-sm font-medium leading-none">Under review</h4>
              <p className="text-sm text-muted-foreground">
                Your application is currently being reviewed by our team.
              </p>
              <p className="text-xs text-muted-foreground">1 hour ago</p>
</div>
</div>
          <div className="flex items-start space-x-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-sm font-medium">
              3
</div>
            <div className="space-y-1">
              <h4 className="text-sm font-medium leading-none">Decision</h4>
              <p className="text-sm text-muted-foreground">
                You will receive a decision within 24-48 hours.
              </p>
              <p className="text-xs text-muted-foreground">Pending</p>
</div>
</div>
</div>
      ),
    },
    {
      name: "Stats Cards",
      description: "Statistics display cards with icons",
      code: `<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
      <DollarSign className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">$45,231.89</div>
      <p className="text-xs text-muted-foreground">
        +20.1% from last month
      </p>
    </CardContent>
  </Card>
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
      <Users className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">+2350</div>
      <p className="text-xs text-muted-foreground">
        +180.1% from last month
      </p>
    </CardContent>
  </Card>
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Sales</CardTitle>
      <CreditCard className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">+12,234</div>
      <p className="text-xs text-muted-foreground">
        +19% from last month
      </p>
    </CardContent>
  </Card>
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Active Now</CardTitle>
      <Activity className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">+573</div>
      <p className="text-xs text-muted-foreground">
        +201 since last hour
      </p>
    </CardContent>
  </Card>
</div>`,
      preview: (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2350</div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12,234</div>
              <p className="text-xs text-muted-foreground">
                +19% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Now</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">
                +201 since last hour
              </p>
            </CardContent>
          </Card>
</div>
      ),
    },

    {
      name: "Pricing Cards",
      description: "Pricing table with different plan tiers",
      code: `<div className="grid gap-6 lg:grid-cols-3">
  <Card>
    <CardHeader>
      <CardTitle>Starter</CardTitle>
      <CardDescription>Perfect for getting started</CardDescription>
      <div className="text-3xl font-bold">$9<span className="text-sm font-normal">/month</span></div>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Check className="h-4 w-4 text-green-500" />
          <span className="text-sm">Up to 10 projects</span>
</div>
        <div className="flex items-center space-x-2">
          <Check className="h-4 w-4 text-green-500" />
          <span className="text-sm">Basic analytics</span>
</div>
        <div className="flex items-center space-x-2">
          <Check className="h-4 w-4 text-green-500" />
          <span className="text-sm">Email support</span>
</div>
</div>
      <Button className="w-full">Get Started</Button>
    </CardContent>
  </Card>
  <Card className="border-primary">
    <CardHeader>
      <CardTitle>Pro</CardTitle>
      <CardDescription>For growing teams</CardDescription>
      <div className="text-3xl font-bold">$29<span className="text-sm font-normal">/month</span></div>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Check className="h-4 w-4 text-green-500" />
          <span className="text-sm">Unlimited projects</span>
</div>
        <div className="flex items-center space-x-2">
          <Check className="h-4 w-4 text-green-500" />
          <span className="text-sm">Advanced analytics</span>
</div>
        <div className="flex items-center space-x-2">
          <Check className="h-4 w-4 text-green-500" />
          <span className="text-sm">Priority support</span>
</div>
</div>
      <Button className="w-full">Get Started</Button>
    </CardContent>
  </Card>
  <Card>
    <CardHeader>
      <CardTitle>Enterprise</CardTitle>
      <CardDescription>For large organizations</CardDescription>
      <div className="text-3xl font-bold">$99<span className="text-sm font-normal">/month</span></div>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Check className="h-4 w-4 text-green-500" />
          <span className="text-sm">Everything in Pro</span>
</div>
        <div className="flex items-center space-x-2">
          <Check className="h-4 w-4 text-green-500" />
          <span className="text-sm">Custom integrations</span>
</div>
        <div className="flex items-center space-x-2">
          <Check className="h-4 w-4 text-green-500" />
          <span className="text-sm">Dedicated support</span>
</div>
</div>
      <Button className="w-full">Contact Sales</Button>
    </CardContent>
  </Card>
</div>`,
      preview: (
        <div className="grid gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Starter</CardTitle>
              <CardDescription>Perfect for getting started</CardDescription>
              <div className="text-3xl font-bold">$9<span className="text-sm font-normal">/month</span></div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Up to 10 projects</span>
</div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Basic analytics</span>
</div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Email support</span>
</div>
</div>
              <Button className="w-full">Get Started</Button>
            </CardContent>
          </Card>
          <Card className="border-primary">
            <CardHeader>
              <CardTitle>Pro</CardTitle>
              <CardDescription>For growing teams</CardDescription>
              <div className="text-3xl font-bold">$29<span className="text-sm font-normal">/month</span></div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Unlimited projects</span>
</div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Advanced analytics</span>
</div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Priority support</span>
</div>
</div>
              <Button className="w-full">Get Started</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Enterprise</CardTitle>
              <CardDescription>For large organizations</CardDescription>
              <div className="text-3xl font-bold">$99<span className="text-sm font-normal">/month</span></div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Everything in Pro</span>
</div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Custom integrations</span>
</div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Dedicated support</span>
</div>
</div>
              <Button className="w-full">Contact Sales</Button>
            </CardContent>
          </Card>
</div>
      ),
    },
    {
      name: "Notification List",
      description: "List of notifications with different types",
      code: `<div className="space-y-4">
  <div className="flex items-start space-x-4 rounded-lg border p-4">
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
      <CheckCircle className="h-4 w-4 text-green-600" />
</div>
    <div className="flex-1 space-y-1">
      <p className="text-sm font-medium">Payment successful</p>
      <p className="text-sm text-muted-foreground">
        Your payment of $29.99 has been processed successfully.
      </p>
      <p className="text-xs text-muted-foreground">2 minutes ago</p>
</div>
</div>
  <div className="flex items-start space-x-4 rounded-lg border p-4">
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
      <Info className="h-4 w-4 text-blue-600" />
</div>
    <div className="flex-1 space-y-1">
      <p className="text-sm font-medium">New feature available</p>
      <p className="text-sm text-muted-foreground">
        Check out our new dashboard analytics feature.
      </p>
      <p className="text-xs text-muted-foreground">1 hour ago</p>
</div>
</div>
  <div className="flex items-start space-x-4 rounded-lg border p-4">
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100">
      <AlertTriangle className="h-4 w-4 text-yellow-600" />
</div>
    <div className="flex-1 space-y-1">
      <p className="text-sm font-medium">Storage warning</p>
      <p className="text-sm text-muted-foreground">
        You're using 85% of your storage space.
      </p>
      <p className="text-xs text-muted-foreground">3 hours ago</p>
</div>
</div>
</div>`,
      preview: (
        <div className="space-y-4">
          <div className="flex items-start space-x-4 rounded-lg border p-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-4 w-4 text-green-600" />
</div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium">Payment successful</p>
              <p className="text-sm text-muted-foreground">
                Your payment of $29.99 has been processed successfully.
              </p>
              <p className="text-xs text-muted-foreground">2 minutes ago</p>
</div>
</div>
          <div className="flex items-start space-x-4 rounded-lg border p-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
              <Info className="h-4 w-4 text-blue-600" />
</div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium">New feature available</p>
              <p className="text-sm text-muted-foreground">
                Check out our new dashboard analytics feature.
              </p>
              <p className="text-xs text-muted-foreground">1 hour ago</p>
</div>
</div>
          <div className="flex items-start space-x-4 rounded-lg border p-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
</div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium">Storage warning</p>
              <p className="text-sm text-muted-foreground">
                You're using 85% of your storage space.
              </p>
              <p className="text-xs text-muted-foreground">3 hours ago</p>
</div>
</div>
</div>
      ),
    },
    {
      name: "Search Results",
      description: "Search results with filters and sorting",
      code: `<div className="space-y-4">
  <div className="flex items-center justify-between">
    <div className="flex items-center space-x-2">
      <span className="text-sm text-muted-foreground">Showing 24 results</span>
      <Badge variant="secondary">Filtered</Badge>
</div>
    <Select defaultValue="relevance">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="relevance">Relevance</SelectItem>
        <SelectItem value="newest">Newest</SelectItem>
        <SelectItem value="oldest">Oldest</SelectItem>
        <SelectItem value="popular">Most Popular</SelectItem>
      </SelectContent>
    </Select>
</div>
  <div className="space-y-3">
    <div className="flex items-start space-x-4 rounded-lg border p-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
        <FileText className="h-6 w-6 text-primary" />
</div>
      <div className="flex-1 space-y-1">
        <h3 className="text-sm font-medium">Getting Started Guide</h3>
        <p className="text-sm text-muted-foreground">
          Learn how to get started with our platform in just a few minutes.
        </p>
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <span>Documentation</span>
          <span>•</span>
          <span>Updated 2 days ago</span>
</div>
</div>
</div>
    <div className="flex items-start space-x-4 rounded-lg border p-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
        <Video className="h-6 w-6 text-primary" />
</div>
      <div className="flex-1 space-y-1">
        <h3 className="text-sm font-medium">Video Tutorial</h3>
        <p className="text-sm text-muted-foreground">
          Watch our comprehensive video tutorial to master the basics.
        </p>
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <span>Video</span>
          <span>•</span>
          <span>15 min</span>
</div>
</div>
</div>
</div>
</div>`,
      preview: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Showing 24 results</span>
              <Badge variant="secondary">Filtered</Badge>
</div>
            <Select defaultValue="relevance">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
</div>
          <div className="space-y-3">
            <div className="flex items-start space-x-4 rounded-lg border p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
</div>
              <div className="flex-1 space-y-1">
                <h3 className="text-sm font-medium">Getting Started Guide</h3>
                <p className="text-sm text-muted-foreground">
                  Learn how to get started with our platform in just a few minutes.
                </p>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <span>Documentation</span>
                  <span>•</span>
                  <span>Updated 2 days ago</span>
</div>
</div>
</div>
            <div className="flex items-start space-x-4 rounded-lg border p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Video className="h-6 w-6 text-primary" />
</div>
              <div className="flex-1 space-y-1">
                <h3 className="text-sm font-medium">Video Tutorial</h3>
                <p className="text-sm text-muted-foreground">
                  Watch our comprehensive video tutorial to master the basics.
                </p>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <span>Video</span>
                  <span>•</span>
                  <span>15 min</span>
</div>
</div>
</div>
</div>
</div>
      ),
    },
    {
      name: "File Upload",
      description: "File upload component with drag and drop",
      code: `<div className="space-y-4">
  <div className="rounded-lg border-2 border-dashed border-border p-8 text-center">
    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
      <Upload className="h-6 w-6 text-primary" />
</div>
    <h3 className="mb-2 text-lg font-semibold">Upload files</h3>
    <p className="mb-4 text-sm text-muted-foreground">
      Drag and drop your files here, or click to browse
    </p>
    <div className="flex items-center justify-center space-x-2">
      <Button>Choose Files</Button>
      <span className="text-sm text-muted-foreground">or drag and drop</span>
</div>
    <p className="mt-2 text-xs text-muted-foreground">
      PNG, JPG, GIF up to 10MB
    </p>
</div>
  <div className="space-y-2">
    <div className="flex items-center justify-between rounded-lg border p-3">
      <div className="flex items-center space-x-3">
        <FileText className="h-8 w-8 text-blue-500" />
        <div>
          <p className="text-sm font-medium">document.pdf</p>
          <p className="text-xs text-muted-foreground">2.4 MB</p>
</div>
</div>
      <div className="flex items-center space-x-2">
        <Progress value={75} className="w-20" />
        <Button variant="ghost" size="sm">Remove</Button>
</div>
</div>
    <div className="flex items-center justify-between rounded-lg border p-3">
      <div className="flex items-center space-x-3">
        <Image className="h-8 w-8 text-green-500" />
        <div>
          <p className="text-sm font-medium">image.jpg</p>
          <p className="text-xs text-muted-foreground">1.2 MB</p>
</div>
</div>
      <div className="flex items-center space-x-2">
        <Check className="h-4 w-4 text-green-500" />
        <Button variant="ghost" size="sm">Remove</Button>
</div>
</div>
</div>
</div>`,
      preview: (
        <div className="space-y-4">
          <div className="rounded-lg border-2 border-dashed border-border p-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Upload className="h-6 w-6 text-primary" />
</div>
            <h3 className="mb-2 text-lg font-semibold">Upload files</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Drag and drop your files here, or click to browse
            </p>
            <div className="flex items-center justify-center space-x-2">
              <Button>Choose Files</Button>
              <span className="text-sm text-muted-foreground">or drag and drop</span>
</div>
            <p className="mt-2 text-xs text-muted-foreground">
              PNG, JPG, GIF up to 10MB
            </p>
</div>
          <div className="space-y-2">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center space-x-3">
                <FileText className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">document.pdf</p>
                  <p className="text-xs text-muted-foreground">2.4 MB</p>
</div>
</div>
              <div className="flex items-center space-x-2">
                <Progress value={75} className="w-20" />
                <Button variant="ghost" size="sm">Remove</Button>
</div>
</div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center space-x-3">
                <Image className="h-8 w-8 text-green-500" />
                <div>
                  <p className="text-sm font-medium">image.jpg</p>
                  <p className="text-xs text-muted-foreground">1.2 MB</p>
</div>
</div>
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-500" />
                <Button variant="ghost" size="sm">Remove</Button>
</div>
</div>
</div>
</div>
      ),
    },
    {
      name: "Activity Feed",
      description: "Activity feed with user actions and timestamps",
      code: `<div className="space-y-6">
  <div className="flex items-start space-x-4">
    <Avatar className="h-8 w-8">
      <AvatarFallback className="text-xs font-medium">JD</AvatarFallback>
    </Avatar>
    <div className="flex-1 space-y-1">
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium">John Doe</span>
        <span className="text-sm text-muted-foreground">created a new project</span>
</div>
      <p className="text-sm text-muted-foreground">Project Alpha</p>
      <p className="text-xs text-muted-foreground">2 minutes ago</p>
</div>
</div>
  <div className="flex items-start space-x-4">
    <Avatar className="h-8 w-8">
      <AvatarFallback className="text-xs font-medium">JS</AvatarFallback>
    </Avatar>
    <div className="flex-1 space-y-1">
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium">Jane Smith</span>
        <span className="text-sm text-muted-foreground">commented on</span>
        <span className="text-sm font-medium">Task #123</span>
</div>
      <p className="text-sm text-muted-foreground">"Great work on this feature!"</p>
      <p className="text-xs text-muted-foreground">15 minutes ago</p>
</div>
</div>
  <div className="flex items-start space-x-4">
    <Avatar className="h-8 w-8">
      <AvatarFallback className="text-xs font-medium">MJ</AvatarFallback>
    </Avatar>
    <div className="flex-1 space-y-1">
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium">Mike Johnson</span>
        <span className="text-sm text-muted-foreground">updated the status of</span>
        <span className="text-sm font-medium">Bug #456</span>
</div>
      <p className="text-sm text-muted-foreground">Status changed from "In Progress" to "Resolved"</p>
      <p className="text-xs text-muted-foreground">1 hour ago</p>
</div>
</div>
</div>`,
      preview: (
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs font-medium">JD</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">John Doe</span>
                <span className="text-sm text-muted-foreground">created a new project</span>
</div>
              <p className="text-sm text-muted-foreground">Project Alpha</p>
              <p className="text-xs text-muted-foreground">2 minutes ago</p>
</div>
</div>
          <div className="flex items-start space-x-4">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs font-medium">JS</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Jane Smith</span>
                <span className="text-sm text-muted-foreground">commented on</span>
                <span className="text-sm font-medium">Task #123</span>
</div>
              <p className="text-sm text-muted-foreground">"Great work on this feature!"</p>
              <p className="text-xs text-muted-foreground">15 minutes ago</p>
</div>
</div>
          <div className="flex items-start space-x-4">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs font-medium">MJ</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Mike Johnson</span>
                <span className="text-sm text-muted-foreground">updated the status of</span>
                <span className="text-sm font-medium">Bug #456</span>
</div>
              <p className="text-sm text-muted-foreground">Status changed from "In Progress" to "Resolved"</p>
              <p className="text-xs text-muted-foreground">1 hour ago</p>
</div>
</div>
</div>
      ),
    },
    {
        name: "Progress Steps",
        description: "Multi-step progress indicator with labels",
        code: `<div className="space-y-4">
  <div className="flex items-center space-x-2">
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
      1
</div>
    <div className="flex-1">
      <p className="text-sm font-medium">Account Setup</p>
      <p className="text-xs text-muted-foreground">Create your account</p>
</div>
    <Check className="h-4 w-4 text-green-500" />
</div>
  <div className="flex items-center space-x-2">
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
      2
</div>
    <div className="flex-1">
      <p className="text-sm font-medium">Profile Creation</p>
      <p className="text-xs text-muted-foreground">Add your details</p>
</div>
    <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/20" />
</div>
  <div className="flex items-center space-x-2">
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground text-sm font-medium">
      3
</div>
    <div className="flex-1">
      <p className="text-sm font-medium text-muted-foreground">Verification</p>
      <p className="text-xs text-muted-foreground">Verify your email</p>
</div>
    <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/20" />
</div>
</div>`,
        preview: (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                1
</div>
              <div className="flex-1">
                <p className="text-sm font-medium">Account Setup</p>
                <p className="text-xs text-muted-foreground">Create your account</p>
</div>
              <Check className="h-4 w-4 text-green-500" />
</div>
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                2
</div>
              <div className="flex-1">
                <p className="text-sm font-medium">Profile Creation</p>
                <p className="text-xs text-muted-foreground">Add your details</p>
</div>
              <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/20" />
</div>
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground text-sm font-medium">
                3
</div>
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">Verification</p>
                <p className="text-xs text-muted-foreground">Verify your email</p>
</div>
              <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/20" />
</div>
</div>
        ),
      },
      {
        name: "Tag Input",
        description: "Input field for adding and removing tags",
        code: `<div className="space-y-3">
  <div className="flex flex-wrap gap-2">
    <Badge variant="secondary" className="gap-1">
      React
      <X className="h-3 w-3 cursor-pointer hover:text-destructive" />
    </Badge>
    <Badge variant="secondary" className="gap-1">
      TypeScript
      <X className="h-3 w-3 cursor-pointer hover:text-destructive" />
    </Badge>
    <Badge variant="secondary" className="gap-1">
      Tailwind
      <X className="h-3 w-3 cursor-pointer hover:text-destructive" />
    </Badge>
</div>
  <div className="flex items-center space-x-2">
    <Input placeholder="Add a tag..." className="flex-1" />
    <Button size="sm">Add</Button>
</div>
</div>`,
        preview: (
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="gap-1">
                React
                <X className="h-3 w-3 cursor-pointer hover:text-destructive" />
              </Badge>
              <Badge variant="secondary" className="gap-1">
                TypeScript
                <X className="h-3 w-3 cursor-pointer hover:text-destructive" />
              </Badge>
              <Badge variant="secondary" className="gap-1">
                Tailwind
                <X className="h-3 w-3 cursor-pointer hover:text-destructive" />
              </Badge>
</div>
            <div className="flex items-center space-x-2">
              <Input placeholder="Add a tag..." className="flex-1" />
              <Button size="sm">Add</Button>
</div>
</div>
        ),
      },
      {
        name: "Status Indicator",
        description: "Visual status indicators with different states",
        code: `<div className="space-y-4">
  <div className="flex items-center space-x-2">
    <div className="h-2 w-2 rounded-full bg-green-500" />
    <span className="text-sm">Online</span>
</div>
  <div className="flex items-center space-x-2">
    <div className="h-2 w-2 rounded-full bg-yellow-500" />
    <span className="text-sm">Away</span>
</div>
  <div className="flex items-center space-x-2">
    <div className="h-2 w-2 rounded-full bg-red-500" />
    <span className="text-sm">Offline</span>
</div>
  <div className="flex items-center space-x-2">
    <div className="h-2 w-2 rounded-full bg-blue-500" />
    <span className="text-sm">Busy</span>
</div>
</div>`,
        preview: (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-sm">Online</span>
</div>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-yellow-500" />
              <span className="text-sm">Away</span>
</div>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-red-500" />
              <span className="text-sm">Offline</span>
</div>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <span className="text-sm">Busy</span>
</div>
</div>
        ),
      },
      {
        name: "Rating Stars",
        description: "Interactive star rating component",
        code: `<div className="flex items-center space-x-1">
  {[1, 2, 3, 4, 5].map((star) => (
    <button
      key={star}
      className="text-2xl text-yellow-400 hover:text-yellow-500 transition-colors"
    >
      ★
    </button>
  ))}
</div>`,
        preview: (
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className="text-2xl text-yellow-400 hover:text-yellow-500 transition-colors"
              >
                ★
              </button>
            ))}
</div>
        ),
      },
      {
        name: "Loading Spinner",
        description: "Animated loading spinner with different sizes",
        code: `<div className="flex items-center space-x-4">
  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
</div>`,
        preview: (
          <div className="flex items-center space-x-4">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
</div>
        ),
      },
      {
        name: "Pagination",
        description: "Page navigation component with page numbers",
        code: `<div className="flex items-center space-x-2">
  <Button variant="outline" size="sm">Previous</Button>
  <Button variant="outline" size="sm">1</Button>
  <Button variant="outline" size="sm">2</Button>
  <Button variant="outline" size="sm">3</Button>
  <Button variant="outline" size="sm">Next</Button>
</div>`,
        preview: (
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">Previous</Button>
            <Button variant="outline" size="sm">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">Next</Button>
</div>
        ),
      },

      {
        name: "Notification Badge",
        description: "Notification indicator with count",
        code: `<div className="relative inline-block">
  <Button variant="outline" size="sm">
    Notifications
  </Button>
  <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
    3
  </span>
</div>`,
        preview: (
          <div className="relative inline-block">
            <Button variant="outline" size="sm">
              Notifications
            </Button>
            <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              3
            </span>
</div>
        ),
      },
      {
        name: "Search Bar",
        description: "Advanced search input with suggestions",
        code: `<div className="relative w-full max-w-md">
  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
  <Input
    placeholder="Search anything..."
    className="pl-10 pr-4"
  />
  <Button size="sm" className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7">
    Search
  </Button>
</div>`,
        preview: (
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search anything..."
              className="pl-10 pr-4"
            />
            <Button size="sm" className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7">
              Search
            </Button>
</div>
        ),
      },
      {
        name: "Progress Ring",
        description: "Circular progress indicator",
        code: `<div className="relative w-16 h-16">
  <svg className="w-16 h-16 transform -rotate-90">
    <circle
      cx="32"
      cy="32"
      r="28"
      stroke="currentColor"
      strokeWidth="4"
      fill="none"
      className="text-muted"
    />
    <circle
      cx="32"
      cy="32"
      r="28"
      stroke="currentColor"
      strokeWidth="4"
      fill="none"
      strokeDasharray="175.84"
      strokeDashoffset="52.75"
      className="text-primary"
      style={{ strokeDashoffset: 175.84 - (175.84 * 70) / 100 }}
    />
  </svg>
  <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">
    70%
</div>
</div>`,
        preview: (
          <div className="relative w-16 h-16">
            <svg className="w-16 h-16 transform -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="text-muted"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                strokeDasharray="175.84"
                strokeDashoffset="52.75"
                className="text-primary"
                style={{ strokeDashoffset: 175.84 - (175.84 * 70) / 100 }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">
              70%
</div>
</div>
        ),
      },

      {
        name: "Breadcrumb Navigation",
        description: "Hierarchical navigation breadcrumbs",
        code: `<nav className="flex items-center space-x-1 text-sm text-muted-foreground">
  <a href="#" className="hover:text-foreground transition-colors">Home</a>
  <ChevronRight className="h-4 w-4" />
  <a href="#" className="hover:text-foreground transition-colors">Components</a>
  <ChevronRight className="h-4 w-4" />
  <span className="text-foreground">Button</span>
</nav>`,
        preview: (
          <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Home</a>
            <ChevronRight className="h-4 w-4" />
            <a href="#" className="hover:text-foreground transition-colors">Components</a>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Button</span>
          </nav>
        ),
      },
      {
        name: "Alert Banner",
        description: "Prominent alert message with actions",
        code: `<div className="bg-blue-50 border border-blue-200 rounded-lg p-4 dark:bg-blue-950 dark:border-blue-800">
  <div className="flex items-start space-x-3">
    <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
    <div className="flex-1">
      <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
        New feature available
      </h3>
      <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
        Check out our latest component library updates.
      </p>
</div>
    <Button size="sm" variant="outline" className="text-blue-700 border-blue-300 hover:bg-blue-100 dark:text-blue-300 dark:border-blue-600 dark:hover:bg-blue-900">
      Learn more
    </Button>
</div>
</div>`,
        preview: (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 dark:bg-blue-950 dark:border-blue-800">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  New feature available
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                  Check out our latest component library updates.
                </p>
</div>
              <Button size="sm" variant="outline" className="text-blue-700 border-blue-300 hover:bg-blue-100 dark:text-blue-300 dark:border-blue-600 dark:hover:bg-blue-900">
                Learn more
              </Button>
</div>
</div>
        ),
      },
      {
        name: "Color Palette",
        description: "Display color swatches with hex values",
        code: `<div className="grid grid-cols-2 gap-4">
  <div className="space-y-2">
    <div className="h-16 w-full rounded-lg bg-primary"></div>
    <p className="text-sm font-medium">Primary</p>
    <p className="text-xs text-muted-foreground">#0f172a</p>
</div>
  <div className="space-y-2">
    <div className="h-16 w-full rounded-lg bg-secondary"></div>
    <p className="text-sm font-medium">Secondary</p>
    <p className="text-xs text-muted-foreground">#64748b</p>
</div>
</div>`,
        preview: (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="h-16 w-full rounded-lg bg-primary"></div>
              <p className="text-sm font-medium">Primary</p>
              <p className="text-xs text-muted-foreground">#0f172a</p>
</div>
            <div className="space-y-2">
              <div className="h-16 w-full rounded-lg bg-secondary"></div>
              <p className="text-sm font-medium">Secondary</p>
              <p className="text-xs text-muted-foreground">#64748b</p>
</div>
</div>
        ),
      },
      {
        name: "Feature Grid",
        description: "Grid layout for feature highlights",
        code: `<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <div className="text-center space-y-3">
    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
      <Zap className="w-6 h-6 text-primary" />
</div>
    <h3 className="font-semibold">Fast</h3>
    <p className="text-sm text-muted-foreground">Lightning fast performance</p>
</div>
  <div className="text-center space-y-3">
    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
      <Shield className="w-6 h-6 text-primary" />
</div>
    <h3 className="font-semibold">Secure</h3>
    <p className="text-sm text-muted-foreground">Built with security in mind</p>
</div>
  <div className="text-center space-y-3">
    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
      <Smartphone className="w-6 h-6 text-primary" />
</div>
    <h3 className="font-semibold">Responsive</h3>
    <p className="text-sm text-muted-foreground">Works on all devices</p>
</div>
</div>`,
        preview: (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary" />
</div>
              <h3 className="font-semibold">Fast</h3>
              <p className="text-sm text-muted-foreground">Lightning fast performance</p>
</div>
            <div className="text-center space-y-3">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
</div>
              <h3 className="font-semibold">Secure</h3>
              <p className="text-sm text-muted-foreground">Built with security in mind</p>
</div>
            <div className="text-center space-y-3">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-primary" />
</div>
              <h3 className="font-semibold">Responsive</h3>
              <p className="text-sm text-muted-foreground">Works on all devices</p>
</div>
</div>
        ),
      },
      {
        name: "Code Block",
        description: "Styled code block with syntax highlighting",
        code: `<div className="bg-muted rounded-lg p-4 font-mono text-sm">
  <div className="flex items-center justify-between mb-2">
    <span className="text-muted-foreground">index.tsx</span>
    <Button size="sm" variant="ghost">Copy</Button>
</div>
  <pre className="text-foreground">
function App() {
  return (
    <div className="p-4">
      <h1>Hello World</h1>
</div>
  )
}
  </pre>
</div>`,
        preview: (
          <div className="bg-muted rounded-lg p-4 font-mono text-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground">index.tsx</span>
              <Button size="sm" variant="ghost">Copy</Button>
</div>
            <pre className="text-foreground">
{`function App() {
  return (
    <div className="p-4">
      <h1>Hello World</h1>
</div>
  )
}`}
            </pre>
</div>
        ),
      },
      {
        name: "Social Links",
        description: "Social media link buttons",
        code: `<div className="flex space-x-2">
  <Button size="sm" variant="outline" className="flex items-center space-x-2">
    <Star className="w-4 h-4" />
    <span>Star</span>
  </Button>
  <Button size="sm" variant="outline" className="flex items-center space-x-2">
    <Users className="w-4 h-4" />
    <span>Fork</span>
  </Button>
  <Button size="sm" variant="outline" className="flex items-center space-x-2">
    <Share className="w-4 h-4" />
    <span>Share</span>
  </Button>
</div>`,
        preview: (
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" className="flex items-center space-x-2">
              <Star className="w-4 h-4" />
              <span>Star</span>
            </Button>
            <Button size="sm" variant="outline" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Fork</span>
            </Button>
            <Button size="sm" variant="outline" className="flex items-center space-x-2">
              <Share className="w-4 h-4" />
              <span>Share</span>
            </Button>
</div>
        ),
      },
      {
        name: "Metric Card",
        description: "Display key metrics with icons",
        code: `<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div className="p-4 border rounded-lg">
    <div className="flex items-center space-x-2">
      <Users className="w-5 h-5 text-blue-500" />
      <span className="text-sm font-medium text-muted-foreground">Total Users</span>
</div>
    <p className="text-2xl font-bold">12,345</p>
    <p className="text-xs text-green-600">+12% from last month</p>
</div>
  <div className="p-4 border rounded-lg">
    <div className="flex items-center space-x-2">
      <CreditCard className="w-5 h-5 text-green-500" />
      <span className="text-sm font-medium text-muted-foreground">Revenue</span>
</div>
    <p className="text-2xl font-bold">$45,678</p>
    <p className="text-xs text-green-600">+8% from last month</p>
</div>
</div>`,
        preview: (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium text-muted-foreground">Total Users</span>
</div>
              <p className="text-2xl font-bold">12,345</p>
              <p className="text-xs text-green-600">+12% from last month</p>
</div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium text-muted-foreground">Revenue</span>
</div>
              <p className="text-2xl font-bold">$45,678</p>
              <p className="text-xs text-green-600">+8% from last month</p>
</div>
</div>
        ),
      },
      {
        name: "Responsive Navbar",
        description: "Navigation bar with dropdowns and mobile hamburger menu",
        code: `<header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
  <nav className="max-w-7xl mx-auto px-4 py-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link href="/" className="font-bold text-xl">Logo</Link>
        <div className="hidden md:flex items-center gap-6">
          <Link href="/docs" className="hover:text-primary transition-colors">Docs</Link>
          <Link href="/components" className="hover:text-primary transition-colors">Components</Link>
          <Link href="/examples" className="hover:text-primary transition-colors">Examples</Link>
</div>
</div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm">Sign In</Button>
        <Button size="sm">Get Started</Button>
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="sm">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col gap-4 mt-8">
              <Link href="/docs" className="text-lg">Docs</Link>
              <Link href="/components" className="text-lg">Components</Link>
              <Link href="/examples" className="text-lg">Examples</Link>
</div>
          </SheetContent>
        </Sheet>
</div>
</div>
  </nav>
</header>`,
        preview: (
          <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
            <nav className="max-w-7xl mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-8">
                  <Link href="/" className="font-bold text-xl">Logo</Link>
                  <div className="hidden md:flex items-center gap-6">
                    <Link href="/docs" className="hover:text-primary transition-colors">Docs</Link>
                    <Link href="/components" className="hover:text-primary transition-colors">Components</Link>
                    <Link href="/examples" className="hover:text-primary transition-colors">Examples</Link>
</div>
</div>
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm">Sign In</Button>
                  <Button size="sm">Get Started</Button>
                  <Sheet>
                    <SheetTrigger asChild className="md:hidden">
                      <Button variant="ghost" size="sm">
                        <Menu className="w-5 h-5" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                      <div className="flex flex-col gap-4 mt-8">
                        <Link href="/docs" className="text-lg">Docs</Link>
                        <Link href="/components" className="text-lg">Components</Link>
                        <Link href="/examples" className="text-lg">Examples</Link>
</div>
                    </SheetContent>
                  </Sheet>
</div>
</div>
            </nav>
          </header>
        ),
      },
      {
        name: "Sidebar Navigation",
        description: "Collapsible sidebar with icons and labels for dashboard navigation",
        code: `<div className="flex h-screen">
  <aside className="w-64 border-r bg-card">
    <div className="p-4 border-b">
      <h2 className="font-semibold text-lg">Dashboard</h2>
</div>
    <nav className="p-4 space-y-2">
      <Link href="/dashboard" className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors">
        <Home className="w-5 h-5" />
        <span>Home</span>
      </Link>
      <Link href="/analytics" className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors">
        <Activity className="w-5 h-5" />
        <span>Analytics</span>
      </Link>
      <Link href="/users" className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors">
        <Users className="w-5 h-5" />
        <span>Users</span>
      </Link>
      <Link href="/settings" className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors">
        <Settings className="w-5 h-5" />
        <span>Settings</span>
      </Link>
    </nav>
  </aside>
  <main className="flex-1 p-8">
    <h1 className="text-2xl font-bold">Dashboard Content</h1>
  </main>
</div>`,
        preview: (
          <div className="flex h-64 border rounded-lg overflow-hidden">
            <aside className="w-32 border-r bg-card flex-shrink-0">
              <div className="p-3 border-b">
                <h2 className="font-semibold text-sm">Dashboard</h2>
</div>
              <nav className="p-3 space-y-1">
                <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors">
                  <Home className="w-4 h-4" />
                  <span className="text-sm">Home</span>
</div>
                <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors">
                  <Activity className="w-4 h-4" />
                  <span className="text-sm">Analytics</span>
</div>
                <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">Users</span>
</div>
                <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors">
                  <Settings className="w-4 h-4" />
                  <span className="text-sm">Settings</span>
</div>
              </nav>
            </aside>
            <main className="flex-1 p-4">
              <h1 className="text-lg font-bold">Dashboard Content</h1>
            </main>
</div>
        ),
      },
      {
        name: "Advanced Tabs",
        description: "Horizontal and vertical tabs with smooth animations",
        code: `<Tabs defaultValue="account" className="w-full">
  <TabsList className="grid w-full grid-cols-3">
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="account" className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="name">Name</Label>
      <Input id="name" placeholder="Enter your name" />
</div>
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" placeholder="Enter your email" />
</div>
  </TabsContent>
  <TabsContent value="password" className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="current">Current password</Label>
      <Input id="current" type="password" />
</div>
    <div className="space-y-2">
      <Label htmlFor="new">New password</Label>
      <Input id="new" type="password" />
</div>
  </TabsContent>
  <TabsContent value="settings" className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="theme">Theme</Label>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
</div>
  </TabsContent>
</Tabs>`,
        preview: (
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" />
</div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Enter your email" />
</div>
            </TabsContent>
            <TabsContent value="password" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
</div>
              <div className="space-y-2">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
</div>
            </TabsContent>
            <TabsContent value="settings" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
</div>
            </TabsContent>
          </Tabs>
        ),
      },
      {
        name: "FAQ Accordion",
    description: "Expandable FAQ section with smooth animations",
    code: `<Accordion type="single" collapsible className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>What is this component library?</AccordionTrigger>
    <AccordionContent>
      This is a comprehensive UI component library built with React, TypeScript, and Tailwind CSS. It provides ready-to-use components for building modern web applications.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>How do I get started?</AccordionTrigger>
    <AccordionContent>
      Simply install the package and import the components you need. All components are fully customizable and follow accessibility best practices.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger>Is it free to use?</AccordionTrigger>
    <AccordionContent>
      Yes, this component library is completely free and open source. You can use it in both personal and commercial projects.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
    preview: (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is this component library?</AccordionTrigger>
          <AccordionContent>
            This is a comprehensive UI component library built with React, TypeScript, and Tailwind CSS. It provides ready-to-use components for building modern web applications.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How do I get started?</AccordionTrigger>
          <AccordionContent>
            Simply install the package and import the components you need. All components are fully customizable and follow accessibility best practices.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it free to use?</AccordionTrigger>
          <AccordionContent>
            Yes, this component library is completely free and open source. You can use it in both personal and commercial projects.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
  },
  {
    name: "Timeline",
    description: "Vertical and horizontal event timeline with customizable markers",
    code: `<div className="space-y-4">
  <div className="flex items-start space-x-4">
    <div className="w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
    <div className="flex-1">
      <h4 className="font-medium">Project Started</h4>
      <p className="text-sm text-muted-foreground">January 15, 2024</p>
      <p className="text-sm">Initial planning and setup phase completed.</p>
</div>
</div>
  <div className="flex items-start space-x-4">
    <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
    <div className="flex-1">
      <h4 className="font-medium">Development Phase</h4>
      <p className="text-sm text-muted-foreground">February 1, 2024</p>
      <p className="text-sm">Core features implementation in progress.</p>
</div>
</div>
  <div className="flex items-start space-x-4">
    <div className="w-3 h-3 bg-purple-500 rounded-full mt-2"></div>
    <div className="flex-1">
      <h4 className="font-medium">Testing & Review</h4>
      <p className="text-sm text-muted-foreground">March 1, 2024</p>
      <p className="text-sm">Quality assurance and user testing phase.</p>
</div>
</div>
</div>`,
    preview: (
      <div className="space-y-4">
        <div className="flex items-start space-x-4">
          <div className="w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
          <div className="flex-1">
            <h4 className="font-medium">Project Started</h4>
            <p className="text-sm text-muted-foreground">January 15, 2024</p>
            <p className="text-sm">Initial planning and setup phase completed.</p>
</div>
</div>
        <div className="flex items-start space-x-4">
          <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
          <div className="flex-1">
            <h4 className="font-medium">Development Phase</h4>
            <p className="text-sm text-muted-foreground">February 1, 2024</p>
            <p className="text-sm">Core features implementation in progress.</p>
</div>
</div>
        <div className="flex items-start space-x-4">
          <div className="w-3 h-3 bg-purple-500 rounded-full mt-2"></div>
          <div className="flex-1">
            <h4 className="font-medium">Testing & Review</h4>
            <p className="text-sm text-muted-foreground">March 1, 2024</p>
            <p className="text-sm">Quality assurance and user testing phase.</p>
</div>
</div>
</div>
    ),
  },
  {
    name: "Tooltips & Popovers",
    description: "Interactive tooltips and popovers for enhanced user experience",
    code: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>This is a helpful tooltip!</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Click me</Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="font-medium leading-none">Dimensions</h4>
        <p className="text-sm text-muted-foreground">
          Set the dimensions for the layer.
        </p>
</div>
</div>
  </PopoverContent>
</Popover>`,
    preview: (
      <div className="flex gap-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>This is a helpful tooltip!</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Click me</Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Dimensions</h4>
                <p className="text-sm text-muted-foreground">
                  Set the dimensions for the layer.
                </p>
</div>
</div>
          </PopoverContent>
        </Popover>
</div>
    ),
  },
  {
    name: "Empty States",
    description: "Illustrations and messages for when there's no data to display",
    code: `<div className="text-center py-12">
  <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
    <FileText className="w-12 h-12 text-muted-foreground" />
</div>
  <h3 className="text-lg font-medium mb-2">No documents found</h3>
  <p className="text-muted-foreground mb-4">
    Get started by creating your first document.
  </p>
  <Button>Create Document</Button>
</div>`,
    preview: (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
          <FileText className="w-12 h-12 text-muted-foreground" />
</div>
        <h3 className="text-lg font-medium mb-2">No documents found</h3>
        <p className="text-muted-foreground mb-4">
          Get started by creating your first document.
        </p>
        <Button>Create Document</Button>
</div>
    ),
  },
  {
    name: "Charts",
    description: "Line, bar, pie, and donut charts for data visualization",
    code: `<div className="space-y-6">
  {/* Line Chart */}
  <div className="h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg border flex items-center justify-center">
    <span className="text-sm text-muted-foreground">Line Chart</span>
</div>
  
  {/* Bar Chart */}
  <div className="h-32 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg border flex items-center justify-center">
    <span className="text-sm text-muted-foreground">Bar Chart</span>
</div>
  
  {/* Pie Chart */}
  <div className="h-32 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg border flex items-center justify-center">
    <span className="text-sm text-muted-foreground">Pie Chart</span>
</div>
  
  {/* Donut Chart */}
  <div className="h-32 bg-gradient-to-r from-pink-500/20 to-rose-500/20 rounded-lg border flex items-center justify-center">
    <span className="text-sm text-muted-foreground">Donut Chart</span>
</div>
</div>`,
    preview: (
      <div className="space-y-6">
        <div className="h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg border flex items-center justify-center">
          <span className="text-sm text-muted-foreground">Line Chart</span>
</div>
        <div className="h-32 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg border flex items-center justify-center">
          <span className="text-sm text-muted-foreground">Bar Chart</span>
</div>
        <div className="h-32 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg border flex items-center justify-center">
          <span className="text-sm text-muted-foreground">Pie Chart</span>
</div>
        <div className="h-32 bg-gradient-to-r from-pink-500/20 to-rose-500/20 rounded-lg border flex items-center justify-center">
          <span className="text-sm text-muted-foreground">Donut Chart</span>
</div>
</div>
    ),
  },
  {
    name: "Heatmap & Calendar",
    description: "Interactive heatmap and calendar chart components",
    code: `<div className="space-y-4">
  {/* Heatmap */}
  <div className="grid grid-cols-7 gap-1">
    {Array.from({ length: 35 }).map((_, i) => (
      <div key={i} className="w-8 h-8 bg-green-500/20 rounded border flex items-center justify-center">
        <span className="text-xs text-muted-foreground">{i + 1}</span>
</div>
    ))}
</div>
  
  {/* Calendar Chart */}
  <div className="h-32 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 rounded-lg border flex items-center justify-center">
    <span className="text-sm text-muted-foreground">Calendar Chart</span>
</div>
</div>`,
    preview: (
      <div className="space-y-4">
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 35 }).map((_, i) => (
            <div key={i} className="w-8 h-8 bg-green-500/20 rounded border flex items-center justify-center">
              <span className="text-xs text-muted-foreground">{i + 1}</span>
</div>
          ))}
</div>
        <div className="h-32 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 rounded-lg border flex items-center justify-center">
          <span className="text-sm text-muted-foreground">Calendar Chart</span>
</div>
</div>
    ),
  },
  {
    name: "Profile Page Template",
    description: "Complete profile page with avatar, settings form, and activity log",
    code: `<div className="max-w-4xl mx-auto space-y-8">
  {/* Profile Header */}
  <div className="flex items-center space-x-6">
    <Avatar className="w-24 h-24">
      <AvatarFallback className="text-2xl font-semibold">JD</AvatarFallback>
    </Avatar>
    <div>
      <h1 className="text-3xl font-bold">John Doe</h1>
      <p className="text-muted-foreground">Software Developer</p>
      <p className="text-sm text-muted-foreground">john.doe@example.com</p>
</div>
</div>
  
  {/* Settings Form */}
  <Card>
    <CardHeader>
      <CardTitle>Profile Settings</CardTitle>
      <CardDescription>Update your profile information</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" defaultValue="John" />
</div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" defaultValue="Doe" />
</div>
</div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" defaultValue="john.doe@example.com" />
</div>
      <Button>Save Changes</Button>
    </CardContent>
  </Card>
  
  {/* Activity Log */}
  <Card>
    <CardHeader>
      <CardTitle>Recent Activity</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm">Profile updated - 2 hours ago</span>
</div>
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span className="text-sm">Password changed - 1 day ago</span>
</div>
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          <span className="text-sm">Login from new device - 3 days ago</span>
</div>
</div>
    </CardContent>
  </Card>
</div>`,
    preview: (
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center space-x-6">
          <Avatar className="w-24 h-24">
            <AvatarFallback className="text-2xl font-semibold">JD</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">John Doe</h1>
            <p className="text-muted-foreground">Software Developer</p>
            <p className="text-sm text-muted-foreground">john.doe@example.com</p>
</div>
</div>
        <Card>
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
            <CardDescription>Update your profile information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" defaultValue="John" />
</div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" defaultValue="Doe" />
</div>
</div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="john.doe@example.com" />
</div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Profile updated - 2 hours ago</span>
</div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">Password changed - 1 day ago</span>
</div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm">Login from new device - 3 days ago</span>
</div>
</div>
          </CardContent>
        </Card>
</div>
    ),
  },
  {
    name: "Lock Screen Component",
    description: "Password unlock UI with modern design",
    code: `<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900 p-4">
  <Card className="w-full max-w-md">
    <CardHeader className="text-center">
      <div className="w-20 h-20 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
        <Lock className="w-10 h-10 text-primary" />
</div>
      <CardTitle>Device Locked</CardTitle>
      <CardDescription>Enter your password to unlock</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div>
        <Label htmlFor="password" className="sr-only">Password</Label>
        <Input 
          id="password" 
          type="password" 
          placeholder="Enter password"
          className="text-center text-lg"
        />
</div>
      <Button className="w-full" size="lg">
        Unlock
      </Button>
      <div className="text-center">
        <Button variant="link" size="sm">
          Forgot password?
        </Button>
</div>
    </CardContent>
  </Card>
</div>`,
    preview: (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
              <Lock className="w-10 h-10 text-primary" />
</div>
            <CardTitle>Device Locked</CardTitle>
            <CardDescription>Enter your password to unlock</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="password" className="sr-only">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Enter password"
                className="text-center text-lg"
              />
</div>
            <Button className="w-full" size="lg">
              Unlock
            </Button>
            <div className="text-center">
              <Button variant="link" size="sm">
                Forgot password?
              </Button>
</div>
          </CardContent>
        </Card>
</div>
    ),
  },
  {
    name: "Hero Sections",
    description: "Landing page style with text and call-to-action buttons",
    code: `<div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-700 py-24">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center">
      <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
        Build amazing things
      </h1>
      <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto">
        Create beautiful, responsive websites with our modern UI components. 
        Built with React, TypeScript, and Tailwind CSS.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
          Get started
        </Button>
        <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-blue-600">
          Learn more
        </Button>
</div>
</div>
</div>
</div>`,
    preview: (
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-700 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Build amazing things
            </h1>
            <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto">
              Create beautiful, responsive websites with our modern UI components. 
              Built with React, TypeScript, and Tailwind CSS.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Get started
              </Button>
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-blue-600">
                Learn more
              </Button>
</div>
</div>
</div>
</div>
    ),
  },
  {
    name: "Testimonials Carousel",
    description: "Rotating testimonials with navigation controls",
    code: `<div className="max-w-4xl mx-auto">
  <Carousel className="w-full">
    <CarouselContent>
      <CarouselItem>
        <div className="text-center p-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
            <Quote className="w-8 h-8 text-primary" />
</div>
          <blockquote className="text-lg italic mb-4">
            "This component library has transformed how we build our applications. 
            The quality and consistency are outstanding."
          </blockquote>
          <div className="font-semibold">Sarah Johnson</div>
          <div className="text-sm text-muted-foreground">Product Manager, TechCorp</div>
</div>
      </CarouselItem>
      <CarouselItem>
        <div className="text-center p-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
            <Quote className="w-8 h-8 text-primary" />
</div>
          <blockquote className="text-lg italic mb-4">
            "The best UI library I've ever used. Clean, accessible, and incredibly well-designed."
          </blockquote>
          <div className="font-semibold">Mike Chen</div>
          <div className="text-sm text-muted-foreground">Frontend Developer, StartupXYZ</div>
</div>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</div>`,
    preview: (
      <div className="max-w-4xl mx-auto">
        <Carousel className="w-full">
          <CarouselContent>
            <CarouselItem>
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
                  <Quote className="w-8 h-8 text-primary" />
</div>
                <blockquote className="text-lg italic mb-4">
                  "This component library has transformed how we build our applications. 
                  The quality and consistency are outstanding."
                </blockquote>
                <div className="font-semibold">Sarah Johnson</div>
                <div className="text-sm text-muted-foreground">Product Manager, TechCorp</div>
</div>
            </CarouselItem>
            <CarouselItem>
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
                  <Quote className="w-8 h-8 text-primary" />
</div>
                <blockquote className="text-lg italic mb-4">
                  "The best UI library I've ever used. Clean, accessible, and incredibly well-designed."
                </blockquote>
                <div className="font-semibold">Mike Chen</div>
                <div className="text-sm text-muted-foreground">Frontend Developer, StartupXYZ</div>
</div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
</div>
    ),
  },
  {
    name: "Chat / Messages UI",
    description: "Conversation list and chat window interface",
    code: `<div className="flex h-96 border rounded-lg">
  {/* Conversation List */}
  <div className="w-80 border-r bg-muted/50">
    <div className="p-4 border-b">
      <h3 className="font-semibold">Conversations</h3>
</div>
    <div className="space-y-1">
      <div className="p-3 hover:bg-muted cursor-pointer">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium">John Doe</p>
            <p className="text-sm text-muted-foreground truncate">Hey, how's the project going?</p>
</div>
</div>
</div>
      <div className="p-3 hover:bg-muted cursor-pointer">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarFallback>SM</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium">Sarah Miller</p>
            <p className="text-sm text-muted-foreground truncate">Can we schedule a meeting?</p>
</div>
</div>
</div>
</div>
</div>
  
  {/* Chat Window */}
  <div className="flex-1 flex flex-col">
    <div className="p-4 border-b">
      <h3 className="font-semibold">John Doe</h3>
</div>
    <div className="flex-1 p-4 space-y-4 overflow-y-auto">
      <div className="flex justify-end">
        <div className="bg-primary text-primary-foreground rounded-lg px-3 py-2 max-w-xs">
          <p>Hey! How's the project going?</p>
</div>
</div>
      <div className="flex justify-start">
        <div className="bg-muted rounded-lg px-3 py-2 max-w-xs">
          <p>It's going great! We're on track to finish by Friday.</p>
</div>
</div>
</div>
    <div className="p-4 border-t">
      <div className="flex space-x-2">
        <Input placeholder="Type a message..." className="flex-1" />
        <Button>Send</Button>
</div>
</div>
</div>
</div>`,
    preview: (
      <div className="flex h-96 border rounded-lg">
        <div className="w-80 border-r bg-muted/50">
          <div className="p-4 border-b">
            <h3 className="font-semibold">Conversations</h3>
</div>
          <div className="space-y-1">
            <div className="p-3 hover:bg-muted cursor-pointer">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-muted-foreground truncate">Hey, how's the project going?</p>
</div>
</div>
</div>
            <div className="p-3 hover:bg-muted cursor-pointer">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">Sarah Miller</p>
                  <p className="text-sm text-muted-foreground truncate">Can we schedule a meeting?</p>
</div>
</div>
</div>
</div>
</div>
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b">
            <h3 className="font-semibold">John Doe</h3>
</div>
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            <div className="flex justify-end">
              <div className="bg-primary text-primary-foreground rounded-lg px-3 py-2 max-w-xs">
                <p>Hey! How's the project going?</p>
</div>
</div>
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg px-3 py-2 max-w-xs">
                <p>It's going great! We're on track to finish by Friday.</p>
</div>
</div>
</div>
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input placeholder="Type a message..." className="flex-1" />
              <Button>Send</Button>
</div>
</div>
</div>
</div>
    ),
  },
  {
    name: "Kanban Board / Task Manager",
    description: "Drag and drop task management board",
    code: `<div className="space-y-6">
  <div className="flex justify-between items-center">
    <h2 className="text-2xl font-bold">Project Tasks</h2>
    <Button>Add Task</Button>
</div>
  
  <div className="grid grid-cols-3 gap-6">
    {/* To Do */}
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
        <h3 className="font-semibold">To Do</h3>
        <Badge variant="secondary">3</Badge>
</div>
      <div className="space-y-3">
        <Card className="p-4">
          <h4 className="font-medium mb-2">Design homepage</h4>
          <p className="text-sm text-muted-foreground mb-3">Create wireframes and mockups</p>
          <div className="flex items-center justify-between">
            <Badge variant="outline">Design</Badge>
            <span className="text-xs text-muted-foreground">Due: Today</span>
</div>
        </Card>
        <Card className="p-4">
          <h4 className="font-medium mb-2">Setup database</h4>
          <p className="text-sm text-muted-foreground mb-3">Configure PostgreSQL and migrations</p>
          <div className="flex items-center justify-between">
            <Badge variant="outline">Backend</Badge>
            <span className="text-xs text-muted-foreground">Due: Tomorrow</span>
</div>
        </Card>
</div>
</div>
    
    {/* In Progress */}
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
        <h3 className="font-semibold">In Progress</h3>
        <Badge variant="secondary">2</Badge>
</div>
      <div className="space-y-3">
        <Card className="p-4">
          <h4 className="font-medium mb-2">API development</h4>
          <p className="text-sm text-muted-foreground mb-3">Build REST endpoints</p>
          <div className="flex items-center justify-between">
            <Badge variant="outline">Backend</Badge>
            <span className="text-xs text-muted-foreground">Due: Friday</span>
</div>
        </Card>
</div>
</div>
    
    {/* Done */}
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <h3 className="font-semibold">Done</h3>
        <Badge variant="secondary">1</Badge>
</div>
      <div className="space-y-3">
        <Card className="p-4">
          <h4 className="font-medium mb-2">Project setup</h4>
          <p className="text-sm text-muted-foreground mb-3">Initialize repository and dependencies</p>
          <div className="flex items-center justify-between">
            <Badge variant="outline">Setup</Badge>
            <span className="text-xs text-muted-foreground">Completed</span>
</div>
        </Card>
</div>
</div>
</div>
</div>`,
    preview: (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Project Tasks</h2>
          <Button>Add Task</Button>
</div>
        <div className="grid grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              <h3 className="font-semibold">To Do</h3>
              <Badge variant="secondary">3</Badge>
</div>
            <div className="space-y-3">
              <Card className="p-4">
                <h4 className="font-medium mb-2">Design homepage</h4>
                <p className="text-sm text-muted-foreground mb-3">Create wireframes and mockups</p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Design</Badge>
                  <span className="text-xs text-muted-foreground">Due: Today</span>
</div>
              </Card>
              <Card className="p-4">
                <h4 className="font-medium mb-2">Setup database</h4>
                <p className="text-sm text-muted-foreground mb-3">Configure PostgreSQL and migrations</p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Backend</Badge>
                  <span className="text-xs text-muted-foreground">Due: Tomorrow</span>
</div>
              </Card>
</div>
</div>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <h3 className="font-semibold">In Progress</h3>
              <Badge variant="secondary">2</Badge>
</div>
            <div className="space-y-3">
              <Card className="p-4">
                <h4 className="font-medium mb-2">API development</h4>
                <p className="text-sm text-muted-foreground mb-3">Build REST endpoints</p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Backend</Badge>
                  <span className="text-xs text-muted-foreground">Due: Friday</span>
</div>
              </Card>
</div>
</div>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <h3 className="font-semibold">Done</h3>
              <Badge variant="secondary">1</Badge>
</div>
            <div className="space-y-3">
              <Card className="p-4">
                <h4 className="font-medium mb-2">Project setup</h4>
                <p className="text-sm text-muted-foreground mb-3">Initialize repository and dependencies</p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Setup</Badge>
                  <span className="text-xs text-muted-foreground">Completed</span>
</div>
              </Card>
</div>
</div>
</div>
</div>
    ),
  },
  {
    name: "Theme Toggle",
    description: "Light/Dark/Custom theme switching with preview",
    code: `<div className="space-y-6">
  <div className="flex items-center justify-between">
    <h3 className="text-lg font-medium">Theme Settings</h3>
    <ThemeToggle />
</div>
  
  <div className="grid grid-cols-3 gap-4">
    <div className="space-y-3">
      <div className="text-center">
        <div className="w-20 h-20 mx-auto bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center">
          <Sun className="w-8 h-8 text-yellow-500" />
</div>
        <p className="text-sm font-medium mt-2">Light</p>
</div>
</div>
    
    <div className="space-y-3">
      <div className="text-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto bg-gray-900 border-2 border-gray-700 rounded-lg flex items-center justify-center">
            <Moon className="w-8 h-8 text-blue-400" />
</div>
          <p className="text-sm font-medium mt-2">Dark</p>
</div>
</div>
</div>
    
    <div className="space-y-3">
      <div className="text-center">
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 border-2 border-blue-300 rounded-lg flex items-center justify-center">
          <Palette className="w-8 h-8 text-white" />
</div>
        <p className="text-sm font-medium mt-2">Custom</p>
</div>
</div>
</div>
  
  <div className="space-y-3">
    <Label>Accent Color</Label>
    <div className="flex gap-2">
      <div className="w-8 h-8 bg-blue-500 rounded-full cursor-pointer border-2 border-blue-700"></div>
      <div className="w-8 h-8 bg-green-500 rounded-full cursor-pointer border-2 border-transparent"></div>
      <div className="w-8 h-8 bg-purple-500 rounded-full cursor-pointer border-2 border-transparent"></div>
      <div className="w-8 h-8 bg-orange-500 rounded-full cursor-pointer border-2 border-transparent"></div>
</div>
</div>
</div>`,
    preview: (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Theme Settings</h3>
          <ThemeToggle />
</div>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-3">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center">
                <Sun className="w-8 h-8 text-yellow-500" />
</div>
              <p className="text-sm font-medium mt-2">Light</p>
</div>
</div>
          <div className="space-y-3">
            <div className="text-center">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto bg-gray-900 border-2 border-gray-700 rounded-lg flex items-center justify-center">
                  <Moon className="w-8 h-8 text-blue-400" />
</div>
                <p className="text-sm font-medium mt-2">Dark</p>
</div>
</div>
</div>
          <div className="space-y-3">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 border-2 border-blue-300 rounded-lg flex items-center justify-center">
                <Palette className="w-8 h-8 text-white" />
</div>
              <p className="text-sm font-medium mt-2">Custom</p>
</div>
</div>
</div>
        <div className="space-y-3">
          <Label>Accent Color</Label>
          <div className="flex gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full cursor-pointer border-2 border-blue-700"></div>
            <div className="w-8 h-8 bg-green-500 rounded-full cursor-pointer border-2 border-transparent"></div>
            <div className="w-8 h-8 bg-purple-500 rounded-full cursor-pointer border-2 border-transparent"></div>
            <div className="w-8 h-8 bg-orange-500 rounded-full cursor-pointer border-2 border-transparent"></div>
</div>
</div>
</div>
    ),
  },
  {
    name: "Animated Dotted Loader",
    description: "Chat typing indicator with animated dots",
    code: `<div className="flex space-x-1">
  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
</div>`,
    preview: (
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
</div>
    ),
  },
  {
    name: "Shimmer Effect Loader",
    description: "Gradient shimmer animation across elements",
    code: `<div className="space-y-3">
  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
  <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
  <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
</div>`,
    preview: (
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
</div>
    ),
  },
  {
    name: "Icon Button Hover Effects",
    description: "Rotate, bounce, ripple, and neon glow animations",
    code: `<div className="flex gap-4">
  <Button size="icon" className="hover:rotate-12 transition-transform duration-200">
    <Settings className="w-4 h-4" />
  </Button>
  <Button size="icon" className="hover:scale-110 transition-transform duration-200">
    <Star className="w-4 h-4" />
  </Button>
  <Button size="icon" className="hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-200">
    <Zap className="w-4 h-4" />
  </Button>
</div>`,
    preview: (
      <div className="flex gap-4">
        <Button size="icon" className="hover:rotate-12 transition-transform duration-200">
          <Settings className="w-4 h-4" />
        </Button>
        <Button size="icon" className="hover:scale-110 transition-transform duration-200">
          <Star className="w-4 h-4" />
        </Button>
        <Button size="icon" className="hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-200">
          <Zap className="w-4 h-4" />
        </Button>
</div>
    ),
  },
  {
    name: "Like / Favorite Heart Animation",
    description: "Burst of particles when clicked with heart animation",
    code: `<div className="flex items-center space-x-2">
  <Button variant="ghost" size="sm" className="group">
    <Heart className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors duration-200" />
  </Button>
  <span className="text-sm text-muted-foreground">42 likes</span>
</div>`,
    preview: (
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" className="group">
          <Heart className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors duration-200" />
        </Button>
        <span className="text-sm text-muted-foreground">42 likes</span>
</div>
    ),
  },
  {
    name: "Animated Tabs",
    description: "Underline slide and fade-in content animations",
    code: `<Tabs defaultValue="account" className="w-full">
  <TabsList className="grid w-full grid-cols-2">
    <TabsTrigger value="account" className="relative">
      Account
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary transform scale-x-0 transition-transform duration-200 group-data-[state=active]:scale-x-100"></div>
    </TabsTrigger>
    <TabsTrigger value="password" className="relative">
      Password
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary transform scale-x-0 transition-transform duration-200 group-data-[state=active]:scale-x-100"></div>
    </TabsTrigger>
  </TabsList>
  <TabsContent value="account" className="mt-4">
    <Card>
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>Make changes to your account here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Account settings content goes here.</p>
      </CardContent>
    </Card>
  </TabsContent>
  <TabsContent value="password" className="mt-4">
    <Card>
      <CardHeader>
        <CardTitle>Password</CardTitle>
        <CardDescription>Change your password here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Password settings content goes here.</p>
      </CardContent>
    </Card>
  </TabsContent>
</Tabs>`,
    preview: (
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account" className="relative">
            Account
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary transform scale-x-0 transition-transform duration-200 group-data-[state=active]:scale-x-100"></div>
          </TabsTrigger>
          <TabsTrigger value="password" className="relative">
            Password
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary transform scale-x-0 transition-transform duration-200 group-data-[state=active]:scale-x-100"></div>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>Make changes to your account here.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Account settings content goes here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="password" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your password here.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Password settings content goes here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    ),
  },
  {
    name: "Accordion with Motion",
    description: "Height easing and rotating chevron icon animations",
    code: `<Accordion type="single" collapsible className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger className="group">
      <span>What is this component library?</span>
      <ChevronDown className="w-4 h-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
    </AccordionTrigger>
    <AccordionContent className="overflow-hidden transition-all duration-300 ease-in-out">
      <p>This is a comprehensive UI component library built with React, TypeScript, and Tailwind CSS. It provides ready-to-use components for building modern web applications.</p>
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger className="group">
      <span>How do I get started?</span>
      <ChevronDown className="w-4 h-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
    </AccordionTrigger>
    <AccordionContent className="overflow-hidden transition-all duration-300 ease-in-out">
      <p>Simply install the package and import the components you need. All components are fully customizable and follow accessibility best practices.</p>
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
    preview: (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="group">
            <span>What is this component library?</span>
            <ChevronDown className="w-4 h-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </AccordionTrigger>
          <AccordionContent className="overflow-hidden transition-all duration-300 ease-in-out">
            <p>This is a comprehensive UI component library built with React, TypeScript, and Tailwind CSS. It provides ready-to-use components for building modern web applications.</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="group">
            <span>How do I get started?</span>
            <ChevronDown className="w-4 h-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </AccordionTrigger>
          <AccordionContent className="overflow-hidden transition-all duration-300 ease-in-out">
            <p>Simply install the package and import the components you need. All components are fully customizable and follow accessibility best practices.</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
  },
  {
    name: "Confetti Animation",
    description: "Celebratory confetti for success actions with CSS and Framer Motion",
    code: `// CSS Version
<div className="relative">
  <div className="confetti-piece" style={{
    position: 'absolute',
    width: '10px',
    height: '10px',
    background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4)',
    animation: 'confetti-fall 3s ease-in-out infinite'
  }}></div>
</div>

// Framer Motion Version
<motion.div
  initial={{ scale: 0, rotate: 0 }}
  animate={{ scale: [0, 1, 0], rotate: [0, 180, 360] }}
  transition={{ duration: 2, repeat: Infinity }}
  className="w-4 h-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
/>`,
    preview: (
      <div className="relative h-20">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
          <div className="w-4 h-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-bounce"></div>
</div>
        <div className="absolute top-2 left-1/3 transform -translate-x-1/2">
          <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
</div>
        <div className="absolute top-4 right-1/3 transform -translate-x-1/2">
          <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
</div>
</div>
    ),
  },
  {
    name: "Animated Statistic Counters",
    description: "Count up numbers and progress bars with smooth animations",
    code: `// CSS Version
<div className="space-y-4">
  <div className="text-4xl font-bold text-primary animate-pulse">1,234</div>
  <div className="w-full bg-gray-200 rounded-full h-2">
    <div className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out" style={{ width: '75%' }}></div>
</div>
</div>

// Framer Motion Version
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="text-4xl font-bold text-primary"
>
  {count}
</motion.div>`,
    preview: (
      <div className="space-y-4">
        <div className="text-4xl font-bold text-primary animate-pulse">1,234</div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out" style={{ width: '75%' }}></div>
</div>
        <div className="text-2xl font-semibold text-muted-foreground">75% Complete</div>
</div>
    ),
  },
  {
    name: "Timeline Reveal Animation",
    description: "Events slide in as you scroll with CSS and GSAP",
    code: `// CSS Version
<div className="space-y-6">
  <div className="timeline-item opacity-0 translate-x-[-50px] transition-all duration-700 ease-out">
    <h3 className="text-xl font-semibold">Event 1</h3>
    <p className="text-muted-foreground">Description of the first event</p>
</div>
  <div className="timeline-item opacity-0 translate-x-[-50px] transition-all duration-700 ease-out" style={{ transitionDelay: '0.2s' }}>
    <h3 className="text-xl font-semibold">Event 2</h3>
    <p className="text-muted-foreground">Description of the second event</p>
</div>
</div>

// GSAP Version
useEffect(() => {
  gsap.from('.timeline-item', {
    opacity: 0,
    x: -50,
    duration: 0.8,
    stagger: 0.2,
    scrollTrigger: {
      trigger: '.timeline-item',
      start: 'top 80%'
    }
  });
}, []);`,
    preview: (
      <div className="space-y-6">
        <div className="opacity-100 translate-x-0 transition-all duration-700 ease-out">
          <h3 className="text-xl font-semibold">Event 1</h3>
          <p className="text-muted-foreground">Description of the first event</p>
</div>
        <div className="opacity-100 translate-x-0 transition-all duration-700 ease-out">
          <h3 className="text-xl font-semibold">Event 2</h3>
          <p className="text-muted-foreground">Description of the second event</p>
</div>
        <div className="opacity-100 translate-x-0 transition-all duration-700 ease-out">
          <h3 className="text-xl font-semibold">Event 3</h3>
          <p className="text-muted-foreground">Description of the third event</p>
</div>
</div>
    ),
  },
  {
    name: "Hover Card Lift / Tilt",
    description: "3D tilt effects with CSS transforms and Framer Motion",
    code: `// CSS Version
<div className="group cursor-pointer">
  <div className="transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:-translate-y-2">
    <Card className="p-6">
      <h3 className="text-lg font-semibold">Hover Card</h3>
      <p className="text-muted-foreground">Hover to see the lift effect</p>
    </Card>
</div>
</div>

// Framer Motion Version
<motion.div
  whileHover={{ 
    scale: 1.05, 
    y: -8,
    rotateX: 5,
    rotateY: 5
  }}
  transition={{ type: "spring", stiffness: 300 }}
>
  <Card className="p-6">
    <h3 className="text-lg font-semibold">3D Tilt Card</h3>
    <p className="text-muted-foreground">Hover for 3D tilt effect</p>
  </Card>
</motion.div>`,
    preview: (
      <div className="group cursor-pointer">
        <div className="transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:-translate-y-2">
          <Card className="p-6">
            <h3 className="text-lg font-semibold">Hover Card</h3>
            <p className="text-muted-foreground">Hover to see the lift effect</p>
          </Card>
</div>
</div>
    ),
  },
  {
    name: "Page Fade In/Out",
    description: "Route transitions with shared element motion",
    code: `// CSS Version
<div className="page-transition opacity-0 animate-in fade-in duration-500">
  <h1 className="text-3xl font-bold">Welcome Page</h1>
  <p className="text-muted-foreground">This page fades in smoothly</p>
</div>

// Framer Motion Version
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.5 }}
>
  <h1 className="text-3xl font-bold">Animated Page</h1>
  <p className="text-muted-foreground">Smooth fade in/out transitions</p>
</motion.div>`,
    preview: (
      <div className="opacity-100 animate-in fade-in duration-500">
        <h1 className="text-3xl font-bold">Welcome Page</h1>
        <p className="text-muted-foreground">This page fades in smoothly</p>
</div>
    ),
  },
  {
    name: "Scroll Reveal Animations",
    description: "Trigger animations on scroll with CSS and GSAP",
    code: `// CSS Version
<div className="reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
  <h2 className="text-2xl font-bold">Scroll to Reveal</h2>
  <p className="text-muted-foreground">This content appears when scrolled into view</p>
</div>

// GSAP Version
useEffect(() => {
  gsap.from('.reveal-on-scroll', {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.3,
    scrollTrigger: {
      trigger: '.reveal-on-scroll',
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse'
    }
  });
}, []);`,
    preview: (
      <div className="opacity-100 translate-y-0 transition-all duration-700">
        <h2 className="text-2xl font-bold">Scroll to Reveal</h2>
        <p className="text-muted-foreground">This content appears when scrolled into view</p>
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <p className="text-sm">Additional content that reveals on scroll</p>
</div>
</div>
    ),
  },
  {
    name: "Hero Section Text Animation",
    description: "Staggered text animations with CSS and Framer Motion",
    code: `// CSS Version
<div className="hero-text">
  <h1 className="text-6xl font-bold overflow-hidden">
    <span className="block animate-slide-up" style={{ animationDelay: '0.1s' }}>Welcome</span>
    <span className="block animate-slide-up" style={{ animationDelay: '0.2s' }}>to Our</span>
    <span className="block animate-slide-up" style={{ animationDelay: '0.3s' }}>Platform</span>
  </h1>
</div>

// Framer Motion Version
<motion.h1
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, staggerChildren: 0.1 }}
  className="text-6xl font-bold"
>
  {["Welcome", "to Our", "Platform"].map((word, i) => (
    <motion.span
      key={i}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      className="block"
    >
      {word}
    </motion.span>
  ))}
</motion.h1>`,
    preview: (
      <div className="hero-text">
        <h1 className="text-6xl font-bold overflow-hidden">
          <span className="block animate-slide-up" style={{ animationDelay: '0.1s' }}>Welcome</span>
          <span className="block animate-slide-up" style={{ animationDelay: '0.2s' }}>to Our</span>
          <span className="block animate-slide-up" style={{ animationDelay: '0.3s' }}>Platform</span>
        </h1>
        <p className="text-xl text-muted-foreground mt-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          Build amazing experiences with modern animations
        </p>
</div>
    ),
  },
  {
    name: "Parallax Effects",
    description: "Multi-layer parallax synced with scroll position",
    code: `// CSS Version
<div className="parallax-container relative h-96 overflow-hidden">
  <div className="parallax-layer absolute inset-0 bg-blue-500/20" style={{ transform: 'translateZ(-1px) scale(2)' }}></div>
  <div className="parallax-layer absolute inset-0 bg-purple-500/20" style={{ transform: 'translateZ(-2px) scale(3)' }}></div>
  <div className="parallax-content relative z-10 flex items-center justify-center h-full">
    <h2 className="text-4xl font-bold text-white">Parallax Effect</h2>
</div>
</div>

// GSAP Version
useEffect(() => {
  gsap.to('.parallax-layer', {
    yPercent: -50,
    ease: 'none',
    scrollTrigger: {
      trigger: '.parallax-container',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });
}, []);`,
    preview: (
      <div className="parallax-container relative h-96 overflow-hidden rounded-lg">
        <div className="parallax-layer absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30"></div>
        <div className="parallax-layer absolute inset-0 bg-gradient-to-tl from-green-500/20 to-yellow-500/20"></div>
        <div className="parallax-content relative z-10 flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Parallax Effect</h2>
            <p className="text-white/80">Multi-layer background with scroll sync</p>
</div>
</div>
</div>
    ),
  },
  {
    name: "Dot + Trail Cursor",
    description: "Small dot follows mouse with trailing ghost effect",
    code: `// CSS Version
<div className="cursor-container relative">
  <div className="cursor-dot fixed w-3 h-3 bg-primary rounded-full pointer-events-none z-50 transition-transform duration-100 ease-out"></div>
  <div className="cursor-trail fixed w-6 h-6 bg-primary/30 rounded-full pointer-events-none z-40 transition-transform duration-200 ease-out"></div>
  <div className="content p-8">
    <h2 className="text-2xl font-bold mb-4">Hover around this area</h2>
    <p className="text-muted-foreground">Move your mouse to see the custom cursor effect</p>
</div>
</div>

// JavaScript Version
useEffect(() => {
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorTrail = document.querySelector('.cursor-trail');
  
  const moveCursor = (e) => {
    cursorDot.style.transform = \`translate(\${e.clientX - 6}px, \${e.clientY - 6}px)\`;
    cursorTrail.style.transform = \`translate(\${e.clientX - 12}px, \${e.clientY - 12}px)\`;
  };
  
  document.addEventListener('mousemove', moveCursor);
  return () => document.removeEventListener('mousemove', moveCursor);
}, []);`,
    preview: (
      <div className="cursor-container relative border rounded-lg p-8 bg-muted/30">
        <div className="w-3 h-3 bg-primary rounded-full mx-auto mb-4"></div>
        <div className="w-6 h-6 bg-primary/30 rounded-full mx-auto mb-4"></div>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Dot + Trail Cursor</h2>
          <p className="text-muted-foreground">Small dot with trailing ghost effect</p>
</div>
</div>
    ),
  },
  {
    name: "Magnetic Cursor",
    description: "Cursor pulls towards interactive elements with magnetic attraction",
    code: `// CSS Version
<div className="magnetic-container">
  <Button className="magnetic-button group relative overflow-hidden">
    <span className="relative z-10">Hover Me</span>
    <div className="absolute inset-0 bg-primary/20 scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"></div>
  </Button>
</div>

// JavaScript Version
useEffect(() => {
  const magneticElements = document.querySelectorAll('.magnetic-button');
  
  magneticElements.forEach(element => {
    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      element.style.transform = \`translate(\${x * 0.3}px, \${y * 0.3}px)\`;
    });
    
    element.addEventListener('mouseleave', () => {
      element.style.transform = 'translate(0px, 0px)';
    });
  });
}, []);`,
    preview: (
      <div className="magnetic-container space-y-4">
        <Button className="magnetic-button group relative overflow-hidden hover:scale-105 transition-transform duration-300">
          <span className="relative z-10">Hover Me</span>
          <div className="absolute inset-0 bg-primary/20 scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"></div>
        </Button>
        <Button variant="outline" className="magnetic-button group relative overflow-hidden hover:scale-105 transition-transform duration-300">
          <span className="relative z-10">Another Button</span>
          <div className="absolute inset-0 bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"></div>
        </Button>
</div>
    ),
  },
  {
    name: "Blob Cursor",
    description: "Smooth morphing blob follows pointer and expands on hover",
    code: `// CSS Version
<div className="blob-container relative">
  <div className="blob-cursor fixed w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full pointer-events-none z-50 mix-blend-multiply transition-all duration-300 ease-out"></div>
  <div className="content p-8">
    <h2 className="text-2xl font-bold mb-4">Blob Cursor Effect</h2>
    <p className="text-muted-foreground">Move your mouse to see the morphing blob</p>
</div>
</div>

// JavaScript Version
useEffect(() => {
  const blob = document.querySelector('.blob-cursor');
  
  const moveBlob = (e) => {
    blob.style.transform = \`translate(\${e.clientX - 16}px, \${e.clientY - 16}px)\`;
  };
  
  const expandBlob = (e) => {
    blob.style.width = '48px';
    blob.style.height = '48px';
    blob.style.transform = \`translate(\${e.clientX - 24}px, \${e.clientY - 24}px)\`;
  };
  
  const shrinkBlob = () => {
    blob.style.width = '32px';
    blob.style.height = '32px';
  };
  
  document.addEventListener('mousemove', moveBlob);
  document.addEventListener('mouseenter', expandBlob);
  document.addEventListener('mouseleave', shrinkBlob);
  
  return () => {
    document.removeEventListener('mousemove', moveBlob);
    document.removeEventListener('mouseenter', expandBlob);
    document.removeEventListener('mouseleave', shrinkBlob);
  };
}, []);`,
    preview: (
      <div className="blob-container relative border rounded-lg p-8 bg-muted/30">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4 mix-blend-multiply"></div>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Blob Cursor</h2>
          <p className="text-muted-foreground">Smooth morphing blob with hover expansion</p>
          <div className="mt-4 space-y-2">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mix-blend-multiply transition-transform duration-300 hover:scale-150"></div>
</div>
</div>
</div>
    ),
  },
  {
    name: "Text Hover Reveal Cursor",
    description: "Cursor shows highlight/underline effect when hovering text",
    code: `// CSS Version
<div className="text-hover-container">
  <h2 className="text-2xl font-bold mb-4 cursor-text">
    <span className="text-hover-item relative inline-block">
      Hover
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
    </span>
    <span className="text-hover-item relative inline-block ml-2">
      over
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
    </span>
    <span className="text-hover-item relative inline-block ml-2">
      text
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
    </span>
  </h2>
</div>

// JavaScript Version
useEffect(() => {
  const textItems = document.querySelectorAll('.text-hover-item');
  
  textItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const underline = item.querySelector('span');
      underline.style.width = '100%';
    });
    
    item.addEventListener('mouseleave', () => {
      const underline = item.querySelector('span');
      underline.style.width = '0%';
    });
  });
}, []);`,
    preview: (
      <div className="text-hover-container">
        <h2 className="text-2xl font-bold mb-4 cursor-text">
          <span className="text-hover-item relative inline-block group">
            Hover
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </span>
          <span className="text-hover-item relative inline-block ml-2 group">
            over
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </span>
          <span className="text-hover-item relative inline-block ml-2 group">
            text
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </span>
        </h2>
        <p className="text-muted-foreground">Move your cursor over the text to see the underline effect</p>
</div>
    ),
  },
  {
    name: "Cursor as Tooltip",
    description: "Cursor transforms into a tooltip showing content like image previews",
    code: `// CSS Version
<div className="tooltip-cursor-container">
  <div className="cursor-tooltip fixed w-32 h-32 bg-white border rounded-lg shadow-lg pointer-events-none z-50 opacity-0 transition-opacity duration-200">
    <img src="/placeholder-image.jpg" alt="Preview" className="w-full h-full object-cover rounded" />
</div>
  <div className="content p-8">
    <h2 className="text-2xl font-bold mb-4">Hover for Tooltip</h2>
    <p className="text-muted-foreground">Move your cursor over this area to see the tooltip cursor</p>
</div>
</div>

// JavaScript Version
useEffect(() => {
  const tooltip = document.querySelector('.cursor-tooltip');
  const container = document.querySelector('.tooltip-cursor-container');
  
  const showTooltip = (e) => {
    tooltip.style.opacity = '1';
    tooltip.style.transform = \`translate(\${e.clientX + 20}px, \${e.clientY - 64}px)\`;
  };
  
  const hideTooltip = () => {
    tooltip.style.opacity = '0';
  };
  
  const moveTooltip = (e) => {
    tooltip.style.transform = \`translate(\${e.clientX + 20}px, \${e.clientY - 64}px)\`;
  };
  
  container.addEventListener('mouseenter', showTooltip);
  container.addEventListener('mouseleave', hideTooltip);
  container.addEventListener('mousemove', moveTooltip);
  
  return () => {
    container.removeEventListener('mouseenter', showTooltip);
    container.removeEventListener('mouseleave', hideTooltip);
    container.removeEventListener('mousemove', moveTooltip);
  };
}, []);`,
    preview: (
      <div className="tooltip-cursor-container border rounded-lg p-8 bg-muted/30">
        <div className="w-32 h-32 bg-white border rounded-lg shadow-lg mx-auto mb-4 flex items-center justify-center">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">Preview</span>
</div>
</div>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Cursor as Tooltip</h2>
          <p className="text-muted-foreground">Hover to see tooltip cursor effect</p>
</div>
</div>
    ),
  },
  {
    name: "Gradient Circle Cursor",
    description: "Circle with animated gradient inside follows mouse movement",
    code: `// CSS Version
<div className="gradient-cursor-container">
  <div className="gradient-cursor fixed w-12 h-12 rounded-full pointer-events-none z-50">
    <div className="w-full h-full rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-spin"></div>
</div>
  <div className="content p-8">
    <h2 className="text-2xl font-bold mb-4">Gradient Circle Cursor</h2>
    <p className="text-muted-foreground">Move your mouse to see the animated gradient circle</p>
</div>
</div>

// JavaScript Version
useEffect(() => {
  const gradientCursor = document.querySelector('.gradient-cursor');
  
  const moveGradientCursor = (e) => {
    gradientCursor.style.transform = \`translate(\${e.clientX - 24}px, \${e.clientY - 24}px)\`;
  };
  
  const expandGradientCursor = () => {
    gradientCursor.style.transform += ' scale(1.5)';
  };
  
  const shrinkGradientCursor = () => {
    gradientCursor.style.transform = gradientCursor.style.transform.replace(' scale(1.5)', '');
  };
  
  document.addEventListener('mousemove', moveGradientCursor);
  document.addEventListener('mouseenter', expandGradientCursor);
  document.addEventListener('mouseleave', shrinkGradientCursor);
  
  return () => {
    document.removeEventListener('mousemove', moveGradientCursor);
    document.removeEventListener('mouseenter', expandGradientCursor);
    document.removeEventListener('mouseleave', shrinkGradientCursor);
  };
}, []);`,
    preview: (
      <div className="gradient-cursor-container border rounded-lg p-8 bg-muted/30">
        <div className="w-12 h-12 rounded-full mx-auto mb-4">
          <div className="w-full h-full rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-spin"></div>
</div>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Gradient Circle Cursor</h2>
          <p className="text-muted-foreground">Animated gradient circle following mouse</p>
          <div className="mt-4 space-y-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-spin mx-auto"></div>
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 animate-spin mx-auto" style={{ animationDirection: 'reverse' }}></div>
</div>
</div>
</div>
    ),
  },
  {
    name: "Drag Cursor",
    description: "Changes shape to arrows, grab/hand when dragging elements",
    code: `// CSS Version
<div className="drag-cursor-container space-y-4">
  <div className="draggable-item p-4 border rounded-lg cursor-grab active:cursor-grabbing hover:bg-muted/50 transition-colors">
    <h3 className="font-semibold">Drag Me (Grab)</h3>
    <p className="text-sm text-muted-foreground">Click and drag to see cursor change</p>
</div>
  
  <div className="resizable-item p-4 border rounded-lg cursor-ns-resize hover:bg-muted/50 transition-colors">
    <h3 className="font-semibold">Resize Me (NS)</h3>
    <p className="text-sm text-muted-foreground">North-south resize cursor</p>
</div>
  
  <div className="moveable-item p-4 border rounded-lg cursor-move hover:bg-muted/50 transition-colors">
    <h3 className="font-semibold">Move Me (Move)</h3>
    <p className="text-sm text-muted-foreground">Move cursor for repositioning</p>
</div>
</div>

// JavaScript Version
useEffect(() => {
  const draggableItems = document.querySelectorAll('.draggable-item, .resizable-item, .moveable-item');
  
  draggableItems.forEach(item => {
    let isDragging = false;
    
    const handleMouseDown = () => {
      isDragging = true;
      item.style.cursor = item.classList.contains('draggable-item') ? 'grabbing' : 
                         item.classList.contains('resizable-item') ? 'ns-resize' : 'move';
    };
    
    const handleMouseUp = () => {
      isDragging = false;
      item.style.cursor = item.classList.contains('draggable-item') ? 'grab' : 
                         item.classList.contains('resizable-item') ? 'ns-resize' : 'move';
    };
    
    item.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      item.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  });
}, []);`,
    preview: (
      <div className="drag-cursor-container space-y-4">
        <div className="draggable-item p-4 border rounded-lg cursor-grab active:cursor-grabbing hover:bg-muted/50 transition-colors">
          <h3 className="font-semibold">Drag Me (Grab)</h3>
          <p className="text-sm text-muted-foreground">Click and drag to see cursor change</p>
</div>
        
        <div className="resizable-item p-4 border rounded-lg cursor-ns-resize hover:bg-muted/50 transition-colors">
          <h3 className="font-semibold">Resize Me (NS)</h3>
          <p className="text-sm text-muted-foreground">North-south resize cursor</p>
</div>
        
        <div className="moveable-item p-4 border rounded-lg cursor-move hover:bg-muted/50 transition-colors">
          <h3 className="font-semibold">Move Me (Move)</h3>
          <p className="text-sm text-muted-foreground">Move cursor for repositioning</p>
</div>
        
        <div className="text-center text-sm text-muted-foreground">
          <p>Try clicking and dragging on the items above</p>
</div>
</div>
    ),
  },
  {
    name: "Animated Gradient Background",
    description: "Linear and radial gradients smoothly shifting colors with CSS animations",
    code: `// CSS Version
<div className="animated-gradient-container relative h-64 overflow-hidden rounded-lg">
  {/* Linear Gradient */}
  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-x"></div>
  
  {/* Radial Gradient */}
  <div className="absolute inset-0 bg-gradient-radial from-green-400 via-blue-500 to-purple-600 animate-pulse opacity-50"></div>
  
  {/* Content */}
  <div className="relative z-10 flex items-center justify-center h-full">
    <div className="text-center text-white">
      <h2 className="text-3xl font-bold mb-2">Animated Background</h2>
      <p className="text-white/80">Smoothly shifting gradient colors</p>
</div>
</div>
</div>

// Custom CSS Animation
// Add this CSS to your stylesheet:
// @keyframes gradient-x {
//   0%, 100% { background-position: 0% 50%; }
//   50% { background-position: 100% 50%; }
// }
// 
// .animate-gradient-x {
//   background-size: 200% 200%;
//   animation: gradient-x 15s ease infinite;
// }`,
    preview: (
      <div className="animated-gradient-container relative h-64 overflow-hidden rounded-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-radial from-green-400 via-blue-500 to-purple-600 animate-pulse opacity-50"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-2">Animated Background</h2>
            <p className="text-white/80">Smoothly shifting gradient colors</p>
</div>
</div>
</div>
    ),
  },
  {
    name: "Noise Texture Overlay",
    description: "Subtle static/film grain for retro or depth effect",
    code: `// CSS Version
<div className="noise-texture-container relative h-64 overflow-hidden rounded-lg">
  {/* Base Background */}
  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-700"></div>
  
  {/* Noise Overlay */}
  <div className="absolute inset-0 opacity-10">
    <div className="w-full h-full" style={{
      backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%" height="100%" filter="url(%23noise)" opacity="0.4"/%3E%3C/svg%3E")',
      backgroundSize: '200px 200px'
    }}></div>
</div>
  
  {/* Content */}
  <div className="relative z-10 flex items-center justify-center h-full">
    <div className="text-center text-white">
      <h2 className="text-3xl font-bold mb-2">Noise Texture</h2>
      <p className="text-white/80">Subtle film grain effect</p>
</div>
</div>
</div>

// JavaScript Version with Canvas
useEffect(() => {
  const canvas = document.getElementById('noise-canvas');
  const ctx = canvas.getContext('2d');
  
  const generateNoise = () => {
    const imageData = ctx.createImageData(200, 200);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      const noise = Math.random() * 255;
      data[i] = noise;     // Red
      data[i + 1] = noise; // Green
      data[i + 2] = noise; // Blue
      data[i + 3] = 50;    // Alpha
    }
    
    ctx.putImageData(imageData, 0, 0);
  };
  
  generateNoise();
}, []);`,
    preview: (
      <div className="noise-texture-container relative h-64 overflow-hidden rounded-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-700"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20200%20200%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.65%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22/%3E%3C/filter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url%28%23noise%29%22%20opacity%3D%220.4%22/%3E%3C/svg%3E')] bg-[length:200px_200px]"></div>
</div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-2">Noise Texture</h2>
            <p className="text-white/80">Subtle film grain effect</p>
</div>
</div>
</div>
    ),
  },
  {
    name: "Geometric Grid Background",
    description: "Pure CSS grid with glowing lines for modern design",
    code: `// CSS Version
<div className="geometric-grid-container relative h-64 overflow-hidden rounded-lg">
  {/* Grid Pattern */}
  <div className="absolute inset-0" style={{
    backgroundImage: \`
      linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
    \`,
    backgroundSize: '20px 20px'
  }}></div>
  
  {/* Glowing Lines */}
  <div className="absolute inset-0" style={{
    backgroundImage: \`
      linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
      linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
    \`,
    backgroundSize: '60px 60px',
    filter: 'blur(0.5px)'
  }}></div>
  
  {/* Animated Glow */}
  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-transparent to-purple-500/20 animate-pulse"></div>
  
  {/* Content */}
  <div className="relative z-10 flex items-center justify-center h-full">
    <div className="text-center text-white">
      <h2 className="text-3xl font-bold mb-2">Geometric Grid</h2>
      <p className="text-white/80">Modern grid with glowing lines</p>
</div>
</div>
</div>

// CSS Custom Properties
// Add this CSS to your stylesheet:
// .geometric-grid-container {
//   --grid-color: rgba(59, 130, 246, 0.1);
//   --grid-glow: rgba(59, 130, 246, 0.3);
//   --grid-size: 20px;
//   --grid-glow-size: 60px;
// }`,
    preview: (
      <div className="geometric-grid-container relative h-64 overflow-hidden rounded-lg">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          filter: 'blur(0.5px)'
        }}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-transparent to-purple-500/20 animate-pulse"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-2">Geometric Grid</h2>
            <p className="text-white/80">Modern grid with glowing lines</p>
</div>
</div>
</div>
    ),
  },
  {
    name: "Particle Background",
    description: "Moving dots connected with lines using canvas or CSS transforms",
    code: `// CSS Version with animated dots
<div className="particle-container relative h-64 overflow-hidden rounded-lg bg-gray-900">
  {/* Animated particles */}
  <div className="absolute inset-0">
    <div className="particle absolute w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{
      top: '20%',
      left: '10%',
      animation: 'particle-float 8s ease-in-out infinite'
    }}></div>
    <div className="particle absolute w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{
      top: '30%',
      left: '80%',
      animation: 'particle-float 10s ease-in-out infinite reverse'
    }}></div>
    <div className="particle absolute w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{
      top: '70%',
      left: '20%',
      animation: 'particle-float 12s ease-in-out infinite'
    }}></div>
    <div className="particle absolute w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{
      top: '60%',
      left: '70%',
      animation: 'particle-float 9s ease-in-out infinite reverse'
    }}></div>
</div>
  
  {/* Connecting lines */}
  <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
    <line x1="10%" y1="20%" x2="80%" y2="30%" stroke="#3B82F6" strokeWidth="1" opacity="0.6" />
    <line x1="20%" y1="70%" x2="70%" y2="60%" stroke="#8B5CF6" strokeWidth="1" opacity="0.6" />
    <line x1="10%" y1="20%" x2="20%" y2="70%" stroke="#EC4899" strokeWidth="1" opacity="0.6" />
    <line x1="80%" y1="30%" x2="70%" y2="60%" stroke="#10B981" strokeWidth="1" opacity="0.6" />
  </svg>
  
  {/* Content */}
  <div className="relative z-10 flex items-center justify-center h-full">
    <div className="text-center text-white">
      <h2 className="text-3xl font-bold mb-2">Particle Background</h2>
      <p className="text-white/80">Moving dots with connecting lines</p>
</div>
</div>
</div>`,
    preview: (
      <div className="particle-container relative h-64 overflow-hidden rounded-lg bg-gray-900">
        <div className="absolute inset-0">
          <div className="particle absolute w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{
            top: '20%',
            left: '10%'
          }}></div>
          <div className="particle absolute w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{
            top: '30%',
            left: '80%'
          }}></div>
          <div className="particle absolute w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{
            top: '70%',
            left: '20%'
          }}></div>
          <div className="particle absolute w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{
            top: '60%',
            left: '70%'
          }}></div>
</div>
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
          <line x1="10%" y1="20%" x2="80%" y2="30%" stroke="#3B82F6" strokeWidth="1" opacity="0.6" />
          <line x1="20%" y1="70%" x2="70%" y2="60%" stroke="#8B5CF6" strokeWidth="1" opacity="0.6" />
          <line x1="10%" y1="20%" x2="20%" y2="70%" stroke="#EC4899" strokeWidth="1" opacity="0.6" />
          <line x1="80%" y1="30%" x2="70%" y2="60%" stroke="#10B981" strokeWidth="1" opacity="0.6" />
        </svg>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-2">Particle Background</h2>
            <p className="text-white/80">Moving dots with connecting lines</p>
</div>
</div>
</div>
    ),
  },
  {
    name: "Waves Animation",
    description: "Sinusoidal wave effect using CSS clip-path or SVG",
    code: `// CSS Version with clip-path
<div className="waves-container relative h-64 overflow-hidden rounded-lg">
  {/* Wave 1 */}
  <div className="absolute inset-0 bg-blue-500" style={{
    clipPath: 'polygon(0 50%, 10% 45%, 20% 55%, 30% 40%, 40% 60%, 50% 35%, 60% 65%, 70% 30%, 80% 70%, 90% 25%, 100% 75%, 100% 100%, 0 100%)'
  }}></div>
  
  {/* Wave 2 */}
  <div className="absolute inset-0 bg-blue-400 opacity-80" style={{
    clipPath: 'polygon(0 60%, 10% 55%, 20% 65%, 30% 50%, 40% 70%, 50% 45%, 60% 75%, 70% 40%, 80% 80%, 90% 35%, 100% 85%, 100% 100%, 0 100%)'
  }}></div>
  
  {/* Wave 3 */}
  <div className="absolute inset-0 bg-blue-300 opacity-60" style={{
    clipPath: 'polygon(0 70%, 10% 65%, 20% 75%, 30% 60%, 40% 80%, 50% 55%, 60% 85%, 70% 50%, 80% 90%, 90% 45%, 100% 95%, 100% 100%, 0 100%)'
  }}></div>
  
  {/* Content */}
  <div className="relative z-10 flex items-center justify-center h-full">
    <div className="text-center text-white">
      <h2 className="text-3xl font-bold mb-2">Waves Animation</h2>
      <p className="text-white/80">Sinusoidal wave effects</p>
</div>
</div>
</div>`,
    preview: (
      <div className="waves-container relative h-64 overflow-hidden rounded-lg">
        <div className="absolute inset-0 bg-blue-500" style={{
          clipPath: 'polygon(0 50%, 10% 45%, 20% 55%, 30% 40%, 40% 60%, 50% 35%, 60% 65%, 70% 30%, 80% 70%, 90% 25%, 100% 75%, 100% 100%, 0 100%)'
        }}></div>
        <div className="absolute inset-0 bg-blue-400 opacity-80" style={{
          clipPath: 'polygon(0 60%, 10% 55%, 20% 65%, 30% 50%, 40% 70%, 50% 45%, 60% 75%, 70% 40%, 80% 80%, 90% 35%, 100% 85%, 100% 100%, 0 100%)'
        }}></div>
        <div className="absolute inset-0 bg-blue-300 opacity-60" style={{
          clipPath: 'polygon(0 70%, 10% 65%, 20% 75%, 30% 60%, 40% 80%, 50% 55%, 60% 85%, 70% 50%, 80% 90%, 90% 45%, 100% 95%, 100% 100%, 0 100%)'
        }}></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-2">Waves Animation</h2>
            <p className="text-white/80">Sinusoidal wave effects</p>
</div>
</div>
</div>
    ),
  },
  {
    name: "Particle Background",
    description: "Moving dots connected with lines using canvas or CSS transforms",
    code: `// CSS Version with animated dots
<div className="particle-container relative h-64 overflow-hidden rounded-lg bg-gray-900">
  {/* Animated particles */}
  <div className="absolute inset-0">
    <div className="particle absolute w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{
      top: '20%',
      left: '10%',
      animation: 'particle-float 8s ease-in-out infinite'
    }}></div>
    <div className="particle absolute w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{
      top: '30%',
      left: '80%',
      animation: 'particle-float 10s ease-in-out infinite reverse'
    }}></div>
    <div className="particle absolute w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{
      top: '70%',
      left: '20%',
      animation: 'particle-float 12s ease-in-out infinite'
    }}></div>
    <div className="particle absolute w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{
      top: '60%',
      left: '70%',
      animation: 'particle-float 9s ease-in-out infinite reverse'
    }}></div>
</div>
  
  {/* Connecting lines */}
  <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
    <line x1="10%" y1="20%" x2="80%" y2="30%" stroke="#3B82F6" strokeWidth="1" opacity="0.6" />
    <line x1="20%" y1="70%" x2="70%" y2="60%" stroke="#8B5CF6" strokeWidth="1" opacity="0.6" />
    <line x1="10%" y1="20%" x2="20%" y2="70%" stroke="#EC4899" strokeWidth="1" opacity="0.6" />
    <line x1="80%" y1="30%" x2="70%" y2="60%" stroke="#10B981" strokeWidth="1" opacity="0.6" />
  </svg>
  
  {/* Content */}
  <div className="relative z-10 flex items-center justify-center h-full">
    <div className="text-center text-white">
      <h2 className="text-3xl font-bold mb-2">Particle Background</h2>
      <p className="text-white/80">Moving dots with connecting lines</p>
</div>
</div>
</div>`,
    preview: (
      <div className="particle-container relative h-64 overflow-hidden rounded-lg bg-gray-900">
        <div className="absolute inset-0">
          <div className="particle absolute w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{
            top: '20%',
            left: '10%'
          }}></div>
          <div className="particle absolute w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{
            top: '30%',
            left: '80%'
          }}></div>
          <div className="particle absolute w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{
            top: '70%',
            left: '20%'
          }}></div>
          <div className="particle absolute w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{
            top: '60%',
            left: '70%'
          }}></div>
</div>
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
          <line x1="10%" y1="20%" x2="80%" y2="30%" stroke="#3B82F6" strokeWidth="1" opacity="0.6" />
          <line x1="20%" y1="70%" x2="70%" y2="60%" stroke="#8B5CF6" strokeWidth="1" opacity="0.6" />
          <line x1="10%" y1="20%" x2="20%" y2="70%" stroke="#EC4899" strokeWidth="1" opacity="0.6" />
          <line x1="80%" y1="30%" x2="70%" y2="60%" stroke="#10B981" strokeWidth="1" opacity="0.6" />
        </svg>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-2">Particle Background</h2>
            <p className="text-white/80">Moving dots with connecting lines</p>
</div>
</div>
</div>
    ),
  },
  {
    name: "Aurora / Neon Glow Background",
    description: "Animated blur blobs blending like northern lights",
    code: `// CSS Version
<div className="aurora-container relative h-64 overflow-hidden rounded-lg">
  {/* Aurora Blob 1 */}
  <div className="absolute top-0 left-1/4 w-32 h-32 bg-green-400 rounded-full blur-3xl opacity-60 animate-pulse" style={{
    animation: 'aurora-float 8s ease-in-out infinite'
  }}></div>
  
  {/* Aurora Blob 2 */}
  <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-blue-400 rounded-full blur-3xl opacity-50 animate-pulse" style={{
    animation: 'aurora-float 10s ease-in-out infinite reverse'
  }}></div>
  
  {/* Aurora Blob 3 */}
  <div className="absolute bottom-1/4 left-1/3 w-36 h-36 bg-purple-400 rounded-full blur-3xl opacity-70 animate-pulse" style={{
    animation: 'aurora-float 12s ease-in-out infinite'
  }}></div>
  
  {/* Content */}
  <div className="relative z-10 flex items-center justify-center h-full">
    <div className="text-center text-white">
      <h2 className="text-3xl font-bold mb-2">Aurora Background</h2>
      <p className="text-white/80">Northern lights effect</p>
</div>
</div>
</div>`,
    preview: (
      <div className="aurora-container relative h-64 overflow-hidden rounded-lg bg-gray-900">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-green-400 rounded-full blur-3xl opacity-60 animate-pulse"></div>
        <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-blue-400 rounded-full blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/3 w-36 h-36 bg-purple-400 rounded-full blur-3xl opacity-70 animate-pulse"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-2">Aurora Background</h2>
            <p className="text-white/80">Northern lights effect</p>
</div>
</div>
</div>
    ),
  },
  {
    name: "Waves Animation",
    description: "Sinusoidal wave effect using CSS clip-path or SVG",
    code: `// CSS Version with clip-path
<div className="waves-container relative h-64 overflow-hidden rounded-lg">
  {/* Wave 1 */}
  <div className="absolute inset-0 bg-blue-500" style={{
    clipPath: 'polygon(0 50%, 10% 45%, 20% 55%, 30% 40%, 40% 60%, 50% 35%, 60% 65%, 70% 30%, 80% 70%, 90% 25%, 100% 75%, 100% 100%, 0 100%)'
  }}></div>
  
  {/* Wave 2 */}
  <div className="absolute inset-0 bg-blue-400 opacity-80" style={{
    clipPath: 'polygon(0 60%, 10% 55%, 20% 65%, 30% 50%, 40% 70%, 50% 45%, 60% 75%, 70% 40%, 80% 80%, 90% 35%, 100% 85%, 100% 100%, 0 100%)'
  }}></div>
  
  {/* Wave 3 */}
  <div className="absolute inset-0 bg-blue-300 opacity-60" style={{
    clipPath: 'polygon(0 70%, 10% 65%, 20% 75%, 30% 60%, 40% 80%, 50% 55%, 60% 85%, 70% 50%, 80% 90%, 90% 45%, 100% 95%, 100% 100%, 0 100%)'
  }}></div>
  
  {/* Content */}
  <div className="relative z-10 flex items-center justify-center h-full">
    <div className="text-center text-white">
      <h2 className="text-3xl font-bold mb-2">Waves Animation</h2>
      <p className="text-white/80">Sinusoidal wave effects</p>
</div>
</div>
</div>`,
    preview: (
      <div className="waves-container relative h-64 overflow-hidden rounded-lg">
        <div className="absolute inset-0 bg-blue-500" style={{
          clipPath: 'polygon(0 50%, 10% 45%, 20% 55%, 30% 40%, 40% 60%, 50% 35%, 60% 65%, 70% 30%, 80% 70%, 90% 25%, 100% 75%, 100% 100%, 0 100%)'
        }}></div>
        <div className="absolute inset-0 bg-blue-400 opacity-80" style={{
          clipPath: 'polygon(0 60%, 10% 55%, 20% 65%, 30% 50%, 40% 70%, 50% 45%, 60% 75%, 70% 40%, 80% 80%, 90% 35%, 100% 85%, 100% 100%, 0 100%)'
        }}></div>
        <div className="absolute inset-0 bg-blue-300 opacity-60" style={{
          clipPath: 'polygon(0 70%, 10% 65%, 20% 75%, 30% 60%, 40% 80%, 50% 55%, 60% 85%, 70% 50%, 80% 90%, 90% 45%, 100% 95%, 100% 100%, 0 100%)'
        }}></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-2">Waves Animation</h2>
            <p className="text-white/80">Sinusoidal wave effects</p>
</div>
</div>
</div>
    ),
  },
  {
    name: "Particle Background",
    description: "Moving dots connected with lines using canvas or CSS transforms",
    code: `// CSS Version with animated dots
<div className="particle-container relative h-64 overflow-hidden rounded-lg bg-gray-900">
  {/* Animated particles */}
  <div className="absolute inset-0">
    <div className="particle absolute w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{
      top: '20%',
      left: '10%',
      animation: 'particle-float 8s ease-in-out infinite'
    }}></div>
    <div className="particle absolute w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{
      top: '30%',
      left: '80%',
      animation: 'particle-float 10s ease-in-out infinite reverse'
    }}></div>
    <div className="particle absolute w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{
      top: '70%',
      left: '20%',
      animation: 'particle-float 12s ease-in-out infinite'
    }}></div>
    <div className="particle absolute w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{
      top: '60%',
      left: '70%',
      animation: 'particle-float 9s ease-in-out infinite reverse'
    }}></div>
</div>
  
  {/* Connecting lines */}
  <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
    <line x1="10%" y1="20%" x2="80%" y2="30%" stroke="#3B82F6" strokeWidth="1" opacity="0.6" />
    <line x1="20%" y1="70%" x2="70%" y2="60%" stroke="#8B5CF6" strokeWidth="1" opacity="0.6" />
    <line x1="10%" y1="20%" x2="20%" y2="70%" stroke="#EC4899" strokeWidth="1" opacity="0.6" />
    <line x1="80%" y1="30%" x2="70%" y2="60%" stroke="#10B981" strokeWidth="1" opacity="0.6" />
  </svg>
  
  {/* Content */}
  <div className="relative z-10 flex items-center justify-center h-full">
    <div className="text-center text-white">
      <h2 className="text-3xl font-bold mb-2">Particle Background</h2>
      <p className="text-white/80">Moving dots with connecting lines</p>
</div>
</div>
</div>`,
    preview: (
      <div className="particle-container relative h-64 overflow-hidden rounded-lg bg-gray-900">
        <div className="absolute inset-0">
          <div className="particle absolute w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{
            top: '20%',
            left: '10%'
          }}></div>
          <div className="particle absolute w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{
            top: '30%',
            left: '80%'
          }}></div>
          <div className="particle absolute w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{
            top: '70%',
            left: '20%'
          }}></div>
          <div className="particle absolute w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{
            top: '60%',
            left: '70%'
          }}></div>
</div>
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
          <line x1="10%" y1="20%" x2="80%" y2="30%" stroke="#3B82F6" strokeWidth="1" opacity="0.6" />
          <line x1="20%" y1="70%" x2="70%" y2="60%" stroke="#8B5CF6" strokeWidth="1" opacity="0.6" />
          <line x1="10%" y1="20%" x2="20%" y2="70%" stroke="#EC4899" strokeWidth="1" opacity="0.6" />
          <line x1="80%" y1="30%" x2="70%" y2="60%" stroke="#10B981" strokeWidth="1" opacity="0.6" />
        </svg>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-2">Particle Background</h2>
            <p className="text-white/80">Moving dots with connecting lines</p>
</div>
</div>
</div>
    ),
  },
  {
    name: "Scrolling Parallax Background",
    description: "Multiple layers moving at different speeds",
    code: `// CSS Version
<div className="parallax-container relative h-96 overflow-hidden rounded-lg">
  {/* Background Layer 1 - Slowest */}
  <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900 transform translate-y-0" style={{
    transform: 'translateY(calc(var(--scroll-y, 0) * 0.1px))'
  }}></div>
  
  {/* Background Layer 2 - Medium */}
  <div className="absolute inset-0 bg-gradient-to-tl from-green-800 to-blue-800 opacity-50 transform translate-y-0" style={{
    transform: 'translateY(calc(var(--scroll-y, 0) * 0.3px))'
  }}></div>
  
  {/* Background Layer 3 - Fastest */}
  <div className="absolute inset-0 bg-gradient-to-r from-purple-800 to-pink-800 opacity-30 transform translate-y-0" style={{
    transform: 'translateY(calc(var(--scroll-y, 0) * 0.5px))'
  }}></div>
  
  {/* Content */}
  <div className="relative z-10 flex items-center justify-center h-full">
    <div className="text-center text-white">
      <h2 className="text-3xl font-bold mb-2">Parallax Background</h2>
      <p className="text-white/80">Multiple layers at different speeds</p>
</div>
</div>
</div>

// JavaScript Version
useEffect(() => {
  const handleScroll = () => {
    const scrolled = window.pageYOffset;
    document.documentElement.style.setProperty('--scroll-y', scrolled.toString());
  };
  
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);`,
    preview: (
      <div className="parallax-container relative h-96 overflow-hidden rounded-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-green-800 to-blue-800 opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800 to-pink-800 opacity-30"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-2">Parallax Background</h2>
            <p className="text-white/80">Multiple layers at different speeds</p>
</div>
</div>
</div>
    ),
  },
  {
    name: "Checkerboard / Isometric Pattern",
    description: "CSS gradients to form repeating patterns",
    code: `// CSS Version - Checkerboard
<div className="pattern-container relative h-64 overflow-hidden rounded-lg">
  {/* Checkerboard Pattern */}
  <div className="absolute inset-0" style={{
    backgroundImage: \`
      linear-gradient(45deg, #3B82F6 25%, transparent 25%),
      linear-gradient(-45deg, #3B82F6 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #3B82F6 75%),
      linear-gradient(-45deg, transparent 75%, #3B82F6 75%)
    \`,
    backgroundSize: '40px 40px',
    backgroundPosition: '0 0, 0 20px, 20px -20px, -20px 0px'
  }}></div>
  
  {/* Isometric Pattern */}
  <div className="absolute inset-0 opacity-50" style={{
    backgroundImage: \`
      linear-gradient(30deg, #8B5CF6 12%, transparent 12.5%, transparent 87%, #8B5CF6 87.5%, #8B5CF6),
      linear-gradient(150deg, #8B5CF6 12%, transparent 12.5%, transparent 87%, #8B5CF6 87.5%, #8B5CF6),
      linear-gradient(30deg, #8B5CF6 12%, transparent 12.5%, transparent 87%, #8B5CF6 87.5%, #8B5CF6),
      linear-gradient(150deg, #8B5CF6 12%, transparent 12.5%, transparent 87%, #8B5CF6 87.5%, #8B5CF6),
      linear-gradient(60deg, #EC4899 25%, transparent 25.5%, transparent 75%, #EC4899 75%, #EC4899),
      linear-gradient(60deg, #EC4899 25%, transparent 25.5%, transparent 75%, #EC4899 75%, #EC4899)
    \`,
    backgroundSize: '80px 140px',
    backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px'
  }}></div>
  
  {/* Content */}
  <div className="relative z-10 flex items-center justify-center h-full">
    <div className="text-center text-white">
      <h2 className="text-3xl font-bold mb-2">Pattern Background</h2>
      <p className="text-white/80">Checkerboard and isometric patterns</p>
</div>
</div>
</div>

// CSS Custom Properties
// Add this CSS to your stylesheet:
// .pattern-container {
//   --pattern-size: 40px;
//   --pattern-color: #3B82F6;
//   --isometric-size: 80px;
//   --isometric-color: #8B5CF6;
// }`,
    preview: (
      <div className="pattern-container relative h-64 overflow-hidden rounded-lg">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(45deg, #3B82F6 25%, transparent 25%),
            linear-gradient(-45deg, #3B82F6 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #3B82F6 75%),
            linear-gradient(-45deg, transparent 75%, #3B82F6 75%)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 0 20px, 20px -20px, -20px 0px'
        }}></div>
        <div className="absolute inset-0 opacity-50" style={{
          backgroundImage: `
            linear-gradient(30deg, #8B5CF6 12%, transparent 12.5%, transparent 87%, #8B5CF6 87.5%, #8B5CF6),
            linear-gradient(150deg, #8B5CF6 12%, transparent 12.5%, transparent 87%, #8B5CF6 87.5%, #8B5CF6),
            linear-gradient(30deg, #8B5CF6 12%, transparent 12.5%, transparent 87%, #8B5CF6 87.5%, #8B5CF6),
            linear-gradient(150deg, #8B5CF6 12%, transparent 12.5%, transparent 87%, #8B5CF6 87.5%, #8B5CF6),
            linear-gradient(60deg, #EC4899 25%, transparent 25.5%, transparent 75%, #EC4899 75%, #EC4899),
            linear-gradient(60deg, #EC4899 25%, transparent 25.5%, transparent 75%, #EC4899 75%, #EC4899)
          `,
          backgroundSize: '80px 140px',
          backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px'
        }}></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-2">Pattern Background</h2>
            <p className="text-white/80">Checkerboard and isometric patterns</p>
</div>
</div>
</div>
    ),
  },
  {
    name: "Ripple Click Effect",
    description: "Expanding ripple when user clicks (like Material Design)",
    code: `// CSS Version with ripple effect
const RippleButton = () => {
  const [ripples, setRipples] = useState<Array<{id: number, x: number, y: number}>>([]);
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = {
      id: Date.now(),
      x,
      y
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);
  };
  
  return (
    <button 
      className="relative overflow-hidden px-6 py-3 bg-blue-500 text-white rounded-lg font-medium transition-colors hover:bg-blue-600 active:bg-blue-700"
      onClick={handleClick}
    >
      Click for Ripple Effect
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute w-0 h-0 bg-white/30 rounded-full animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}
    </button>
  );
};`,
    preview: (
      <div className="flex items-center justify-center h-64">
        <button className="relative overflow-hidden px-6 py-3 bg-blue-500 text-white rounded-lg font-medium transition-colors hover:bg-blue-600 active:bg-blue-700">
          Click for Ripple Effect
        </button>
      </div>
    ),
  },
  {
    name: "Confetti Burst on Click",
    description: "Little triangles/circles explode outward",
    code: `// Confetti burst effect component
const ConfettiButton = () => {
  const [confetti, setConfetti] = useState<Array<{id: number, x: number, y: number, color: string, rotation: number, scale: number}>>([]);
  
  const colors = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'];
  
  const handleClick = () => {
    const newConfetti = Array.from({ length: 20 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 200 - 100,
      y: Math.random() * 200 - 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      scale: Math.random() * 0.5 + 0.5
    }));
    
    setConfetti(prev => [...prev, ...newConfetti]);
    
    // Remove confetti after animation
    setTimeout(() => {
      setConfetti(prev => prev.filter(c => !newConfetti.some(nc => nc.id === c.id)));
    }, 2000);
  };
  
  return (
    <div className="relative">
      <button 
        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium transition-transform hover:scale-105 active:scale-95"
        onClick={handleClick}
      >
        🎉 Confetti Burst!
      </button>
      
      {confetti.map(particle => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 animate-confetti-burst"
          style={{
            left: '50%',
            top: '50%',
            backgroundColor: particle.color,
            transform: \`translate(-50%, -50%) translate(\${particle.x}px, \${particle.y}px) rotate(\${particle.rotation}deg) scale(\${particle.scale})\`
          }}
        />
      ))}
    </div>
  );
};`,
    preview: (
      <div className="flex items-center justify-center h-64">
        <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium transition-transform hover:scale-105 active:scale-95">
          🎉 Confetti Burst!
        </button>
      </div>
    ),
  },
  {
    name: "Sparkle Click Effect",
    description: "Stars or sparkles appear then fade",
    code: `// Sparkle click effect component
const SparkleButton = () => {
  const [sparkles, setSparkles] = useState<Array<{id: number, x: number, y: number, delay: number}>>([]);
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newSparkles = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: x + (Math.random() - 0.5) * 100,
      y: y + (Math.random() - 0.5) * 100,
      delay: i * 100
    }));
    
    setSparkles(prev => [...prev, ...newSparkles]);
    
    // Remove sparkles after animation
    setTimeout(() => {
      setSparkles(prev => prev.filter(s => !newSparkles.some(ns => ns.id === s.id)));
    }, 1500);
  };
  
  return (
    <div className="relative">
      <button 
        className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg font-medium transition-all hover:shadow-lg hover:scale-105"
        onClick={handleClick}
      >
        ✨ Sparkle Effect
      </button>
      
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="absolute w-4 h-4 animate-sparkle"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            animationDelay: \`\${sparkle.delay}ms\`
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-yellow-300">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
      ))}
    </div>
  );
};`,
    preview: (
      <div className="flex items-center justify-center h-64">
        <button className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg font-medium transition-all hover:shadow-lg hover:scale-105">
          ✨ Sparkle Effect
        </button>
      </div>
    ),
  },
  {
    name: "Morphing Button on Click",
    description: "Button smoothly transforms shape or color",
    code: `// Morphing button component
const MorphingButton = () => {
  const [isMorphed, setIsMorphed] = useState(false);
  
  const handleClick = () => {
    setIsMorphed(!isMorphed);
  };
  
  return (
    <button 
      className={\`px-6 py-3 font-medium transition-all duration-500 ease-in-out \${
        isMorphed 
          ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full shadow-lg scale-110' 
          : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-md'
      }\`}
      onClick={handleClick}
    >
      {isMorphed ? '✨ Morphed!' : 'Click to Morph'}
    </button>
  );
};`,
    preview: (
      <div className="flex items-center justify-center h-64 space-x-4">
        <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium transition-all duration-500 ease-in-out hover:shadow-md">
          Click to Morph
        </button>
        <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-medium transition-all duration-500 ease-in-out shadow-lg scale-110">
          ✨ Morphed!
        </button>
      </div>
    ),
  },
]

  const filteredComponents = components.filter(
    (component) =>
      component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen transition-colors duration-300 bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b backdrop-blur-md transition-colors duration-300 bg-background/80 border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">UI</span>
</div>
                <span className="font-semibold text-lg text-foreground">Components</span>
              </Link>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Documentation</span>
</div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search components..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
</div>
              <ThemeToggle />
</div>
</div>
</div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8 lg:gap-12">
          {/* Sidebar */}
          <aside className="w-64 lg:w-72 flex-shrink-0">
            <div className="sticky top-24 rounded-lg border p-4 bg-card border-border">
              <nav className="space-y-2">
                {sidebarItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors ${
                        activeSection === item.id
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.title}
                    </button>
                  )
                })}
              </nav>
</div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {activeSection === "getting-started" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl font-bold mb-4 text-foreground">
                    Getting Started
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Welcome to our modern UI Components Library. Built with React, TypeScript, and Tailwind CSS.
                  </p>
</div>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Start</CardTitle>
                      <CardDescription>
                        Get up and running in minutes
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 rounded-lg bg-muted">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-foreground">
                            Install via npm
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard("npm install @ui/components", "install")}
                          >
                            {copiedCode === "install" ? <CheckIcon className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </Button>
</div>
                        <code className="text-sm text-green-600 dark:text-green-400">
                          npm install @ui/components
                        </code>
</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Features</CardTitle>
                      <CardDescription>
                        What makes our library special
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { icon: Zap, text: "Lightning fast performance" },
                          { icon: Palette, text: "Customizable themes" },
                          { icon: Shield, text: "Accessibility first" },
                          { icon: Smartphone, text: "Responsive design" },
                        ].map((feature, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <feature.icon className="w-4 h-4 text-primary" />
                            <span className="text-muted-foreground">{feature.text}</span>
</div>
                        ))}
</div>
                    </CardContent>
                  </Card>
</div>
</div>
            )}

            {activeSection === "installation" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl font-bold mb-4 text-foreground">
                    Installation
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Multiple ways to install and use our components in your project.
                  </p>
</div>

                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Package Manager</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {["npm install @ui/components", "yarn add @ui/components", "pnpm add @ui/components"].map(
                        (cmd, index) => (
                          <div key={index} className="p-4 rounded-lg bg-muted">
                            <div className="flex items-center justify-between">
                              <code className="text-sm text-green-600 dark:text-green-400">{cmd}</code>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(cmd, `install-${index}`)}
                              >
                                {copiedCode === `install-${index}` ? (
                                  <CheckIcon className="w-4 h-4" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </Button>
</div>
</div>
                        ),
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Setup</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 rounded-lg bg-muted">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-foreground">
                            Import components
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard('import { Button } from "@ui/components"', "import")}
                          >
                            {copiedCode === "import" ? <CheckIcon className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </Button>
</div>
                        <code className="text-sm text-green-600 dark:text-green-400">
                          import {`{ Button }`} from "@ui/components"
                        </code>
</div>
                    </CardContent>
                  </Card>
</div>
</div>
            )}

            {activeSection === "components" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl font-bold mb-4 text-foreground">Components</h1>
                  <p className="text-lg text-muted-foreground">
                    Explore our collection of {components.length} reusable UI components.
                  </p>
</div>

                <div className="grid gap-10">
                  {filteredComponents.map((component, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardHeader className="pb-6">
                        <CardTitle className="text-2xl">{component.name}</CardTitle>
                        <CardDescription className="text-base">
                          {component.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-8">
                        <div>
                          <h4 className="text-sm font-semibold mb-4 text-foreground uppercase tracking-wide">
                            Preview
                          </h4>
                          <div className="p-8 rounded-lg border bg-muted/50 border-border">
                            {component.preview}
</div>
</div>
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                              Code
                            </h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(component.code, `code-${index}`)}
                            >
                              {copiedCode === `code-${index}` ? <CheckIcon className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </Button>
</div>
                          <pre className="text-sm text-muted-foreground">
                            {component.code}
                          </pre>
</div>
                      </CardContent>
                    </Card>
                  ))}
</div>
</div>
            )}
          </main>
</div>
</div>
</div>
  )
}


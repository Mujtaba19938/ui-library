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
import { CalendarIcon, Check, ChevronDown, Info, AlertTriangle, CheckCircle, Bold, Italic, Underline, DollarSign, Users, CreditCard, Activity, Mail, MapPin, FileText, Video, Image, X, Share, Menu } from "lucide-react"
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
} from "lucide-react"
import Link from "next/link"

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
    <TooltipTrigger>Hover me</TooltipTrigger>
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
                              {copiedCode === `code-${index}` ? (
                                <CheckIcon className="w-4 h-4" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                          <div className="p-6 rounded-lg bg-muted/30 border border-border">
                            <pre className="text-sm overflow-x-auto">
                              <code className="text-foreground font-mono">{component.code}</code>
                            </pre>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeSection === "create-component" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl font-bold mb-4 text-foreground">
                    Create Your Own Component
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Build and share your custom React components with the community.
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Component Builder</CardTitle>
                      <CardDescription>
                        Create components using our interactive builder
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 rounded-lg border bg-muted border-border">
                        <h4 className="font-medium mb-2 text-foreground">Features</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Visual component editor</li>
                          <li>• Real-time preview</li>
                          <li>• TypeScript support</li>
                          <li>• Theme integration</li>
                        </ul>
                      </div>
                      <Button className="w-full">
                        <Settings className="w-4 h-4 mr-2" />
                        Start Building
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Upload Component</CardTitle>
                      <CardDescription>
                        Share your existing components
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 rounded-lg border-2 border-dashed border-border">
                        <div className="text-center">
                          <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            Drag and drop your component files here
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Supports .tsx, .jsx, .ts, .js files
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">
                        <Upload className="w-4 h-4 mr-2" />
                        Choose Files
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Component Guidelines</CardTitle>
                    <CardDescription>
                      Follow these guidelines to ensure your components integrate well
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-3">
                        <h4 className="font-medium text-foreground">Code Standards</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Use TypeScript for type safety</li>
                          <li>• Follow React best practices</li>
                          <li>• Include proper JSDoc comments</li>
                          <li>• Use semantic HTML elements</li>
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-medium text-foreground">Design Principles</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Support dark/light themes</li>
                          <li>• Ensure accessibility compliance</li>
                          <li>• Make components responsive</li>
                          <li>• Use consistent spacing</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Community Gallery</CardTitle>
                    <CardDescription>
                      Browse components created by the community
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                      {[
                        { name: "Data Table", author: "John Doe", downloads: "1.2k", rating: 4.8 },
                        { name: "File Upload", author: "Jane Smith", downloads: "856", rating: 4.6 },
                        { name: "Rich Text Editor", author: "Mike Johnson", downloads: "2.1k", rating: 4.9 },
                      ].map((component, index) => (
                        <div key={index} className="p-4 rounded-lg border bg-muted border-border">
                          <h4 className="font-medium mb-2 text-foreground">{component.name}</h4>
                          <p className="text-sm mb-2 text-muted-foreground">by {component.author}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">{component.downloads} downloads</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs text-foreground">{component.rating}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeSection === "theming" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl font-bold mb-4 text-foreground">Theming</h1>
                  <p className="text-lg text-muted-foreground">
                    Customize the look and feel of components to match your brand.
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>CSS Variables</CardTitle>
                      <CardDescription>
                        Customize colors using CSS custom properties
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="p-4 rounded-lg bg-muted">
                        <pre className="text-sm text-foreground">
                          <code>{`:root {
  --primary: 222.2 84% 4.9%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222.2 84% 4.9%;
}`}</code>
                        </pre>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Dark Mode</CardTitle>
                      <CardDescription>
                        Automatic dark mode support
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 bg-blue-500 rounded"></div>
                          <span className="text-muted-foreground">Primary colors</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 bg-gray-500 rounded"></div>
                          <span className="text-muted-foreground">Neutral colors</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 bg-green-500 rounded"></div>
                          <span className="text-muted-foreground">Success colors</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 bg-red-500 rounded"></div>
                          <span className="text-muted-foreground">Error colors</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeSection === "accessibility" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl font-bold mb-4 text-foreground">
                    Accessibility
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Our components are built with accessibility in mind, following WCAG guidelines.
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Keyboard Navigation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        All interactive components support keyboard navigation with proper focus management.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Screen Reader Support</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Proper ARIA labels and semantic HTML ensure compatibility with screen readers.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Color Contrast</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        All color combinations meet WCAG AA contrast requirements for readability.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Focus Indicators</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Clear focus indicators help users understand which element is currently active.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeSection === "responsive" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl font-bold mb-4 text-foreground">
                    Responsive Design
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    All components are designed to work seamlessly across different screen sizes.
                  </p>
                </div>

                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Breakpoints</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4">
                        {[
                          { name: "Mobile", size: "< 640px", class: "sm:", color: "bg-red-500" },
                          { name: "Tablet", size: "640px - 768px", class: "md:", color: "bg-yellow-500" },
                          { name: "Desktop", size: "768px - 1024px", class: "lg:", color: "bg-green-500" },
                          { name: "Large", size: "> 1024px", class: "xl:", color: "bg-blue-500" },
                        ].map((breakpoint, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <div className={`w-3 h-3 ${breakpoint.color} rounded-full`}></div>
                              <span className="font-medium text-foreground">
                                {breakpoint.name}
                              </span>
                            </div>
                            <span className="text-muted-foreground">{breakpoint.size}</span>
                            <Badge variant="outline">{breakpoint.class}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Mobile First</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Components are built with a mobile-first approach, ensuring optimal performance and usability on all devices.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

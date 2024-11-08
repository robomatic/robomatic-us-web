import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

function ToolsSection({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Section>) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-16">
        {children}
      </ul>
    </Section>
  )
}

function Tool({
  title,
  href,
  children,
}: {
  title: string
  href?: string
  children: React.ReactNode
}) {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  )
}

export const metadata = {
  title: 'Uses',
  description: 'Hardware, software, and other recommended things.',
}

export default function Uses() {
  return (
    <SimpleLayout
      title="Hardware, software, and other recommended things."
      intro="If you have reached this part of the website you must be extremely bored. But if your curios, I 
      am willing to share my opinion on these items. 
      The following hardware and software have proven the most capable, reliable and comfortable for me over the years."
    >
      <div className="space-y-20">
        <ToolsSection title="Workstation">
          <Tool title="16” MacBook Pro, T2, 64GB RAM (2019)">
            The old workhorse. I&apos;ve been using this machine for many years
            now In 2022 I switched to Arch Linux. User experience and software
            management have improved significantly over the years and I am more
            confident of the stability and performance of the OS especially for
            development. Surprisingly, I am able to conduct all the UI design
            work I need thanks to Figma, Inkscape and Gimp.
          </Tool>
          <Tool title="LG 21:9 Ultrawide Curved IPS LED (3440x1440 @ 60hz)">
            An older monitor by todays standards but I love the 21:9 aspect and
            how it has improved my workflow. I alsu utilize the laptop screen as
            a secondary monitor, again optimizing the workflow by having
            multiple windows open at once. Just realized this monitor is about 8
            years old!
          </Tool>
          <Tool title="Logitech Prodigy Keyboard">
            For me the durability of this keyboard are hard to beat. I&apos;ve
            used quite a few keyboards over the years and this one has been the
            most reliable and comfortable to use. Has a built in wrist rest and
            puts up with the pounding I give it. Mac keyboards are buetiful but
            keys have always worn out within 3 or 4 years.
          </Tool>
          <Tool title="Logitech G403 Mouse">
            A good mouse is very important for the work I do between UI and
            development work. I need a well crafted and precise mouse that is
            smooth and reliable. Mice usually are more consumable in nature and
            so I tried other input types, trackball, touchpad and even the magic
            mouse. The G403 has been the most reliable and comfortable to use.
          </Tool>
          <Tool title="Herman Miller Aeron Chair">
            I&apos;ve used these chairs for years and have never had a problem
            with them. They are comfortable, durable and keep me cool or warm
            depending on the season. I would like to try the new Herman Miller
            options to address my new sitting style as I think the coder lean
            might be better with a chair with some finer adjustments and
            slightly different angles.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Development tools">
          <Tool title="Sublime Text 4">
            Solid editor fast and configurable. My goto with various text, code
            or CSV files, you name it.
          </Tool>
          <Tool title="VS Code">
            Using Github Copilot for my development work currently lends itself
            better to work with VS Code.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Design">
          <Tool title="Figma">
            Great tool for UI design and prototyping. I&apos;ve used it for
            years and it has only gotten better.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Productivity">
          <Tool title="Vivaldi">
            I&apos;ve been using Vivaldi for a few years now and I love the
            customization and UI features such as workspaces and tab stacking.
          </Tool>
        </ToolsSection>
      </div>
    </SimpleLayout>
  )
}

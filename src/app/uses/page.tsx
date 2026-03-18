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
      intro="The following hardware and software have proven the most capable, reliable, and comfortable for me over the years."
    >
      <div className="space-y-20">
        <ToolsSection title="Workstation">
          <Tool title="16” MacBook Pro, M4 Max, 48GB RAM (2024)">
            After setting up a large project on my old 2019 MacBook Pro and
            trying to build it, I realized I needed a more powerful machine.
            Build times were extremely slow even using NX with 5 parallel
            processes. The old T2 mac would spin up the fan even for light
            tasks. Now I cannot remember the last time I heard the whir of the
            fan, and not to mention feeling slowness in builds.
          </Tool>
          <Tool title="LG 21:9 Ultrawide Curved IPS LED (3440x1440 @ 60hz)">
            An older monitor by todays standards but I love the 21:9 aspect and
            how it has improved my workflow. I also utilize the laptop screen as
            a secondary monitor, again optimizing the workflow by having
            multiple windows open at once. Just realized this monitor is about 9
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
            with them. They are comfortable, durable, and keep me cool or warm
            depending on the season. I would like to try the new Herman Miller
            options to address my new sitting style as I think the coder lean
            might be better with a chair with some finer adjustments and
            slightly different angles.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Development tools">
          <Tool title="Cursor">
            With the agentic development shift Cursor has be a big improvement
            for speed and efficiency. I will still toggle using VS Code for some
            tasks but Cursor is my go to for most of my development work now.
          </Tool>
          <Tool title="VS Code">
            The agentic development with VS Code feels more controlled and is
            still a great tool for development. An odd result from the
            transition to agentic workflows causes me to think about token usage
            and I mainly use VS Code to burn tokens after I've reached caps in
            Cursor.
          </Tool>
          <Tool title="Sublime Text 4">
            I now have relegated sublime to a note taker quick editor for mostly
            text manipulation, formatting, and CSV tasks, like a quick loading
            scratchpad.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Design">
          <Tool title="Figma">
            AI tools are proving themselves beneficial in Figma as they roll out
            more. I still haven't been super happy with the disconnect from
            design to development when it comes to the workflow and feature
            support. Great tool for UI design and prototyping. I&apos;ve used it
            for years but am starting to wonder how more AI integrated tooling
            like Pencil will change things.
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

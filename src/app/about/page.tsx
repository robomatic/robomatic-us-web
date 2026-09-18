import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

import { Container } from "@/components/Container";
import { GitHubIcon, InstagramIcon, LinkedInIcon, XIcon } from "@/components/SocialIcons";
import portraitImage from "@/images/portrait.jpg";

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <li className={clsx(className, "flex")}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  );
}

function MailIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  );
}

export const metadata: Metadata = {
  title: "About",
  description: "I'm Rob Schuler. Product designer and software developer based in Idaho.",
};

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt="Lake nestled in front of a hedge of pines with mountains towering in the distance"
              loading="eager"
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            I&apos;m Rob Schuler. I live in Idaho where I design and develop a forest of ideas.
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <blockquote className="my-16 border-l-4 border-zinc-500 pl-4 dark:border-zinc-600">
              &quot;If a job is worth doing, it&apos;s worth doing well.&quot;
              <cite className="text-sm text-zinc-400 dark:text-zinc-500">
                — Philip Dormer Stanhope, 4th Earl of Chesterfield
              </cite>
            </blockquote>
            <p>
              I help teams turn complicated product ideas into software that feels clear, useful,
              and well made. My work sits at the intersection of product strategy, interface design,
              and front-end engineering, with a focus on practical systems that support real users
              and real business goals.
            </p>
            <p>
              I start by understanding the people using the product, the constraints around the
              business, and the decisions the software needs to make easier. That research shapes
              the design, and the design carries through into maintainable code that can keep
              evolving after launch.
            </p>
            <p>
              As a designer, I care about reducing friction and giving products a strong visual
              point of view. As a developer, I care about architecture, performance, and the small
              implementation details that make an experience feel dependable.
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <SocialLink href="https://x.com/FullyRobomatic" icon={XIcon}>
              Follow on X
            </SocialLink>
            <SocialLink
              href="https://www.instagram.com/fullyrobomatic/"
              icon={InstagramIcon}
              className="mt-4"
            >
              Follow on Instagram
            </SocialLink>
            <SocialLink href="https://github.com/robomatic" icon={GitHubIcon} className="mt-4">
              Follow on GitHub
            </SocialLink>
            <SocialLink
              href="https://www.linkedin.com/in/robomatic/"
              icon={LinkedInIcon}
              className="mt-4"
            >
              Follow on LinkedIn
            </SocialLink>
            <SocialLink
              href="mailto:Me@robomatic.us"
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              Me@robomatic.us
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container>
  );
}

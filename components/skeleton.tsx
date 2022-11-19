import type { FC } from 'react';

const Skeleton: FC = () => (
  <div className="prose prose-zinc relative mx-auto flex flex-col gap-2 px-4 py-8 dark:prose-invert sm:py-16">
    <div className="h-3 w-1/2 animate-pulse rounded bg-zinc-300" />
    <div className="h-3 w-1/3 animate-pulse rounded bg-zinc-300" />
    <div className="h-3 w-1/4 animate-pulse rounded bg-zinc-300" />
    <div className="h-3 w-1/3 animate-pulse rounded bg-zinc-300" />
    <div className="h-3 w-1/3 animate-pulse rounded bg-zinc-300" />
    <div className="h-3 w-1/4 animate-pulse rounded bg-zinc-300" />
    <div className="h-3 w-1/5 animate-pulse rounded bg-zinc-300" />
    <div className="h-3 w-1/3 animate-pulse rounded bg-zinc-300" />
    <div className="h-3 w-1/4 animate-pulse rounded bg-zinc-300" />
    <div className="h-3 w-1/2 animate-pulse rounded bg-zinc-300" />
    <div className="h-3 w-1/3 animate-pulse rounded bg-zinc-300" />
    <div className="h-3 w-1/4 animate-pulse rounded bg-zinc-300" />
  </div>
);

export default Skeleton;

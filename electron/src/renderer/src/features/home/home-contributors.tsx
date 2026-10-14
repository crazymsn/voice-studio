import type { CSSProperties } from 'react';

/** Home enterprise badge. */
export function HomeContributors() {
  return (
    <div className="home-contributors flex flex-col items-end justify-center rounded-xl border border-border/60 bg-sidebar/50 p-4 shadow-sm backdrop-blur-xs">
      <span className="text-sm font-semibold tracking-tight text-foreground">深度云创科技</span>
      <span className="text-xs text-muted-foreground mt-0.5">VoiceStudio 官方出品</span>
    </div>
  );
}

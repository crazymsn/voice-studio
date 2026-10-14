import { runRendererTask } from '@/lib/global-error-recovery';
import {
  ArrowUpRightIcon,
  GemIcon,
  Globe2Icon,
  ShieldCheckIcon,
  SparklesIcon,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { brandIcon } from '@/lib/brand';
import { ExternalLink } from '@/components/external-link';
import { getBridge } from '@/components/bridge';
import './support-settings.css';

export function SupportSettings() {
  const { t } = useTranslation();

  const handleOpenNav = () => {
    runRendererTask('Open Navigation', () => {
      const url = 'https://nav.meding.site';
      const bridge = getBridge();
      if (bridge?.files?.openExternal) {
        void bridge.files.openExternal(url);
      } else {
        window.open(url, '_blank', 'noreferrer');
      }
    });
  };

  return (
    <div className="support-studio">
      <header className="support-intro">
        <div className="support-emblem" aria-hidden="true">
          <img src={brandIcon} alt="" width={100} height={100} />
        </div>
        <h1>深度云创科技</h1>
        <p>VoiceStudio 智能语音创作与本地克隆系统</p>
      </header>

      <div className="support-opportunities">
        <section className="support-tile support-license" aria-labelledby="support-pro-heading">
          <div className="flex items-center gap-2 mb-3">
            <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-semibold tracking-wider text-primary">
              {t('supportPlans.pro')}
            </span>
            <span className="text-xs text-muted-foreground font-medium">已激活全功能专业版</span>
          </div>
          <h2 id="support-pro-heading" className="text-xl font-bold flex items-center gap-2">
            <GemIcon className="size-5 text-primary" />
            VoiceStudio Pro
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            企业级全功能已全面解锁，包含高保真零样本声音克隆、跨语种多角色配音、长文本有声书制作及本地离线工作流。
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={handleOpenNav}
              className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-ring"
            >
              {t('supportPlans.get_pro')}
              <ArrowUpRightIcon aria-hidden="true" className="size-4" />
            </button>
            <ExternalLink href="https://nav.meding.site" className="text-xs text-muted-foreground hover:text-foreground">
              nav.meding.site
            </ExternalLink>
          </div>
        </section>

        <section className="support-tile" aria-labelledby="support-company-heading">
          <div className="flex items-center gap-2 mb-3">
            <span className="rounded-md bg-secondary px-2 py-1 text-xs font-semibold tracking-wider text-secondary-foreground">
              企业认证
            </span>
          </div>
          <h2 id="support-company-heading" className="text-xl font-bold flex items-center gap-2">
            <SparklesIcon className="size-5 text-primary" />
            深度云创科技
          </h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            专注于前沿人工智能语音交互、个性化声音合成与音频工程技术研发。坚持本地优先计算，全方位保障数据隐私与创作安全。
          </p>
          <div className="mt-4 pt-4 border-t border-border/50 text-xs text-muted-foreground space-y-2">
            <div className="flex items-center gap-2">
              <ShieldCheckIcon className="size-3.5 text-primary" />
              <span>纯本地计算 · 零数据上传 · 隐私完全保障</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe2Icon className="size-3.5 text-primary" />
              <span>官方生态导航：https://nav.meding.site</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

import { ArrowUpRightIcon, GemIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { getBridge } from '@/components/bridge';
import './support-shortcut.css';

export function SupportShortcut() {
  const { t } = useTranslation();

  const handleOpenNavigation = (event: React.MouseEvent) => {
    event.preventDefault();
    const url = 'https://nav.meding.site';
    const bridge = getBridge();
    if (bridge?.files?.openExternal) {
      void bridge.files.openExternal(url);
    } else {
      window.open(url, '_blank', 'noreferrer');
    }
  };

  return (
    <div className="flex shrink-0 items-center gap-2">
      <Tooltip>
        <TooltipTrigger
          render={
            <a
              href="https://nav.meding.site"
              target="_blank"
              rel="noreferrer"
              onClick={handleOpenNavigation}
              aria-label={t('supportPlans.get_pro')}
              className="support-shortcut app-no-drag flex h-8 items-center gap-1.5 px-2.5 focus-visible:outline-2 focus-visible:outline-ring"
            />
          }
        >
          <GemIcon aria-hidden="true" className="size-3.5" />
          <span className="hidden text-xs font-semibold sm:inline">
            {t('supportPlans.get_pro')}
          </span>
          <ArrowUpRightIcon aria-hidden="true" className="size-3" />
        </TooltipTrigger>
        <TooltipContent surface="theme" side="bottom">
          {t('supportPlans.get_pro')}
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

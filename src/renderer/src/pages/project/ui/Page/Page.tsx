import { SubNavigator } from '@renderer/widget/SubNavigator'

import { ContentSection } from '@renderer/widget/ContentSection'

export function ProjectPage() {
  return (
    <div className="flex animate-fadeIn">
      <SubNavigator />
      <ContentSection />
    </div>
  )
}

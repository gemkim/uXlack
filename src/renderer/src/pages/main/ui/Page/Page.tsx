import { SubNavigator } from '@renderer/widget/SubNavigator'

import { MainNavigator } from '@renderer/widget/MainNavigator'
import { ContentSection } from '@renderer/widget/ContentSection'

export function MainPage() {
  return (
    <div className="flex animate-fadeIn">
      <MainNavigator />
      <SubNavigator />
      <ContentSection />
    </div>
  )
}

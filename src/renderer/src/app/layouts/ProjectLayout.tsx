import { ContentSection } from '@renderer/widget/ContentSection'
import { SubNavigator } from '@renderer/widget/SubNavigator'

export default function ProjectLayout() {
  return (
    <div className="flex">
      <SubNavigator />
      <ContentSection />
    </div>
  )
}

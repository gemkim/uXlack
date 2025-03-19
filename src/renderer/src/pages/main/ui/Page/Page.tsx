import { SubNavigator } from '@renderer/widget/ChatNavigator'
import { ChatSection } from '@renderer/widget/ChatSection'
import { MainNavigator } from '@renderer/widget/MainNavigator'

export function MainPage() {
  return (
    <div className="flex animate-fadeIn">
      <MainNavigator />
      <SubNavigator />
      <ChatSection />
    </div>
  )
}

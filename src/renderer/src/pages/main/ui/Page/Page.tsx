import { TEMP_CHAT_LIST } from '@renderer/shared/_mock/chat'
import { ChatNavigator } from '@renderer/widget/ChatNavigator'
import { ChatSection } from '@renderer/widget/ChatSection'
import { MainNavigator } from '@renderer/widget/MainNavigator'

export function MainPage() {
  const TEMP_CHAT = TEMP_CHAT_LIST

  return (
    <div className="flex">
      <MainNavigator />
      <ChatNavigator />
      <ChatSection chatList={TEMP_CHAT} />
    </div>
  )
}

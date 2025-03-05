export function ChatNavigator() {
  return (
    <div className="bg-gray-900 p-4 flex flex-col min-w-[180px] text-white">
      <div>
        프로젝트 OOO <br />
        <span className="text-sm">9명</span>
      </div>
      <button className="w-full text-left p-2 bg-gray-500">일정</button>

      <div className="mt-4 flex flex-col">
        <span>채팅</span>
        <button className="text-left"># 일반</button>
      </div>
    </div>
  )
}

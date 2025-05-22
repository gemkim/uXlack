export const SOCKET_EVENT = {
  /**
   * 최초 소켓 연결
   */
  connection: 'connection',
  /**
   * 프로젝트(채팅) 입장
   */
  joinRooms: 'join-rooms',
  /**
   * 메세지 전송
   */
  sendMessage: 'send-message',
  /**
   * 메세지 수신
   */
  receiveMessage: 'receive-message',
  /**
   * 속한 프로젝트 모두 메세지 받아오기
   */
  getAllProjectsMessageList: 'get-all-projects-message-list'
}

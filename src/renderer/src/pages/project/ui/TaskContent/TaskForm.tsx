import { useMyProfile, useProfileList } from "@renderer/entities/profile/model/slice";
import { useSelectedProject } from "@renderer/entities/project/model/slice";
import InputText, { InputTextRefType } from "@renderer/shared/ui/Input/InputText";
import { useCallback, useEffect, useRef, useState } from "react";
import ProfileIcon from "@renderer/features/auth/ui/ProfileIcon";

// 태그 리스트 업무, 기획, 디자인 등 데이터 어디서 가져오는거죠!? 아래는 임시
const TAG_LIST = [
  { _id:'683ff52cd71a45f309cbe84a', name:'업무', color:'#2383e2' },
  { _id:'683ff52cd71a45f309cbe84b', name:'기획', color:'#38a169' },
  { _id:'683ff52cd71a45f309cbe84c', name:'디자인', color:'#d53f8c' },
];
export default function TaskForm({confirm}:{confirm: () => void}) {
  const selectedProject = useSelectedProject() // project
  const myProfile = useMyProfile() // 
  const profileList = useProfileList() // 
  const titleRef = useRef<InputTextRefType>(null);
  const descRef = useRef<HTMLTextAreaElement | null>(null);
  const dateRef = useRef<HTMLInputElement | null>(null);
  const tagRef = useRef<HTMLSelectElement | null>(null);
  const assigneeRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const errorTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [errorMessage, setErrorMessage] = useState({
    isOpen: false,
    message: '',
  });
    
  const showError = useCallback((field: string) => {
    if (errorTimeoutRef.current) {
      clearTimeout(errorTimeoutRef.current);
    }
    setErrorMessage({
      isOpen: true,
      message: `${field} 항목을 확인해주세요.`,
    });
    errorTimeoutRef.current = setTimeout(() => {
      setErrorMessage({ isOpen: false, message: '' });
      errorTimeoutRef.current = null;
    }, 2000);
  }, []);

  const resetForm = useCallback(() => {
    titleRef.current?.refResetVal()

    if (descRef.current) descRef.current.value = '';
    if (dateRef.current) dateRef.current.value = '';
    if (tagRef.current) tagRef.current.value = TAG_LIST[0]._id;
    
    Object.values(assigneeRefs.current).forEach(checkbox => {
      if (checkbox) checkbox.checked = false;
    });
    
    setErrorMessage({ isOpen: false, message: '' });
  }, []);

  const handleSubmit =  useCallback((e: React.FormEvent) => {
    e.preventDefault();

    const title = titleRef.current?.refInputValue()?.trim() || '';
    const desc = descRef.current?.value.trim() || '';
    const date = dateRef.current?.value || '';
    const tagId = tagRef.current?.value || TAG_LIST[0]._id;

    if (!title) return showError('제목');
    if (!desc) return showError('설명');
    if (!date) return showError('날짜');

    
    if(!selectedProject || !selectedProject._id) return 

    // 참여자 
    const assignee = Object.entries(assigneeRefs.current)
      .filter(([_, checkbox]) => checkbox?.checked)
      .map(([tagId]) => tagId);

    const newTaskData = {
      projectId:selectedProject._id,
      name:title,
      desc,
      startDate:date,
      endDate:date,
      createBy:myProfile?.accountId || '알 수  없음', // 작성자
      tagId, // 업무 - 디자인, 기획, 퍼블, 등
      assignee // 참조 - 일정 관련자
    }
    console.log(newTaskData)
    resetForm();
    confirm();
  },[selectedProject, myProfile, showError]);

  useEffect(() => {
    return () => {
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex flex-col gap-[15px] pt-[10px]">
        {/* 제목 */}
        <div>
          <p className="text-[15px]">제목</p>
          <InputText 
            ref={titleRef} 
            id="task-title"
            title="📍 제목 입력해줄래요?"
            className="mt-[5px]"
          />
        </div>
        {/* 설명 */}
        <div>
          <p className="text-[15px]">설명</p>
          {/* textarea도 따로 공통 컴포넌트 만들 에정 지금은!? 너무 귀찮은걸 ¯\(°_o)/¯ */}
          <label>
            <textarea
              ref={descRef}
              id="task-desc"
              className="mt-[5px] w-full border border-[#dbdbdb] rounded px-2 py-1 resize-none text-black outline-none"
              title="✍️ 설명도 적어주겠어요?"
              style={{ height: "50px" }}
            />
          </label>
        </div>
        {/* 날짜 */}
        <div>
          {/* 시작 / 끝은 date 컴포넌트 만들예정 <- 이건 다음 시간에..  귀찮 ¯\_( ͡° ͜ʖ ͡°)_/¯ */}
          <p className="text-[15px]">날짜</p>
          <label>
            <input
              ref={dateRef}
              id="task-date"
              type="date"
              title="📅 날짜를 선택해야해요."
              className="mt-[5px] w-full border border-[#dbdbdb] rounded px-2 py-1 text-black outline-none"
            />
          </label>
        </div>
        {/* 업무 태그 */}
        <div>
          <p className="text-[15px]">태그</p>
          <label>
            <select
              ref={tagRef}
              id="task-tag"
              className="mt-[5px] w-full border border-[#dbdbdb] rounded px-2 py-1 text-black outline-none"
              defaultValue={TAG_LIST[0]._id}
            >
              {TAG_LIST.map((tagItem) => (
                <option key={tagItem._id} value={tagItem._id}>
                  {tagItem.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        {/* 참여자 선택 */}
        <div className="">
          <p className="text-[15px]">참여자</p>
          <div className="flex flex-wrap gap-x-[5px] gap-y-[5px] max-h-[120px] overflow-y-auto">
            {profileList.map((userItem) => (
              <label
                key={userItem.tag}
                htmlFor={userItem.tag}
                className={`
                  w-[calc(50%-2.5px)] cursor-pointer border rounded p-2 flex items-center 
                  transition-colors
                  has-[input:checked]:border-blue-500 
                  border-transparent
                `}
              >
                <input
                  id={userItem.tag}
                  type="checkbox"
                  ref={(el) => (assigneeRefs.current[userItem.tag] = el)}
                  value={userItem.tag}
                  className="hidden"
                />
                <div className="size-[32px] rounded-full overflow-hidden">
                  <ProfileIcon seed={userItem.iconSeed ?? userItem.name} />
                </div>
                <div className="ml-2">
                  <span className="block max-w-full overflow-hidden text-ellipsis whitespace-nowrap align-middle">
                    {userItem.name}
                  </span>
                  <span className="block text-xs text-gray-400 ml-1 align-middle">
                    #{userItem.tag}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-550 hover:bg-blue-650 text-white py-1 px-1.5 rounded-sm"
        >
          확인
        </button>
      </form>
      {/* error */}
      {errorMessage.isOpen && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  border border-[#dbdbdb] bg-white rounded px-[10px] py-[10px] w-full max-w-[80%] text-red-500 text-center z-2 pointer-events-none">{errorMessage.message}</div>
      )}
    </div>
  );
}




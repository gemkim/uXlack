import { useMyProfile, useProfileList } from "@renderer/entities/profile/model/slice";
import { useSelectedProject } from "@renderer/entities/project/model/slice";
import InputText, { InputTextRefType } from "@renderer/shared/ui/Input/InputText";
import { useRef, useState } from "react";
import './css/TaskForm.css';

// 태그 리스트 업무, 기획, 디자인 등 데이터 어디서 가져오는거죠!? 아래는 임시
const TAG_LIST = [
  { _id:'683ff52cd71a45f309cbe84a', name:'업무', color:'#2383e2' },
  { _id:'683ff52cd71a45f309cbe84b', name:'기획', color:'#38a169' },
  { _id:'683ff52cd71a45f309cbe84c', name:'디자인', color:'#d53f8c' },
];
export default function TaskForm() {
  const selectedProject = useSelectedProject() // project
  const myProfile = useMyProfile() //
  const profileList = useProfileList() // 
  const [errorMessage, setErrorMessage] = useState({
    isOpen: false,
    message: '',
  });

  console.log(myProfile)
  console.log(profileList)
  console.log(selectedProject)

  const titleRef = useRef<InputTextRefType>(null);
  const descRef = useRef<HTMLTextAreaElement | null>(null);
  const dateRef = useRef<HTMLInputElement | null>(null);
  const selectRef = useRef<HTMLSelectElement | null>(null);
    

  const showError = (field: string) => {
    setErrorMessage({
      isOpen: true,
      message: `${field} 항목을 확인해주세요.`,
    });

    setTimeout(() => {
      setErrorMessage({ isOpen: false, message: '' });
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const title = titleRef.current?.refInputValue().trim() || '';
    const desc = descRef.current?.value.trim() || '';
    const date = dateRef.current?.value || '';
    const selectedTagId = selectRef.current?.value || '';

    if (!title) return showError('제목');
    if (!desc) return showError('설명');
    if (!date) return showError('날짜');

    // 정상 제출
    setErrorMessage({ isOpen: false, message: '' });

    console.log('제목:', title);
    console.log('설명:', desc);
    console.log('날짜:', date);
    console.log('선택된 태그 ID:', selectedTagId);
  };

//   {
//   "projectId": "683904fd93608ebc7a645777",
//   "name": "퍼블리싱 업무",
//   "desc": "GNB 세부 작업",
//   "startDate": "2025-06-10T06:41:45.376Z",
//   "endDate": "2025-06-10T06:41:45.376Z", 
//   "createBy": "6838fa2721a4447f0c0c65fc", 생성자
//   "tagId": "683904fd93608ebc7a645778", // 
//   "assignee": [ // 관리자
//     "6838fa2721a4447f0c0c65fc"
//   ]
// }

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex flex-col gap-[15px] pt-[10px]">
        <div>
          <p><label htmlFor="task-title" className="text-[15px]">제목</label></p>
          <InputText 
            ref={titleRef} 
            id="task-title"
            className="mt-[10px]"
          />
        </div>
        <div>
          <p><label htmlFor="task-desc" className="text-[15px]">설명</label></p>
          {/* textarea도 따로 공통 컴포넌트 만들 에정 지금은!? 너무 귀찮은걸 ¯\(°_o)/¯ */}
          <textarea
            ref={descRef}
            id="task-desc"
            className="mt-[10px] w-full border border-[#dbdbdb] rounded px-2 py-1 resize-none text-black outline-none"
            style={{ height: "50px" }}
          />
        </div>
        <div>
          {/* 시작 / 끝은 date 컴포넌트 만들예정 <- 이건 다음 시간에..  귀찮 ¯\_( ͡° ͜ʖ ͡°)_/¯ */}
          <p><label htmlFor="task-date" className="text-[15px]">날짜</label></p>
          <input
            ref={dateRef}
            id="task-date"
            type="date"
            className="mt-[10px] w-full border border-[#dbdbdb] rounded px-2 py-1 text-black outline-none"
          />
        </div>
        <div className="tag-select">
          <p><label htmlFor="task-tag" className="text-[15px]">태그</label></p>
          <select
            ref={selectRef}
            id="task-tag"
            className="mt-[10px] w-full border border-[#dbdbdb] rounded px-2 py-1 text-black outline-none"
            defaultValue={TAG_LIST[0]._id}
          >
            {TAG_LIST.map((tagItem) => (
              <option key={tagItem._id} value={tagItem._id}>
                {tagItem.name}
              </option>
            ))}
          </select>
        </div>
        <div className="">

        </div>
        <button
          type="submit"
          className="w-full bg-blue-550 hover:bg-blue-650 text-white py-1 px-1.5 rounded-sm"
        >
          확인
        </button>
      </form>
      {errorMessage.isOpen && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  border border-[#dbdbdb] bg-white rounded px-[10px] py-[10px] w-full max-w-[80%] text-red-500 text-center z-2 pointer-events-none">{errorMessage.message}</div>
      )}
    </div>
  );
}




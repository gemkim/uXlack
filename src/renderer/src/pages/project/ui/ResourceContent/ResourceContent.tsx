import {
  IconSearch,
  IconFile,
  IconFolder,
  IconZip,
  IconImgFile
} from '@renderer/shared/assets/svgs'
import InputText from '@renderer/shared/ui/Input/InputText'
import { useRef } from 'react'

const elTypeList = ['exe', 'excel', 'pptx', 'img']
const addedByList = ['태훈', '민정', '소진', '세남']
const resourceData = [
  {
    id: 1,
    type: 'file',
    author: '민정',
    createDate: '2025.07.23',
    size: ''
  },
  {
    id: 2,
    type: 'folder',
    author: '민정',
    createDate: '2025.05.22',
    size: '400 KB'
  },
  {
    id: 3,
    type: 'zip',
    author: '민정',
    createDate: '2025.06.18',
    size: '24 KB'
  },
  {
    id: 4,
    type: 'img',
    author: '민정',
    createDate: '2025.05.02',
    size: '35 KB'
  },
  {
    id: 5,
    type: 'file',
    author: '민정',
    createDate: '2025.04.23',
    size: '200 KB'
  }
]

export default function ResourceContent() {
  const elTypeRef = useRef<HTMLSelectElement | null>(null)

  return (
    <div className="flex flex-col relative max-h-full h-full">
      <div className="flex flex-col justify-between w-xl p-10">
        <div className="relative w-xl">
          <h2 className="text-[26px]">Documents</h2>
          <button
            className="
              absolute top-0 right-0
              px-6 py-2 text-[14px] text-white rounded-full bg-[#3dc9bd]"
          >
            + ADD
          </button>
          <div className="relative">
            <IconSearch className="absolute top-1 right-3 text-[24px]" />
            <InputText
              id="resource-search"
              title="파일찾기 텍스트 입력"
              placeholder="Search in files..."
              className="mt-[5px]"
            />
          </div>
        </div>
        <div>
          <div className="flex gap-1 py-3">
            <IconFolder className="text-[20px]" />
            &gt; Type or search keyword &gt;
            <em className="font-bold not-italic text-[#3dc9bd]">Document</em>
          </div>
          {/* select 리스트 */}
          <div className="flex gap-2">
            <label>
              <select
                ref={elTypeRef}
                id="el-type"
                className="px-5 py-2 w-full border border-[#dbdbdb] rounded-full text-black outline-none"
              >
                {elTypeList.map((list, idx) => (
                  <option key={idx} value={list}>
                    {list}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <select
                ref={elTypeRef}
                id="el-type"
                className="px-5 py-2 w-full border border-[#dbdbdb] rounded-full text-black outline-none"
              >
                {addedByList.map((list, idx) => (
                  <option key={idx} value={list}>
                    {list}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {/* table 리스트 */}
          <table border="1">
            <thead>
              <tr>
                <td className="">
                  <input type="checkbox" name="check-all" value="all" />
                </td>
                <td>TYPE</td>
                <td>AUTHOR</td>
                <td>DATE</td>
                <td>SIZE</td>
              </tr>
            </thead>
            <tbody>
              {resourceData.map((item) => (
                <tr key={item.id}>
                  <td>
                    <input type="checkbox" name="check-1" value={'check-' + item.id} />
                  </td>
                  <td>
                    {item.type === 'file' && <IconFile className="text-[20px]" />}
                    {item.type === 'img' && <IconImgFile className="text-[20px]" />}
                    {item.type === 'zip' && <IconZip className="text-[20px]" />}
                    {item.type === 'folder' && <IconFolder className="text-[20px]" />}
                  </td>
                  <td>{item.author}</td>
                  <td>{item.createDate}</td>
                  <td>{item.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

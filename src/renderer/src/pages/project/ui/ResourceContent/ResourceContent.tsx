import {
  IconSearch,
  IconFile,
  IconFolder,
  IconZip,
  IconImgFile
} from '@renderer/shared/assets/svgs'
import InputText from '@renderer/shared/ui/Input/InputText'
import { useRef } from 'react'

const elTypeList = ['excel', 'pptx', 'folder', 'img', 'zip']
const addedByList = ['태훈', '민정', '소진', '세남']
const resourceData = [
  {
    id: '1',
    type: 'file',
    fileName: 'abc.doc',
    author: '민정',
    createDate: '2025.07.23',
    size: ''
  },
  {
    id: '2',
    type: 'folder',
    fileName: 'test-A',
    author: '소진',
    createDate: '2025.05.22',
    size: '400 KB'
  },
  {
    id: '3',
    type: 'zip',
    fileName: 'abc.zip',
    author: '태훈',
    createDate: '2025.06.18',
    size: '24 KB'
  },
  {
    id: '4',
    type: 'img',
    fileName: 'abc.jpg',
    author: '세남',
    createDate: '2025.05.02',
    size: '35 KB'
  },
  {
    id: '5',
    type: 'file',
    fileName: 'abc.excel',
    author: '민정',
    createDate: '2025.04.23',
    size: '200 KB'
  },
  {
    id: '6',
    type: 'file',
    fileName: 'abc.excel',
    author: '민정',
    createDate: '2025.04.23',
    size: '200 KB'
  },
  {
    id: '7',
    type: 'file',
    fileName: 'abc.excel',
    author: '소진',
    createDate: '2025.04.23',
    size: '200 KB'
  },
  {
    id: '8',
    type: 'file',
    fileName: 'abc.excel',
    author: '민정',
    createDate: '2025.04.23',
    size: '200 KB'
  },
  {
    id: '9',
    type: 'file',
    fileName: 'abc.excel',
    author: '세남',
    createDate: '2025.04.23',
    size: '200 KB'
  },
  {
    id: '10',
    type: 'file',
    fileName: 'abc.excel',
    author: '태훈',
    createDate: '2025.04.23',
    size: ''
  }
]

export default function ResourceContent() {
  const elTypeRef = useRef<HTMLSelectElement | null>(null)

  return (
    <div className='flex flex-col relative max-h-full h-full'>
      <div className='flex flex-col justify-between w-full p-10'>
        <div className='relative w-xl'>
          <h2 className='text-[24px]'>Documents</h2>
          <button
            className='
              absolute top-0 right-0
              px-4 py-2 text-[13px] text-white rounded-full bg-[#3dc9bd]'
          >
            + ADD
          </button>
          <div className='relative'>
            <button className='absolute top-2 right-3 z-1' title='검색하기'>
              <IconSearch className='text-[22px]' />
            </button>
            <InputText
              id='resource-search'
              title='파일찾기 텍스트 입력'
              placeholder='Search in files...'
              className='mt-[15px]'
            />
          </div>
        </div>
        <div>
          <div className='flex gap-1 py-4'>
            <IconFolder className='text-[18px]' />
            <span className='text-[13px] text-[#999]'>&gt; Type or search keyword &gt;</span>
            <em className='font-bold not-italic text-[13px] text-[#3dc9bd]'>document</em>
          </div>
          {/* select 리스트 */}
          <div className='flex gap-2'>
            <label>
              <select
                ref={elTypeRef}
                id='el-type'
                className='px-5 py-1 w-40 border border-[#dbdbdb] rounded-full text-[12px] text-[#666] '
              >
                <option value='자료 타입' className='text-[12px]'>
                  자료 타입
                </option>
                {elTypeList.map((list, idx) => (
                  <option key={idx} value={list} className='text-[12px]'>
                    {list}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <select
                ref={elTypeRef}
                id='el-type'
                className='px-5 py-1 w-40 text-[12px] text-[#666] rounded-full border border-[#dbdbdb]'
              >
                <option value='작성자' className='text-[12px]'>
                  작성자
                </option>
                {addedByList.map((list, idx) => (
                  <option key={idx} value={list} className='text-[12px]'>
                    {list}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {/* table 리스트 */}
          <table border={1} className='flex flex-col w-xl mt-5'>
            <thead>
              <tr className='block h-13 border-b-2 border-b-[#bdc0c3]'>
                <td className='p-3 text-center'>
                  <input type='checkbox' name='check-all' value='all' />
                </td>
                <td className='w-35'>TYPE</td>
                <td className='w-18 text-center'>AUTHOR</td>
                <td className='w-35 text-center'>DATE</td>
                <td className='w-35 text-center'>SIZE</td>
              </tr>
            </thead>
            <tbody className='h-77 overflow-y-scroll'>
              {resourceData.map((item) => (
                <tr key={item.id} className='block h-12 border-b-1 border-b-[#dedede]'>
                  <td className='p-3 text-center '>
                    <input type='checkbox' name={item.id} value={item.id} />
                  </td>
                  <td className='w-35 '>
                    {item.type === 'file' && <IconFile className='text-[20px] inline-block' />}
                    {item.type === 'img' && <IconImgFile className='text-[20px] inline-block' />}
                    {item.type === 'zip' && <IconZip className='text-[20px] inline-block' />}
                    {item.type === 'folder' && <IconFolder className='text-[20px] inline-block' />}
                    <span className='px-1 text-[13px]'>{item.fileName}</span>
                  </td>
                  <td className='w-18 text-center text-[13px]'>{item.author}</td>
                  <td className='w-35 text-center text-[13px]'>{item.createDate}</td>
                  <td className='w-35 text-center text-[13px]'>{item.size ? item.size : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

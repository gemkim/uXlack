import { RegisterDto, UserDto, createUserAccount } from '@renderer/entities/auth'
import { useForm } from 'react-hook-form'
export function RegisterForm() {
  const { register, handleSubmit } = useForm<RegisterDto>()

  async function onSubmit(data: RegisterDto) {
    const newUser: UserDto = {
      id: new Date().getTime().toString(),
      registerAt: new Date().getTime(),
      ...data
    }

    const res = await createUserAccount(newUser)

    if (res.status === 201) {
      alert('회원가입이 완료 되었습니다.')
    } else {
      alert('회원가입 실패')
    }
  }

  return (
    <div>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <span>아이디</span>
        <input className="bg-white rounded-2xl" {...register('account')} />
        <span>패스워드</span>
        <input className="bg-white rounded-2xl" {...register('password')} />
        <span>이름</span>
        <input className="bg-white rounded-2xl" {...register('name')} />
        <button type="submit" className="cursor-pointer">
          회원가입
        </button>
      </form>
    </div>
  )
}

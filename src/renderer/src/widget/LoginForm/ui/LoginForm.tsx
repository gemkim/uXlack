import { LoginDto, UserDto, useAuthActions } from '@renderer/entities/auth'
import { fetchApi } from '@renderer/shared/lib/api'
import { useForm } from 'react-hook-form'

export function LoginForm() {
  const { register, handleSubmit } = useForm<LoginDto>()

  const { setUser } = useAuthActions()

  // 아직 제대로된 db가 없기때문에 임시 코드임
  async function onSubmit(data: LoginDto) {
    const res = await fetchApi.get(`/user?account=${data.account}`)
    if (res.data.length < 1) {
      alert('존재하지 않는 유저 입니다.')
    }

    const existUser = res.data[0] as UserDto

    if (existUser.password === data.password) {
      setUser(existUser)
    } else {
      alert('비밀번호가 일치하지 않습니다.')
    }
  }

  return (
    <div onSubmit={handleSubmit(onSubmit)}>
      <form className="flex flex-col">
        <label>계정</label>
        <input {...register('account')} className="bg-white" />
        <label>비밀번호</label>
        <input {...register('password')} type="password" className="bg-white" />
        <button className="cursor-pointer" type="submit">
          로그인
        </button>
      </form>
    </div>
  )
}

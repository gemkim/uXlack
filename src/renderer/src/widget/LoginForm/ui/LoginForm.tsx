import { LoginDto, UserDto, useAuthActions } from '@renderer/entities/auth'
import { fetchApi } from '@renderer/shared/lib/api'
import { Button, Form, FormField } from '@renderer/shared/ui'

const FORM_FIELD_LIST: FormField[] = [
  { displayName: '계정', registerName: 'account' },
  { displayName: '비밀번호', registerName: 'password', type: 'password' }
]

export function LoginForm() {
  const { setUser } = useAuthActions()

  // 아직 제대로된 db가 없기때문에 임시 코드임
  async function onSubmit(data: LoginDto) {
    console.log(data)
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
    <div className="h-full">
      <Form fieldList={FORM_FIELD_LIST} onSubmit={onSubmit}>
        <Button type="submit" className="mt-auto mb-8">
          로그인
        </Button>
      </Form>
    </div>
  )
}

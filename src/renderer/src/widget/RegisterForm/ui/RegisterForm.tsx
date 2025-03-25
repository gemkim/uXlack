import { RegisterDto, UserDto, createUserAccount } from '@renderer/entities/auth'
import { Button } from '@renderer/shared/ui/Button/Button'
import Form from '@renderer/shared/ui/Form/Form'
import { FormField } from '@renderer/shared/ui/Form/types'

const FORM_FIELD_LIST: FormField[] = [
  { displayName: '계정', registerName: 'account' },
  { displayName: '비밀번호', registerName: 'password', type: 'password' },
  { displayName: '이름', registerName: 'name' }
]

export function RegisterForm() {
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
      <Form fieldList={FORM_FIELD_LIST} onSubmit={onSubmit}>
        <Button type="submit" className="ml-auto ">
          회원가입
        </Button>
      </Form>
    </div>
  )
}

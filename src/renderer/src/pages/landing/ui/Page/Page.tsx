import { LoginForm } from '@renderer/widget/LoginForm'
import { RegisterForm } from '@renderer/widget/RegisterForm'
import { useState } from 'react'

export function LandingPage() {
  const [isRegistering, setIsRegistering] = useState(false)

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-zinc-50 flex-col">
      <div className="bg-white min-w-[350px] min-h-[200px] px-4 py-8 rounded-sm shadow-md flex gap-4">
        <div className="basis-[40%] flex items-center justify-center border-r">
          <h1 className="font-bold">uXlack</h1>
        </div>
        <div className="flex-1 flex flex-col">
          {isRegistering ? <RegisterForm /> : <LoginForm />}

          <div className="mt-4 flex justify-center">
            <button
              onClick={() => setIsRegistering((prev) => !prev)}
              className="mt-auto mx-auto cursor-pointer text-sm transition-colors text-stone-850/65"
            >
              {isRegistering ? '로그인' : '회원가입'}{' '}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

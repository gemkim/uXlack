import { useProfile } from '@renderer/entities/auth/model/slices'
import { Button } from '@renderer/shared/ui/Button/Button'
import LoginForm from '@renderer/widget/auth/LoginForm'
import { RegisterForm } from '@renderer/widget/auth/RegisterForm'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

export default function LandingPage() {
  const [isRegistering, setIsRegistering] = useState(false)

  const profile = useProfile()
  const navigate = useNavigate()

  useEffect(() => {
    if (profile) {
      navigate('/home')
    }
  }, [profile])

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-zinc-50 flex-col relative">
      <div
        className="absolute top-0 left-0 w-full h-[50px]"
        style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}
      ></div>
      <div className="bg-white min-w-[350px] min-h-[200px] px-4 py-8 rounded-sm shadow-md flex gap-4">
        <div className="basis-[40%] flex items-center justify-center border-r">
          <h1 className="font-bold">uXlack</h1>
        </div>
        <div className="flex-1 flex flex-col">
          {isRegistering ? <RegisterForm setIsRegistering={setIsRegistering} /> : <LoginForm />}

          <div className="mt-4 flex justify-center">
            <Button onClick={() => setIsRegistering((prev) => !prev)}>
              {isRegistering ? '로그인으로' : '회원가입으로'}{' '}
            </Button>
            {/* <button
              
              className="mt-auto mx-auto cursor-pointer text-sm transition-colors text-stone-850/65"
            >
              {isRegistering ? '로그인으로' : '회원가입으로'}{' '}
            </button> */}
          </div>
        </div>
      </div>
    </div>
  )
}

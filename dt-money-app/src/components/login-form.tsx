import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useAuthContext } from '@/context/auth.context'
import { useSnackbarContext } from '@/context/snack-bar.context'
import { AppError } from '@/shared/helpers/app-error'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'expo-router'
import { Text, View } from 'react-native'
import { Button } from './button'
import { Input } from './input'

const loginFormSchema = z.object({
  email: z.email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

export type LoginFormData = z.infer<typeof loginFormSchema>

export function SignInForm() {
  const { handleAuthenticate } = useAuthContext()
  const { notify } = useSnackbarContext()

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function handleSignIn(data: LoginFormData) {
    try {
      await handleAuthenticate(data)
    } catch (error) {
      if (error instanceof AppError) {
        notify({
          message: error.message,
          type: 'ERROR',
        })
      }
    }
  }

  return (
    <View>
      <Input
        control={control}
        label="E-mail"
        leftIconName="mail"
        name="email"
        placeholder="email@exemple.com"
      />

      <Input
        control={control}
        label="Senha"
        leftIconName="lock-outline"
        name="password"
        placeholder="Sua senha"
        secureTextEntry
      />

      <View className="mt-8 mb-6 min-h-[250px] w-full flex-1 justify-between">
        <Button
          disabled={isSubmitting}
          iconName="arrow-forward"
          onPress={handleSubmit(handleSignIn)}
        >
          Login
        </Button>

        <View>
          <Text className="mb-6 text-balance text-gray-300">
            Ainda não possui uma conta ?
          </Text>

          <Link asChild href="/register">
            <Button iconName="arrow-forward" mode="outline">
              Cadastrar
            </Button>
          </Link>
        </View>
      </View>
    </View>
  )
}

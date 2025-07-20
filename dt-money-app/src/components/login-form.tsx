import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { Text, View } from 'react-native'
import { Button } from './button'
import { Input } from './input'

const loginFormSchema = z.object({
  email: z.email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

type LoginFormData = z.infer<typeof loginFormSchema>

export function SignInForm() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  })

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
        <Button iconName="arrow-forward">Login</Button>

        <View>
          <Text className="mb-6 text-balance text-gray-300">
            Ainda não possui uma conta ?
          </Text>

          <Button iconName="arrow-forward" mode="outline">
            Cadastrar
          </Button>
        </View>
      </View>
    </View>
  )
}

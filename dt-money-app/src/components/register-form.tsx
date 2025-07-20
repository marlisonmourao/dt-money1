import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'expo-router'
import { useForm } from 'react-hook-form'
import { Text, View } from 'react-native'
import z from 'zod'
import { Button } from './button'
import { Input } from './input'

const registerFormSchema = z
  .object({
    email: z.email('E-mail inválido'),
    name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
    password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z
      .string()
      .min(6, 'Senha deve ter pelo menos 6 caracteres'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

export type RegisterFormData = z.infer<typeof registerFormSchema>

export function RegisterForm() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
    },
  })

  function handleRegister(data: RegisterFormData) {}

  return (
    <>
      <Input
        control={control}
        label="Nome"
        leftIconName="person"
        name="name"
        placeholder="Seu nome"
      />

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

      <Input
        control={control}
        label="Confirme senha"
        leftIconName="lock-outline"
        name="confirmPassword"
        placeholder="Sua senha"
        secureTextEntry
      />

      <View className="mt-8 mb-6 min-h-[250px] w-full flex-1 justify-between">
        <Button
          disabled={isSubmitting}
          iconName="arrow-forward"
          onPress={handleSubmit(handleRegister)}
        >
          Cadastrar
        </Button>

        <View>
          <Text className="mb-6 text-balance text-gray-300">
            Já possui uma conta ?
          </Text>

          <Link asChild href="/">
            <Button iconName="arrow-forward" mode="outline">
              Entrar
            </Button>
          </Link>
        </View>
      </View>
    </>
  )
}

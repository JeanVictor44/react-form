import { useState } from 'react'
import './styles/global.css'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// A vantagem do react-hook-form é o uncontrolled components
// Ele busca os valores do input apenas quando fazemos o submit

// Controlled components -> anota os valores dos inputs em tempo de digitação em um state


// Schema -> Representação de uma estrutura de dados
const createUserFormSchema = z.object({
  email: z.string()
         .nonempty('O e-mail é obrigatório')
         .email('Formato de e-mail inválido'),
  password: z.string()
          .min(6, 'A senha precisa de no mínimo 6 caracteres')
})
/*
*   To-do
*   [ ] Validação / transformação 
*   [ ] Field arrays
*   [ ] Upload de arquivos
*   [ ] Composition Pattern
*/

type CreateUserFormData = z.infer<typeof createUserFormSchema>


function App() {
  const [output, setOtuput] = useState('')
  // Register para dizer quais os campos do nosso formulário
  const { 
    register, 
    handleSubmit, 
    formState: { errors }
  } = useForm<CreateUserFormData>({
    resolver:zodResolver(createUserFormSchema)
  })

  function createUser(data: any){
    setOtuput(JSON.stringify(data, null,2))
  }

  //high-order function 
  return (
    <main className='h-screen bg-zinc-950 text-zinc-300 flex items-center justify-center flex-col gap-5'>
      <form  
        onSubmit={handleSubmit(createUser)}
        className='flex flex-col gap-4 w-full max-w-sm'
      > 
        
        <div className='flex flex-col gap-1'>
          <label htmlFor=''>E-mail</label>
          <input 
            type="email" 
            className='border-zinc-200 shadow-sm rounded h-10 px-3 bg-zinc-800 text-white'
            {...register('email')}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor=''>Senha</label>
          <input 
            type="password" 
            className='border-zinc-200 shadow-sm rounded h-10 px-3 bg-zinc-800 text-white'
            {...register('password')}
          />
          {errors.password && <span>{errors.password.message}</span>}

        </div>
        <button 
          type='submit'
          className='bg-purple-500 rounded font-semibold text-white h-10 hover:bg-purple-600'
        >
          Salvar
          </button>
      </form>
      <pre>
        {output}
      </pre>
    </main>
  )
}

export default App

import React, { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import { useAuthStore } from '../hooks/useAuthStore';
import { useNavigate } from 'react-router-dom';

const schema = z.object({
  username: z.string().min(3, 'O nome de usuário deve ter pelo menos 3 caracteres'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});
type FormData = z.infer<typeof schema>;


const LoginForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const authStore = useAuthStore();

  const onSubmit = ({ username, password }: FieldValues) => {
    authStore.login(username, password);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (authStore.isAuthenticated){
      navigate("/")
    }
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{width: "40vw", minHeight: '60px'}}>
      <div className="form-group pb-4">
        <label htmlFor="username">Nome de Usuário</label>
        <input type="text" id="username" {...register('username')} className="form-control" />
        <p className="text-danger" style={{position: 'absolute'}}>{errors.username?.message}</p>
      </div>
      <div className="form-group pb-5">
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          {...register('password')}
          className="form-control"
        />
        <p className="text-danger" style={{position: 'absolute'}}>{errors.password?.message}</p>
      </div>
      <div className="d-grid gap-2">
        <button type="submit" className="btn custom-btn btn-lg">
          Entrar
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
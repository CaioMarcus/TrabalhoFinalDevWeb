import React, { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

const schema = z.object({
  username: z.string().min(3, 'O nome de usuário deve ter pelo menos 3 caracteres'),
  email: z.string().email('O email não é válido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  passwordCheck: z.string().min(6)
}).superRefine(({ passwordCheck, password }, ctx) => {
    if (passwordCheck !== password) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas não coincidem"
      });
    }
  });

type FormData = z.infer<typeof schema>;


const RegisterForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = ({ username, email, password }: FieldValues) => {
    console.log(username);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="username">Nome de Usuário</label>
        <input type="text" id="username" {...register('username')} className="form-control" />
        <p className="text-danger">{errors.username?.message}</p>
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="text" id="email" {...register('email')} className="form-control" />
        <p className="text-danger">{errors.email?.message}</p>
      </div>
      <div className="form-group">
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          {...register('password')}
          className="form-control"
        />
        <p className="text-danger">{errors.password?.message}</p>
      </div>
      <div className="form-group">
        <label htmlFor="passwordCheck">Confirmar Senha</label>
        <input
          type="password"
          id="passwordCheck"
          {...register('passwordCheck')}
          className="form-control"
        />
        <p className="text-danger">{errors.passwordCheck?.message}</p>
      </div>
      <button type="submit" className="btn btn-primary">
        Entrar
      </button>
    </form>
  );
};

export default RegisterForm;
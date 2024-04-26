'use client';

import Button from "@/components/button";
import Input from "@/components/input";
import { notify } from "@/components/toast";
import { routes } from "@/routes";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

const Index = () => {
  const navigate = useRouter();
  const [user, setUser] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    signIn("credentials", {
      email: user.email,
      password: user.password,
      redirect: false,
      callbackUrl: routes.main.monitor(),
    })
      .then((res) => {
        setLoading(false);
        if (res?.error) {
          notify.error(res?.error);
        } else {
          notify.success('Logged in successfully!');
          navigate.push(routes.main.monitor());
        }
      })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-center h-full gap-3">
      <p className="text-xl text-center mb-4">Login to EcoSync</p>
      <Input placeholder="Email" type="email" name="email" onChange={handleChange} required />
      <Input placeholder="Password" name="password" type="password" onChange={handleChange} required />
      <Link href={routes.auth.createPassword()}>
        <p className="text-sm text-right">Create password?</p>
      </Link>
      <Button loading={loading} type="submit" className="w-full">
        Login
      </Button>
    </form>
  );
};

export default Index;

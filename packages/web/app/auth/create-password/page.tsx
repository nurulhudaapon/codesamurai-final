'use client';

import Button from "@/components/button";
import Input from "@/components/input";
import { notify } from "@/components/toast";
import { routes } from "@/routes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createPassword } from "./server";

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
    createPassword({
      email: user.email,
      password: user.password
    })
      .then((res) => {
        if (res) {
          setLoading(false);
          notify.success('Password created successfully!');
          navigate.push(routes.auth.login());
        }
      })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-center h-full gap-3">
      <p className="text-xl text-center mb-4">Change Password</p>
      <Input placeholder="Email" type="email" name="email" onChange={handleChange} required />
      <Input placeholder="Password" name="password" type="password" onChange={handleChange} required />
      <Button loading={loading} type="submit" className="w-full mt-3">
        Create
      </Button>
    </form>
  );
};

export default Index;

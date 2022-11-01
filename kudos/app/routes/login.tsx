import { useState } from "react";
import { FormField } from "~/components/form-field";
import { Layout } from "~/components/layout";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setFormData((form) => ({
      ...form,
      [field]: event.target.value,
    }));
  };

  return (
    <Layout>
      <div className='h-full flex justify-center items-center flex-col gap-y-4'>
        <h2 className='text-5xl font-extrabold text-yellow-300'>
          Welcome to Kudos!
        </h2>
        <p className='font-semibold text-slate-300'>
          Log In To Give Some Praise!
        </p>

        <FormField
          htmlFor='email'
          label='Email'
          value={formData.email}
          onChange={(e) => handleInputChange(e, "email")}
        />
        <FormField
          htmlFor='password'
          label='Password'
          value={formData.password}
          onChange={(e) => handleInputChange(e, "password")}
          type='password'
        />
      </div>
    </Layout>
  );
}

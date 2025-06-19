import axios from "axios";
import { z } from "zod";
import { redirect } from "next/navigation";

const regisSchema = z.object({
  email: z
    .string()
    .min(1, "This Field Is Require.")
    .email("Please enter a valid email address.")
    .toLowerCase(),
  password: z.string().min(1, "This Field Is Require."),
  cfPassword: z.string().min(1, "This Field Is Require."),
});

type RegisterFormState = {
  error?: {
    email?: string[];
    password?: string[];
    cfPassword?: string[];
    _form?: string;
  };
  success?: boolean;
};

export const registerAction = async (
  prevState: RegisterFormState,
  formData: FormData
): Promise<RegisterFormState> => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const cfPassword = formData.get("cfPassword") as string;

  const validatedFields = regisSchema.safeParse({
    email,
    password,
    cfPassword,
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  if (password !== cfPassword) {
    return {
      error: {
        cfPassword: ["Password do not match."],
      },
    };
  }

  try {
    await axios.post("/api/auth/register", { email, password });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        error: {
          _form: error.response?.data.error,
        },
        success: false,
      };
    }
  }
  return { success: true };
};

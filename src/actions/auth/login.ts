import { z } from "zod";
import { signIn } from "next-auth/react";

const loginSchema = z.object({
    email: z.string().min(1, "This Field Is Require."),
    password: z.string().min(1, "This Field Is Require.")
});

type LoginFormState = {
    error?: {
        email?: string[],
        password?: string[],
        _form?: string,
    };
    success?: boolean;
    message?: string;
};

export const loginAction = async (prevState: LoginFormState, formData: FormData): Promise<LoginFormState> => {

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const validatedFields = loginSchema.safeParse({
        email,
        password
    });

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors,
            success: false,
            message: "Invalid data provided."
        };
    };

    const result = await signIn("credentials", {
        redirect: false,
        callbackUrl: "/",
        email,
        password,
    });

    if(result?.error) {
        return {
            error: {
                _form: result.error
            }
        }
    };

    return { success: true };

}
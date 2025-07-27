import { useForm } from "@tanstack/react-form";
import { Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      "Password must include uppercase, lowercase, number, and special character"
    ),
});

function Login() {
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      console.log(values);

      if (
        values.value.email === "ayanraza197@gmail.com" &&
        values.value.password === "Ayan123@"
      ) {
        navigate({ to: "/user/game/avitor" });
      } else {
        alert("Invalid credentials");
      }
    },
  });

  // const validateEmail = (value) => {
  //   // Extract string value, handling objects (e.g., event or input element)
  //   const inputValue =
  //     value && typeof value === "object"
  //       ? value.target?.value ?? value.value ?? String(value)
  //       : String(value ?? "");

  //   const trimmed = inputValue.trim();

  //   if (!trimmed) {
  //     return "Email is required";
  //   }

  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //   return emailRegex.test(trimmed) ? undefined : "Invalid email address";
  // };

  // const validatePassword = (value) => {
  //   // Extract string value, handling objects (e.g., event or input element)
  //   const inputValue =
  //     value && typeof value === "object"
  //       ? value.target?.value ?? value.value ?? String(value)
  //       : String(value ?? "");

  //   const trimmed = inputValue.trim();

  //   if (!trimmed) return "Password is required";
  //   const passwordRegex =
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  //   return passwordRegex.test(trimmed)
  //     ? undefined
  //     : "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character";
  // };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          {/* Email input with floating label */}
          <form.Field
            name="email"
            validators={{
              onBlur: loginSchema.shape.email,
            }}
            children={(field) => (
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-3 pb-1.5 text-sm text-gray-900 placeholder-transparent focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                  placeholder="Email address"
                />
                <label
                  htmlFor="email"
                  className={`absolute left-3 transition-all text-sm text-gray-500 peer-focus:text-indigo-600 
                    ${
                      field.state.value
                        ? "-top-2.5 text-sm bg-white"
                        : "top-2 text-base text-gray-400 peer-focus:-top-2.5 peer-focus:bg-white peer-focus:text-sm peer-focus:text-indigo-600"
                    }`}
                >
                  Email
                </label>
                {field.state.meta.errors?.length > 0 && (
                  <div className="mt-1 text-sm text-red-600">
                    {field.state.meta.errors[0].message}
                  </div>
                )}
              </div>
            )}
          />

          {/* Password input with floating label */}
          <form.Field
            name="password"
            validators={{
              onBlur: loginSchema.shape.password,
            }}
            children={(field) => (
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-3 pb-1.5 text-sm text-gray-900 placeholder-transparent focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                  placeholder="Password"
                />
                <label
                  htmlFor="password"
                  className={`absolute left-3 transition-all text-sm text-gray-500 peer-focus:text-indigo-600 
                    ${
                      field.state.value
                        ? "-top-2.5 text-sm bg-white"
                        : "top-2 text-base text-gray-400 peer-focus:-top-2.5 peer-focus:bg-white peer-focus:text-sm peer-focus:text-indigo-600"
                    }`}
                >
                  Password
                </label>
                {field.state.meta.errors?.length > 0 && (
                  <div className="mt-1 text-sm text-red-600">
                    {field.state.meta.errors[0].message}
                  </div>
                )}
              </div>
            )}
          />
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isSubmitting ? "Submitting..." : "Sign in"}
              </button>
            )}
          />
          <button
            type="button"
            onClick={() => {
              form.setFieldValue("email", "ayanraza197@gmail.com");
              form.setFieldValue("password", "Ayan123@");
              form.handleSubmit();
            }}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in With Demo
          </button>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link
            href="/register"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

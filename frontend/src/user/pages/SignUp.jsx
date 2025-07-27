// import { useForm } from "@tanstack/react-form";
// import { zodValidator } from "@tanstack/zod-form-adapter";
// import { Link, useNavigate } from "@tanstack/react-router";
// import { z } from "zod";
// import { MoveRight } from "lucide-react";

// const signUpSchema = z
//   .object({
//     phone: z.string().regex(/^\d{10}$/, "Phone must be exactly 10 digits"),
//     password: z
//       .string()
//       .min(8, "Password must be at least 8 characters")
//       .regex(
//         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
//         "Password must include uppercase, lowercase, number, and special character"
//       ),
//     confirmPassword: z.string(),
//     inviteCode: z.string().optional(),
//     verificationCode: z
//       .string()
//       .regex(/^\d{6}$/, "Verification code must be 6 digits"),
//     policy: z.boolean().refine((val) => val === true, {
//       message: "You must accept the terms and conditions",
//     }),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     path: ["confirmPassword"],
//     message: "Passwords do not match",
//   });

// function SignUp() {
//   const navigate = useNavigate();

//   const form = useForm({
//     defaultValues: {
//       phone: "",
//       password: "",
//       confirmPassword: "",
//       inviteCode: "",
//       verificationCode: "",
//       policy: false,
//     },
//     validatorAdapter: zodValidator,
//     validators: {
//       onChange: signUpSchema,
//     },
//     onSubmit: async ({ value }) => {
//       try {
//         console.log("Form values:", value);
//         if (value.phone && value.verificationCode === "123456") {
//           navigate({ to: "/user/game/avitor" });
//         } else {
//           alert("Invalid phone or verification code");
//         }
//       } catch (error) {
//         alert("An error occurred during registration");
//       }
//     },
//   });

//   return (
//     <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//         <img
//           className="mx-auto h-10 w-auto"
//           src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
//           alt="Your Company"
//         />
//         <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
//           Sign Up
//         </h2>
//       </div>

//       <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//         <form
//           className="space-y-6"
//           onSubmit={(e) => {
//             e.preventDefault();
//             form.handleSubmit();
//           }}
//         >
//           {/* Phone input */}
//           <form.Field
//             name="phone"
//             children={(field) => (
//               <div className="relative">
//                 <input
//                   id="phone"
//                   type="text"
//                   value={field.state.value}
//                   onBlur={field.handleBlur}
//                   onChange={(e) => field.handleChange(e.target.value)}
//                   className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-3 pb-1.5 text-sm text-gray-900 placeholder-transparent focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
//                   placeholder="Phone number"
//                 />
//                 <label
//                   htmlFor="phone"
//                   className={`absolute left-3 transition-all text-sm text-gray-500 peer-focus:text-indigo-600
//                     ${
//                       field.state.value
//                         ? "-top-2.5 text-sm bg-white"
//                         : "top-2 text-base text-gray-400 peer-focus:-top-2.5 peer-focus:bg-white peer-focus:text-sm peer-focus:text-indigo-600"
//                     }`}
//                 >
//                   Phone Number
//                 </label>
//                 {field.state.meta.errors?.length > 0 && (
//                   <div className="mt-1 text-sm text-red-600">
//                     {field.state.meta.errors[0].message}
//                   </div>
//                 )}
//               </div>
//             )}
//           />

//           {/* Password input */}
//           <form.Field
//             name="password"
//             children={(field) => (
//               <div className="relative">
//                 <input
//                   type="password"
//                   id="password"
//                   value={field.state.value}
//                   onBlur={field.handleBlur}
//                   onChange={(e) => field.handleChange(e.target.value)}
//                   className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-3 pb-1.5 text-sm text-gray-900 placeholder-transparent focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
//                   placeholder="Password"
//                 />
//                 <label
//                   htmlFor="password"
//                   className={`absolute left-3 transition-all text-sm text-gray-500 peer-focus:text-indigo-600
//                     ${
//                       field.state.value
//                         ? "-top-2.5 text-sm bg-white"
//                         : "top-2 text-base text-gray-400 peer-focus:-top-2.5 peer-focus:bg-white peer-focus:text-sm peer-focus:text-indigo-600"
//                     }`}
//                 >
//                   Password
//                 </label>
//                 {field.state.meta.errors?.length > 0 && (
//                   <div className="mt-1 text-sm text-red-600">
//                     {field.state.meta.errors[0].message}
//                   </div>
//                 )}
//               </div>
//             )}
//           />

//           {/* Confirm Password input */}
//           <form.Field
//             name="confirmPassword"
//             children={(field) => (
//               <div className="relative">
//                 <input
//                   type="password"
//                   id="confirmPassword"
//                   value={field.state.value}
//                   onBlur={field.handleBlur}
//                   onChange={(e) => field.handleChange(e.target.value)}
//                   className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-3 pb-1.5 text-sm text-gray-900 placeholder-transparent focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
//                   placeholder="Confirm Password"
//                 />
//                 <label
//                   htmlFor="confirmPassword"
//                   className={`absolute left-3 transition-all text-sm text-gray-500 peer-focus:text-indigo-600
//                     ${
//                       field.state.value
//                         ? "-top-2.5 text-sm bg-white"
//                         : "top-2 text-base text-gray-400 peer-focus:-top-2.5 peer-focus:bg-white peer-focus:text-sm peer-focus:text-indigo-600"
//                     }`}
//                 >
//                   Confirm Password
//                 </label>
//                 {field.state.meta.errors?.length > 0 && (
//                   <div className="mt-1 text-sm text-red-600">
//                     {field.state.meta.errors[0].message}
//                   </div>
//                 )}
//               </div>
//             )}
//           />

//           {/* Invite Code input */}
//           <form.Field
//             name="inviteCode"
//             children={(field) => (
//               <div className="relative">
//                 <input
//                   type="text"
//                   id="inviteCode"
//                   value={field.state.value}
//                   onBlur={field.handleBlur}
//                   onChange={(e) => field.handleChange(e.target.value)}
//                   className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-3 pb-1.5 text-sm text-gray-900 placeholder-transparent focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
//                   placeholder="Invite Code"
//                 />
//                 <label
//                   htmlFor="inviteCode"
//                   className={`absolute left-3 transition-all text-sm text-gray-500 peer-focus:text-indigo-600
//                     ${
//                       field.state.value
//                         ? "-top-2.5 text-sm bg-white"
//                         : "top-2 text-base text-gray-400 peer-focus:-top-2.5 peer-focus:bg-white peer-focus:text-sm peer-focus:text-indigo-600"
//                     }`}
//                 >
//                   Invite Code (Optional)
//                 </label>
//                 {field.state.meta.errors?.length > 0 && (
//                   <div className="mt-1 text-sm text-red-600">
//                     {field.state.meta.errors[0]}
//                   </div>
//                 )}
//               </div>
//             )}
//           />

//           {/* Verification Code input */}
//           <form.Field
//             name="verificationCode"
//             children={(field) => (
//               <div className="relative group flex justify-content-between items-center">
//                 <input
//                   type="text"
//                   id="verificationCode"
//                   value={field.state.value}
//                   onBlur={field.handleBlur}
//                   onChange={(e) => field.handleChange(e.target.value)}
//                   className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-3 pb-1.5 text-sm text-gray-900 placeholder-transparent focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
//                   placeholder="Verification Code"
//                 />
//                 <label
//                   htmlFor="verificationCode"
//                   className={`absolute left-3 transition-all text-sm text-gray-500 peer-focus:text-indigo-600
//                     ${
//                       field.state.value
//                         ? "-top-2.5 text-sm bg-white"
//                         : "top-2 text-base text-gray-400 peer-focus:-top-2.5 peer-focus:bg-white peer-focus:text-sm peer-focus:text-indigo-600"
//                     }`}
//                 >
//                   Verification Code
//                 </label>
//                 <button className="absolute right-1 flex items-center justify-center group-hover:space-x-2 bg-indigo-600 text-gray-300 rounded-md p-1 w-28 hover:bg-indigo-700 group-hover:w-32 transition-all duration-75">
//                   <span className="inline-flex items-center group-justify-center text-center">
//                     SEND
//                   </span>
//                   <span className="items-center transform translate-x-[14px] group-hover:translate-x-0 inline-flex opacity-0 group-hover:opacity-100 transition-all ease-in duration-75">
//                     <MoveRight className="absolute inline-flex text-xs" />
//                   </span>
//                 </button>
//                 {field.state.meta.errors?.length > 0 && (
//                   <div className="mt-1 text-sm text-red-600">
//                     {field.state.meta.errors[0]}
//                   </div>
//                 )}
//               </div>
//             )}
//           />

//           {/* Policy Checkbox */}
//           <form.Field
//             name="policy"
//             children={(field) => (
//               <div className="flex items-center">
//                 <input
//                   id="policy"
//                   type="checkbox"
//                   checked={field.state.value}
//                   onChange={(e) => field.handleChange(e.target.checked)}
//                   className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
//                 />
//                 <label htmlFor="policy" className="ml-2 text-sm text-gray-900">
//                   I agree to the{" "}
//                   <a
//                     href="/terms"
//                     className="text-indigo-600 hover:text-indigo-500"
//                   >
//                     Terms and Conditions
//                   </a>
//                 </label>
//                 {field.state.meta.errors?.length > 0 && (
//                   <div className="mt-1 text-sm text-red-600">
//                     {field.state.meta.errors[0]}
//                   </div>
//                 )}
//               </div>
//             )}
//           />

//           {/* Submit Button */}
//           <form.Subscribe
//             selector={(state) => [state.canSubmit, state.isSubmitting]}
//             children={([canSubmit, isSubmitting]) => (
//               <button
//                 type="submit"
//                 disabled={!canSubmit || isSubmitting}
//                 className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//               >
//                 {isSubmitting ? "Submitting..." : "Sign Up"}
//               </button>
//             )}
//           />
//         </form>

//         <p className="mt-10 text-center text-sm text-gray-500">
//           Already have an account?{" "}
//           <Link
//             to="/"
//             className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
//           >
//             Log In
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default SignUp;

import { useForm } from "@tanstack/react-form";
import { Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { MoveRight } from "lucide-react";

const signUpSchema = z
  .object({
    phone: z.string().regex(/^\d{10}$/, "Phone must be exactly 10 digits"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
        "Password must include uppercase, lowercase, number, and special character"
      ),
    confirmPassword: z.string(),
    inviteCode: z.string().optional(),
    verificationCode: z
      .string()
      .regex(/^\d{6}$/, "Verification code must be 6 digits"),
    policy: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

function SignUp() {
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      phone: "",
      password: "",
      confirmPassword: "",
      inviteCode: "",
      verificationCode: "",
      policy: false,
    },
    validators: {
      onBlur: signUpSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        console.log("Form values:", value);
        if (value.phone && value.verificationCode === "123456") {
          navigate({ to: "/user/game/avitor" });
        } else {
          alert("Invalid phone or verification code");
        }
      } catch (error) {
        alert("An error occurred during registration");
      }
    },
  });

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Sign Up
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
          {/* Phone input */}
          <form.Field
            name="phone"
            // validators={{
            //   onBlur: signUpSchema.shape.phone,
            // }}
            children={(field) => (
              <div className="relative">
                <input
                  id="phone"
                  type="text"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-3 pb-1.5 text-sm text-gray-900 placeholder-transparent focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                  placeholder="Phone number"
                />
                <label
                  htmlFor="phone"
                  className={`absolute left-3 transition-all text-sm text-gray-500 peer-focus:text-indigo-600 
                    ${
                      field.state.value
                        ? "-top-2.5 text-sm bg-white"
                        : "top-2 text-base text-gray-400 peer-focus:-top-2.5 peer-focus:bg-white peer-focus:text-sm peer-focus:text-indigo-600"
                    }`}
                >
                  Phone Number
                </label>
                {field.state.meta.errors?.length > 0 && (
                  <div className="mt-1 text-sm text-red-600">
                    {field.state.meta.errors[0].message}
                  </div>
                )}
              </div>
            )}
          />
          {/* Password input */}
          <form.Field
            name="password"
            // validators={{
            //   onBlur: signUpSchema.shape.password,
            // }}
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
          {/* Confirm Password input */}
          <form.Field
            // validators={{
            //   onBlur: signUpSchema.shape.confirmPassword,
            // }}
            name="confirmPassword"
            children={(field) => (
              <div className="relative">
                <input
                  type="password"
                  id="confirmPassword"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-3 pb-1.5 text-sm text-gray-900 placeholder-transparent focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                  placeholder="Confirm Password"
                />
                <label
                  htmlFor="confirmPassword"
                  className={`absolute left-3 transition-all text-sm text-gray-500 peer-focus:text-indigo-600 
                    ${
                      field.state.value
                        ? "-top-2.5 text-sm bg-white"
                        : "top-2 text-base text-gray-400 peer-focus:-top-2.5 peer-focus:bg-white peer-focus:text-sm peer-focus:text-indigo-600"
                    }`}
                >
                  Confirm Password
                </label>
                {field.state.meta.errors?.length > 0 && (
                  <div className="mt-1 text-sm text-red-600">
                    {field.state.meta.errors[0].message}
                  </div>
                )}
              </div>
            )}
          />
          {/* Invite Code input */}
          <form.Field
            name="inviteCode"
            children={(field) => (
              <div className="relative">
                <input
                  type="text"
                  id="inviteCode"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-3 pb-1.5 text-sm text-gray-900 placeholder-transparent focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                  placeholder="Invite Code"
                />
                <label
                  htmlFor="inviteCode"
                  className={`absolute left-3 transition-all text-sm text-gray-500 peer-focus:text-indigo-600 
                    ${
                      field.state.value
                        ? "-top-2.5 text-sm bg-white"
                        : "top-2 text-base text-gray-400 peer-focus:-top-2.5 peer-focus:bg-white peer-focus:text-sm peer-focus:text-indigo-600"
                    }`}
                >
                  Invite Code (Optional)
                </label>
                {field.state.meta.errors?.length > 0 && (
                  <div className="mt-1 text-sm text-red-600">
                    {field.state.meta.errors[0].message}
                  </div>
                )}
              </div>
            )}
          />
          {/* Verification Code input */}
          <form.Field
            name="verificationCode"
            children={(field) => (
              <div className="relative group flex justify-between items-center">
                <input
                  type="text"
                  id="verificationCode"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-3 pb-1.5 text-sm text-gray-900 placeholder-transparent focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                  placeholder="Verification Code"
                />
                <label
                  htmlFor="verificationCode"
                  className={`absolute left-3 transition-all text-sm text-gray-500 peer-focus:text-indigo-600 
                    ${
                      field.state.value
                        ? "-top-2.5 text-sm bg-white"
                        : "top-2 text-base text-gray-400 peer-focus:-top-2.5 peer-focus:bg-white peer-focus:text-sm peer-focus:text-indigo-600"
                    }`}
                >
                  Verification Code
                </label>
                <button
                  type="button"
                  onClick={() => {
                    console.log(
                      "Sending verification code for:",
                      form.state.values.phone
                    );
                    // Add API call to send verification code here
                  }}
                  className="absolute right-1 flex items-center justify-center group-hover:space-x-2 bg-indigo-600 text-gray-300 rounded-md p-1 w-28 hover:bg-indigo-700 group-hover:w-32 transition-all duration-75"
                >
                  <span className="inline-flex items-center justify-center text-center">
                    SEND
                  </span>
                  <span className="items-center transform translate-x-[14px] group-hover:translate-x-0 inline-flex opacity-0 group-hover:opacity-100 transition-all ease-in duration-75">
                    <MoveRight className="absolute inline-flex text-xs" />
                  </span>
                </button>
                {field.state.meta.errors?.length > 0 && (
                  <div className="mt-1 text-sm text-red-600">
                    {field.state.meta.errors[0].message}
                  </div>
                )}
              </div>
            )}
          />
          {/* Policy Checkbox */}
          <form.Field
            name="policy"
            children={(field) => (
              <div className="flex items-center">
                <input
                  id="policy"
                  type="checkbox"
                  checked={field.state.value}
                  onChange={(e) => field.handleChange(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor="policy" className="ml-2 text-sm text-gray-900">
                  I agree to the{" "}
                  <a
                    href="/terms"
                    className="text-indigo-600 hover:text-indigo-500"
                  >
                    Terms and Conditions
                  </a>
                </label>
                {field.state.meta.errors?.length > 0 && (
                  <div className="mt-1 text-sm text-red-600">
                    {field.state.meta.errors[0].message}
                  </div>
                )}
              </div>
            )}
          />
          {/* Submit Button */}
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isSubmitting ? "Submitting..." : "Sign Up"}
              </button>
            )}
          />
          {/* Demo Button */}
          <button
            type="button"
            onClick={() => {
              form.setFieldValue("phone", "1234567890");
              form.setFieldValue("password", "Password123@");
              form.setFieldValue("confirmPassword", "Password123@");
              form.setFieldValue("inviteCode", "INVITE123");
              form.setFieldValue("verificationCode", "123456");
              form.setFieldValue("policy", true);
              form.handleSubmit();
            }}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign Up With Demo
          </button>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;

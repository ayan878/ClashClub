// import { useState } from "react";
// import { useForm, useField } from "@tanstack/react-form";

// const OTPInput = ({ length = 6 }) => {
//   const [otp, setOtp] = useState(Array(length).fill(""));

//   const handleChange = (value, index, field) => {
//     if (/^[0-9]?$/.test(value)) {
//       const newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);
//       field.handleChange(newOtp.join(""));

//       // Auto-focus next input
//       if (value && index < length - 1) {
//         document.getElementById(`otp-${index + 1}`).focus();
//       }
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     // Handle backspace
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       document.getElementById(`otp-${index - 1}`).focus();
//     }
//   };

//   const handlePaste = (e, field) => {
//     e.preventDefault();
//     const pastedData = e.clipboardData.getData("text").slice(0, length);
//     if (/^\d+$/.test(pastedData)) {
//       const newOtp = pastedData.split("").slice(0, length);
//       setOtp(newOtp.concat(Array(length - newOtp.length).fill("")));
//       field.handleChange(pastedData);
//       document
//         .getElementById(`otp-${Math.min(pastedData.length - 1, length - 1)}`)
//         .focus();
//     }
//   };

//   return (
//     <useField
//       name="verificationCode"
//       validators={{
//         onChange: ({ value }) => {
//           if (!value) return "Verification code is required";
//           if (value.length !== length)
//             return `Please enter a ${length}-digit code`;
//           if (!/^\d+$/.test(value)) return "Code must contain only digits";
//           return undefined;
//         },
//       }}
//     >
//       {(field) => (
//         <div className="flex flex-col gap-2">
//           <div className="flex gap-2">
//             {Array.from({ length }).map((_, index) => (
//               <div key={index} className="relative">
//                 <input
//                   type="text"
//                   id={`otp-${index}`}
//                   maxLength={1}
//                   value={otp[index]}
//                   onChange={(e) => handleChange(e.target.value, index, field)}
//                   onKeyDown={(e) => handleKeyDown(e, index)}
//                   onPaste={(e) => handlePaste(e, field)}
//                   onBlur={() => field.handleBlur()}
//                   className="peer block w-12 h-12 rounded-md border border-gray-300 bg-white text-center text-lg text-gray-900 placeholder-transparent focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
//                 />
//                 <label
//                   htmlFor={`otp-${index}`}
//                   className={`absolute left-3 transition-all text-sm text-gray-500 peer-focus:text-indigo-600 
//                     ${
//                       otp[index]
//                         ? "-top-2.5 text-sm bg-white"
//                         : "top-2 text-base text-gray-400 peer-focus:-top-2.5 peer-focus:bg-white peer-focus:text-sm peer-focus:text-indigo-600"
//                     }`}
//                 >
//                   {index + 1}
//                 </label>
//               </div>
//             ))}
//           </div>
//           {field.state.meta.errors && (
//             <div className="mt-1 text-sm text-red-600">
//               {field.state.meta.errors}
//             </div>
//           )}
//         </div>
//       )}
//     </useField>
//   );
// };

// export default OTPInput;


// import { useState } from "react";
// import { useField } from "@tanstack/react-form";

// const OTPInput = ({ length = 6 }) => {
//   const [otp, setOtp] = useState(Array(length).fill(""));

//   const field = useField({
//     name: "verificationCode",
//   });

//   const handleChange = (value, index) => {
//     if (/^[0-9]?$/.test(value)) {
//       const newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);
//       field.handleChange(newOtp.join(""));

//       // Auto-focus next input
//       if (value && index < length - 1) {
//         document.getElementById(`otp-${index + 1}`).focus();
//       }
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     // Handle backspace
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       document.getElementById(`otp-${index - 1}`).focus();
//     }
//   };

//   const handlePaste = (e) => {
//     e.preventDefault();
//     const pastedData = e.clipboardData.getData("text").slice(0, length);
//     if (/^\d+$/.test(pastedData)) {
//       const newOtp = pastedData.split("").slice(0, length);
//       setOtp(newOtp.concat(Array(length - newOtp.length).fill("")));
//       field.handleChange(pastedData);
//       document
//         .getElementById(`otp-${Math.min(pastedData.length - 1, length - 1)}`)
//         .focus();
//     }
//   };

//   return (
//     <div className="flex flex-col gap-2">
//       <div className="flex gap-2">
//         {Array.from({ length }).map((_, index) => (
//           <div key={index} className="relative">
//             <input
//               type="text"
//               id={`otp-${index}`}
//               maxLength={1}
//               value={otp[index]}
//               onChange={(e) => handleChange(e.target.value, index)}
//               onKeyDown={(e) => handleKeyDown(e, index)}
//               onPaste={(e) => handlePaste(e)}
//               onBlur={() => field.handleBlur()}
//               className="peer block w-12 h-12 rounded-md border border-gray-300 bg-white text-center text-lg text-gray-900 placeholder-transparent focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
//             />
//             <label
//               htmlFor={`otp-${index}`}
//               className={`absolute left-3 transition-all text-sm text-gray-500 peer-focus:text-indigo-600 
//                 ${
//                   otp[index]
//                     ? "-top-2.5 text-sm bg-white"
//                     : "top-2 text-base text-gray-400 peer-focus:-top-2.5 peer-focus:bg-white peer-focus:text-sm peer-focus:text-indigo-600"
//                 }`}
//             >
//               {index + 1}
//             </label>
//           </div>
//         ))}
//       </div>
//       {field.state.meta.errors && (
//         <div className="mt-1 text-sm text-red-600">
//           {field.state.meta.errors}
//         </div>
//       )}
//     </div>
//   );
// };

// export default OTPInput;

import { useState } from "react";

const OTPInput = ({ length = 6, field }) => {
  const [otp, setOtp] = useState(Array(length).fill(""));

  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      field.handleChange(newOtp.join(""));

      // Auto-focus next input
      if (value && index < length - 1) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, length);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = pastedData.split("").slice(0, length);
      setOtp(newOtp.concat(Array(length - newOtp.length).fill("")));
      field.handleChange(pastedData);
      document
        .getElementById(`otp-${Math.min(pastedData.length - 1, length - 1)}`)
        .focus();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        {Array.from({ length }).map((_, index) => (
          <div key={index} className="relative">
            <input
              type="text"
              id={`otp-${index}`}
              maxLength={1}
              value={otp[index]}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={(e) => handlePaste(e)}
              onBlur={() => field.handleBlur()}
              className="peer block w-12 h-12 rounded-md border border-gray-300 bg-white text-center text-lg text-gray-900 placeholder-transparent focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
            />
            <label
              htmlFor={`otp-${index}`}
              className={`absolute left-3 transition-all text-sm text-gray-500 peer-focus:text-indigo-600 
                ${
                  otp[index]
                    ? "-top-2.5 text-sm bg-white"
                    : "top-2 text-base text-gray-400 peer-focus:-top-2.5 peer-focus:bg-white peer-focus:text-sm peer-focus:text-indigo-600"
                }`}
            >
              {index + 1}
            </label>
          </div>
        ))}
      </div>
      {field.state.meta.errors && (
        <div className="mt-1 text-sm text-red-600">
          {field.state.meta.errors}
        </div>
      )}
    </div>
  );
};

export default OTPInput;
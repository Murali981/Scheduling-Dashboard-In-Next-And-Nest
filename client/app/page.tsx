// import Link from "next/link";

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
//       <div className="text-center max-w-lg px-6">
//         <h1 className="text-4xl font-bold text-gray-900 mb-3">
//           🐾 VetScheduler
//         </h1>
//         <p className="text-lg text-gray-600 mb-8">
//           Veterinary clinic scheduling platform for managing services, pricing,
//           and appointments.
//         </p>
//         <Link
//           href="/dashboard?clinicId=clinic_abc"
//           className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
//         >
//           Go to Dashboard
//         </Link>
//       </div>
//     </div>
//   );
// }

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center max-w-lg px-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          🐾 VetScheduler
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Veterinary clinic scheduling platform for managing services, pricing,
          and appointments.
        </p>
        <Link
          href="/dashboard?clinicId=clinic_abc"
          className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}

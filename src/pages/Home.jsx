import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";
import JobInput from "../components/JobInput.jsx";
import QueueMonitor from "../components/QueueMonitor.jsx";
export default function Home() {

   return (
       <>
           <Header></Header>
           <div className="flex">
               <Sidebar></Sidebar>
               <div className="w-full p-2">
                   {/* card counter*/}
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                       <div className="bg-white p-6 rounded-lg shadow-md">
                           <h2 className="text-xl font-semibold text-gray-800 mb-4">PENDING</h2>
                           <p className="text-3xl font-bold text-yellow-500">1,000</p>
                       </div>
                       <div className="bg-white p-6 rounded-lg shadow-md">
                           <h2 className="text-xl font-semibold text-gray-800 mb-4">DONE</h2>
                           <p className="text-3xl font-bold text-green-600">800</p>
                       </div>
                       <div className="bg-white p-6 rounded-lg shadow-md">
                           <h2 className="text-xl font-semibold text-gray-800 mb-4">FAILED</h2>
                           <p className="text-3xl font-bold text-red-600">200</p>
                       </div>
                   </div>

                   {/* job generator */}
                    <JobInput></JobInput>

                    {/* queue monitor   */}
                    <QueueMonitor className="mt-3"></QueueMonitor>
               </div>
           </div>
       </>
   )
}
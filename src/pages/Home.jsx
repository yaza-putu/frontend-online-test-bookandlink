import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";
import JobInput from "../components/JobInput.jsx";
import QueueMonitor from "../components/QueueMonitor.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
export default function Home() {
    const [socket, setSocket] = useState(null);
    const [rows, setRows] = useState([])
    const [workerLog, setWorkerLog] = useState("")
    var tmpText = ""
    const [count, setCount] = useState({
        pending : 0,
        done : 0,
        failed : 0
    })

    useEffect(() => {
        const newSocket = new WebSocket(import.meta.env.VITE_WSS_URL);
        setSocket(newSocket);

        newSocket.onopen = () => {
            console.log("Client connected!");
        }

        newSocket.onmessage = (event) => {
            let receive =  JSON.parse(event.data)
            console.log("Received message:",receive);
            if (receive.event == "dashboard_count") {
                setCount({
                    pending: receive.data.Pending,
                    done: receive.data.Done,
                    failed: receive.data.Failed
                })
            }

            if (receive.event == "update_table") {
                setRows(receive.data.rows)
            }

            if(receive.event == "worker_log") {
                tmpText += receive.data +" \n "
                setWorkerLog(tmpText)
                let textarea = document.getElementById('message');
                textarea.scrollTop = textarea.scrollHeight;
            }

        }

        newSocket.onclose = () => {
            console.log("Client disconnected!");
        }

        return () => newSocket.close();
    }, [])


    const excePendingJob = () => {
        axios.get("/api/v1/queue/check")
    }

    const rollBackFailedJob = () => {
        axios.get("/api/v1/queue/rollback")
    }


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
                           <p className="text-3xl font-bold text-yellow-500">{count.pending}</p>
                       </div>
                       <div className="bg-white p-6 rounded-lg shadow-md">
                           <h2 className="text-xl font-semibold text-gray-800 mb-4">DONE</h2>
                           <p className="text-3xl font-bold text-green-600">{count.done}</p>
                       </div>
                       <div className="bg-white p-6 rounded-lg shadow-md">
                           <h2 className="text-xl font-semibold text-gray-800 mb-4">FAILED</h2>
                           <p className="text-3xl font-bold text-red-600">{count.failed}</p>
                       </div>
                   </div>

                   {/* job generator */}
                    <JobInput></JobInput>

                   <div className="flex mt-3 mb-3 gap-2">
                       <button type="button" onClick={excePendingJob} className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                           Execute Pending Job
                           <span className="inline-flex items-center justify-center w-10 h-4 ms-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
                            {count.pending}
                            </span>
                       </button>
                       <button type="button" onClick={rollBackFailedJob} className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                           Roll Back Failed Job
                           <span className="inline-flex items-center justify-center w-10 h-4 ms-2 text-xs font-semibold text-blue-800 bg-red-200 rounded-full">
                            {count.failed}
                            </span>
                       </button>
                   </div>

                   <textarea id="message" value={workerLog} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Log activity job..."></textarea>

                    {/* queue monitor   */}
                    <QueueMonitor data={rows}></QueueMonitor>
               </div>
           </div>
       </>
   )
}
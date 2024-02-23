import {useEffect, useState} from "react";

export default function QueueMonitor({data}) {

    const checkStatus = (status) => {
        switch (status) {
            case "DONE" :
                return (
                    <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> DONE
                    </div>
                )
            case "PROCESSING":
                return (
                    <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-blue-500 me-2"></div> PROCESSING
                    </div>
                )
            case "FAILED":
                return (
                    <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div> FAILED
                    </div>
                )
            default:
                return (
                    <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-yellow-500 me-2"></div> PENDING
                    </div>
                )
        }
    }

    return (
        <>
            <div className={`mt-4 relative overflow-x shadow-md sm:rounded-lg`}>
                <table className="table-auto overflow-scroll w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                        <th scope="col" className="px-6 py-3">
                            Job Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Payload
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Done in
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? data.map((item) =>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                {item.name}
                            </th>
                            <td className="px-6 py-4">
                                {item.payload}
                            </td>
                            <td data="px-6 py-4">
                                {checkStatus(item.status)}
                            </td>
                            <td className="px-6 py-4">
                                {item.duration?? '-'}
                            </td>
                        </tr>
                        ) : (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td colSpan={4} className="text-center">Empty</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}
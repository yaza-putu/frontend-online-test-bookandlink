export default function QueueMonitor({data,pagination, wss}) {

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

    const changePage = (pageNumber) => {
        wss.send(JSON.stringify({event: "pagination" , data: pageNumber}))
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
                            <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
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
                    <tfoot>
                    <div className="flex flex-col p-2 mb-3">
                        <span className="text-sm text-gray-700 dark:text-gray-400">
                              Showing <span className="font-semibold text-gray-900 dark:text-white">{(pagination.page -1) * 10 + 1}</span> to <span className="font-semibold text-gray-900 dark:text-white">{pagination.page * 10}</span> of <span className="font-semibold text-gray-900 dark:text-white">{pagination.total_rows == 0 ? pagination.page * 10: pagination.total_rows }</span> Entries
                          </span>
                        <div className="inline-flex mt-2 xs:mt-0 gap-2">
                            <button onClick={() => changePage(pagination.page == 1 ? 1 : pagination.page - 1)} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
                                </svg>
                                Prev
                            </button>
                            <button onClick={() => changePage(1)} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 18L5 6M19 6V18L9 12L19 6Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                                Begin
                            </button>
                            <button onClick={() => changePage(pagination.total_pages == 0? ((pagination.page * 10) / 10) : pagination.total_pages)} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                End
                                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fbf9f9"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17 5V19M7 7.329V16.671C7 17.7367 7 18.2695 7.21846 18.5432C7.40845 18.7812 7.69654 18.9197 8.00108 18.9194C8.35125 18.919 8.76734 18.5861 9.59951 17.9204L13.8765 14.4988C14.9442 13.6446 15.4781 13.2176 15.6713 12.7016C15.8408 12.2492 15.8408 11.7508 15.6713 11.2984C15.4781 10.7824 14.9442 10.3554 13.8765 9.50122L9.59951 6.07961C8.76734 5.41387 8.35125 5.081 8.00108 5.08063C7.69654 5.0803 7.40845 5.21876 7.21846 5.45677C7 5.73045 7 6.2633 7 7.329Z" stroke="#fcfcfc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                            </button>
                            <button onClick={() => changePage(pagination.page + 1)} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                Next
                                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    </tfoot>
                </table>
            </div>
        </>
    )
}
import {useEffect, useState} from "react";

export default function QueueMonitor({data}) {

    const [html, setHtml] = useState('')


    useEffect(() => {

        let rawHtml = ''
        if (data.length > 0) {
            for(let i in data) {
                rawHtml += `
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    ${data[i].name}
                </th>
                <td className="px-6 py-4">
                    ${data[i].payload}
                </td>
                <td data="px-6 py-4">
                 ${data[i].status}
                </td>
                <td className="px-6 py-4">
                    ${data[i].duration?? '-'}
                </td>
            </tr>
            `
            }
        } else {
        setHtml(`<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
         <td colspan="4">Empty</td>
        </tr>`)
        }

        setHtml(rawHtml)
    }, []);



    return (
        <>
            <div className={`mt-4 relative overflow-x-auto shadow-md sm:rounded-lg`}>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
                    <tbody dangerouslySetInnerHTML={{ __html: html }}></tbody>
                </table>
            </div>
        </>
    )
}
'use client'

import React from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { BsBarChartFill } from 'react-icons/bs'

import { useGlobalStore } from '@/_store/globalStore'

import { SkeletonLoader } from './components/SkeletonLoader'

function Page() {
  const [apiLogs, status, fetchAndSetApiLogsToState] = useGlobalStore((state) => [
    state.apiState.apiLogs,
    state.apiState.status,
    state.apiActions.fetchAndSetApiLogsToState
  ])

  function created(date: string) {
    const createdAt = new Date(date)

    return createdAt.toLocaleString()
  }

  React.useEffect(() => {
    try {
      fetchAndSetApiLogsToState()
    } catch (error) {
      console.log(error)

      toast.error('Failed to fetch logs. Please try again.', { position: 'top-right' })
    }
  }, [])

  return (
    <div className="flex flex-col gap-12 px-4 lg:w-[85%] md:w-[90%]">
      <Toaster />
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <BsBarChartFill className="md:w-6 md:h-6" />
            <h1 className="md:text-4xl text-2xl  font-[Haffer]">API Logs</h1>
          </div>
          <div className="text-xs  font-light tracking-widest">Most recent calls made using your API keys.</div>
        </div>
      </div>
      <div className="flex w-full border border-slate-500 rounded-md overflow-auto">
        <table className="table-fixed w-full">
          <thead className="">
            <tr className="tracking-wider">
              <th className="py-2 md:px-8 px-2 text-left font-normal">Key</th>
              <th className="py-2 md:px-8 px-2 text-left font-normal md:w-[45%]">Endpoint</th>
              <th className="py-2 md:px-8 px-2 text-left font-normal md:w-[15%]">Status</th>
              <th className="py-2 md:px-8 px-2 text-left font-normal md:w-[20%]">Created</th>
            </tr>
          </thead>
          {status === 'IDLE' || status === 'PENDING' ? (
            <tbody>
              <tr>
                <td colSpan={4} className="py-6 px-8">
                  <SkeletonLoader />
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className="overflow-x-scroll tracking-wider">
              {apiLogs.length === 0 && (
                <tr className="border-t border-slate-500">
                  <td colSpan={4} className="py-6 px-8 text-center">
                    No API Logs to show
                  </td>
                </tr>
              )}
              {apiLogs.map((log, idx) => (
                <tr key={idx + 1} className="border-t border-slate-500">
                  <td className="py-2 md:px-8 px-2">{log.key_name}</td>
                  <td className="py-2 md:px-8 px-2">{log.endpoint}</td>
                  <td className="py-2 md:px-8 px-2">{log.status}</td>
                  <td className="py-2 md:px-8 px-2">{created(log.created_at)}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  )
}

export default Page

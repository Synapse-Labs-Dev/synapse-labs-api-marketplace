'use client'

import React from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { FaKey } from 'react-icons/fa'
import { MdContentCopy, MdDelete } from 'react-icons/md'

import { ApiKey } from '@/_store/api/types'
import { useGlobalStore } from '@/_store/globalStore'
import { copyToClipboard } from '@/_utils/helpers'

import { Modal } from './components/Modal'
import { SkeletonLoader } from './components/SkeletonLoader'

function Page() {
  const [apiKeys, status, fetchAndSetApiKeysToState, deleteApiKey] = useGlobalStore((state) => [
    state.apiState.apiKeys,
    state.apiState.status,
    state.apiActions.fetchAndSetApiKeysToState,
    state.apiActions.deleteApiKey
  ])

  function created(date: string) {
    const createdAt = new Date(date)
    return createdAt.toLocaleString()
  }

  React.useEffect(() => {
    try {
      fetchAndSetApiKeysToState()
    } catch (error) {
      console.log(error)
      toast.error('Failed to fetch keys. Please try again.', { position: 'top-right' })
    }
  }, [])

  async function deleteKey(key: ApiKey) {
    await deleteApiKey(key)
    toast.success('Api key deleted', { position: 'top-right' })
  }

  return (
    <div className="flex flex-col gap-12 px-4 lg:w-[85%] md:w-[90%]">
      <Toaster />
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <FaKey className="md:w-6 md:h-6" />
            <h1 className="md:text-4xl text-2xl font-[Haffer]">API Keys</h1>
          </div>
          <div className="text-xs  font-light tracking-widest">
            Calls made using Trial keys are free of charge. Trial keys are rate-limited,
            <br /> and cannot be user for commercial purposes.
          </div>
        </div>
        <div className="flex items-start py-4">
          <Modal />
        </div>
      </div>
      <div className="flex w-full border border-slate-500 rounded-md overflow-auto">
        <table className="table-fixed w-full">
          <thead className="overflow-auto">
            <tr className="tracking-wider">
              <th className="py-2 md:px-8 px-2 text-left font-normal lg:w-[10%] ">Name</th>
              <th className="py-2 md:px-8 px-2 text-left font-normal">Key</th>
              <th className="py-2 md:px-8 px-2 text-left font-normal lg:w-[15%] ">Credits</th>
              <th className="py-2 md:px-8 px-2 text-left font-normal lg:w-[20%] ">Created</th>
              <th className="py-2 md:px-8 px-2 text-left font-normal lg:w-[15%] "></th>
            </tr>
          </thead>
          {status === 'IDLE' || status === 'PENDING' ? (
            <tbody>
              <tr>
                <td colSpan={5} className="py-6 px-8">
                  <SkeletonLoader />
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className="overflow-auto tracking-wider">
              {apiKeys.length === 0 && (
                <tr className="border-t border-slate-500">
                  <td colSpan={4} className="py-6 px-8 text-center">
                    Generate API Key to get started
                  </td>
                </tr>
              )}
              {apiKeys.map((key, idx) => (
                <tr key={idx + 1} className="border-t border-slate-500 w-[50vw] ">
                  <td className="py-2 md:px-8 px-2">{key.name}</td>
                  <td className="py-2 md:px-8 px-2">{key.key}</td>
                  <td className="py-2 md:px-8 px-2">{key.max_usage_limit - key.usage}</td>
                  <td className="py-2 md:px-8 px-2">{created(key.created_at)}</td>
                  <td className="flex flex-col items-center lg:flex-row gap-3 md:p-8 p-2 ">
                    <MdContentCopy size={20} className="cursor-pointer " onClick={() => copyToClipboard(key.key)} />
                    <MdDelete size={20} className="cursor-pointer " onClick={() => deleteKey(key)} />
                  </td>
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

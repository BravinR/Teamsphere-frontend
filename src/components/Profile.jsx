import React, {ChangeEvent, FormEvent, useState} from "react";

export default function Profile({ onSubmit, onChange, formData, onStateChange, onLoading}) {
    return (
        <div className="h-screen flex flex-col justify-center mx-auto max-w-sm space-y-6">
            <form className="space-y-6" onSubmit={onSubmit}>
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Create Your Profile</h1>
                </div>
                <div className="space-y-4">
                    <p className="text-sm text-gray-400">Choose a unique username and upload your profile image</p>
                    <div className="space-y-2">
                        <label className="block mb-2 font-medium text-gray-900 dark:text-white"
                               htmlFor="username">Username</label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            id="username"
                            type="text"
                            name="username"
                            placeholder="Enter your username"
                            value={formData.username}
                            onChange={(e) => onChange(e, 'input')}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block mb-2 font-medium text-gray-900 dark:text-white" htmlFor="profileImage">Profile
                            Image</label>
                        <input
                            className="block w-full mb-5 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            accept="image/*"
                            id="profileImage"
                            name="file"
                            type="file"
                            onChange={(e) => onChange(e, 'file')}
                        />
                    </div>
                    {formData.file && (
                        <img
                            src={URL.createObjectURL(formData.file)}
                            alt="Profile Image Preview"
                            className="w-48 h-48 rounded-full"
                        />
                    )}
                    <div className="flex justify-between">
                        <button
                            type="button"
                            className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={onStateChange}
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            disabled={onLoading}
                        >
                            {onLoading ? 
                                <div className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            : "Submit"}
                        </button>
                    </div>

                </div>
            </form>
        </div>
    );

}
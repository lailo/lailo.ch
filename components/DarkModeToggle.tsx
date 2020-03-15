import React from 'react'
import useDarkMode from 'use-dark-mode'
import { FiMoon, FiSun } from 'react-icons/fi'

const DarkModeToggle = () => {
  const darkMode = useDarkMode(false, { element: document.documentElement })

  return (
    <button
      className="hover:bg-primary hover:text-white dark:text-white rounded-full w-8 h-8"
      onClick={darkMode.toggle}
    >
      {darkMode.value ? <FiSun /> : <FiMoon />}
    </button>
  )
}

export default DarkModeToggle

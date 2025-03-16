'use client'

import { useState } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { IoIosArrowDown } from "react-icons/io";

// 역할을 한글로 변환하는 매핑 객체
const roleMap: Record<string, string> = {
    admin: '어드민',
    manager: '매니저',
    viewer: '뷰어'
}

interface MenuItem {
    label: string // admin, manager, viewer (영문)
    onClick?: () => void
}

interface DropdownMenuProps {
    defaultLabel: string // 기본 선택 값 (영문)
    menuItems: MenuItem[]
}

export default function DropdownMenu({ defaultLabel, menuItems }: DropdownMenuProps) {
    const [selectedItem, setSelectedItem] = useState<string>(defaultLabel)

    const handleSelect = (label: string, onClick?: () => void) => {
        setSelectedItem(label) // 선택된 값 변경 (영문)
        if (onClick) onClick() // 기존 클릭 이벤트 실행
    }

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div className="w-24">
                <MenuButton className="inline-flex w-full justify-around gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50">
                    {roleMap[selectedItem] || '선택하세요'}  {/* 한글 변환 */}
                    <IoIosArrowDown aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                </MenuButton>
            </div>

            <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-24 origin-top-right divide-y divide-gray-100 rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
                {menuItems.map((item, index) => (
                    <div key={index} className="py-1">
                        <MenuItem>
                            {({ active }) => (
                                <button
                                    className={`block w-full items-center text-center px-4 py-2 text-sm text-left ${
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                    }`}
                                    onClick={() => handleSelect(item.label, item.onClick)}
                                >
                                    {roleMap[item.label] || item.label}  {/* 한글 변환 */}
                                </button>
                            )}
                        </MenuItem>
                    </div>
                ))}
            </MenuItems>
        </Menu>
    )
}

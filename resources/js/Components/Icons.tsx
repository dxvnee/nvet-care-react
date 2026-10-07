import { SVGProps } from 'react';
import {
    ArrowRightIcon as HeroArrowRightIcon,
    ArrowRightOnRectangleIcon as HeroLogoutIcon,
    AtSymbolIcon as HeroAtSymbolIcon,
    Bars3Icon as HeroBars3Icon,
    BellIcon as HeroBellIcon,
    CalendarDaysIcon as HeroCalendarIcon,
    CameraIcon as HeroCameraIcon,
    ChatBubbleLeftRightIcon as HeroChatBubbleLeftRightIcon,
    ChatBubbleOvalLeftEllipsisIcon as HeroChatBubbleIcon,
    ChevronDownIcon as HeroChevronDownIcon,
    ClipboardDocumentListIcon as HeroClipboardListIcon,
    DocumentDuplicateIcon as HeroDocumentDuplicateIcon,
    DocumentTextIcon as HeroDocumentTextIcon,
    EyeIcon as HeroEyeIcon,
    EyeSlashIcon as HeroEyeSlashIcon,
    PlusIcon as HeroPlusIcon,
    PrinterIcon as HeroPrinterIcon,
    UserCircleIcon as HeroUserCircleIcon,
    UserIcon as HeroUserIcon,
    XMarkIcon as HeroXMarkIcon,
} from '@heroicons/react/24/outline';
import {
    ClockIcon as HeroClockIcon,
    ExclamationCircleIcon as HeroExclamationCircleIcon,
    PaperAirplaneIcon as HeroPaperAirplaneIcon,
    ShieldCheckIcon as HeroShieldCheckIcon,
} from '@heroicons/react/20/solid';

export type IconProps = SVGProps<SVGSVGElement>;

export function BellIcon({ className = 'h-5 w-5', strokeWidth = 1.8, ...props }: IconProps) {
    return <HeroBellIcon className={className} strokeWidth={strokeWidth} {...props} />;
}

export function ChevronDownIcon({ className = 'h-4 w-4', strokeWidth = 2, ...props }: IconProps) {
    return <HeroChevronDownIcon className={className} strokeWidth={strokeWidth} {...props} />;
}

export function UserCircleIcon({ className = 'h-4 w-4', strokeWidth = 1.8, ...props }: IconProps) {
    return <HeroUserCircleIcon className={className} strokeWidth={strokeWidth} {...props} />;
}

export function ClipboardListIcon({ className = 'h-4 w-4', strokeWidth = 1.8, ...props }: IconProps) {
    return <HeroClipboardListIcon className={className} strokeWidth={strokeWidth} {...props} />;
}
export function LogoutIcon({ className = 'h-4 w-4', strokeWidth = 1.8, ...props }: IconProps) {
    return <HeroLogoutIcon className={className} strokeWidth={strokeWidth} {...props} />;
}

export function MenuIcon({ className = 'h-6 w-6', strokeWidth = 2, ...props }: IconProps) {
    return <HeroBars3Icon className={className} strokeWidth={strokeWidth} {...props} />;
}
export function CloseIcon({ className = 'h-5 w-5', strokeWidth = 2, ...props }: IconProps) {
    return <HeroXMarkIcon className={className} strokeWidth={strokeWidth} {...props} />;
}

export function UserIcon({ className = 'h-4 w-4', strokeWidth = 2, ...props }: IconProps) {
    return <HeroUserIcon className={className} strokeWidth={strokeWidth} {...props} />;
}

export function MailIcon({ className = 'h-4 w-4', strokeWidth = 2, ...props }: IconProps) {
    return <HeroAtSymbolIcon className={className} strokeWidth={strokeWidth} {...props} />;
}

export function EyeIcon({ className = 'h-4 w-4', strokeWidth = 2, ...props }: IconProps) {
    return <HeroEyeIcon className={className} strokeWidth={strokeWidth} {...props} />;
}

export function EyeSlashIcon({ className = 'h-4 w-4', strokeWidth = 2, ...props }: IconProps) {
    return <HeroEyeSlashIcon className={className} strokeWidth={strokeWidth} {...props} />;
}

export function SpinnerIcon({ className = 'h-4 w-4 animate-spin', ...props }: IconProps) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            {...props}
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            />
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
            />
        </svg>
    );
}

export function ShieldCheckIcon({ className = 'h-3.5 w-3.5', ...props }: IconProps) {
    return <HeroShieldCheckIcon className={className} {...props} />;
}

export function PawWatermark({ className = 'h-56 w-56 text-white/5', ...props }: IconProps) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="currentColor"
            {...props}
        >
            <circle cx="12" cy="16" r="4.5" />
            <circle cx="6.5" cy="10.5" r="2.2" />
            <circle cx="17.5" cy="10.5" r="2.2" />
            <circle cx="9.5" cy="5.5" r="2.2" />
            <circle cx="14.5" cy="5.5" r="2.2" />
        </svg>
    );
}

export function ClockIcon({ className = 'h-3.5 w-3.5', ...props }: IconProps) {
    return <HeroClockIcon className={className} {...props} />;
}

export function StethoscopeIcon({ className = 'h-5 w-5', strokeWidth = 2.2, ...props }: IconProps) {
    return (
        <svg
            className={className}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            {...props}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m0-10.5a3.75 3.75 0 00-3.75 3.75v3.75a3.75 3.75 0 007.5 0v-3.75A3.75 3.75 0 0012 2.25z"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 12a5.25 5.25 0 0010.5 0M12 17.25v2.25m0 0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
            />
        </svg>
    );
}

export function ArrowRightIcon({ className = 'h-5 w-5', strokeWidth = 2.5, ...props }: IconProps) {
    return <HeroArrowRightIcon className={className} strokeWidth={strokeWidth} {...props} />;
}

export function PlusIcon({ className = 'h-4 w-4', strokeWidth = 2.5, ...props }: IconProps) {
    return <HeroPlusIcon className={className} strokeWidth={strokeWidth} {...props} />;
}

export function ChatBubbleIcon({ className = 'h-3.5 w-3.5', strokeWidth = 2.2, ...props }: IconProps) {
    return <HeroChatBubbleIcon className={className} strokeWidth={strokeWidth} {...props} />;
}

export function ChatBubbleLeftRightIcon({ className = 'h-3.5 w-3.5', strokeWidth = 2.2, ...props }: IconProps) {
    return <HeroChatBubbleLeftRightIcon className={className} strokeWidth={strokeWidth} {...props} />;
}

export function DocumentTextIcon({ className = 'h-4 w-4', strokeWidth = 2, ...props }: IconProps) {
    return <HeroDocumentDuplicateIcon className={className} strokeWidth={strokeWidth} {...props} />;
}

export function DocumentEmptyIcon({ className = 'h-12 w-12', strokeWidth = 1.5, ...props }: IconProps) {
    return <HeroDocumentTextIcon className={className} strokeWidth={strokeWidth} {...props} />;
}

export function CalendarIcon({ className = 'h-3.5 w-3.5', strokeWidth = 2, ...props }: IconProps) {
    return <HeroCalendarIcon className={className} strokeWidth={strokeWidth} {...props} />;
}

export function ExclamationCircleIcon({ className = 'h-4 w-4', ...props }: IconProps) {
    return <HeroExclamationCircleIcon className={className} {...props} />;
}

export function CameraUploadIcon({ className = 'h-8 w-8', strokeWidth = 1.5, ...props }: IconProps) {
    return <HeroCameraIcon className={className} strokeWidth={strokeWidth} {...props} />;
}

export function PrinterIcon({ className = 'h-4 w-4', strokeWidth = 2, ...props }: IconProps) {
    return <HeroPrinterIcon className={className} strokeWidth={strokeWidth} {...props} />;
}

export function PaperAirplaneIcon({ className = 'h-5 w-5', ...props }: IconProps) {
    return <HeroPaperAirplaneIcon className={className} {...props} />;
}

const Icons = {
    Bell: BellIcon,
    ChevronDown: ChevronDownIcon,
    UserCircle: UserCircleIcon,
    ClipboardList: ClipboardListIcon,
    Logout: LogoutIcon,
    Menu: MenuIcon,
    Close: CloseIcon,
    User: UserIcon,
    Mail: MailIcon,
    Eye: EyeIcon,
    EyeSlash: EyeSlashIcon,
    Spinner: SpinnerIcon,
    ShieldCheck: ShieldCheckIcon,
    PawWatermark: PawWatermark,
    Clock: ClockIcon,
    Stethoscope: StethoscopeIcon,
    ArrowRight: ArrowRightIcon,
    Plus: PlusIcon,
    ChatBubble: ChatBubbleIcon,
    ChatBubbleLeftRight: ChatBubbleLeftRightIcon,
    DocumentText: DocumentTextIcon,
    DocumentEmpty: DocumentEmptyIcon,
    Calendar: CalendarIcon,
    ExclamationCircle: ExclamationCircleIcon,
    CameraUpload: CameraUploadIcon,
    Printer: PrinterIcon,
    PaperAirplane: PaperAirplaneIcon,
};

export default Icons;

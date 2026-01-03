import { ReactNode } from "react";
import { X } from "lucide-react";

export interface ModalButton {
    label: string;
    onClick: () => void;
    className: string;
    disabled?: boolean;
}

export interface ModalProps {
    isOpen: boolean;
    title?: string;
    content: string | ReactNode;
    buttons: ModalButton[];
    onClose?: () => void;
    showCloseButton?: boolean;
}

const Modal = ({
    isOpen,
    title,
    content,
    buttons,
    onClose,
    showCloseButton = true,
}: ModalProps) => {
    if (!isOpen) return null;

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget && onClose) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
            onClick={handleOverlayClick}
        >
            <div className="bg-white rounded-lg max-w-md w-full shadow-xl">
                <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                        {title && (
                            <h2 className="text-xl font-semibold text-gray-800">
                                {title}
                            </h2>
                        )}
                        {showCloseButton && onClose && (
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-600 transition-colors ml-4"
                                type="button"
                                aria-label="Close modal"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}
                    </div>

                    {/* Content */}
                    <div className="mb-6">
                        {typeof content === "string" ? (
                            <p className="text-gray-600">{content}</p>
                        ) : (
                            <div className="text-gray-600">{content}</div>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end space-x-3">
                        {buttons.map((button, index) => (
                            <button
                                key={index}
                                onClick={button.onClick}
                                className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                                    button.className
                                } ${
                                    button.disabled
                                        ? "opacity-50 cursor-not-allowed"
                                        : "hover:opacity-90"
                                }`}
                                disabled={button.disabled}
                                type="button"
                            >
                                {button.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;

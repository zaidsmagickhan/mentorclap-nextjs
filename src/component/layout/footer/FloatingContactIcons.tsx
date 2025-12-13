import { Phone } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const FloatingContactIcons = () => {
    const navigate = useNavigate();

    // Replace with your actual WhatsApp number (without + or spaces)
    const whatsappNumber = '919449938466' // Example: 91 for India code
    const whatsappMessage = 'Hello! I would like to get more information about your tutoring services.';

    const handleWhatsAppClick = () => {
        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(url, '_blank');
    };

    const handleContactClick = () => {
        navigate('/contact-us');
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
            {/* Contact Icon */}
            <button
                onClick={handleContactClick}
                className="group relative flex items-center justify-center w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-xl"
                aria-label="Contact Us"
            >
                <Phone className="w-6 h-6" />

                {/* Tooltip */}
                <div className="absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                    Contact Us
                    <div className="absolute top-1/2 left-full -mt-1 border-4 border-transparent border-l-gray-900"></div>
                </div>
            </button>

            {/* WhatsApp Icon */}
            <button
                onClick={handleWhatsAppClick}
                className="group relative flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-xl"
                aria-label="Chat on WhatsApp"
            >
                <FaWhatsapp className="w-8 h-8" />

                {/* Tooltip */}
                <div className="absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                    Chat on WhatsApp
                    <div className="absolute top-1/2 left-full -mt-1 border-4 border-transparent border-l-gray-900"></div>
                </div>
            </button>
        </div>
    );
};

export default FloatingContactIcons;
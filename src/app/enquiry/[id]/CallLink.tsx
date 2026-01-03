import { Phone } from "lucide-react";

interface CallLinkProps {
    phoneNumber: string;
}

const CallLink = ({ phoneNumber }: CallLinkProps) => {
    const cleanNumber = phoneNumber.replace(/\D/g, "");

    return (
        <a
            href={`tel:${cleanNumber}`}
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
            <Phone className="w-4 h-4 mr-2" />
            Call Now
        </a>
    );
};

export default CallLink;

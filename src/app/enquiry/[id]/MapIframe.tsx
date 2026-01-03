interface MapIframeProps {
    latitude: number;
    longitude: number;
}

const MapIframe = ({ latitude, longitude }: MapIframeProps) => {
    const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

    if (!googleApiKey) {
        console.error("Google API key is not configured");
        return (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500">Map not available</p>
            </div>
        );
    }

    return (
        <iframe
            title="Location Map"
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            src={`https://www.google.com/maps/embed/v1/place?key=${googleApiKey}&q=${latitude},${longitude}&zoom=14`}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
        />
    );
};

export default MapIframe;

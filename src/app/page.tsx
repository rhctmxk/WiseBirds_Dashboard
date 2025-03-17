export default function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-6">
            {/* ✅ Hero Section */}
            <div className="max-w-2xl">
                <h1 className="text-5xl font-extrabold text-gray-900 animate-fadeIn">
                    Welcome to <span className="text-primary">WiseBirds Dashboard</span>
                </h1>
                <p className="mt-4 text-lg text-gray-600">
                    Monitor and optimize your campaigns efficiently.
                </p>

                {/* ✅ CTA Button */}
                <div className="mt-8">
                    <a
                        href="/campaign"
                        className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
                    >
                        캠페인 관리하기 🚀
                    </a>
                </div>
            </div>
        </div>
    );
}
